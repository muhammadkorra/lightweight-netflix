import type MovieDto from 'MovieDto'
import MovieRepository from './abstractions/movie.repository.abstract'
import { Db, Collection, SortDirection } from 'mongodb'

type MovieDbPort = {
    _id: string
    name: string
    description: string
    year: number
    cover: string
    owner: string
    rating: number
    timesRated: number
    reviews: { author: string; rating: number; review?: string }[]
    createdAt: string
    modifiedAt: string
}

class MovieDb extends MovieRepository {
    private movieCollection: Collection<MovieDbPort>
    constructor(mongoDb: Db) {
        super()
        this.movieCollection = mongoDb.collection<MovieDbPort>('movies')
    }
    async insertOne(item: MovieDto): Promise<boolean> {
        const { id: _id, ...movieParams } = item
        try {
            const inserted = await this.movieCollection.insertOne({ _id, ...movieParams })
            return inserted.acknowledged
        } catch (error) {
            throw new Error('Failed to insert movie to database')
        }
    }
    async findAll(): Promise<any[] | []> {
        try {
            const movies = await this.movieCollection
                .find({})
                .project({
                    _id: 1,
                    name: 1,
                    description: 1,
                    rating: 1,
                    timesRated: 1,
                    year: 1,
                    owner: 1
                })
                .toArray()
            return movies.length > 0
                ? movies.map(({ _id: id, ...movieParams }) => ({
                      id,
                      ...movieParams
                  }))
                : []
        } catch (error) {
            throw new Error('Failed to get movies from database')
        }
    }
    async findById(_id: string): Promise<MovieDto | null> {
        try {
            const found = await this.movieCollection.findOne({ _id })
            if (!found) {
                return null
            }
            const { _id: id, ...movieParams } = found
            return {
                id,
                ...movieParams
            }
        } catch (error) {
            throw new Error('Failed to get movie from Database')
        }
    }
    async deleteOne(_id: string): Promise<boolean> {
        try {
            const deleted = await this.movieCollection.deleteOne({ _id })

            return deleted.deletedCount === 1
        } catch (error) {
            throw new Error('Failed to delete movie from database')
        }
    }
    async updateOne(updatedMovie: MovieDto): Promise<boolean> {
        try {
            const updated = await this.movieCollection.updateOne(
                { _id: updatedMovie.id },
                { $set: { ...updatedMovie } },
                {
                    upsert: false
                }
            )

            if (updated.modifiedCount === 1) {
                return true
            }

            return false
        } catch (error: any) {
            throw new Error('Failed to update movie from database')
        }
    }

    async updatedRating(
        _id: string,
        overallRating: { rating: number; timesRated: number },
        reviewItem: { author: string; rating: number; review?: string | undefined }
    ): Promise<boolean> {
        const updated = await this.movieCollection.updateOne(
            { _id },
            {
                $set: {
                    rating: overallRating.rating,
                    timesRated: overallRating.timesRated
                },
                $push: {
                    reviews: { author: reviewItem.author, rating: reviewItem.rating, review: reviewItem.review }
                }
            }
        )

        if (updated.modifiedCount === 1) {
            return true
        }

        return false
    }

    async findAllSorted(filter: { filter: string; order: number }): Promise<any[] | []> {
        const sortedMovies = await this.movieCollection
            .find({})
            .sort(filter.filter, filter.order as SortDirection)
            .project({
                _id: 1,
                name: 1,
                description: 1,
                rating: 1,
                timesRated: 1,
                year: 1,
                owner: 1
            })
            .toArray()

        return sortedMovies.length > 0
            ? sortedMovies.map(({ _id: id, ...movieDetails }) => ({
                  id,
                  ...movieDetails
              }))
            : []
    }
}

export default MovieDb
