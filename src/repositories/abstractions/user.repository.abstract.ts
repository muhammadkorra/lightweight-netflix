import UserDto from 'UserDto'
import Repository from './repository.abstract'

abstract class UserRepository extends Repository<UserDto> {
    abstract findByEmail(email: string): Promise<UserDto | null>
    abstract insertToWatchlist(id: string, watchlistItem: { id: string; name: string }): Promise<boolean>
}

export default UserRepository
