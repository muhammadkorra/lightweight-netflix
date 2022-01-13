import ID from './interfaces/id.interface'
import * as uuid from 'uuid'

class UUIDv4 implements ID {
    generate(): string {
        return uuid.v4()
    }
    validate(id: string): boolean {
        return uuid.validate(id)
    }
}

export default UUIDv4
