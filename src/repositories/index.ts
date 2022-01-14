import MongoDB from '../database/mongodb'
import UserDbRepository from './UserDbRepository'

const mongoDb = MongoDB.getInstance().getClient().db('netflix')
const userDbRepository = new UserDbRepository(mongoDb)

export { userDbRepository }
