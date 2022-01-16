type MovieDto = {
    id: string
    name: string
    description: string
    year: number
    cover: string
    owner: string
    rating: number
    timesRated: number
    reviews: { rating: number; review?: string }[]
    createdAt: string
    modifiedAt: string
}

export default MovieDto
