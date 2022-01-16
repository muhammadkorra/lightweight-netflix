import MovieDto from 'MovieDto'
import UserRepository from '../../repositories/abstractions/user.repository.abstract'
import Repository from '../../repositories/abstractions/repository.abstract'
import AuthService from '../../util/interfaces/auth.interface'

class UserWatchlistInteractor {
    constructor(
        private userRepository: UserRepository,
        private movieRepository: Repository<MovieDto>,
        private authService: AuthService
    ) {}

    public async getValidUser(accessToken?: string): Promise<string> {
        if (!accessToken || accessToken.length === 0) {
            throw new Error('Please provide an access token')
        }
        if (!(await this.authService.validateToken(accessToken))) {
            throw new Error('Access token invalid or expired')
        }
        return await this.authService.parseToken(accessToken)
    }

    public async addToWatchlist(email: string, movieId: string): Promise<void> {
        const user = await this.userRepository.findByEmail(email)
        if (!user) {
            // fool-proof: user email comes from access token which was issued to valid user
            // this is a corner case if the user was deleted after a valid token were issued
            throw new Error('User does not exist')
        }
        const foundMovie = await this.movieRepository.findById(movieId)

        if (!foundMovie) {
            throw new Error('Movie was not found')
        }

        const inserted = await this.userRepository.insertToWatchlist(user.id, {
            id: foundMovie.id,
            name: foundMovie.name
        })
        if (!inserted) {
            throw new Error("Failed to insert item to user's watchlist")
        }
    }
}

export default UserWatchlistInteractor
