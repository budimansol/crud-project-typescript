# Crud Project API

## Features
- JWT Authentication
- Project CRUD
- Task CRUD
- Comment CRUD
- Activity Logs
- E2E Testing

## Tech Stack
- NestJS
- TypeScript
- Prisma
- PostgreSQL
- JWT
- Jest
- Supertest

## Architecture
Modular Layered Architecture

Controller

↓

Service

↓

Prisma

↓

PostgreSQL

## Run Project

npm install

npx prisma migrate dev

npm run start:dev

## Run Test

npm run test:e2e

## API Documentation

http://localhost:3000/api