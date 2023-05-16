import { useEffect, useState } from "react"
import { Socket, io } from "socket.io-client"
import ClientSide from "../ClientSide"

const TopPanel = () => {
    return (
        <div className="w-full h-full flex justify-around items-center shadow-md">
            <Icon />
            <ClientSide>
                <SessionsCount />
                <DateAndTime />
            </ClientSide>
        </div>
    )
}

export default TopPanel

const Icon = () => {
    return (
        <div className="flex items-center gap-5 text-green-500 stroke-green-500 font-bold">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className="w-12 h-12">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
            </svg>
            <h1>INVENTORY</h1>
        </div>
    )
}

const DateAndTime = () => {
    const [date, setDate] = useState<Date>(new Date())

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date())
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    const locale = [navigator.language]

    const weekday = Intl.DateTimeFormat(locale, {
        weekday: "long",
    }).format(date)

    const dateString = new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date)

    const time = new Intl.DateTimeFormat(locale, {
        hour: "numeric",
        minute: "numeric",
    }).format(date)

    return (
        <div className="flex justify-around items-end gap-11">
            <div>
                <p>{weekday}</p>
                <p>{dateString}</p>
            </div>
            <Clock time={time} />
        </div>
    )
}

const Clock = ({ time }: { time: string }) => {
    return (
        <div className="flex gap-1 stroke-green-500 ">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className="w-6 h-6 font-bold">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <p className="items-baseline">{time}</p>
        </div>
    )
}

const SessionsCount = () => {
    const [sessions, setSessions] = useState<number>(0)

    useEffect(() => {
        let socket: Socket | null = null
        connectViaSocket()

        return () => {
            window.removeEventListener("beforeUnload", closeSocket)
            closeSocket()
        }

        async function connectViaSocket() {
            await fetch("/api/initialize-socket")

            socket = io({
                path: "/api/socket",
            })

            socket.on("message", (message) => {
                setSessions(message)
            })

            // If tab closes normally, close the socket as soon as possible
            // If tab closes abruptly (e.g. the user's computer suddenly shuts down)
            // the socket server will detect disconnection with slight lag
            // (~ after pingTimeout milliseconds)
            window.addEventListener("beforeUnload", closeSocket)
        }

        function closeSocket() {
            socket?.close()
            socket = null
        }
    }, [])

    return <p>Active sessions: {sessions}</p>
}
