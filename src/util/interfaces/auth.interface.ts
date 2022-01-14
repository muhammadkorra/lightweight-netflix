export default interface AuthService {
    generateToken(data: Record<string, string>): Promise<string>
    validateToken(token: string): Promise<boolean>
    parseToken(token: string): Promise<any>
}
