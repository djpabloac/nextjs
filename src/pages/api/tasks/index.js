import { dbConnect } from "utils/mongoose"
import Task from 'models/Task'

dbConnect()

export default async function handler(req, res) {
    const { method, body } = req

    try {
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