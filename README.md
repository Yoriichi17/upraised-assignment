#  Phoenix: IMF Gadget API Development Challenge

A secure RESTful API to manage Impossible Missions Force (IMF) gadgets, built using Node.js, Express, and PostgreSQL with JWT authentication.

##  Live Demo

- **API Base URL:** [https://upraised-backend-ppzd.onrender.com](https://upraised-backend-ppzd.onrender.com)
- **Postman Collection:** [View Collection](https://www.postman.com/maintenance-cosmologist-12845390/workspace/anirudh/collection/31320871-122bc85a-0279-4191-96cb-83de309392ce?action=share&creator=31320871)

##  Features

-  Add, update, soft-delete gadgets
-  Auto-generated gadget codenames
-  Filter gadgets by status
-  Self-destruct endpoint with confirmation code
-  JWT-based authentication with 10-day expiry
-  Timezone-aware timestamps (IST)
-  Hosted on Render with PostgreSQL DB

##  API Endpoints

###  Auth

- `POST /auth/register` – Register a user
- `POST /auth/login` – Login and receive JWT

###  Gadgets

- `GET /gadgets` – Get all gadgets with success probability
- `GET /gadgets?status=STATUS` – Filter by status
- `POST /gadgets` – Add new gadget
- `PATCH /gadgets/:id` – Update gadget
- `DELETE /gadgets/:id` – Soft delete (marks as Decommissioned)
- `POST /gadgets/:id/self-destruct` – Trigger self-destruct

##  Tech Stack

- Node.js + Express
- PostgreSQL (Render)
- Sequelize ORM
- JWT for Auth
- Moment-Timezone (IST formatting)
- bcrypt for password hashing
- Render (Deployment)
- Postman (Testing)

##  Authentication

JWT is required for protected routes. Use the following format:

```
Authorization: Bearer <your_token>
```

Token expires in **10 days** to ensure smooth review during submission.

##  Setup (Local Development)

1. **Clone the repo**:

```bash
git clone https://github.com/your-username/imf-gadget-api.git
cd imf-gadget-api
```

2. **Install dependencies**:

```bash
npm install
```

3. **Add `.env` file**:

```env
PORT=3000
DATABASE_URL=your_render_db_url
JWT_SECRET=your_secret_key
```

4. **Start the server**:

```bash
npm start
```
