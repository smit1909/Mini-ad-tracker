# Mini Ad Tracker - Backend

This is the backend API service for the Mini Ad Tracker system, built with Node.js, Express, and PostgreSQL.

## 🚀 Features
- **Clean Architecture**: Decoupled Controllers, Services, and Repositories.
- **Fast Tracking**: High-performance redirect and tracking endpoints.
- **PostgreSQL**: Robust relational data storage.
- **Docker Support**: Easy local development with `docker-compose`.

## 🛠 Prerequisites
- Node.js (v18+)
- PostgreSQL (Local Docker or Cloud)

## 📦 Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file in this directory:
   ```env
   PORT=3001
   # Local Docker
   DATABASE_URL=postgres://postgres:password@localhost:5432/adtracker
   # OR Cloud URL (Railway/Neon)
   # DATABASE_URL=postgres://user:pass@host:port/db?sslmode=require
   NODE_ENV=development
   ```

3. **Database Migration**
   Run the migration script to create tables:
   ```bash
   node src/scripts/migrate.js
   ```

## 🏃‍♂️ Usage

**Start Development Server:**
```bash
npm run dev
# or
nodemon server.js
```

**Start Production Server:**
```bash
npm start
```
*Note: `npm start` automatically runs migrations before starting.*

## 🔗 API Endpoints

- `GET /click`: Track a click and redirect.
  - Query Params: `lp` (required), `source`, `campaign_id`, `ad_id`
- `POST /conversion`: Track a conversion event.
  - Body: `{ "click_id": "...", "event": "purchase", "value": 50 }`
- `GET /report`: Get aggregated campaign stats.
  - Query Params: `source` (optional filtering)

## 🐳 Docker
A `docker-compose.yml` is included for spinning up a local Postgres instance:
```bash
docker-compose up -d
```
