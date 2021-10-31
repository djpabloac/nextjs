import { dbConnect } from "utils/mongoose"
import Task from 'models/Task'
import jwt from "next-auth/jwt"

const secret = process.env.JWT_SECRET

dbConnect()

export default async function handler(req, res) {
    console.log(secret)
    const token = await jwt.getToken({ req, secret })
    if (token) {
        const { method, body, query: { id } } = req

        try {
            switch (method) {
                case "GET":
                    const task = await Task.findById(id)
                    if (!task) res.status(404).json({ "message": "Task not found" })
                    return res.status(200).json(task)
                case "PUT":
                    const updateTask = await Task.findByIdAndUpdate(id, body, {
                        new: true
                    })
                    if (!updateTask) return res.status(404).json({ "message": "Task not found" })
                    return res.status(200).json(updateTask)
                case "DELETE":
                    const deletedTask = await Task.findByIdAndDelete(id)
                    if (!deletedTask) return res.status(404).json({ "message": "Task not found" })
                    return res.status(204).json()
                default:
                    return res.status(400).json({ "message": "This method is not supported" })
            }
        } catch (error) {
            return res.status(500).json({ "error": error.message })
        }
    } else {
        res.status(401).json({ "error": "Not Signed in" })
    }
}