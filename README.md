# Expense Tracker (Full Stack)

A full-stack Expense Tracker with authentication, expense management, and rich analytics.

## Features
- JWT authentication (register, login, profile)
- Expense CRUD with user ownership
- Filters by category, type, and date range
- Summary totals (income, expenses, balance)
- Charts (category breakdown + monthly cash flow)
- Dark/Light mode with localStorage
- Responsive glassmorphism UI

## Tech Stack
- **Frontend:** React (Vite), Tailwind CSS, Recharts, React Router
- **Backend:** Node.js, Express, Mongoose, JWT
- **Database:** MongoDB

## Getting Started

### 1) Backend Setup
1. Go to backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` in `backend/` using the example below:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   SESSION_SECRET=your_session_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
   CLIENT_URL=http://localhost:5173
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### 2) Frontend Setup
1. Go to frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` in `frontend/` (optional but recommended):
   ```env
   VITE_API_URL=http://localhost:5000
   ```
4. Start the app:
   ```bash
   npm run dev
   ```

## API Reference

### Auth Routes
- `POST /api/auth/register` – Register user
- `POST /api/auth/login` – Login user
- `GET /api/auth/me` – Get profile (protected)
- `GET /api/auth/google` – Google OAuth login

### Expense Routes (protected)
- `GET /api/expenses` – List expenses (supports `category`, `type`, `startDate`, `endDate`)
- `POST /api/expenses` – Create expense
- `PUT /api/expenses/:id` – Update expense
- `DELETE /api/expenses/:id` – Delete expense
- `GET /api/expenses/summary` – Totals and balance

## Notes
- Ensure MongoDB is running and reachable from `MONGO_URI`.
- The backend expects JWTs in the `Authorization: Bearer <token>` header.

## Google OAuth Setup
1. Create a project in Google Cloud Console and enable the **Google People API** or **OAuth consent screen**.
2. Create OAuth credentials (Web application).
3. Add authorized redirect URI:
   `http://localhost:5000/api/auth/google/callback`
4. Copy your client ID and secret into `.env`:
   ```env
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   CLIENT_URL=http://localhost:5173
   ```
