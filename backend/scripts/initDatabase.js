import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Cart from '../models/Cart.js';
import Order from '../models/Order.js';
import Review from '../models/Review.js';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/quality-furnitures',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

const createCollections = async () => {
  try {
    const db = mongoose.connection.db;
    
    // Get list of existing collections
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((c) => c.name);
    
    console.log('\n📦 Checking collections...');
    
    // Collections that should exist
    const requiredCollections = ['users', 'products', 'carts', 'orders', 'reviews'];
    
    for (const collectionName of requiredCollections) {
      if (collectionNames.includes(collectionName)) {
        const count = await db.collection(collectionName).countDocuments();
        console.log(`  ✓ ${collectionName} - exists (${count} documents)`);
      } else {
        // Create collection by inserting and deleting a dummy document
        await db.createCollection(collectionName);
        console.log(`  ✓ ${collectionName} - created`);
      }
    }
    
    // Create indexes
    console.log('\n🔍 Creating indexes...');
    
    // User indexes
    await User.collection.createIndex({ email: 1 }, { unique: true });
    console.log('  ✓ users.email index created');
    
    // Product indexes
    await Product.collection.createIndex({ name: 'text', description: 'text' });
    await Product.collection.createIndex({ category: 1 });
    await Product.collection.createIndex({ price: 1 });
    console.log('  ✓ products indexes created');
    
    // Cart indexes
    await Cart.collection.createIndex({ user: 1 }, { unique: true });
    console.log('  ✓ carts.user index created');
    
    // Order indexes
    await Order.collection.createIndex({ user: 1 });
    await Order.collection.createIndex({ status: 1 });
    await Order.collection.createIndex({ createdAt: -1 });
    console.log('  ✓ orders indexes created');
    
    // Review indexes
    await Review.collection.createIndex({ product: 1, user: 1 }, { unique: true });
    await Review.collection.createIndex({ product: 1 });
    console.log('  ✓ reviews indexes created');
    
    console.log('\n✅ Database initialization completed successfully!');
    
  } catch (error) {
    console.error('❌ Error creating collections/indexes:', error);
  }
};

const verifyConnection = async () => {
  try {
    const db = mongoose.connection.db;
    const stats = await db.stats();
    
    console.log('\n📊 Database Statistics:');
    console.log(`  Database: ${db.databaseName}`);
    console.log(`  Collections: ${stats.collections}`);
    console.log(`  Data Size: ${(stats.dataSize / 1024).toFixed(2)} KB`);
    console.log(`  Storage Size: ${(stats.storageSize / 1024).toFixed(2)} KB`);
    
    // List all collections with document counts
    const collections = await db.listCollections().toArray();
    console.log('\n📦 Collections:');
    for (const collection of collections) {
      const count = await db.collection(collection.name).countDocuments();
      console.log(`  - ${collection.name}: ${count} documents`);
    }
    
  } catch (error) {
    console.error('❌ Error verifying connection:', error);
  }
};

const initDatabase = async () => {
  try {
    console.log('🚀 Initializing Quality Furnitures Database...\n');
    
    // Connect to database
    await connectDB();
    
    // Create collections and indexes
    await createCollections();
    
    // Verify connection
    await verifyConnection();
    
    console.log('\n✨ All done! Your database is ready to use.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Initialization failed:', error);
    process.exit(1);
  }
};

// Run initialization
initDatabase();

export { initDatabase, connectDB, createCollections, verifyConnection };

