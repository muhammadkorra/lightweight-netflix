import UserDto from 'UserDto'
import { userFactory } from '../entity'
import UserRepository from '../repositories/abstractions/user.repository.abstract'

class RegisterUserInteractor {
    constructor(private userRepository: UserRepository) {}

    public async registerUser({
        fullName,
        age,
        email,
        password
    }: {
        fullName?: string
        age?: number
        email?: string
        password?: string
    }): Promise<UserDto> {
        const newUser = userFactory.makeUser({ fullName, age, email, password })

        const found = await this.userRepository.findByEmail(newUser.getEmail())

        if (found) {
            throw new Error('User already exists')
        }

        const userDto = {
            id: newUser.getId(),
            email: newUser.getEmail(),
            fullName: newUser.getFullName(),
            age: newUser.getAge(),
            password: newUser.getHashedPassword()
        }
        const inserted = await this.userRepository.insertOne(userDto)
        if (!inserted) {
            throw new Error('User registration failed')
        }
        return userDto
    }
}

export default RegisterUserInteractor
