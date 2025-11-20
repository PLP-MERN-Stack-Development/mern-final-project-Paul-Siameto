# Quick Start Guide - Quality Furnitures

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

```powershell
# Backend
cd backend
npm install

# Frontend (new terminal)
cd frontend
npm install
```

### Step 2: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account and cluster
3. Create database user
4. Whitelist your IP (or use `0.0.0.0/0` for dev)
5. Get connection string

### Step 3: Configure Environment

Create `backend/.env`:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quality-furnitures?retryWrites=true&w=majority
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

**Replace `username` and `password` with your Atlas credentials!**

### Step 4: Initialize Database

```powershell
cd backend
npm run init-db
```

This creates:
- ✅ All collections (users, products, carts, orders, reviews)
- ✅ Indexes for performance
- ✅ Verifies connection

### Step 5: Seed Sample Data (Optional)

```powershell
npm run seed
```

Creates:
- 8 sample products
- Admin: `admin@qualityfurnitures.com` / `admin123`
- User: `test@example.com` / `test123`

### Step 6: Start Servers

**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

### Step 7: Open Application

Visit: **http://localhost:3000**

## 📋 Available Commands

### Backend
- `npm run dev` - Start development server
- `npm run init-db` - Initialize database collections
- `npm run check-db` - Verify database connection
- `npm run seed` - Seed sample data
- `npm test` - Run tests

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 🔍 Verify Everything Works

1. **Check Database Connection:**
   ```powershell
   cd backend
   npm run check-db
   ```

2. **Test Backend API:**
   - Visit: http://localhost:5000/api/health
   - Should return: `{"status":"OK","message":"Quality Furnitures API is running"}`

3. **Test Frontend:**
   - Visit: http://localhost:3000
   - Should see homepage

## 🐛 Troubleshooting

### MongoDB Connection Failed
- ✅ Check `.env` file has correct `MONGODB_URI`
- ✅ Verify IP is whitelisted in Atlas
- ✅ Check username/password are correct
- ✅ Run `npm run check-db` to diagnose

### Port Already in Use
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (replace PID)
taskkill /PID <process_id> /F
```

### Collections Not Created
```powershell
cd backend
npm run init-db
```

## 📚 More Information

- **MongoDB Setup**: See [MONGODB_SETUP.md](./MONGODB_SETUP.md)
- **Full Documentation**: See [README.md](./README.md)
- **Project Planning**: See [Documentation.md](./Documentation.md)

## 🎯 Next Steps

1. ✅ Database connected
2. ✅ Collections created
3. ✅ Sample data loaded
4. ✅ Backend running
5. ✅ Frontend running
6. 🎉 Start building features!

---

**Need Help?** Check the main README.md for detailed instructions.

