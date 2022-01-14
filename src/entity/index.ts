import process from 'process'
import UUIDv4 from '../util/UUIDv4'
import EmailService from '../util/EmailService'
import PasswordManager from '../util/PasswordManager'
import UserFactory from './User'

const saltRounds: number = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS, 10) : 10
const userFactory = new UserFactory(new UUIDv4(), new EmailService(), new PasswordManager(saltRounds))

export { userFactory }
