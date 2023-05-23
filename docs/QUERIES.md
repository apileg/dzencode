# Delete a product

Prisma:

```ts
async function deleteProduct(id: number): Promise<void> {
    await prisma.productEntity.delete({ where: { id } })
}
```

SQL:

```sql
delete from ProductEntity where id = ?
```

## Delete an order

Prisma:

```ts
async function deleteOrder(id: number): Promise<void> {
    await prisma.orderEntity.delete({ where: { id } })
}
```

SQL:

```sql
delete from OrderEntity where id = ?
```

## Check if user owns given order

Prisma:

```ts
const order = await prisma.orderEntity.findFirst({
    select: {
        userId: true,
    },

    where: {
        id: orderId,
    },
})

return order?.userId === userId
```

SQL:

```sql
select userId from OrderEntity where id = ?
```

## Check if user owns given product

Prisma:

```ts
const product = await prisma.productEntity.findFirst({
    select: {
        order: {
            select: {
                userId: true,
            },
        },
    },

    where: {
        id: productId,
    },
})

return product?.order.userId === userId
```

SQL (Prisma performs it this way):

```sql
orderId = select orderId from ProductEntity where id = ?
userId = select userId from OrderEntity where id = ?
```

This query can also be written using `JOIN`s:

```sql
select
    o.userId as userId
from
    ProductEntity as p
inner join
    OrderEntity as o
on
    p.orderId = o.id
where
    p.id = ?
```

## Select all orders of the user

Prisma (SQL is embedded here):

```ts
const entities = (await prisma.$queryRaw`
        select
            o.id,
            o.title,
            o.createdAt,
            count(p.id) as productsCount,
            sum(p.priceUsd) as totalUsd,
            sum(p.priceUah) as totalUah
        from
            OrderEntity as o
        inner join
            ProductEntity as p
        on
            p.orderId = o.id
        where
            o.userId = ${userId}
        group by
            o.id
    `) as any[]

const orders = entities.map((e) => ({
    ...e,

    // count() fields have bigint type for some reason
    productsCount: Number(e.productsCount),
    totalUsd: Number(e.totalUsd),
    totalUah: Number(e.totalUah),
}))

return orders
```

## Select ids of all orders of the user

Prisma:

```ts
const rows = await tx.orderEntity.findMany({
    select: {
        id: true,
    },

    where: {
        userId,
    },
})

return rows.map((r) => r.id)
```

SQL:

```sql
select id from OrderEntity where userId = ?
```

## Select products of the user filtered by type

Prisma:

```ts
const products = await prisma.productEntity.findMany({
    include: {
        order: true,
    },

    where: {
        order: {
            userId,
        },

        type,
    },
})

return products
```

SQL:

```sql
select *
from
    ProductEntity as p
inner join
    OrderEntity as o
on
    p.orderId = o.id
where
    p.userId = ?
and
    p.type = ?
```

## Select all products of an order

Prisma:

```ts
const products = await prisma.productEntity.findMany({
    include: {
        order: true,
    },

    where: {
        orderId,
    },
})

return products
```

SQL:

```sql
select *
from
    ProductEntity as p
inner join
    OrderEntity as o
on
    p.orderId = o.id
where
    o.id = ?
```

## Select all product types of the user

Prisma:

```ts
const rows = await tx.productEntity.findMany({
    select: {
        type: true,
    },

    where: {
        orderId: {
            in: orderIds,
        },
    },

    distinct: ["type"],
})

return rows.map((r) => r.type)
```

SQL:

```sql
select distinct `type`
from ProductEntity
where orderId IN (?, ?, ?, ...)
```

## Select user details (used when logging in)

Prisma:

```ts
const model = await prisma.userEntity.findUnique({
    select: {
        id: true,
        avatarUrl: true,
        passwordHash: true,
    },

    where: {
        email,
    },
})
```

SQL:

```sql
select
    id,
    avatarUrl,
    passwordHash
from
    UserEntity
where
    email = ?
```
