import { useState } from "react"
import { unique } from "../common/utils"
import { useProductsStore } from "./store"

const DropDownList = () => {
    const types = useProductsStore((store) => [null, ...store.types])
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const setCurrentType = useProductsStore((store) => store.setCurrentType)
    const currentType = useProductsStore((store) => store.currentType)

    return (
        <div className="relative">
            <button
                className="flex justify-between min-w-[12.4rem] pl-5 text-black border-2 solid rounded-md p-3 m-3 font-xs text-sm px-2 py-1 text-start items-center"
                type="button"
                onClick={toggleMenu}>
                {currentType ?? "All"}
                <svg
                    className="w-4 h-4 ml-2"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
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
                <div className="absolute z-10 left-3 w-[12.4rem] bg-white divide-y border-2 rounded-md solid shadow">
                    <ul className="p-3 space-y-1 text-sm text-black">
                        {types.map((type) => (
                            <li key={type}>
                                <div
                                    className="flex items-center py-1 hover:bg-[#9caeb7] hover:rounded-md"
                                    onClick={() => {
                                        setCurrentType(type)
                                        toggleMenu()
                                    }}>
                                    <label
                                        htmlFor="checkbox-item-1"
                                        className="ml-2 text-sm font-medium text-black">
                                        {type ?? "All"}
                                    </label>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default DropDownList
