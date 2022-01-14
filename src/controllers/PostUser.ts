import type HttpRequest from '../transport/abstractions/request'
import type HttpResponse from '../transport/abstractions/response'
import AppController from './interfaces/app.controller'
import RegisterUserInteractor from '../interactors/RegisterUser'

class PostUserController implements AppController {
    constructor(private registerUserInteractor: RegisterUserInteractor) {}

    async controller(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { email, fullName, age, password } = httpRequest.body
        try {
            const result = await this.registerUserInteractor.registerUser({ email, fullName, age, password })

            return {
                success: true,
                statusCode: 201,
                message: 'User created successfully',
                data: {
                    id: result.id,
                    email: result.email,
                    name: result.fullName,
                    age: result.age
                }
            }
        } catch (e: any) {
            return {
                statusCode: 400,
                success: false,
                message: e.message
            }
        }
    }
}

export default PostUserController
