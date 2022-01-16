# Lightweight Netflix

An over-engineered Typescript implementation for a Lightweight Netflix API.

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
