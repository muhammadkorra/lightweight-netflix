export default interface PasswordManager {
    hash(password: string): string
    validate(plainTextPassword: string, hashedPassword: string): boolean
}
