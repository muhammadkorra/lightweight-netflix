import PasswordManager from './interfaces/password.interface'
import bcrypt from 'bcrypt'

class Password implements PasswordManager {
    constructor(private saltRounds: number) {}

    hash(password: string): string {
        const salt = bcrypt.genSaltSync(this.saltRounds)
        return bcrypt.hashSync(password, salt)
    }
}

export default Password
