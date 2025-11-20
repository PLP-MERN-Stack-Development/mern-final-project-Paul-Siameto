# Quality Furnitures - E-commerce Platform

A full-stack MERN (MongoDB, Express.js, React, Node.js) e-commerce application for selling premium furniture online.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Product Catalog**: Browse products with search, filtering, and pagination
- **Shopping Cart**: Add, update, and remove items from cart
- **Checkout Process**: Secure checkout with order management
- **Order Tracking**: View order history and track order status
- **Product Reviews**: Users can rate and review products
- **Real-time Updates**: Socket.io integration for real-time order status updates
- **Admin Dashboard**: Admin users can manage products and orders
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Technology Stack

### Frontend
- React 18
- React Router v6
- Axios
- Socket.io Client
- React Hook Form
- React Toastify
- Vite

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Socket.io
- bcryptjs
- Express Validator

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## 🔧 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd mern-final-project-Paul-Siameto
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quality-furnitures
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quality-furnitures?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

**📚 For detailed MongoDB Atlas setup, see [MONGODB_SETUP.md](./MONGODB_SETUP.md)**

### 2.1. Initialize Database

After setting up your MongoDB connection, initialize the database:

```bash
cd backend
npm run init-db
```

This creates all required collections and indexes.

### 2.2. Verify Database Connection

Test your database connection:

```bash
cd backend
npm run check-db
```

### 3. Seed Sample Data (Optional)

Populate your database with sample products and users:

```bash
cd backend
npm run seed
```

This creates:
- 8 sample furniture products
- Admin user: `admin@qualityfurnitures.com` / `admin123`
- Test user: `test@example.com` / `test123`

### 4. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory (optional):

```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Running the Application

### Development Mode

1. **Set up MongoDB**:
   - **Local**: Start MongoDB service
   - **Atlas**: Follow [MONGODB_SETUP.md](./MONGODB_SETUP.md) guide

2. **Initialize Database** (first time only):
   ```bash
   cd backend
   npm run init-db
   ```

3. **Seed Sample Data** (optional):
   ```bash
   cd backend
   npm run seed
   ```
   This creates sample products and test users:
   - Admin: `admin@qualityfurnitures.com` / `admin123`
   - User: `test@example.com` / `test123`

4. **Start the Backend Server**:
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

4. **Start the Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`

### Production Build

1. **Build the Frontend**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Start the Backend**:
   ```bash
   cd backend
   npm start
   ```

## 📁 Project Structure

```
mern-final-project-Paul-Siameto/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   └── reviewController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   ├── Review.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   └── reviewRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProductListPage.jsx
│   │   │   ├── ProductDetailPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── OrderHistoryPage.jsx
│   │   │   ├── OrderDetailPage.jsx
│   │   │   └── ProfilePage.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── Documentation.md
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/profile` - Update user profile (Protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured` - Get featured products
- `GET /api/products/categories` - Get all categories
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Cart
- `GET /api/cart` - Get user's cart (Protected)
- `POST /api/cart` - Add item to cart (Protected)
- `PUT /api/cart/:itemId` - Update cart item quantity (Protected)
- `DELETE /api/cart/:itemId` - Remove item from cart (Protected)
- `DELETE /api/cart` - Clear cart (Protected)

### Orders
- `GET /api/orders` - Get user's orders (Protected)
- `GET /api/orders/:id` - Get single order (Protected)
- `POST /api/orders` - Create new order (Protected)
- `PUT /api/orders/:id/pay` - Update order payment status (Protected)
- `PUT /api/orders/:id/deliver` - Update order delivery status (Admin only)
- `GET /api/orders/admin/all` - Get all orders (Admin only)

### Reviews
- `GET /api/reviews/products/:id/reviews` - Get product reviews
- `POST /api/reviews/products/:id/reviews` - Create review (Protected)
- `PUT /api/reviews/:id` - Update review (Protected)
- `DELETE /api/reviews/:id` - Delete review (Protected)

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📝 Environment Variables

### Backend (.env)
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRE` - JWT expiration time
- `FRONTEND_URL` - Frontend URL for CORS

### Frontend (.env)
- `VITE_API_URL` - Backend API URL (optional, defaults to proxy)

## 🚢 Deployment

### Backend Deployment (Render/Railway/Heroku)

1. Set environment variables in your hosting platform
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`

### Frontend Deployment (Vercel/Netlify)

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable: `VITE_API_URL` with your backend URL

### MongoDB Atlas Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in backend `.env`

## 👤 Default Admin Account

To create an admin account, you can either:
1. Manually update the user role in MongoDB:
   ```javascript
   db.users.updateOne(
     { email: "admin@example.com" },
     { $set: { role: "admin" } }
   )
   ```
2. Or register a user and update it programmatically

## 📚 Documentation

For detailed documentation, see [Documentation.md](./Documentation.md)

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running (if local)
- Check MongoDB Atlas connection string
- Verify network access in MongoDB Atlas

### CORS Errors
- Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL
- Check CORS configuration in `server.js`

### Authentication Issues
- Verify JWT_SECRET is set
- Check token expiration settings
- Ensure Authorization header is being sent

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Paul Siameto

## 🙏 Acknowledgments

- MERN Stack community
- All open-source contributors

---

**Note**: This is a capstone project for a full-stack development course. It demonstrates proficiency in MERN stack development, including database design, RESTful API development, real-time features, testing, and deployment.
