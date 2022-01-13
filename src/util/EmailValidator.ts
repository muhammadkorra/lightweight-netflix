import EmailValidator from './interfaces/email.interface'
import * as Validator from 'email-validator'

class Email implements EmailValidator {
    isValid(email: string): boolean {
        return Validator.validate(email)
    }
}

export default Email
