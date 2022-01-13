import { MongoClient, ConnectionReadyEvent, ConnectionClosedEvent } from 'mongodb'
import process from 'process'

// Singleton wrapper for DB connection
class MongoDB {
    private static _instance: MongoDB
    private mongoClient: MongoClient

    private constructor() {
        this.mongoClient = new MongoClient(process.env.MONGODB_URL, {
            auth: {
                username: process.env.MONGODB_USERNAME,
                password: process.env.MONGODB_PASSWORD
            },
            appName: 'lightweight-netflix'
        })

        this.mongoClient.on('connectionReady', (event: ConnectionReadyEvent): void => {
            console.log(`Database connection success\n Connection ID: ${event.connectionId}`)
        })

        this.mongoClient.on('connectionClosed', (event: ConnectionClosedEvent): void => {
            console.log(`Database connection closed at ${event.time}. Reason: ${event.reason}`)
        })
    }

    /**
     * Returns the singleton instance of the MongoDB Singleton class
     * @returns MongoDB
     */
    public static getInstance(): MongoDB {
        if (!this._instance) {
            this._instance = new MongoDB()
        }
        return this._instance
    }

    /**
     * Returns the Mongo DB client.
     * @returns MongoClient
     */
    public getClient(): Readonly<MongoClient> {
        return this.mongoClient
    }

    /**
     * Async method to connect the client to the database
     */
    public async connect(): Promise<void> {
        await this.mongoClient.connect()
    }
}

export default MongoDB
