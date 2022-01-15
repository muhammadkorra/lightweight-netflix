import MovieDto from 'MovieDto'
import Repository from '../repositories/abstractions/repository.abstract'
import AuthService from '../util/interfaces/auth.interface'

class DeleteMovieInteractor {
    constructor(private movieRepository: Repository<MovieDto>, private authService: AuthService) {}

    public async getValidUser(accessToken?: string): Promise<string> {
        if (!accessToken || accessToken.length === 0) {
            throw new Error('Please provide an access token')
        }
        if (!(await this.authService.validateToken(accessToken))) {
            throw new Error('Access token invalid or expired')
        }
        return await this.authService.parseToken(accessToken)
    }

    public async validateOwner(owner: string, movieId: string): Promise<void> {
        const found = await this.movieRepository.findById(movieId)
        if (!found) {
            throw new Error('Movie was not found')
        }

        if (owner !== found.owner) {
            throw new Error('Only the movie owner is able to perform this action')
        }
    }

    public async deleteMovie(id: string): Promise<boolean> {
        const deleted = await this.movieRepository.deleteOne(id)
        if (!deleted) {
            return false
        }
        return true
    }
}

export default DeleteMovieInteractor
