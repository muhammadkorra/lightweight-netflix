import MovieDto from 'MovieDto'
import { movieFactory } from '../../entity'
import Repository from '../../repositories/abstractions/repository.abstract'
import AuthService from '../../util/interfaces/auth.interface'

class UpdateMovieInteractor {
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

    public async updateMovie({
        id,
        name,
        description,
        year,
        cover
    }: {
        id: string
        name?: string
        description?: string
        year?: number
        cover?: string
    }): Promise<MovieDto> {
        const found = await this.movieRepository.findById(id)
        if (!found) {
            throw new Error('Movie was not found')
        }

        const validMovie = movieFactory.makeMovie({
            ...found,
            name: name || found.name,
            description: description || found.description,
            year: year || found.year,
            cover: cover || found.cover,
            modifiedAt: new Date().toUTCString()
        })

        const movieDto = {
            id: validMovie.getId(),
            name: validMovie.getName(),
            description: validMovie.getDescription(),
            year: validMovie.getYear(),
            cover: validMovie.getCover(),
            owner: validMovie.getOwner(),
            rating: validMovie.getRating(),
            timesRated: validMovie.getTimesRated(),
            createdAt: validMovie.getCreatedAt(),
            modifiedAt: validMovie.getModifiedAt()
        }

        const updated = await this.movieRepository.updateOne(movieDto)
        if (!updated) {
            throw new Error('Failed to update movie')
        }
        return movieDto
    }
}

export default UpdateMovieInteractor
