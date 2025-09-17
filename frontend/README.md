# Store Rating App (Demo)
This archive contains a minimal full-stack application (backend in Node.js + SQLite, frontend in React).

## How to run

### Backend
1. cd backend
2. npm install
3. npm run migrate   # creates database and sample data
4. npm start

Server runs at http://localhost:4000

### Frontend
1. cd frontend
2. npm install
3. npm start

App runs at http://localhost:3000

Notes:
- JWT secret is in code for demo; change in production.
- Password rules and name validations enforced on backend as requested.
