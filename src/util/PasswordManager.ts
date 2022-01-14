import PasswordManager from './interfaces/password.interface'
import bcrypt from 'bcrypt'

class Password implements PasswordManager {
    constructor(private saltRounds: number) {}

    validate(plainTextPassword: string, hashedPassword: string): boolean {
        return bcrypt.compareSync(plainTextPassword, hashedPassword)
    }

    hash(password: string): string {
        const salt = bcrypt.genSaltSync(this.saltRounds)
        return bcrypt.hashSync(password, salt)
    }
}

export default Password
