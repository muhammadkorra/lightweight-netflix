abstract class Repository<T> {
    abstract insertOne(item: T): Promise<boolean>
    abstract findById(id: string): Promise<T | null>
    abstract findAll(): Promise<T[] | []>
    abstract deleteOne(id: string): Promise<boolean>
    abstract updateOne(updated: T): Promise<boolean>
}

export default Repository
