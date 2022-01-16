type UserDto = {
    id: string
    fullName: string
    age: number
    email: string
    password: string
    watchedList: { id: string; name: string }[]
}

export default UserDto
