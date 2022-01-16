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
    patchMovieController,
    postWatchlistController,
    postReviewController,
    getMoviesController,
    getMovieController
} from './controllers'

const app = express()
let mongoDb: MongoDB

app.use(express.json())

app.post('/user', MakeExpressCallback(postUserController))
app.post('/user/watchList', MakeExpressCallback(postWatchlistController))
app.post('/token', MakeExpressCallback(postTokenController))
app.post('/movie(s)?', MakeExpressCallback(postMovieController))
app.delete('/movie(s)?/:movieId', MakeExpressCallback(deleteMovieController))
app.patch('/movie(s)?/:movieId', MakeExpressCallback(patchMovieController))
app.get('/movie(s)?/:movieId', MakeExpressCallback(getMovieController))
app.get('/movie(s)?', MakeExpressCallback(getMoviesController))
app.post('/movie(s)?/:movieId/review', MakeExpressCallback(postReviewController))

app.listen(4040, async (): Promise<void> => {
    mongoDb = MongoDB.getInstance()
    await mongoDb.connect()

    console.log('Started listening on 4040...')
})
