import { useState } from "react"
import { useProductsStore } from "./store"
import { unique } from "../common/utils"

const DropDownMenu = ({ values }: { values: string[] }) => {
    const products = useProductsStore((store) => store.products)
    //const types = unique(products.map((p) => p.type))

    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="relative">
            <button
                id="dropdownCheckboxButton"
                data-dropdown-toggle="dropdownDefaultCheckbox"
                className="flex gap-10 text-black border-2 solid rounded-md p-3 m-3 font-xs text-sm px-2 py-1 text-start items-center"
                type="button"
                onClick={toggleMenu}>
                Dropdown checkbox
                <svg
                    className="w-4 h-4 stroke-[#859ca7] min-w-[15px]"
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>

            {isOpen && (
                <div
                    id="dropdownDefaultCheckbox"
                    className="absolute z-10 left-3 w-[13rem] bg-white divide-y border-2 rounded-md solid shadow">
                    <ul
                        className="p-3 space-y-3 text-sm text-black"
                        aria-labelledby="dropdownCheckboxButton">
                        <li>
                            <div className="flex items-center">
                                <input
                                    id="checkbox-item-1"
                                    type="checkbox"
                                    value=""
                                    className="w-4 h-4 rounded outline-none"
                                />
                                <label
                                    htmlFor="checkbox-item-1"
                                    className="ml-2 text-sm font-medium text-black">
                                    Default checkbox
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default DropDownMenu
