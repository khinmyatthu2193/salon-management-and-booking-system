# Salon Booking — Server

Express.js backend API for the Salon Management & Booking System.

## Tech Stack

| Layer      | Technology    |
|------------|---------------|
| Runtime    | Node.js 18+   |
| Framework  | Express.js    |
| Language   | TypeScript    |
| Database   | PostgreSQL    |
| ORM        | Prisma        |
| Validation | Zod           |
| Auth       | JWT + bcrypt  |

## Getting Started

### Prerequisites

- **Node.js** 18+
- **pnpm** 8+
- **PostgreSQL** 14+

### Setup

```bash
pnpm install
cp .env.example .env    # Edit with your PostgreSQL credentials
pnpm prisma:generate
pnpm prisma:migrate
pnpm prisma:seed
pnpm dev                # http://localhost:5000
```

## Scripts

| Command                | Description                     |
|------------------------|---------------------------------|
| `pnpm dev`             | Start server with hot reload    |
| `pnpm build`           | Compile TypeScript              |
| `pnpm start`           | Run compiled server             |
| `pnpm type-check`      | Check for TypeScript errors     |
| `pnpm lint`            | Run ESLint                      |
| `pnpm prisma:generate` | Generate Prisma Client          |
| `pnpm prisma:migrate`  | Run dev migrations              |
| `pnpm prisma:studio`   | Open Prisma Studio (GUI)        |
| `pnpm prisma:seed`     | Seed the database               |
| `pnpm prisma:reset`    | Reset + re-seed database        |

## Environment Variables

Copy `.env.example` to `.env` and fill in:

| Variable        | Description                        | Required |
|-----------------|------------------------------------|----------|
| `DATABASE_URL`  | PostgreSQL connection string       | ✅       |
| `JWT_SECRET`    | Secret key for JWT tokens          | ✅       |
| `PORT`          | Server port (default: 5000)        | Optional |
| `NODE_ENV`      | `development` or `production`      | Optional |

## Project Structure

```
server/
├── src/
│   ├── index.ts               # Entry point — Express app setup
│   ├── routes/                # API route definitions
│   │   ├── owner.routes.ts
│   │   ├── salon.routes.ts
│   │   ├── manager.routes.ts
│   │   ├── service.routes.ts
│   │   ├── staff.routes.ts
│   │   ├── customer.routes.ts
│   │   ├── appointment.routes.ts
│   │   └── availability.routes.ts
│   ├── controllers/           # Request/response handlers
│   │   ├── owner.controller.ts
│   │   ├── salon.controller.ts
│   │   ├── manager.controller.ts
│   │   ├── service.controller.ts
│   │   ├── staff.controller.ts
│   │   ├── customer.controller.ts
│   │   ├── appointment.controller.ts
│   │   └── availability.controller.ts
│   ├── services/              # Business logic
│   │   ├── owner.service.ts
│   │   ├── salon.service.ts
│   │   ├── manager.service.ts
│   │   ├── service.service.ts
│   │   ├── staff.service.ts
│   │   ├── customer.service.ts
│   │   ├── appointment.service.ts
│   │   └── availability.service.ts
│   ├── middleware/             # Auth, validation, error handling
│   │   ├── auth.middleware.ts
│   │   ├── validate.middleware.ts
│   │   └── error.middleware.ts
│   ├── lib/
│   │   └── prisma.ts          # Prisma client singleton
│   └── types/
│       └── index.ts           # Shared TypeScript types
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed.ts                # Seed data
│   └── migrations/            # Auto-generated migrations
├── .env.example
├── tsconfig.json
└── package.json
```

## API Endpoints

### Auth

| Method | Endpoint              | Description       | Auth     |
|--------|-----------------------|-------------------|----------|
| POST   | `/api/auth/register`  | Register new user | Public   |
| POST   | `/api/auth/login`     | Login             | Public   |

### Owner

| Method | Endpoint            | Description       | Auth   |
|--------|---------------------|-------------------|--------|
| GET    | `/api/owners`       | List all owners   | Admin  |
| POST   | `/api/owners`       | Create an owner   | Admin  |
| GET    | `/api/owners/:id`   | Get owner details | Admin  |

### Salons

| Method | Endpoint              | Description        | Auth    |
|--------|-----------------------|--------------------|---------|
| GET    | `/api/salons`         | List salons        | Owner   |
| POST   | `/api/salons`         | Create salon       | Owner   |
| GET    | `/api/salons/:id`     | Get salon details  | Owner   |
| PUT    | `/api/salons/:id`     | Update salon       | Owner   |
| DELETE | `/api/salons/:id`     | Delete salon       | Owner   |

### Managers

| Method | Endpoint                    | Description          | Auth  |
|--------|-----------------------------|----------------------|-------|
| POST   | `/api/managers`             | Create manager       | Owner |
| PUT    | `/api/managers/:id/assign`  | Assign to salon      | Owner |
| GET    | `/api/managers/:id`         | Get manager details  | Owner |

### Services

| Method | Endpoint                              | Description       | Auth    |
|--------|---------------------------------------|-------------------|---------|
| GET    | `/api/salons/:salonId/services`       | List services     | Manager |
| POST   | `/api/salons/:salonId/services`       | Create service    | Manager |
| PUT    | `/api/services/:id`                   | Update service    | Manager |
| DELETE | `/api/services/:id`                   | Delete service    | Manager |

### Staff

| Method | Endpoint                            | Description     | Auth    |
|--------|-------------------------------------|-----------------|---------|
| GET    | `/api/salons/:salonId/staff`        | List staff      | Manager |
| POST   | `/api/salons/:salonId/staff`        | Add staff       | Manager |
| DELETE | `/api/staff/:id`                    | Remove staff    | Manager |

### Customers

| Method | Endpoint            | Description       | Auth    |
|--------|---------------------|-------------------|---------|
| POST   | `/api/customers`    | Register customer | Public  |
| GET    | `/api/customers/:id`| Get customer      | Private |

### Appointments

| Method | Endpoint                                      | Description           | Auth    |
|--------|-----------------------------------------------|-----------------------|---------|
| GET    | `/api/salons/:salonId/appointments`           | List salon appointments | Manager |
| POST   | `/api/appointments`                           | Book appointment      | Public  |
| PUT    | `/api/appointments/:id`                       | Update status         | Manager |
| DELETE | `/api/appointments/:id`                       | Cancel appointment    | Manager |

### Availability

| Method | Endpoint                                          | Description                  | Auth  |
|--------|---------------------------------------------------|------------------------------|-------|
| GET    | `/api/salons/:salonId/availability`               | Get available time slots     | Public|

Query params: `?date=2026-01-15&serviceId=xxx&staffId=xxx`

## Response Format

All endpoints return a consistent format:

```json
// Success
{
  "success": true,
  "data": { ... }
}

// Error
{
  "success": false,
  "error": "Error message"
}
```

## Database

Uses Prisma with PostgreSQL. Key models:

- **User** — Base user with role (OWNER, MANAGER, STAFF)
- **Owner** — Owns multiple salons
- **Salon** — Branch with manager, staff, services
- **Manager** — Assigned to one salon
- **Staff** — Stylist assigned to a salon
- **Service** — Name, price, duration per salon
- **Customer** — Books appointments
- **Appointment** — Links customer, salon, staff, service with time slot

Run `pnpm prisma:studio` to explore the database visually.
