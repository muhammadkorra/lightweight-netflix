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
        const password: string = 'defaultPassowrd' || process.env.JWT_SECRET
        try {
            jwt.verify(token, password, {
                algorithms: ['HS512'],
                audience: 'lightweight-netflix',
                issuer: 'lightweight-netflix'
            })

            return true
        } catch (error: any) {
            return false
        }
    }
    async parseToken(token: string): Promise<string> {
        const validToken = jwt.decode(token, {
            json: true,
            complete: true
        })

        return validToken!.payload!.sub!
    }
}

export default JwtService
