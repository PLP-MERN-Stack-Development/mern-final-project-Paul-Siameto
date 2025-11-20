import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import User from '../models/User.js';

dotenv.config();

const products = [
  {
    name: 'Modern Leather Sofa',
    description: 'Comfortable 3-seater leather sofa perfect for your living room. Features premium leather and sturdy construction.',
    price: 1299.99,
    category: 'sofa',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
    stock: 15,
    featured: true,
  },
  {
    name: 'Ergonomic Office Chair',
    description: 'High-quality ergonomic chair with lumbar support. Perfect for long work sessions.',
    price: 299.99,
    category: 'chair',
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800',
    stock: 25,
    featured: true,
  },
  {
    name: 'Oak Dining Table',
    description: 'Beautiful solid oak dining table that seats 6. Handcrafted with attention to detail.',
    price: 899.99,
    category: 'table',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800',
    stock: 10,
    featured: true,
  },
  {
    name: 'King Size Bed Frame',
    description: 'Elegant king-size bed frame with storage drawers. Made from premium hardwood.',
    price: 1499.99,
    category: 'bed',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
    stock: 8,
    featured: false,
  },
  {
    name: 'Modern Storage Cabinet',
    description: 'Spacious storage cabinet with glass doors. Perfect for displaying and organizing.',
    price: 599.99,
    category: 'cabinet',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
    stock: 12,
    featured: false,
  },
  {
    name: 'Standing Desk',
    description: 'Adjustable height standing desk. Promote better posture and productivity.',
    price: 799.99,
    category: 'desk',
    image: 'https://images.unsplash.com/photo-1524758631544-b7bf19a5155e?w=800',
    stock: 20,
    featured: true,
  },
  {
    name: 'Recliner Chair',
    description: 'Comfortable recliner chair with footrest. Perfect for relaxation.',
    price: 449.99,
    category: 'chair',
    image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=800',
    stock: 15,
    featured: false,
  },
  {
    name: 'Coffee Table',
    description: 'Modern coffee table with glass top and metal legs. Sleek and functional.',
    price: 349.99,
    category: 'table',
    image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800',
    stock: 18,
    featured: false,
  },
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/quality-furnitures');
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert products
    await Product.insertMany(products);
    console.log('Products seeded successfully');

    // Create admin user if it doesn't exist
    const adminExists = await User.findOne({ email: 'admin@qualityfurnitures.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@qualityfurnitures.com',
        password: 'admin123',
        role: 'admin',
      });
      console.log('Admin user created: admin@qualityfurnitures.com / admin123');
    }

    // Create test user if it doesn't exist
    const testUserExists = await User.findOne({ email: 'test@example.com' });
    if (!testUserExists) {
      await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'test123',
        role: 'user',
      });
      console.log('Test user created: test@example.com / test123');
    }

    console.log('Seed data completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();

