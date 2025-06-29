# Project Name

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

API service built with NestJS framework

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the App](#running-the-app)
- [API Documentation](#api-documentation)
- [Contact](#contact)

## Features

- RESTful API architecture
- JWT Authentication
- Role-based access control
- Database integration
- Swagger documentation

## Technologies

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL/SQLite
- **ORM**: PrismaORM
- **Authentication**: JWT/Passport
- **API Documentation**: Swagger/OpenAPI

## Installation

### Prerequisites

- Node.js v20+
- npm
- PostgreSQL/SQLite

```
# Clone repository
git clone https://github.com/Regina5425/car-models-server.git
cd car-models-server

# Install dependencies
npm install

# Create .env file
.env
```

## Configuration

```
PORT=4200

# Database (dev.db in dev mode)

# JWT
JWT_SECRET=your-secret-key
JWT_ACCESS_TOKEN_TTL='30m'
JWT_REFRESH_TOKEN_TTL='30d'
```

## Running the app

```
npm run start:dev
```

## API Documentation

Swagger UI: http://localhost:4200/swagger
OpenAPI Spec: http://localhost:4200/swagger/json

## Contact

E-mail: reina5425@gmail.com
