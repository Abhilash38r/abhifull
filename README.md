# Lost & Found Item Management System (MERN Stack)

## Description
A full-stack web application developed as part of MSE-2 Examination requirements. It allows users to register, log in, and manage lost and found items.

## Prerequisites
- Node.js installed
- MongoDB installed and running locally on port `27017`

## Running the Application Locally

1. **Start the Backend Server**
   - Open a terminal and navigate to the `backend` directory.
   - Run `npm install` (if not done).
   - Run `node server.js`
   - The backend runs on `http://localhost:5000`

2. **Start the Frontend Application**
   - Open another terminal and navigate to the `frontend` directory.
   - Run `npm install` (if not done).
   - Run `npm run dev`
   - The frontend runs on `http://localhost:5173`

## Features Implemented
- Registration and Secure Login (JWT, bcrypt)
- Report Lost and Found Items
- Dashboard with Private Routing
- Update or Delete personal items
- Search items by name

## Deployment Instructions

### GitHub
1. Initialize a git repository in this folder: `git init`
2. Add all files: `git add .`
3. Commit the code: `git commit -m "Initial commit"`
4. Push to your GitHub repository.

### Render Deployment
**Backend Deployment:**
1. Create a new Web Service on Render.
2. Select your GitHub repository.
3. Set the Root Directory to `backend`.
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Add Environment Variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string (important: local DB won't work on Render).
   - `JWT_SECRET`: Any secret string.
   - `PORT`: 5000

**Frontend Deployment:**
1. Create a new Static Site on Render.
2. Select your GitHub repository.
3. Set the Root Directory to `frontend`.
4. Build Command: `npm run build`
5. Publish Directory: `dist`
6. Ensure you update `baseURL` in `src/api/axios.js` to point to the deployed Render backend URL.

## PDF Documentation Preparation
To create your MSE-2 PDF report, follow these steps:
1. Paste screenshots of your code (Backend routes, React components).
2. Use Thunder Client or Postman to test `/api/register`, `/api/login`, `/api/items` (POST, GET, PUT, DELETE) and screenshot the results.
3. Take screenshots of your MongoDB items via MongoDB Compass showing the stored data.
4. After deploying to Render, take a screenshot of the successful deployment page and include the live testing URLs.
