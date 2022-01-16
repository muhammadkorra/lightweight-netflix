import Repository from './repository.abstract'
import MovieDto from 'MovieDto'

abstract class MovieRepository extends Repository<MovieDto> {
    abstract updatedRating(
        _id: string,
        overallRating: { rating: number; timesRated: number },
        reviewItem: { author: string; rating: number; review?: string }
    ): Promise<boolean>

    abstract findAllSorted(filter: { filter: string; order: number }): Promise<MovieDto[] | []>
}

export default MovieRepository
