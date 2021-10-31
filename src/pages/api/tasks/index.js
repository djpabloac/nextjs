import { dbConnect } from "utils/mongoose"
import Task from 'models/Task'
import jwt from "next-auth/jwt"

const secret = process.env.JWT_SECRET
const signingKey = process.env.JWT_SIGNING_KEY
dbConnect()

export default async function handler(req, res) {
    console.log(secret)
    console.log(JSON.stringify(req.cookies, null, 2))
    const token = await jwt.getToken({ req, secret })
    console.log(token)

    if (token) {
        console.log('Access')
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
    } else {
        console.log('Not Access')
        res.status(401).json({ "error": "Not Signed in" })
    }


}