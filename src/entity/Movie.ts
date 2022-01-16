import ID from '../util/interfaces/id.interface'

export class Movie {
    constructor(
        private id: string,
        private name: string,
        private description: string,
        private year: number,
        private cover: string,
        private owner: string,
        private rating: number,
        private timesRated: number,
        private reviews: { rating: number; review?: string }[],
        private createdAt: string,
        private modifiedAt: string
    ) {}

    public getId(): string {
        return this.id
    }

    public getName(): string {
        return this.name
    }

    public getDescription(): string {
        return this.description
    }

    public getYear(): number {
        return this.year
    }

    public getCover(): string {
        return this.cover
    }

    public getOwner(): string {
        return this.owner
    }

    public getRating(): number {
        return this.rating
    }

    public getTimesRated(): number {
        return this.timesRated
    }

    public getReviews(): { rating: number; review?: string }[] {
        return this.reviews
    }

    public updatedRating(magnitude: number): void {
        this.rating = Number(Number((this.rating * this.timesRated + magnitude) / (this.timesRated + 1)).toFixed(2))
        this.timesRated += 1
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    public getModifiedAt(): string {
        return this.modifiedAt
    }
}

class MovieFactory {
    constructor(private ID: ID) {}
    public makeMovie({
        id = this.ID.generate(),
        name,
        description = '',
        year,
        cover = 'https://betravingknows.com/wp-content/uploads/2017/06/video-movie-placeholder-image-grey.png',
        owner,
        rating = 0,
        timesRated = 0,
        reviews = [],
        createdAt = new Date().toUTCString(),
        modifiedAt = new Date().toUTCString()
    }: {
        id?: string
        name?: string
        description?: string
        year?: number
        cover?: string
        owner?: string
        rating?: number
        timesRated?: number
        reviews?: { rating: number; review?: string }[]
        createdAt?: string
        modifiedAt?: string
    }): Readonly<Movie> {
        if (!this.ID.validate(id)) {
            throw new Error('Invalid movie ID')
        }
        if (!name || name.length < 3) {
            throw new Error('Movie name needs to be at least 3 characters long')
        }
        if (!description || description.length === 0) {
            throw new Error('Provide a movie description')
        }
        if (!year) {
            throw new Error('Provide the year the movie was released in')
        }
        if (year < 1895) {
            throw new Error('I doubt there was any movies back then')
        }
        if (!owner || owner.length === 0) {
            throw new Error('Movie needs an owner')
        }

        return new Movie(id, name, description, year, cover, owner, rating, timesRated, reviews, createdAt, modifiedAt)
    }
}

export default MovieFactory
