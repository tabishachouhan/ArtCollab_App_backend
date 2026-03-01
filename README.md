🎨 ArtCollab Backend API
📌 Project Overview

ArtCollab Backend is the server-side API for the Art Collaboration platform.
It handles user authentication, project management, and secure API communication between the frontend and database.

This backend is responsible for:

User Registration & Login

Protected Routes using Authentication Middleware

Project Creation & Fetching

Database Interaction

Error Handling

🔗 Live Backend Deployment:
https://artcollab-app-backend-4.onrender.com/

🛠 Tech Stack
Backend Framework

Node.js

Express.js

Database

Supabase (PostgreSQL)

Authentication

JWT (JSON Web Token)

Deployment

Render

Other Tools

dotenv

cors

nodemon

📡 API Documentation
🔐 Auth Routes

Base URL:
https://artcollab-app-backend-4.onrender.com/
➤ Register User
POST /register

Request Body:

{
  "name": "Tabisha",
  "email": "tabisha@example.com",
  "password": "123456"
}

Response:

{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "tabisha@example.com"
  }
}
➤ Login User
POST /login

Request Body:

{
  "email": "tabisha@example.com",
  "password": "123456"
}
🎨 Project Routes

Base URL:
https://artcollab-app-backend-4.onrender.com/
➤ Create Project (Protected)
POST /

Headers:

Authorization: Bearer <token>

Request Body:

{
  "title": "Art Competition",
  "description": "Digital art challenge"
}
➤ Get All Projects
GET /

Returns all available projects.

🗄 Database Schema Explanation

Using Supabase PostgreSQL database.

👤 Users Table
Column Name	Type	Description
id	uuid	Primary Key
name	text	User Name
email	text	Unique Email
password	text	Hashed Password
created_at	timestamp	Account Creation Time
🎨 Projects Table
Column Name	Type	Description
id	uuid	Primary Key
title	text	Project Title
description	text	Project Description
user_id	uuid	Foreign Key (Users Table)
created_at	timestamp	Creation Date

Relationship:

One User → Many Projects

⚙️ Installation Steps
1️⃣ Clone Repository
git clone https://github.com/tabishachouhan/ArtCollab_App_backend
cd backend-repo
2️⃣ Install Dependencies
npm install
3️⃣ Create .env File

Create a .env file in root and add:

PORT=5678
SUPABASE_URL=https://xrofniogjzzexlpwdoxu.supabase.co
SUPABASE_SECRET_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhyb2ZuaW9nanp6ZXhscHdkb3h1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjAxNTA3NSwiZXhwIjoyMDg3NTkxMDc1fQ.elQUCw8ZW79L7XioLd3n3MCXvuEqT7t0201WUDTjB2w
4️⃣ Run Server

For development:

npm run dev

For production:

npm start

Server runs on:

http://localhost:5678
🚀 Deployment Link
https://artcollab-app-backend-4.onrender.com/

Backend is deployed on:

🔗 https://artcollab-app-backend-4.onrender.com/

