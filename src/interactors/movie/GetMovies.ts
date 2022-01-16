import MovieDto from 'MovieDto'
import MovieRepository from '../../repositories/abstractions/movie.repository.abstract'

class GetMoviesInteractor {
    constructor(private movieRepository: MovieRepository) {}

    public async getMovies(): Promise<MovieDto[] | []> {
        return await this.movieRepository.findAll()
    }

    public async getMoviesSorted({ filter, order }: { filter: string; order?: string }): Promise<MovieDto[] | []> {
        if (!filter.includes('rate') && !filter.includes('date')) {
            throw new Error('Invalid filter')
        }

        order = order || 'desc' //default order if order was not provided
        return await this.movieRepository.findAllSorted({
            filter: filter === 'rate' ? 'rating' : 'year',
            order: order === 'asc' ? 1 : -1
        })
    }

    public async getMovie(movieId: string): Promise<MovieDto> {
        const found = await this.movieRepository.findById(movieId)
        if (!found) {
            throw new Error('Movie was not found')
        }

        return found
    }
}

export default GetMoviesInteractor
