import type HttpRequest from '../transport/abstractions/request'
import type HttpResponse from '../transport/abstractions/response'
import AppController from './interfaces/app.controller'
import DeleteMovieInteractor from '../interactors/DeleteMovie'

class DeleteMovieController implements AppController {
    constructor(private deleteMovieInteractor: DeleteMovieInteractor) {}

    async controller(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { authorization } = httpRequest.headers
        const { movieId } = httpRequest.params
        const accessToken = authorization?.split(' ')[1]

        try {
            const validUser = await this.deleteMovieInteractor.getValidUser(accessToken)
            await this.deleteMovieInteractor.validateOwner(validUser, movieId)
            await this.deleteMovieInteractor.deleteMovie(movieId)
            return {
                success: true,
                message: 'Movie deleted successfully',
                statusCode: 200,
                data: {
                    id: movieId
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

export default DeleteMovieController
