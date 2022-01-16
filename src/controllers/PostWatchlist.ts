import type HttpRequest from '../transport/abstractions/request'
import type HttpResponse from '../transport/abstractions/response'
import AppController from './interfaces/app.controller'
import UserWatchlistInteractor from '../interactors/user/UserWatchlist'

class PostWatchlistController implements AppController {
    constructor(private userWatchlistInteractor: UserWatchlistInteractor) {}

    async controller(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { authorization } = httpRequest.headers
        const { movieId } = httpRequest.body
        const accessToken = authorization?.split(' ')[1]

        try {
            const validUser = await this.userWatchlistInteractor.getValidUser(accessToken)
            await this.userWatchlistInteractor.addToWatchlist(validUser, movieId)

            return {
                success: true,
                statusCode: 200,
                message: 'Movie was added to watchlist'
            }
        } catch (error: any) {
            return {
                success: false,
                statusCode: 400,
                message: error.message
            }
        }
    }
}

export default PostWatchlistController
