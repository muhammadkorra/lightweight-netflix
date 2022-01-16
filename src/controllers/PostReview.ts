import type HttpRequest from '../transport/abstractions/request'
import type HttpResponse from '../transport/abstractions/response'
import AppController from './interfaces/app.controller'
import CreateReviewInteractor from '../interactors/movie/CreateReview'

class PostReviewController implements AppController {
    constructor(private createReviewInteractor: CreateReviewInteractor) {}

    async controller(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { movieId } = httpRequest.params
        const { rating, review } = httpRequest.body
        const { authorization } = httpRequest.headers
        const accessToken = authorization?.split(' ')[1]

        try {
            const validUser = await this.createReviewInteractor.getValidUser(accessToken)
            await this.createReviewInteractor.isMovieInWatchlist(validUser, movieId)
            await this.createReviewInteractor.addMovieReview(movieId, {
                rating,
                review
            })

            return {
                success: true,
                message: 'Movie review added',
                statusCode: 200
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

export default PostReviewController
