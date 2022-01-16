import type HttpRequest from '../transport/abstractions/request'
import type HttpResponse from '../transport/abstractions/response'
import AppController from './interfaces/app.controller'
import RegisterMovieInteractor from '../interactors/movie/RegisterMovie'

class PostMovieController implements AppController {
    constructor(private registerMovieInteractor: RegisterMovieInteractor) {}
    async controller(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { authorization } = httpRequest.headers
        const { name, description, year, cover } = httpRequest.body
        const accessToken = authorization?.split(' ')[1]

        try {
            const validUser = await this.registerMovieInteractor.getValidUser(accessToken)
            const movieDto = await this.registerMovieInteractor.registerMovie({
                name,
                description,
                year,
                cover,
                owner: validUser
            })

            return {
                success: true,
                message: 'Movie registered successfully',
                statusCode: 201,
                data: {
                    ...movieDto
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

export default PostMovieController
