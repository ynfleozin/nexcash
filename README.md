# NexCash 💸

> A full-stack expense management platform with role-based access control and end-to-end JWT security.

[![Angular](https://img.shields.io/badge/Angular-18-DD0031?style=flat-square&logo=angular)](https://angular.io/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.0-6DB33F?style=flat-square&logo=springboot)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Firebase](https://img.shields.io/badge/Firebase_Auth-Google_OAuth-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![Deploy](https://img.shields.io/badge/Deploy-Live-brightgreen?style=flat-square)](https://nexcash-phi.vercel.app/)

**[Live Demo →](https://nexcash-phi.vercel.app/)**

---

## Preview

![Login Screen](https://ibb.co/XxtMFSdy)
![Manager Menu Screen](https://ibb.co/N2tfQbng)

---

## About the Project

NexCash is a corporate expense management system where employees submit expenses and managers review and approve them. The project was built to practice and demonstrate a production-grade full-stack architecture, covering authentication, authorization, database migrations, REST API design, containerization, and CI/CD deployment.

**Two roles, one platform:**
- **User** — submits and tracks their own expenses
- **Manager** — reviews and approves/rejects all submitted expenses

---

## Architecture Overview

```
┌─────────────────────┐        JWT Token         ┌──────────────────────────┐
│                     │ ──────────────────────▶  │                          │
│   Angular 18 SPA    │                           │  Spring Boot REST API    │
│   (Vercel)          │ ◀──────────────────────── │  (Render)                │
│                     │      JSON Response        │                          │
└─────────────────────┘                           └────────────┬─────────────┘
          │                                                    │
          │  Google OAuth 2.0                                  │  JPA / Hibernate
          ▼                                                    ▼
┌─────────────────────┐                           ┌──────────────────────────┐
│   Firebase Auth     │ ──── JWKS validation ───▶ │   PostgreSQL             │
│   (Google)          │                           │   (Neon)                 │
└─────────────────────┘                           └──────────────────────────┘
```

**Authentication flow:**
1. User logs in via **Google OAuth** through Firebase Authentication
2. Firebase issues a **signed JWT token**
3. Angular's **functional HTTP Interceptor** automatically attaches the token to every outgoing request via `Authorization: Bearer <token>`
4. Spring Boot's **OAuth2 Resource Server** validates the token's cryptographic signature against Google's public JWKS endpoint — no token storage needed on the server

---

## Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Spring Boot 4.0 | Application framework |
| Spring Security + OAuth2 Resource Server | JWT validation and route protection |
| Spring Data JPA + Hibernate | ORM and database abstraction |
| Flyway | Database schema versioning and migrations |
| PostgreSQL (Neon) | Relational database (Serverless) |
| Lombok | Boilerplate reduction |
| Bean Validation (Jakarta) | Request payload validation |
| Docker (multi-stage build) | Containerization for consistent environments |
| Maven | Dependency management and build |

### Frontend
| Technology | Purpose |
|---|---|
| Angular 18 (Standalone Components) | SPA framework |
| AngularFire | Firebase SDK integration |
| Firebase Authentication | Google OAuth provider |
| RxJS + Functional Interceptor | Async JWT injection on all HTTP requests |
| Reactive Forms | Form state and validation |
| Angular Route Guards | Protecting authenticated routes |
| SCSS | Component styling |

### Infrastructure
| Service | Role |
|---|---|
| Docker | Backend containerization via multi-stage build |
| Vercel | Frontend hosting with SPA routing |
| Render | Backend REST API hosting |
| Neon | Serverless PostgreSQL hosting |
| GitHub | Source control and CI/CD trigger |

---

## Key Features

- **Google OAuth login** via Firebase Authentication — no passwords to manage
- **End-to-end JWT security** — token issued by Google, validated cryptographically by Spring, never stored server-side
- **Role-based routing** — `/user` and `/manager` routes with dedicated `canActivate` guards
- **Functional HTTP Interceptor** — JWT injected automatically into every request, zero code duplication
- **Database migrations with Flyway** — schema changes are versioned and reproducible across environments
- **Dockerized backend** — multi-stage build that compiles the JAR and packages it into a minimal Alpine JRE image, reducing the final image size significantly
- **Dynamic CORS configuration** — allowed origins controlled via environment variable, not hardcoded
- **Bean Validation** — server-side validation with structured error responses via `@RestControllerAdvice`
- **DTO pattern** — response data shaped independently from the domain entity
- **Environment-based configuration** — zero hardcoded secrets; all sensitive values injected at runtime

---

## API Endpoints

All endpoints require a valid Firebase JWT in the `Authorization: Bearer` header.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/expenses` | List all expenses |
| `POST` | `/api/expenses` | Create a new expense |
| `DELETE` | `/api/expenses/{id}` | Delete an expense by ID |
| `PATCH` | `/api/expenses/{id}/status` | Update expense status (`APPROVED` / `REJECTED`) |

**Expense payload:**
```json
{
  "description": "Uber to client meeting",
  "price": 47.50,
  "date": "2025-05-04T14:30:00",
  "status": "PENDING"
}
```

---

## Running Locally

### Prerequisites
- Docker (recommended) **or** Java 17+ and PostgreSQL installed locally
- Node.js 18+
- A Firebase project with Google Authentication enabled

### Backend with Docker

The backend includes a **multi-stage Dockerfile**: the first stage compiles the application using Maven, and the second stage copies only the final JAR into a minimal Alpine JRE image — keeping the production image lean and secure.

```bash
cd backend

docker build -t nexcash-backend .

docker run -p 8080:8080 \
  -e DB_URL=jdbc:postgresql://host.docker.internal:5432/nexcash \
  -e DB_USER=postgres \
  -e DB_PASSWORD=your_password \
  nexcash-backend
```

### Backend without Docker

```bash
cd backend

export DB_URL=jdbc:postgresql://localhost:5432/nexcash
export DB_USER=postgres
export DB_PASSWORD=your_password

./mvnw spring-boot:run
```

The API will be available at `http://localhost:8080`.

Flyway runs automatically on startup and creates the `tb_expenses` table.

### Frontend

```bash
cd frontend
npm install
ng serve
```

The app will be available at `http://localhost:4200`.

> Make sure `src/app/environments/environments.ts` points to `http://localhost:8080/api`.

---

## Environment Variables

### Backend (Render / Docker / local)

| Variable | Description |
|---|---|
| `DB_URL` | PostgreSQL JDBC connection URL |
| `DB_USER` | Database username |
| `DB_PASSWORD` | Database password |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed CORS origins |

### Frontend

Environment-specific configuration lives in `src/app/environments/`. Angular's `fileReplacements` in `angular.json` swaps `environments.ts` for `environments.prod.ts` automatically during `ng build --configuration production`.

---

## Project Structure

```
nexcash/
├── backend/
│   ├── Dockerfile                          # Multi-stage build
│   └── src/main/java/com/leonardoalvarenga/nexcash/
│       ├── config/          # SecurityConfig, CorsConfig
│       ├── controller/      # ExpenseController
│       ├── domain/          # Expense entity, ExpenseStatus enum
│       ├── dto/             # ExpenseResponseDTO, FieldErrorDTO
│       ├── exception/       # GlobalExceptionHandler
│       ├── repository/      # ExpenseRepository
│       └── service/         # ExpenseService
│
└── frontend/
    └── src/app/
        ├── core/
        │   ├── guards/      # authGuard
        │   ├── interceptors/ # authInterceptor (functional)
        │   └── services/    # ExpenseService, ToastService
        ├── features/
        │   ├── auth/        # LoginComponent
        │   └── expenses/    # ExpenseListComponent, ExpenseFormComponent
        └── environments/    # environment.ts, environment.prod.ts
```

---

## Author

**Leonardo Alvarenga**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/leoalvarengam/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat-square&logo=github)](https://github.com/ynfleozin)
