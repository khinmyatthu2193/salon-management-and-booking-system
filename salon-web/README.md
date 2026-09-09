# Salon Booking — Web Client

Next.js frontend for the Salon Management & Booking System.

## Tech Stack

| Layer         | Technology             |
|---------------|------------------------|
| Framework     | Next.js 16+ (App Router) |
| Language      | TypeScript             |
| React         | React 19               |
| CSS           | Tailwind CSS 4         |
| UI Components | shadcn/ui              |
| Icons         | Lucide React           |
| Package Manager | pnpm                |

## Getting Started

### Prerequisites

- **Node.js** 18+
- **pnpm** 8+
- **Server** running on `http://localhost:5000`

### Setup

```bash
pnpm install
cp .env.example .env    # Set NEXT_PUBLIC_API_URL
pnpm dev                # http://localhost:3000
```

## Scripts

| Command      | Description                  |
|--------------|------------------------------|
| `pnpm dev`   | Start dev server with hot reload |
| `pnpm build` | Production build             |
| `pnpm start` | Run production server        |
| `pnpm lint`  | Run ESLint                   |

## Environment Variables

Copy `.env.example` to `.env`:

| Variable             | Description              | Required |
|----------------------|--------------------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL    | ✅       |

## Project Structure

```
salon-web/
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── layout.tsx                 # Root layout
│   │   ├── page.tsx                   # Landing page
│   │   │
│   │   ├── (auth)/                    # Auth route group
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   │
│   │   ├── (dashboard)/               # Dashboard route group
│   │   │   ├── layout.tsx             # Dashboard layout (sidebar, nav)
│   │   │   ├── owner/
│   │   │   │   ├── page.tsx               # Owner dashboard
│   │   │   │   ├── salons/
│   │   │   │   │   ├── page.tsx           # List salons
│   │   │   │   │   ├── new/page.tsx       # Create salon
│   │   │   │   │   └── [id]/
│   │   │   │   │       ├── page.tsx       # View salon
│   │   │   │   │       └── edit/page.tsx  # Edit salon
│   │   │   │   └── managers/
│   │   │   │       └── page.tsx           # Manage managers
│   │   │   │
│   │   │   └── manager/
│   │   │       ├── page.tsx               # Manager dashboard
│   │   │       ├── services/
│   │   │       │   ├── page.tsx           # List services
│   │   │       │   ├── new/page.tsx       # Create service
│   │   │       │   └── [id]/edit/page.tsx # Edit service
│   │   │       ├── staff/
│   │   │       │   ├── page.tsx           # List staff
│   │   │       │   └── new/page.tsx       # Add staff
│   │   │       └── appointments/
│   │   │           └── page.tsx           # List appointments
│   │   │
│   │   └── booking/                   # Public booking flow
│   │       ├── page.tsx                   # Select salon
│   │       ├── [salonId]/
│   │       │   └── page.tsx               # Select service
│   │       ├── confirm/
│   │       │   └── page.tsx               # Confirm booking
│   │       └── success/
│   │           └── page.tsx               # Booking success
│   │
│   ├── features/                      # Feature modules (self-contained)
│   │   ├── salon/
│   │   │   ├── components/
│   │   │   │   ├── salon-card.tsx
│   │   │   │   ├── salon-form.tsx
│   │   │   │   └── salon-list.tsx
│   │   │   ├── api/
│   │   │   │   └── salon.ts
│   │   │   └── types/
│   │   │       └── index.ts
│   │   │
│   │   ├── service/
│   │   │   ├── components/
│   │   │   │   ├── service-card.tsx
│   │   │   │   ├── service-form.tsx
│   │   │   │   └── service-list.tsx
│   │   │   ├── api/
│   │   │   │   └── service.ts
│   │   │   └── types/
│   │   │       └── index.ts
│   │   │
│   │   ├── staff/
│   │   │   ├── components/
│   │   │   │   ├── staff-card.tsx
│   │   │   │   ├── staff-form.tsx
│   │   │   │   └── staff-list.tsx
│   │   │   ├── api/
│   │   │   │   └── staff.ts
│   │   │   └── types/
│   │   │       └── index.ts
│   │   │
│   │   ├── appointment/
│   │   │   ├── components/
│   │   │   │   ├── appointment-card.tsx
│   │   │   │   ├── appointment-list.tsx
│   │   │   │   └── appointment-status-badge.tsx
│   │   │   ├── api/
│   │   │   │   └── appointment.ts
│   │   │   └── types/
│   │   │       └── index.ts
│   │   │
│   │   ├── booking/
│   │   │   ├── components/
│   │   │   │   ├── salon-selector.tsx
│   │   │   │   ├── service-selector.tsx
│   │   │   │   ├── stylist-selector.tsx
│   │   │   │   ├── time-slot-picker.tsx
│   │   │   │   └── booking-confirm.tsx
│   │   │   ├── api/
│   │   │   │   └── booking.ts
│   │   │   └── types/
│   │   │       └── index.ts
│   │   │
│   │   └── manager/
│   │       ├── components/
│   │       │   ├── manager-card.tsx
│   │       │   └── manager-form.tsx
│   │       ├── api/
│   │       │   └── manager.ts
│   │       └── types/
│   │           └── index.ts
│   │
│   ├── components/                    # Shared UI components
│   │   ├── ui/                        # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── table.tsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── sidebar.tsx
│   │   │   ├── navbar.tsx
│   │   │   └── footer.tsx
│   │   └── shared/
│   │       ├── loading.tsx
│   │       ├── error-boundary.tsx
│   │       └── empty-state.tsx
│   │
│   ├── lib/                           # Shared utilities
│   │   ├── api.ts                     # API client (fetch wrapper)
│   │   ├── utils.ts                   # cn(), formatDate, etc.
│   │   └── constants.ts               # API URLs, config
│   │
│   └── types/                         # Global TypeScript types
│       └── index.ts
│
├── public/                            # Static assets
├── .env.example
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Architecture

### Route Groups

| Group | Purpose | URL prefix |
|-------|---------|------------|
| `(auth)` | Login, register — no sidebar | `/login`, `/register` |
| `(dashboard)` | Owner & manager panels — shared sidebar layout | `/owner/*`, `/manager/*` |
| `booking` | Public customer flow — no auth required | `/booking/*` |

### Feature Module

Each feature in `features/` is self-contained:

```
features/salon/
├── components/    # UI components specific to salons
├── api/           # API calls for salons
└── types/         # TypeScript types for salons
```

**Import from features, not across them:**

```typescript
// ✅ Good — import from feature
import { SalonCard } from "@/features/salon/components/salon-card";
import { useSalons } from "@/features/salon/api/salon";

// ❌ Bad — cross-feature import
import { SalonCard } from "@/features/appointment/components/salon-card";
```

### API Client

All API calls go through `lib/api.ts`:

```typescript
// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function api<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
```

Each feature uses it:

```typescript
// features/salon/api/salon.ts
import { api } from "@/lib/api";
import { Salon } from "../types";

export function getSalons() {
  return api<Salon[]>("/api/salons");
}

export function getSalon(id: string) {
  return api<Salon>(`/api/salons/${id}`);
}
```

## Pages

### Owner (`/owner`)

| Route                 | Description       |
|-----------------------|-------------------|
| `/owner`              | Dashboard         |
| `/owner/salons`       | List salons       |
| `/owner/salons/new`   | Create salon      |
| `/owner/salons/[id]`  | View salon        |
| `/owner/managers`     | Manage managers   |

### Manager (`/manager`)

| Route                          | Description       |
|--------------------------------|-------------------|
| `/manager`                     | Dashboard         |
| `/manager/services`            | List services     |
| `/manager/services/new`        | Create service    |
| `/manager/staff`               | List staff        |
| `/manager/staff/new`           | Add staff         |
| `/manager/appointments`        | List appointments |

### Customer Booking (`/booking`)

| Route                | Description         |
|----------------------|---------------------|
| `/booking`           | Select salon        |
| `/booking/[salonId]` | Select service      |
| `/booking/confirm`   | Confirm booking     |
| `/booking/success`   | Booking confirmed   |
