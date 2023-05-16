import { Product } from "@/model"
import TrashIcon from "../common/TrashIcon"

interface OrderInfoProps {
    orderTitle: string
    products: Product[]
    onCloseClick: () => void
}

const OrderInfo = ({ orderTitle, products }: OrderInfoProps) => {
    return (
        <div>
            <h1>{orderTitle}</h1>
            {products.map((p, i) => (
                <ul key={i}>
                    <li>
                        <ProductItem {...p} />
                    </li>
                </ul>
            ))}
        </div>
    )
}

export default OrderInfo

const ProductItem = (props: Product) => {
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

            <h1>{props.availability}</h1>

            <div onClick={deleteOrder}>
                <TrashIcon />
            </div>
        </div>
    )
}
