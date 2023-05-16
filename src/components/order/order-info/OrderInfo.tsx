import { Product } from "@prisma/client"

interface OrderInfoProps {
    orderTitle: string
    products: Product[]
}

const OrderInfo = ({ orderTitle, products }: OrderInfoProps) => {
    return (
        <div>
            <h1>{orderTitle}</h1>
            {products.map((p, i) => (
                <ul key={i}>
                    <li>
                        <OrderItem {...p} />
                    </li>
                </ul>
            ))}
        </div>
    )
}

export default OrderInfo

const OrderItem = (props: Product) => {
    const deleteOrder = () => {}

    const image = (
        // eslint-disable-next-line
        <img src={props.imageUrl} alt="" />
    )

    return (
        <div className="flex">
            {image}

            <div>
                <p>{props.title}</p>
                <p>{props.serialNumber}</p>
            </div>

            {/** TODO: Text or something */}
            <h1>{props.isAvailable}</h1>

            <DeleteButton onClick={deleteOrder} />
        </div>
    )
}

interface DeleteButtonProps {
    onClick: () => void
}

const DeleteButton = (props: DeleteButtonProps) => {
    return (
        <div onClick={props.onClick}>
            <DeleteButtonImage />
        </div>
    )
}

const DeleteButtonImage = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className="h-6 w-6"
            stroke="currentColor">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
        </svg>
    )
}
