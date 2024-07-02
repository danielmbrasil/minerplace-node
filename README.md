# Backend Evaluation 2024-02 - MinerPlace - Recognition

**MinerPlace** is a **store** for home supplies, where customers can select amoung the available products and receive them in the comfort of their homes.

## Given Scenario

This app is the heart of our product. It offers a set of endpoins that will be accessed from our store front.

Currently, we allow requests to retrieve products, categories and carts. The carts are persisted in the back-end, so all interactions from customers will be handled on this end.

Products can be agregated through Categories. Products are also directly associated to LineItems, which are used to compose a Cart.

Further details on the available endpoints and the current entities can be found down below.

## Requirements

- Node 20.11.x
- Npm 10.2.x
- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)

## Important Dependencies

- [Fastify](https://fastify.dev/)
- [Objection](https://vincit.github.io/objection.js/)

## Setting up

In the root directory:
- `docker compose up --build` - Run the database and all services needed

In the `./minerplace/` directory:
- `npm install` - Install all dependencies
- `npm run db:create:dev` - Create the database
- `npm run db:create:test` - Create the test database
- `npm run db:migrate:dev` - Migrate the database
- `npm run db:migrate:test` - Migrate the test database
- `npm run db:seed:dev` - Seed the database

## Running

For simplicity during development the database is configured to run in a Docker container. The application is not, and should be executed in the host computer.

In the root directory:

- `docker compose up` - Run the database

In the `./minerplace/` directory:

- `npm run dev:js` - Run the application
- `npm run test` - Run the tests

## Entities

```mermaid
erDiagram

Categories {
    integer id PK
    string name
}

Products {
    integer id PK
    string name
    string description
    string sku
    decimal price
    string currency
    integer inventory
    integer reserved
    integer sold
    integer categoryId FK
}

Carts {
    uuid id PK
    decimal totalPrice
    string customerEmail
}

LineItems {
    integer id PK
    decimal unitPrice
    decimal totalPrice
    integer quantity
    uuid cartId FK
    integer productId FK
}

DiscountCodes {
    integer id PK
    string code UK
    decimal amount
    string discountType
    datetime expiresAt
    integer usageLimit
    integer timesUsed
}

Categories ||--o{ Products : ""
Carts ||--o{ LineItems : ""
Products ||--o{ LineItems: ""

```

> [!WARNING]
> !!! Some fields and entities pertaining to standard Objection operations are elided in the diagram above. !!!

> [!WARNING]
> !!! Evaluation note: The Payments API is only a part of the app's infrastructure and should neither be modified nor taken as part of the project critics. You don't need to worry about understanding it. !!!

## API

API documentation for the existing endpoints can be found in the `API.md` file.

## Critics to the original code

In addition to a Merge Request for each task, it's expected from you to write a document criticizing the original code provided, where you can mention things that you would change or refactor if it was a real client project. Use the setup and code exploration phase to pay attention to informations that you would add to this document.

The document should be provided in a file called critics.md in the Merge Request.

## Gitlab Instructions

- Create a new **private and empty** repository (leave "Initialize repository with a README" **unchecked**, like image below) in your own Gitlab account and give access to it to your reviewer:

![create the repo](https://user-images.githubusercontent.com/4325587/173120718-16547fae-b507-496d-939b-7cf9a7950640.jpg)

- Clone **your** repository locally
- Inside the folder, run: `git pull https://gitlab.com/codeminer-42/avaliacoes/minerplace-rails main && git push origin main`.
