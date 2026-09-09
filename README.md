# Salon Management & Booking System

A multi-branch salon management platform that enables owners to manage salons, assign managers, set up services and staff, and allows customers to book appointments online.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Development Roadmap](#development-roadmap)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)

---

## Overview

This system is designed for salon businesses with multiple branches. It provides role-based access for **Owners**, **Managers**, and **Staff**, while giving **Customers** a simple booking flow.

### Core Workflow

```
Owner
 │
 ├── Salon A
 │    └── Manager A
 │         ├── Staff / Stylists
 │         ├── Services (name, price, duration)
 │         └── Appointments
 │
 └── Salon B
      └── Manager B
           ├── Staff / Stylists
           ├── Services
           └── Appointments

Customer
    ↓
Select Salon → Select Service → Select Stylist → Pick Date/Time → Confirm Booking
    ↓
Manager views & manages appointments
```

---

## Features

### Owner

- Create, edit, and manage multiple salons
- Assign managers to each salon
- View all salons and their details

### Manager

- Access only their assigned salon
- Manage services (CRUD) — name, price, duration
- Manage staff / stylists — add, remove, assign to salon
- View and update appointment statuses

### Customer

- Browse available salons
- Select a service and stylist
- Pick an available date and time slot
- Book an appointment with customer information

### Business Rules

- Double booking prevention
- Stylist availability checking
- Service duration-based time slot calculation
- Appointment status workflow: `PENDING → CONFIRMED → COMPLETED` or `PENDING → CANCELLED`

---

## Tech Stack

| Layer         | Technology               |
| ------------- | ------------------------ |
| Frontend      | Next.js 14+ (App Router) |
| Backend       | Express.js               |
| Language      | TypeScript               |
| Database      | PostgreSQL               |
| ORM           | Prisma                   |
| Validation    | Zod                      |
| Auth          | JWT + bcrypt             |
| CSS           | Tailwind CSS             |
| UI Components | shadcn/ui                |

---

## Architecture

```
┌──────────────────────────────────────┐
│            Client (Next.js)          │
│    React + Tailwind + shadcn/ui      │
│         Port: 3000                   │
└──────────────┬───────────────────────┘
               │ HTTP / fetch
               ▼
┌──────────────────────────────────────┐
│          Server (Express.js)         │
│   Routes → Controllers → Services    │
│   Middleware: Auth, Validation (Zod) │
│         Port: 5000                   │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│              Prisma ORM              │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│           PostgreSQL DB              │
└──────────────────────────────────────┘
```

### Monorepo Structure

```
salon-management-and-booking-system/
├── client/          # Next.js frontend
└── server/          # Express.js backend + Prisma
```

### Role Hierarchy

```
Owner
  └── manages multiple Salons
        └── each Salon has one Manager
              ├── has many Staff / Stylists
              ├── offers many Services
              └── has many Appointments
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ and npm/yarn/pnpm
- **PostgreSQL** 14+ running locally or via Docker
- **Git**

### 1. Clone the repository

```bash
git clone https://github.com/your-username/salon-management-and-booking-system.git
cd salon-management-and-booking-system
```

### 2. Set up the server (Express.js + Prisma)

```bash
cd server
cp .env.example .env    # Edit with your PostgreSQL credentials
npm install
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
npm run dev             # Starts on http://localhost:5000
```

### 3. Set up the client (Next.js)

Open a new terminal:

```bash
cd client
cp .env.example .env    # Set NEXT_PUBLIC_API_URL=http://localhost:5000
npm install
npm run dev             # Starts on http://localhost:3000
```

### 4. Open in browser

- **Client:** [http://localhost:3000](http://localhost:3000)
- **Server API:** [http://localhost:5000/api](http://localhost:5000/api)

---

## Development Roadmap

### ✅ Week 1 — MVP Foundation

| Day | Task                                                               | Status |
| --- | ------------------------------------------------------------------ | ------ |
| 1   | Project setup, PostgreSQL, Prisma, schema, migrations, seed data   | 🔲     |
| 2   | Owner login, dashboard, salon CRUD                                 | 🔲     |
| 3   | Manager creation, assignment to salon, manager dashboard           | 🔲     |
| 4   | Service CRUD, staff management, salon-level management             | 🔲     |
| 5   | Customer booking flow — salon → service → stylist → time → confirm | 🔲     |
| 6   | Availability logic, double booking prevention, appointment status  | 🔲     |
| 7   | Integration, end-to-end testing, error handling                    | 🔲     |

### 🔮 Future Enhancements (Not in MVP scope)

- [ ] Authentication & authorization (JWT)
- [ ] Role-based access control middleware
- [ ] Payment integration (Stripe, etc.)
- [ ] Email & SMS notifications
- [ ] Salon working hours & holiday management
- [ ] Staff schedule management
- [ ] Advanced availability (recurring schedules)
- [ ] Customer accounts & booking history
- [ ] Reviews & ratings
- [ ] Analytics & reporting dashboard
- [ ] Multi-language support
- [ ] Mobile responsive optimization
- [ ] Admin panel for super admin
- [ ] API documentation (Swagger / OpenAPI)
- [ ] Unit & integration tests

---

## Environment Variables

### Server (`server/.env`)

| Variable       | Description                  | Required |
| -------------- | ---------------------------- | -------- |
| `DATABASE_URL` | PostgreSQL connection string | ✅       |
| `JWT_SECRET`   | Secret key for JWT tokens    | ✅       |
| `PORT`         | Server port (default: 5000)  | Optional |
| `NODE_ENV`     | development / production     | Optional |

### Client (`client/.env`)

| Variable              | Description          | Required |
| --------------------- | -------------------- | -------- |
| `NEXT_PUBLIC_API_URL` | Backend API base URL | ✅       |

---

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.
