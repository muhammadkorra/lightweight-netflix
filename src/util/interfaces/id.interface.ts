export default interface ID {
    generate(): string
    validate(id: string): boolean
}
