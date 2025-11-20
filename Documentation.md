# Quality Furnitures - E-commerce Platform Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Problem Statement](#problem-statement)
3. [Wireframes and Mockups](#wireframes-and-mockups)
4. [Database Schema](#database-schema)
5. [API Endpoints](#api-endpoints)
6. [Technical Architecture](#technical-architecture)
7. [Project Roadmap](#project-roadmap)
8. [Technology Stack](#technology-stack)

---

## 🎯 Project Overview

**Quality Furnitures** is a full-stack e-commerce platform designed to provide customers with a seamless shopping experience for high-quality furniture. The platform features a comprehensive product catalog, shopping cart functionality, secure checkout process, and real-time order tracking.

### Key Features
- User authentication and authorization
- Product catalog with search and filtering
- Shopping cart management
- Secure checkout process
- Order management and tracking
- Real-time order status updates
- Admin dashboard for product management
- Responsive design for all devices

---

## 🔍 Problem Statement

### Real-World Problem
Traditional furniture shopping often involves:
- Limited product visibility and information
- Inconvenient in-store visits
- Lack of real-time inventory updates
- Difficult price comparison
- No order tracking capabilities

### Solution
Quality Furnitures addresses these issues by providing:
- Comprehensive online catalog with detailed product information
- 24/7 accessibility from any device
- Real-time inventory and order status updates
- Easy price comparison and filtering
- Complete order tracking from purchase to delivery

---

## 🎨 Wireframes and Mockups

### Page Structure

#### 1. Home Page
```
┌─────────────────────────────────────────┐
│  Header (Logo, Nav, Cart Icon, Login)  │
├─────────────────────────────────────────┤
│         Hero Section (Banner)           │
├─────────────────────────────────────────┤
│      Featured Products Grid (3x3)       │
├─────────────────────────────────────────┤
│         Categories Section              │
├─────────────────────────────────────────┤
│              Footer                      │
└─────────────────────────────────────────┘
```

#### 2. Product Catalog Page
```
┌─────────────────────────────────────────┐
│  Header                                  │
├──────────┬──────────────────────────────┤
│ Filters  │  Product Grid (4 columns)    │
│ - Price  │  [Product Card] [Product]    │
│ - Category│  [Product Card] [Product]   │
│ - Rating │  [Product Card] [Product]    │
│ - Search │  [Product Card] [Product]    │
│          │  Pagination                  │
└──────────┴──────────────────────────────┘
```

#### 3. Product Detail Page
```
┌─────────────────────────────────────────┐
│  Header                                  │
├─────────────────────────────────────────┤
│  [Image Gallery]  Product Info          │
│                 - Title                 │
│                 - Price                 │
│                 - Description           │
│                 - Quantity Selector     │
│                 - Add to Cart Button    │
├─────────────────────────────────────────┤
│  Reviews Section                        │
└─────────────────────────────────────────┘
```

#### 4. Shopping Cart Page
```
┌─────────────────────────────────────────┐
│  Header                                  │
├─────────────────────────────────────────┤
│  Cart Items                             │
│  ┌──────────────────────────────────┐   │
│  │ [Image] Product Name             │   │
│  │          Price  Qty  Remove      │   │
│  └──────────────────────────────────┘   │
│  ┌──────────────────────────────────┐   │
│  │ [Image] Product Name             │   │
│  │          Price  Qty  Remove      │   │
│  └──────────────────────────────────┘   │
│                                          │
│  Order Summary                          │
│  Subtotal: $XXX                         │
│  Shipping: $XX                          │
│  Total: $XXX                            │
│  [Proceed to Checkout]                  │
└─────────────────────────────────────────┘
```

#### 5. Checkout Page
```
┌─────────────────────────────────────────┐
│  Header                                  │
├─────────────────────────────────────────┤
│  Shipping Information                   │
│  [Form Fields]                          │
│                                          │
│  Payment Information                    │
│  [Form Fields]                          │
│                                          │
│  Order Review                           │
│  [Cart Items Summary]                   │
│  Total: $XXX                            │
│  [Place Order Button]                   │
└─────────────────────────────────────────┘
```

---

## 🗄️ Database Schema

### Collections and Relationships

#### 1. Users Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  phone: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### 2. Products Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String (required),
  price: Number (required, min: 0),
  category: String (required, enum: ['sofa', 'chair', 'table', 'bed', 'cabinet', 'desk']),
  image: String (required, URL),
  images: [String], // Array of image URLs
  stock: Number (required, min: 0),
  rating: Number (min: 0, max: 5, default: 0),
  numReviews: Number (default: 0),
  featured: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

#### 3. Cart Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User', required),
  items: [{
    product: ObjectId (ref: 'Product', required),
    quantity: Number (required, min: 1),
    price: Number (required) // Snapshot of price at time of adding
  }],
  totalPrice: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

#### 4. Orders Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User', required),
  orderItems: [{
    product: ObjectId (ref: 'Product', required),
    name: String,
    quantity: Number (required),
    price: Number (required),
    image: String
  }],
  shippingAddress: {
    street: String (required),
    city: String (required),
    state: String (required),
    zipCode: String (required),
    country: String (required)
  },
  paymentMethod: String (required, enum: ['card', 'paypal', 'cash']),
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String
  },
  itemsPrice: Number (required),
  shippingPrice: Number (required, default: 0),
  taxPrice: Number (required, default: 0),
  totalPrice: Number (required),
  isPaid: Boolean (default: false),
  paidAt: Date,
  isDelivered: Boolean (default: false),
  deliveredAt: Date,
  status: String (enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending'),
  createdAt: Date,
  updatedAt: Date
}
```

#### 5. Reviews Collection
```javascript
{
  _id: ObjectId,
  product: ObjectId (ref: 'Product', required),
  user: ObjectId (ref: 'User', required),
  rating: Number (required, min: 1, max: 5),
  comment: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Relationships
- **User → Cart**: One-to-One (each user has one cart)
- **User → Orders**: One-to-Many (each user can have multiple orders)
- **Product → Reviews**: One-to-Many (each product can have multiple reviews)
- **Order → Products**: Many-to-Many (through orderItems array)

---

## 🔌 API Endpoints

### Authentication Routes
```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - Login user
POST   /api/auth/logout            - Logout user
GET    /api/auth/me                - Get current user
PUT    /api/auth/profile           - Update user profile
```

### Product Routes
```
GET    /api/products               - Get all products (with filters)
GET    /api/products/:id           - Get single product
POST   /api/products               - Create product (admin only)
PUT    /api/products/:id           - Update product (admin only)
DELETE /api/products/:id           - Delete product (admin only)
GET    /api/products/featured      - Get featured products
GET    /api/products/categories    - Get all categories
```

### Cart Routes
```
GET    /api/cart                   - Get user's cart
POST   /api/cart                   - Add item to cart
PUT    /api/cart/:itemId           - Update cart item quantity
DELETE /api/cart/:itemId           - Remove item from cart
DELETE /api/cart                   - Clear entire cart
```

### Order Routes
```
GET    /api/orders                 - Get user's orders
GET    /api/orders/:id             - Get single order
POST   /api/orders                 - Create new order
PUT    /api/orders/:id/pay         - Update order payment status
PUT    /api/orders/:id/deliver     - Update order delivery status (admin)
GET    /api/orders/admin/all       - Get all orders (admin)
```

### Review Routes
```
GET    /api/products/:id/reviews   - Get product reviews
POST   /api/products/:id/reviews   - Create review
PUT    /api/reviews/:id             - Update review
DELETE /api/reviews/:id             - Delete review
```

### Data Flow

#### User Registration Flow
```
Client → POST /api/auth/register → Validate → Hash Password → Save to DB → Generate JWT → Return Token
```

#### Add to Cart Flow
```
Client → POST /api/cart → Validate Product → Check Stock → Add/Update Cart → Calculate Total → Return Cart
```

#### Checkout Flow
```
Client → POST /api/orders → Validate Cart → Create Order → Clear Cart → Update Stock → Return Order
```

---

## 🏗️ Technical Architecture

### System Architecture
```
┌─────────────┐
│   Client    │ (React.js - Port 3000)
│  (Browser)  │
└──────┬──────┘
       │ HTTP/WebSocket
       │
┌──────▼──────┐
│   Express   │ (Node.js - Port 5000)
│    Server   │
└──────┬──────┘
       │
┌──────▼──────┐
│   MongoDB   │ (Database)
│   Atlas     │
└─────────────┘
```

### Frontend Architecture
- **React Router**: Client-side routing
- **Context API**: Global state management (Auth, Cart)
- **Axios**: HTTP client for API calls
- **Socket.io Client**: Real-time updates
- **React Hook Form**: Form management and validation

### Backend Architecture
- **Express.js**: Web framework
- **MongoDB + Mongoose**: Database and ODM
- **JWT**: Authentication tokens
- **bcrypt**: Password hashing
- **Socket.io**: Real-time communication
- **Express Validator**: Request validation
- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Morgan**: HTTP request logger

### Security Measures
- Password hashing with bcrypt
- JWT token-based authentication
- Input validation and sanitization
- CORS configuration
- Helmet.js for security headers
- Rate limiting (optional)
- Environment variables for sensitive data

### Real-time Features
- Order status updates via Socket.io
- Stock level notifications
- Admin notifications for new orders

---

## 📅 Project Roadmap

### Milestone 1: Project Setup & Planning (Week 1)
- [x] Project planning and documentation
- [x] Database schema design
- [x] API endpoint planning
- [ ] Wireframe creation

### Milestone 2: Backend Foundation (Week 1-2)
- [ ] Express server setup
- [ ] MongoDB connection and models
- [ ] Authentication system
- [ ] Basic CRUD operations
- [ ] Middleware implementation

### Milestone 3: Backend Advanced Features (Week 2)
- [ ] Cart functionality
- [ ] Order processing
- [ ] Payment integration (mock)
- [ ] Socket.io setup
- [ ] API testing

### Milestone 4: Frontend Foundation (Week 2-3)
- [ ] React app setup
- [ ] Routing configuration
- [ ] Authentication pages
- [ ] Product catalog page
- [ ] Product detail page

### Milestone 5: Frontend Advanced Features (Week 3)
- [ ] Shopping cart implementation
- [ ] Checkout process
- [ ] Order history
- [ ] Real-time updates
- [ ] Responsive design

### Milestone 6: Testing & QA (Week 3-4)
- [ ] Unit tests (backend)
- [ ] Integration tests (backend)
- [ ] Component tests (frontend)
- [ ] E2E tests
- [ ] Manual testing
- [ ] Bug fixes

### Milestone 7: Deployment & Documentation (Week 4)
- [ ] Backend deployment
- [ ] Frontend deployment
- [ ] CI/CD setup
- [ ] Documentation completion
- [ ] Final testing
- [ ] Presentation preparation

---

## 🛠️ Technology Stack

### Frontend
- **React.js** (v18+): UI library
- **React Router** (v6+): Routing
- **Axios**: HTTP client
- **Socket.io-client**: Real-time communication
- **React Hook Form**: Form handling
- **CSS3**: Styling (with modern features)
- **Vite**: Build tool (optional, or Create React App)

### Backend
- **Node.js** (v18+): Runtime environment
- **Express.js** (v4+): Web framework
- **MongoDB**: Database
- **Mongoose** (v7+): ODM
- **Socket.io**: Real-time communication
- **jsonwebtoken**: JWT authentication
- **bcryptjs**: Password hashing
- **express-validator**: Input validation
- **dotenv**: Environment variables
- **cors**: CORS middleware
- **helmet**: Security headers
- **morgan**: HTTP logger

### Testing
- **Jest**: Testing framework
- **Supertest**: API testing
- **React Testing Library**: Component testing
- **Cypress**: E2E testing (optional)

### Deployment
- **Render/Vercel/Netlify**: Frontend hosting
- **Render/Railway/Heroku**: Backend hosting
- **MongoDB Atlas**: Cloud database
- **GitHub Actions**: CI/CD (optional)

---

## 📝 Technical Decisions

### Why MERN Stack?
- **MongoDB**: Flexible schema for e-commerce data, easy to scale
- **Express.js**: Lightweight, fast, and well-documented
- **React**: Component-based architecture, excellent ecosystem
- **Node.js**: JavaScript everywhere, great performance

### Why Socket.io?
- Real-time order updates enhance user experience
- Instant notifications for admins
- Better user engagement

### Why JWT for Authentication?
- Stateless authentication
- Scalable across multiple servers
- Secure and industry-standard

### Why Mongoose?
- Schema validation
- Built-in middleware
- Easy relationship management
- Type safety with TypeScript (optional)

---

## 🎯 Success Criteria

1. ✅ All CRUD operations working
2. ✅ User authentication and authorization
3. ✅ Shopping cart functionality
4. ✅ Checkout process
5. ✅ Order management
6. ✅ Real-time updates
7. ✅ Responsive design
8. ✅ Test coverage > 70%
9. ✅ Application deployed and accessible
10. ✅ Comprehensive documentation

---

## 📚 Additional Notes

- All prices stored in USD
- Images stored as URLs (can be extended to cloud storage)
- Payment processing is mocked (can integrate Stripe/PayPal)
- Admin features for product and order management
- Search and filter functionality for products
- Pagination for product listings

