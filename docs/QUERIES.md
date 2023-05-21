## Query 1

Get all orders + compute products count and total price

```sql
select
    o.id,
    o.title,
    o.createdAt,
    count(p.id) as productsCount,
    sum(p.priceUsd) as totalUsd,
    sum(p.priceUah) as totalUah
from
    orderEntity as o
inner join
    productEntity as p
on
    p.orderId = o.id
group by
    o.id
```

## Query 2

Get all products together with their orders
(include order id, title and createdAt)

Prisma code:

```ts
const products = await prisma.productEntity.findMany({
    include: {
        order: true,
    },

    where: { type },
})
```

Prisma performs this query as two separate queries under the hood:

```sql
select *
from productEntity;

select *
from orderEntity where id in (?, ?, ?, ...);
```

`(?, ?, ?, ...)` part is replaced by ids from `orderId` column returned
from the first query

Optionally, this query filters products by their type:

```sql
select *
from productEntity
where type = ?
```

This query could have been written using JOIN:

```sql
select *
from
    productsEntity as p
inner join
    orderEntity as o
on
    p.orderId = o.id
where
    p.type = ?
```

## Query 3

Get distinct types of all existing products

Prisma code:

```ts
const rows = await prisma.productEntity.findMany({
    select: {
        type: true,
    },

    distinct: ["type"],
})

return rows.map((t) => t.type)
```

SQL:

```sql
select distinct `type` from productEntity
```

## Query 4

Get all products of the order

Prisma code:

```ts
const products = await prisma.productEntity.findMany({
    where: {
        orderId: id,
    },
})
```

SQL:

```sql
select *
from productEntity
where p.orderId = ?
```
