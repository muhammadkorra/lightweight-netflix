import type HttpRequest from '../transport/abstractions/request'
import type HttpResponse from '../transport/abstractions/response'
import AppController from './interfaces/app.controller'
import UpdateMovieInteractor from '../interactors/movie/UpdateMovie'

class PatchMovieController implements AppController {
    constructor(private updateMovieInteractor: UpdateMovieInteractor) {}

    async controller(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { movieId } = httpRequest.params
        const { authorization } = httpRequest.headers
        const { name, description, year, cover } = httpRequest.body
        const accessToken = authorization?.split(' ')[1]

        try {
            const validUser = await this.updateMovieInteractor.getValidUser(accessToken)
            await this.updateMovieInteractor.validateOwner(validUser, movieId)
            const updated = await this.updateMovieInteractor.updateMovie({
                id: movieId,
                name,
                description,
                year,
                cover
            })
            return {
                success: true,
                message: 'Movie updated successfully',
                statusCode: 200,
                data: {
                    ...updated
                }
            }
        } catch (error: any) {
            return {
                success: false,
                message: error.message,
                statusCode: 401
            }
        }
    }
}

export default PatchMovieController
