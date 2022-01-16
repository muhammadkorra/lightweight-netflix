import MovieDto from 'MovieDto'
import { movieFactory } from '../../entity'
import Repository from '../../repositories/abstractions/repository.abstract'
import AuthService from '../../util/interfaces/auth.interface'

class RegisterMovieInteractor {
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

    public async registerMovie({
        name,
        description,
        year,
        owner,
        cover
    }: {
        name?: string
        description?: string
        year?: number
        owner?: string
        cover?: string
    }): Promise<MovieDto> {
        const newMovie = movieFactory.makeMovie({ name, description, year, owner, cover })

        //TODO: Handle logic for identifying duplicates

        const movieDto = {
            id: newMovie.getId(),
            name: newMovie.getName(),
            description: newMovie.getDescription(),
            year: newMovie.getYear(),
            cover: newMovie.getCover(),
            owner: newMovie.getOwner(),
            rating: newMovie.getRating(),
            timesRated: newMovie.getTimesRated(),
            reviews: newMovie.getReviews(),
            createdAt: newMovie.getCreatedAt(),
            modifiedAt: newMovie.getModifiedAt()
        }

        const inserted = await this.movieRepository.insertOne(movieDto)
        if (!inserted) {
            throw new Error('Movie registration failed')
        }
        return movieDto
    }
}

export default RegisterMovieInteractor
