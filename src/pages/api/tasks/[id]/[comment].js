import { dbConnect } from "utils/mongoose"
import Task from 'models/Task'

export default async function handler(req, res) {
    const { method, query } = req

    return res.status(200).json(query)
}