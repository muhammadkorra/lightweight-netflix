# Lightweight Netflix

An over-engineered Typescript implementation for a Lightweight Netflix API.

## Postman Documentation

https://documenter.getpostman.com/view/8362406/UVXjLc7N#intro

## Run The API

### Prerequisites

1. Docker Engine
2. Docker Compose

### Steps

1. Navigate to the root directory of the project `lightweight-netflix`
2. Run the following command

```bash
docker-compose up --build
```

3. Wait for the image to build and the API initializes

# Clean Architecture

The project features Bob Martin's clean architecture ideology, by layering all the components that make the API into separate independent
components. By eliminating the dependency on frameworks and databases, the code is _testable_, _plugabble_ and open to feature updates.

## Dependency Injection

By utilizing **dependency injection**, every component in the code can be replaced by another that performes the same function without other components noticing.
This is featured in the unit tests, where it does not require a _database connection_ to run.

Even using **Express** as a web framework can be replaced by any other framework, since the architecture is not dependent on express controllers, like other node/express combinations we see.

---

# TODO

There are some enhancements that need to be done

1. Move the user authorization logic to a middleware function rather than repeating the code in each interactor
2. Implement a more efficient updated mechanism to update only the fields provided, rather than setting the whole movie
3. Handle movie duplication logic. Maybe create a hash (movie name + movie year) and check if the hash exists in any of the movies.
