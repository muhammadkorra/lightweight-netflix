import UserDto from 'UserDto'
import UserRepository from './abstractions/user.repository.abstract'
import { Db, Collection } from 'mongodb'

type UserDbPort = {
    _id: string
    fullName: string
    age: number
    email: string
    password: string
}

class UserDb extends UserRepository {
    private userCollection: Collection<UserDbPort>

    constructor(mongoDb: Db) {
        super()
        this.userCollection = mongoDb.collection<UserDbPort>('users')
    }

    async insertOne(item: UserDto): Promise<boolean> {
        const { id: _id, ...userInfo } = item
        try {
            const inserted = await this.userCollection.insertOne({ _id, ...userInfo })

            return inserted.acknowledged
        } catch (error) {
            throw new Error('Failed to insert user into database')
        }
    }
    async findAll(): Promise<UserDto[] | []> {
        try {
            const users = await this.userCollection.find({}).toArray()
            return users.length > 0 ? users.map(({ _id: id, ...userInfo }) => ({ id, ...userInfo })) : []
        } catch (error) {
            throw new Error('Could not get users from database')
        }
    }
    async findById(_id: string): Promise<UserDto | null> {
        try {
            const found = await this.userCollection.findOne({ _id })
            if (!found) {
                return null
            }
            const { _id: id, ...userInfo } = found
            return {
                id,
                ...userInfo
            }
        } catch (error) {
            throw new Error('Failed to get user by ID from database')
        }
    }
    async findByEmail(email: string): Promise<UserDto | null> {
        try {
            const found = await this.userCollection.findOne({ email })

            if (!found) {
                return null
            }

            const { _id: id, ...userInfo } = found
            return {
                id,
                ...userInfo
            }
        } catch (error) {
            throw new Error('Failed to get user by email')
        }
    }
    async deleteOne(_id: string): Promise<boolean> {
        try {
            const deleted = await this.userCollection.deleteOne({ _id })

            return deleted.deletedCount === 1
        } catch (error) {
            throw new Error('Failed to delete user from database')
        }
    }
    async updateOne(updated: UserDto): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
}

export default UserDb
