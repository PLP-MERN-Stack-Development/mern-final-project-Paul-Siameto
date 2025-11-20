# MongoDB Atlas Setup Guide for Quality Furnitures

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Verify your email

## Step 2: Create a Cluster

1. After logging in, click **"Build a Database"**
2. Choose **FREE (M0) Shared Cluster**
3. Select a cloud provider and region (choose closest to you)
4. Click **"Create"**
5. Wait for cluster to deploy (2-3 minutes)

## Step 3: Create Database User

1. Go to **Database Access** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Create username and password (save these!)
5. Set user privileges to **"Atlas admin"** or **"Read and write to any database"**
6. Click **"Add User"**

## Step 4: Whitelist Your IP Address

1. Go to **Network Access** (left sidebar)
2. Click **"Add IP Address"**
3. For development, click **"Add Current IP Address"**
   - Or use `0.0.0.0/0` to allow from anywhere (⚠️ only for development)
4. Click **"Confirm"**

## Step 5: Get Connection String

1. Go to **Database** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Select **"Node.js"** and version **"5.5 or later"**
5. Copy the connection string
   - It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

## Step 6: Update Connection String

1. Replace `<username>` with your database username
2. Replace `<password>` with your database password
3. Add database name at the end: `...mongodb.net/quality-furnitures?retryWrites=true&w=majority`

**Final connection string should look like:**
```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/quality-furnitures?retryWrites=true&w=majority
```

## Step 7: Update .env File

Create or update `backend/.env`:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/quality-furnitures?retryWrites=true&w=majority
JWT_SECRET=quality_furnitures_jwt_secret_key_2024_change_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

**⚠️ Important:** Replace `your-username` and `your-password` with your actual credentials!

## Step 8: Initialize Database

Run the initialization script to create collections and indexes:

```powershell
cd backend
npm run init-db
```

This will:
- ✅ Connect to your MongoDB Atlas database
- ✅ Create all required collections (users, products, carts, orders, reviews)
- ✅ Create indexes for better performance
- ✅ Verify the connection

## Step 9: Verify Connection

Test your connection:

```powershell
cd backend
npm run check-db
```

This will show:
- Connection status
- Database name
- All collections and document counts

## Step 10: Seed Sample Data (Optional)

Populate your database with sample products and users:

```powershell
cd backend
npm run seed
```

This creates:
- 8 sample furniture products
- Admin user: `admin@qualityfurnitures.com` / `admin123`
- Test user: `test@example.com` / `test123`

## Collections Created

The following collections will be automatically created:

1. **users** - User accounts and authentication
2. **products** - Furniture products catalog
3. **carts** - Shopping carts for users
4. **orders** - Customer orders
5. **reviews** - Product reviews and ratings

## Troubleshooting

### Connection Timeout
- Check if your IP is whitelisted in Network Access
- Verify connection string is correct
- Check if cluster is running (not paused)

### Authentication Failed
- Verify username and password in connection string
- Check if user has proper permissions
- Ensure password doesn't contain special characters (or URL encode them)

### Database Not Found
- Database will be created automatically on first connection
- Make sure database name is in connection string: `/quality-furnitures`

### Collections Not Created
- Run `npm run init-db` to create collections
- Collections will also be created automatically when first document is saved

## Security Best Practices

1. **Never commit .env file** - It's already in .gitignore
2. **Use environment variables** in production
3. **Restrict IP access** - Don't use `0.0.0.0/0` in production
4. **Use strong passwords** for database users
5. **Rotate credentials** regularly
6. **Enable MongoDB Atlas monitoring** and alerts

## Next Steps

Once your database is set up:

1. ✅ Start backend server: `npm run dev`
2. ✅ Start frontend: `cd ../frontend && npm run dev`
3. ✅ Visit `http://localhost:3000`
4. ✅ Login with test account or create new account
5. ✅ Start shopping!

---

**Need Help?** Check the main README.md or SETUP.md for more information.

