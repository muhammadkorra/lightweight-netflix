import MongoDB from '../database/mongodb'
import UserDbRepository from './UserDbRepository'
import MovieDb from './MovieDbRepository'

const mongoDb = MongoDB.getInstance().getClient().db('netflix')
const userDbRepository = new UserDbRepository(mongoDb)
const movieDbRepository = new MovieDb(mongoDb)

export { userDbRepository, movieDbRepository }
