import { NextApiHandler } from "next"

const handler: NextApiHandler = async (req, res) => {
    res.json(req.query)
    res.end()
}

export default handler
