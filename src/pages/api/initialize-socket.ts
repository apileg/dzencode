import { NextApiHandler } from "next"
import { Server, Socket } from "socket.io"
import { wrapHandler } from "./_utils/wrapHandler"

const handler: NextApiHandler = wrapHandler(async (request, response) => {
    if (request.method !== "POST") {
        response.status(400)
        return
    }

    const server = (response.socket as any).server
    if (server.io) {
        return
    }

    const io = new Server(server, {
        path: "/api/socket",
        addTrailingSlash: false,
        pingTimeout: 2000,
        pingInterval: 1000,
    })

    setupServer(io)
    server.io = io
})

export default handler

function setupServer(io: Server) {
    const clients = new Set<Socket>()

    io.on("connection", (socket) => {
        const address = socket.conn.remoteAddress
        console.log(`${address} has connected`)

        clients.add(socket)
        notifyAboutCountChange()

        socket.on("error", (error) => {
            console.log(`${address} has error: ${error.message}`)
        })

        socket.on("disconnect", () => {
            console.log(`${address} has disconnected`)

            clients.delete(socket)
            notifyAboutCountChange()
        })
    })

    function notifyAboutCountChange() {
        const count = clients.size

        for (const socket of clients) {
            socket.send(count)
        }
    }
}
