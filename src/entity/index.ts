import process from 'process'
import UUIDv4 from '../util/UUIDv4'
import EmailValidator from '../util/EmailValidator'
import PasswordManager from '../util/PasswordManager'
import UserFactory from './User'

const userFactory = new UserFactory(
    new UUIDv4(),
    new EmailValidator(),
    new PasswordManager(parseInt(process.env.SALT_ROUNDS, 10))
)

export { userFactory }
