import process from 'process'
import jwt from 'jsonwebtoken'
import AuthService from './interfaces/auth.interface'

class JwtService implements AuthService {
    async generateToken(data: Record<string, string>): Promise<string> {
        const password: string = 'defaultPassowrd' || process.env.JWT_SECRET
        return jwt.sign({ name: data.name }, password, {
            algorithm: 'HS512',
            audience: 'lightweight-netflix',
            expiresIn: '5m',
            issuer: 'lightweight-netflix',
            subject: data.email
        })
    }
    async validateToken(token: string): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
    async parseToken(token: string): Promise<any> {
        throw new Error('Method not implemented.')
    }
}

export default JwtService
