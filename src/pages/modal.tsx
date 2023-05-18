export default function Modal() {
    return (
        <>
            <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
                <div className="h-full grow flex"></div>
            </div>
            <div className="w-full h-full flex items-center">
                <div className="grow h-full bg-slate-400"></div>
            </div>
        </>
    )
}
