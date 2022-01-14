import type MovieDto from 'MovieDto'
import Repository from './abstractions/repository.abstract'
import { Db, Collection } from 'mongodb'

type MovieDbPort = {
    _id: string
    name: string
    description: string
    year: number
    cover: string
    owner: string
    rating: number
    timesRated: number
    createdAt: string
    modifiedAt: string
}

class MovieDb extends Repository<MovieDto> {
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
    async findAll(): Promise<MovieDto[] | []> {
        try {
            const movies = await this.movieCollection.find({}).toArray()
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
    async updateOne(id: string, updated: MovieDto): Promise<MovieDto> {
        throw new Error('Method not implemented.')
    }
}

export default MovieDb
