import MovieDto from 'MovieDto'
import type HttpRequest from '../transport/abstractions/request'
import type HttpResponse from '../transport/abstractions/response'
import AppController from './interfaces/app.controller'
import GetMoviesInteractor from '../interactors/movie/GetMovies'

class GetMoviesController implements AppController {
    constructor(private getMoviesInteractor: GetMoviesInteractor) {}
    async controller(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { filter, order } = httpRequest.query
        let movies: MovieDto[] | []

        try {
            if (filter) {
                movies = await this.getMoviesInteractor.getMoviesSorted({ filter, order })
            } else {
                movies = await this.getMoviesInteractor.getMovies()
            }

            return {
                success: true,
                message: 'Request successful',
                statusCode: 200,
                data: {
                    filter: filter,
                    movies
                }
            }
        } catch (error: any) {
            return {
                success: false,
                message: error.message,
                statusCode: 400
            }
        }
    }
}

export default GetMoviesController
