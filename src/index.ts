import express, { Request, Response } from 'express'
import MongoDB from './database/mongodb'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
let mongoDb: MongoDB

app.use(express.json())

app.get('/', (req: Request, res: Response): void => {
    res.status(200).send({
        success: true,
        message: 'Hello World'
    })
})

app.listen(4040, async (): Promise<void> => {
    mongoDb = MongoDB.getInstance()
    await mongoDb.connect()

    console.log('Started listening on 4040...')
})
