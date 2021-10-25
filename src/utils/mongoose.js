import { connect, connection } from 'mongoose'

const connectionPropierties = {
    isConnected: false
}

export const dbConnect = async () => {
    if (connectionPropierties.isConnected) return

    const connectionDB = await connect(process.env.MONGO_URL)
    connectionPropierties.isConnected = connectionDB.connections[0].readyState
    console.log(`DB: ${connectionDB.connection.db.databaseName}`)
}

connection.on("connected", () => {
    console.log("MongoDB is connected.")
})

connection.on("error", () => {
    console.log("Error is connected.")
})