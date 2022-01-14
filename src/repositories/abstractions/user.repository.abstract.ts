import UserDto from 'UserDto'
import Repository from './repository.abstract'

abstract class UserRepository extends Repository<UserDto> {
    abstract findByEmail(email: string): Promise<UserDto | null>
}

export default UserRepository
