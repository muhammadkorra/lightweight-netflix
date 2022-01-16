import type HttpRequest from '../transport/abstractions/request'
import type HttpResponse from '../transport/abstractions/response'
import AppController from './interfaces/app.controller'
import LoginUserInteractor from '../interactors/user/LoginUser'

class PostTokenController implements AppController {
    constructor(private loginUserInteractor: LoginUserInteractor) {}

    async controller(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { email, password } = httpRequest.body

        try {
            const validatedUser = await this.loginUserInteractor.validateUser({ email, password })
            const accessToken = await this.loginUserInteractor.generateValidToken(validatedUser)

            return {
                success: true,
                statusCode: 200,
                message: 'User logged in successfully',
                data: {
                    accessToken,
                    expiresIn: 300,
                    type: 'Bearer'
                }
            }
        } catch (error: any) {
            return {
                success: false,
                statusCode: 401,
                message: error.message
            }
        }
    }
}

export default PostTokenController
