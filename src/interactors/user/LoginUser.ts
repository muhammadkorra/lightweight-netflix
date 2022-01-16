import UserDto from 'UserDto'
import { userFactory } from '../../entity'
import UserRepository from '../../repositories/abstractions/user.repository.abstract'
import AuthService from '../../util/interfaces/auth.interface'

class LoginUserInteractor {
    constructor(private userRepository: UserRepository, private authService: AuthService) {}

    public async validateUser({ email, password }: { email?: string; password?: string }): Promise<UserDto> {
        if (!email) {
            throw new Error('You must provide an email')
        }
        if (!password) {
            throw new Error('You must provide your password')
        }

        const found = await this.userRepository.findByEmail(email)
        if (!found) {
            throw new Error('User was not found. Please make sure you are a registered user')
        }
        const validUser = userFactory.makeUser(found)
        if (!validUser.validatePassword(password)) {
            throw new Error('The provided password was incorrect. Please try again')
        }

        return {
            id: validUser.getId(),
            email: validUser.getEmail(),
            fullName: validUser.getFullName(),
            age: validUser.getAge(),
            password: validUser.getHashedPassword(),
            watchedList: validUser.getWatchedList()
        }
    }

    public async generateValidToken(userDto: UserDto): Promise<string> {
        return await this.authService.generateToken({ email: userDto.email, name: userDto.fullName })
    }
}

export default LoginUserInteractor
