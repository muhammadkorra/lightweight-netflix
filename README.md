# Lightweight Netflix

A Typescript implementation for a Lightweight Netflix API.

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

This project fully implements the **5 SOLID Principles** for clean code.

## SOLID Principles
1. Single Resposibility
2. Open-closed
3. Liskov Substitution
4. Interface Segregation
5. Dependency Inversion

### Single Responsibility
That is obvious in every class and every file in the project, where each class performs only one function. Only worries about the input and the output.

### Open-Closed
This principle is more obvious in the `Repository` abstract class, where other repositories can implement or extend it without breaking the rest of the components.

Example: 
This allows us to implement an _in-memory_ repository for testing the application without needing a test database! which brings us to the next principle

### Liskov Substitution
We are able to provide a different implementation of the repository to the `Interactors` without the interactors changing a single line of code. Which gives us room for expanding and testing

Example:
If we decide that the `Movie` should be a different service, then a `MovieAPIRepository` can be implemented and passed to the `Interactor` and the interactor would still function normally without changing a single line of code, But the movies are now being fetched from a remote service rather than from the database.

## Dependency Injection
By implementing the IoC (Inversion of Control) principle in the form of "Dependency Injection", every component of the application is extisible and open for changes without breaking the rest of the components.

For example:
Using **Express** as a web framework can be replaced by any other framework without any changes. Since the `Controllers` depend on an abstract `HttpRequest` Interface that allows any web framework to be plugged in without changing the controllers.

---

# TODO

There are some enhancements that need to be done

1. Move the user authorization logic to a middleware function rather than repeating the code in each interactor
2. Implement a more efficient updated mechanism to update only the fields provided, rather than setting the whole movie
3. Handle movie duplication logic. Maybe create a hash (movie name + movie year) and check if the hash exists in any of the movies.
4. Proper logging
