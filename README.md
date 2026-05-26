# CoffeeShop Backend

[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933.svg?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4-000000.svg?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248.svg?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Redis](https://img.shields.io/badge/Redis-DC382D.svg?logo=redis&logoColor=white)](https://redis.io/)
[![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600.svg?logo=rabbitmq&logoColor=white)](https://www.rabbitmq.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> A production-ready backend for a coffee shop ordering system — handles products, baskets, orders and authentication. Built with Node.js, TypeScript and Express on top of MongoDB, Redis and RabbitMQ.

---

## Overview

CoffeeShop Backend is a REST API that powers a coffee shop's ordering platform. It manages products, customer baskets and orders, with order processing handed off to RabbitMQ workers. Sessions live in Redis, data in MongoDB, errors flow to Sentry, and the whole stack runs in Docker.

The codebase follows **Clean Architecture** with strict separation between `interfaces → application → domain → infrastructure`.

## Features

- **Product catalog** with CRUD endpoints
- **Basket management** per authenticated user
- **Queue-based order processing** powered by RabbitMQ
- **Authentication & sessions** with JWT and Redis-backed `express-session`
- **Password hashing** with bcrypt
- **Transactional emails** via Nodemailer
- **Error tracking & profiling** with Sentry
- **Type-safe environment loading** with envalid
- **HTTP request logging** with morgan
- **Containerized stack** — API, MongoDB, Redis, RabbitMQ via Docker Compose
- **Postman collection** included for quick API exploration

## Tech Stack

| Layer            | Technology                                                                 |
|------------------|----------------------------------------------------------------------------|
| Language         | Node.js + TypeScript 5                                                     |
| Framework        | Express 4                                                                  |
| Database         | MongoDB + Mongoose                                                         |
| Cache / Sessions | Redis (ioredis, connect-redis)                                             |
| Message Queue    | RabbitMQ (amqplib)                                                         |
| Auth             | JWT, express-session, bcrypt                                               |
| Email            | Nodemailer                                                                 |
| Monitoring       | Sentry (node + profiling)                                                  |
| Config           | envalid, dotenv                                                            |
| Logging          | morgan                                                                     |
| Containerization | Docker & Docker Compose                                                    |

## Architecture

This project follows the Clean Architecture pattern — outer layers depend on inner ones, never the reverse.

### Layout

- **`interfaces/`** — HTTP layer: controllers, routes and middlewares
- **`application/`** — use-cases and application services orchestrating business logic
- **`domain/`** — entities and Mongoose models
- **`infrastructure/`** — concrete implementations: MongoDB, Redis, RabbitMQ, repositories, third-party clients
- **`shared/`** — cross-cutting helpers (env loading, utilities)

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) & Docker Compose
- Node.js 20+ (only if running outside Docker)
- A Sentry DSN (optional, can be left blank in development)

### 1. Clone the repository

```bash
git clone https://github.com/kwa0x2/CoffeeShop-Backend.git
cd CoffeeShop-Backend
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
# Server
PORT=3000

# MongoDB
MONGO_URI=mongodb://mongo:27017
MONGO_DB_NAME=coffeeshop

# Redis (sessions & cache)
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password

# RabbitMQ (order queue)
RABBITMQ_URI=amqp://guest:guest@rabbitmq:5672

# Auth
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
COOKIE_NAME=sid

# Email (Nodemailer)
EMAIL=you@example.com
EMAIL_PASSWORD=your_email_app_password

# Observability
SENTRY_DSN=
```

> Variables are validated at startup by [`envalid`](https://github.com/af/envalid) — see `src/shared/utils/env.ts` for the full schema.

### 3. Start the stack

```bash
docker compose up -d --build
```

The API will be available at **http://localhost:3000**.

### 4. Run locally without Docker

```bash
npm install
npm start
```

## API Reference

All endpoints are prefixed with `/api`. Route groups:

| Group         | Purpose                                  |
|---------------|------------------------------------------|
| `/auth`       | Sign-up, login, logout, sessions         |
| `/products`   | Product catalog (CRUD)                   |
| `/basket`     | Per-user basket management & checkout    |

A Postman collection is included — [`Coffee Shop API.postman_collection.json`](./Coffee%20Shop%20API.postman_collection.json) — covering every endpoint with example requests and responses.

## Project Structure

```
CoffeeShop-Backend/
├── src/
│   ├── application/     # Use-cases & application services
│   │   ├── services/
│   │   └── use-cases/
│   ├── domain/          # Entities & Mongoose models
│   │   ├── entities/
│   │   └── models/
│   ├── infrastructure/  # External integrations
│   │   ├── database/    # MongoDB connection
│   │   ├── rabbitmq/    # Queue producers & consumers
│   │   ├── redis/       # Redis client & session store
│   │   ├── repositories/
│   │   └── third-party/
│   ├── interfaces/      # HTTP layer
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   └── routes/
│   ├── shared/          # Env loading & utilities
│   └── server.ts        # Application entry point
├── compose.yaml         # Docker Compose stack
├── Dockerfile           # API image
└── Coffee Shop API.postman_collection.json
```

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.
