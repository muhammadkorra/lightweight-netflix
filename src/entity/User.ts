import ID from '../util/interfaces/id.interface'
import EmailValidator from '../util/interfaces/email.interface'
import PasswordManager from '../util/interfaces/password.interface'

class User {
    constructor(
        private id: string,
        private fullName: string,
        private age: number,
        private email: string,
        private password: string,
        private watchedList: string[],
        private passwordManager: PasswordManager
    ) {}

    public getId(): string {
        return this.id
    }

    public getFullName(): string {
        return this.fullName
    }
    public getAge(): number {
        return this.age
    }
    public getEmail(): string {
        return this.email
    }
    public getHashedPassword(): string {
        return this.passwordManager.hash(this.password)
    }

    public getWatchedList(): string[] {
        return this.watchedList
    }

    public validatePassword(plainTextPassword: string): boolean {
        return this.passwordManager.validate(plainTextPassword, this.password)
    }
}

class UserFactory {
    // Inject dependancies
    constructor(
        private IDFactory: ID,
        private emailValidator: EmailValidator,
        private passwordManager: PasswordManager
    ) {}
    public makeUser({
        id = this.IDFactory.generate(),
        fullName,
        age,
        email,
        password,
        watchedList = []
    }: {
        id?: string
        fullName?: string
        age?: number
        email?: string
        password?: string
        watchedList?: string[]
    }): Readonly<User> {
        // business logic
        if (!this.IDFactory.validate(id)) {
            throw new Error('Invalid ID')
        }
        if (!fullName || fullName.length < 4) {
            throw new Error('Your name needs to be at least 4 characters long')
        }
        if (!age || age < 18) {
            throw new Error('You need to be at least 18 years old')
        }
        if (!email || !this.emailValidator.isValid(email)) {
            throw new Error('Invalid Email. Make sure you typed your email correctly')
        }
        if (!password || password.length < 5) {
            throw new Error('Your password needs to be at least 5 characters long')
        }

        return Object.freeze(new User(id, fullName, age, email, password, watchedList, this.passwordManager))
    }
}

export default UserFactory
