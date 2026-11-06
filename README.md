# Employee Recommendation System (MERN + LLM)

A full-stack HR analytics app. Store employee profiles (department, skills, experience, performance score), then ask an LLM for promotion, training and ranking recommendations across the team.

## Features

- JWT-authenticated HR accounts
- Add, search and delete employees
- **AI recommendations** (`POST /api/ai/recommend`): the full employee roster goes to an LLM via the Groq API, which returns:
  1. Top performer
  2. Promotion recommendations
  3. Training suggestions
  4. Employee rankings
  5. Overall company insights

## API

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` · `/api/auth/login` | – | HR auth |
| POST | `/api/employees` | ✔ | Add an employee |
| GET | `/api/employees` | – | List employees |
| GET | `/api/employees/search` | ✔ | Search employees |
| DELETE | `/api/employees/:id` | ✔ | Remove an employee |
| POST | `/api/ai/recommend` | – | LLM-generated recommendations |

## Run locally

```bash
cd backend
npm install
cp .env.example .env      # MONGO_URI, JWT_SECRET, GROQ_API_KEY, PORT
node server.js

cd ../frontend
npm install
npm run dev               # set the API URL in src/config.js
```

## Stack

MongoDB · Express 5 · React 19 · Node.js · JWT · Groq API · Vite
