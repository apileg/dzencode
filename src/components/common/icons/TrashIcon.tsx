import React, { useState } from "react"
import { createPortal } from "react-dom"

const TrashIcon = ({ onClick }: { onClick: () => void }) => {
    const [showPortal, setShowPortal] = useState(false)

    const handleClick = () => {
        setShowPortal(true)
    }

    return (
        <>
            <svg
                onClick={handleClick}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className="h-6 w-6 cursor-pointer text-[#9aacb5] "
                stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
            </svg>
            {showPortal &&
                createPortal(
                    <Portal
                        onClick={onClick}
                        onClose={() => setShowPortal(false)}
                    />,
                    document.body
                )}
        </>
    )
}

export default TrashIcon

const Portal = ({
    onClick,
    onClose,
}: {
    onClick: () => void
    onClose: () => void
}) => {
    return (
        <>
            <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 p-4 overflow-x-hidden overflow-y-auto">
                <div className="absolute bg-gray-600 opacity-40 w-screen h-screen"></div>

                <div className="relative bg-white rounded-lg">
                    <button
                        type="button"
                        className="absolute -top-3 -right-3 drop-shadow-xl bg-white rounded-full text-gray-400 bg-transparent hover:bg-gray-400 hover:text-gray-900 text-sm p-1.5 ml-auto inline-flex items-center dark:hover:text-white">
                        <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            onClick={onClose}
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"></path>
                        </svg>
                    </button>
                    <div className="flex flex-col p-6 text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this item?
                        </h3>
                        <div className="flex justify-center gap-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">
                                No, cancel
                            </button>
                            <button
                                type="button"
                                onClick={onClick}
                                className="text-white bg-[#86bc48] hover:bg-[#82b14d] font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                Yes, I{"'"}m sure
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
