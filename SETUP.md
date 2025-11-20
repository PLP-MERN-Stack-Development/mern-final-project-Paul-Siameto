# Setup Instructions for Quality Furnitures

## Quick Setup Guide

### 1. MongoDB Setup

You have two options:

#### Option A: MongoDB Atlas (Cloud - Recommended for beginners)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier available)
4. Create a database user
5. Whitelist your IP address (or use 0.0.0.0/0 for development)
6. Get your connection string
7. Update `backend/.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quality-furnitures
   ```

#### Option B: Local MongoDB
1. Download and install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   ```powershell
   # Windows - Start MongoDB service
   net start MongoDB
   
   # Or if installed as a service, it should start automatically
   ```
3. Verify MongoDB is running:
   ```powershell
   mongosh
   # Should connect successfully
   ```

### 2. Backend Setup

```powershell
cd backend
npm install
```

Create `.env` file (already created for you) or update it with your MongoDB connection string.

### 3. Seed Database (Optional)

```powershell
cd backend
npm run seed
```

This creates:
- Sample products
- Admin user: `admin@qualityfurnitures.com` / `admin123`
- Test user: `test@example.com` / `test123`

### 4. Start Backend Server

```powershell
cd backend
npm run dev
```

Server will run on `http://localhost:5000`

### 5. Frontend Setup

Open a new terminal:

```powershell
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:3000`

## Troubleshooting

### Port 5000 Already in Use
If you get `EADDRINUSE: address already in use :::5000`:

1. Find the process:
   ```powershell
   netstat -ano | findstr :5000
   ```

2. Kill the process:
   ```powershell
   taskkill /PID <process_id> /F
   ```

3. Or change the port in `backend/.env`:
   ```
   PORT=5001
   ```

### MongoDB Connection Error
If you get `ECONNREFUSED`:

1. **For Local MongoDB:**
   - Make sure MongoDB service is running
   - Check if MongoDB is installed correctly
   - Try: `mongosh` to test connection

2. **For MongoDB Atlas:**
   - Verify your connection string is correct
   - Check if your IP is whitelisted
   - Make sure database user credentials are correct

### Frontend Can't Connect to Backend
- Make sure backend is running on port 5000
- Check `FRONTEND_URL` in backend `.env`
- Check `VITE_API_URL` in frontend `.env` (if using)

## Next Steps

1. ✅ MongoDB running (local or Atlas)
2. ✅ Backend server running on port 5000
3. ✅ Frontend running on port 3000
4. ✅ Database seeded (optional)
5. 🎉 Visit `http://localhost:3000` and start shopping!

