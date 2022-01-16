import express, { Request, Response } from 'express'
import MongoDB from './database/mongodb'
import dotenv from 'dotenv'

dotenv.config()
import MakeExpressCallback from './transport/express/middleware.wrapper'
import {
    postUserController,
    postTokenController,
    postMovieController,
    deleteMovieController,
    patchMovieController
} from './controllers'

const app = express()
let mongoDb: MongoDB

app.use(express.json())

app.post('/user', MakeExpressCallback(postUserController))
app.post('/token', MakeExpressCallback(postTokenController))
app.post('/movie', MakeExpressCallback(postMovieController))
app.delete('/movie/:movieId', MakeExpressCallback(deleteMovieController))
app.patch('/movie/:movieId', MakeExpressCallback(patchMovieController))

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
