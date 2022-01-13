import express, { Request, Response } from 'express'
const app = express()

app.get('/', async (req: Request, res: Response): Promise<void> => {
    res.status(200).send({
        success: true,
        message: 'Hello world'
    })
})

app.listen(4040, (): void => {
    console.log('Started listening on 4040...')
})
