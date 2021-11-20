import { dbConnect } from "utils/mongoose"
import Task from 'models/Task'
import jwt from "next-auth/jwt"

const secret = process.env.JWT_SECRET

dbConnect()

export default async function handler(req, res) {

    const token = await jwt.getToken({ req, secret })
    console.log('Token List: ', token)

    try {
        const { method, body } = req
        switch (method) {
            case "GET":
                const task = await Task.find()
                return res.status(200).json(task)
            case "POST":
                const newTask = new Task(body)
                const saveTask = await newTask.save()
                return res.status(201).json(saveTask)
            default:
                return res.status(400).json({ "message": "This method is not supported" })
        }
    } catch (error) {
        return res.status(500).json({ "error": error.message })
    }
}