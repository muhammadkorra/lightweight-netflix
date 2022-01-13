import express, { Request, Response } from 'express'
const app = express()

app.use(express.json())

app.get('/', (req: Request, res: Response): void => {
    res.status(200).send({
        success: true,
        message: 'Hello World'
    })
})

app.listen(4040, (): void => {
    console.log('Started listening on 4040...')
})
