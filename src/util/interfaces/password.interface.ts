export default interface PasswordManager {
    hash(password: string): string
}
