import { Request, Response } from 'express'

type ExpressCallback = (req: Request, res: Response) => Promise<void>

export default ExpressCallback
