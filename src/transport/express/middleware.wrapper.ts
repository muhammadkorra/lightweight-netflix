import HttpRequest from '../abstractions/request'
import { Request, Response } from 'express'
import ExpressCallback from 'ExpressCallback'
import AppController from '../../controllers/interfaces/app.controller'

export default function MakeExpressCallback(controller: AppController): ExpressCallback {
    return async (req: Request, res: Response): Promise<void> => {
        const httpRequest: HttpRequest = {
            body: req.body,
            query: req.query,
            params: req.params,
            headers: {
                authorization: req.headers.authorization
            }
        }
        try {
            const response = await controller.controller(httpRequest)

            res.status(response.statusCode).send({
                success: response.success,
                message: response.message,
                data: response.data
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: 'Unknown error occured'
            })
        }
    }
}
