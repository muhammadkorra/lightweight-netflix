import type HttpRequest from '../transport/abstractions/request'
import type HttpResponse from '../transport/abstractions/response'
import AppController from './interfaces/app.controller'
import GetMoviesInteractor from '../interactors/movie/GetMovies'

class GetMovieController implements AppController {
    constructor(private getMoviesInteractor: GetMoviesInteractor) {}
    async controller(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { movieId } = httpRequest.params

        try {
            const found = await this.getMoviesInteractor.getMovie(movieId)

            return {
                success: true,
                message: 'Movie was found',
                statusCode: 200,
                data: {
                    ...found
                }
            }
        } catch (error: any) {
            return {
                success: false,
                statusCode: 404,
                message: error.message
            }
        }
    }
}

export default GetMovieController
