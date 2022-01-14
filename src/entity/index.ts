import process from 'process'
import UUIDv4 from '../util/UUIDv4'
import EmailValidator from '../util/EmailValidator'
import PasswordManager from '../util/PasswordManager'
import UserFactory from './User'

const saltRounds: number = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS, 10) : 10
const userFactory = new UserFactory(new UUIDv4(), new EmailValidator(), new PasswordManager(saltRounds))

export { userFactory }
