import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const checkConnection = async () => {
  try {
    console.log('🔍 Checking MongoDB connection...\n');
    console.log(`Connection String: ${process.env.MONGODB_URI?.replace(/\/\/[^:]+:[^@]+@/, '//***:***@') || 'Not set'}\n`);
    
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/quality-furnitures',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    
    console.log('✅ Connection successful!');
    console.log(`   Host: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
    console.log(`   Ready State: ${conn.connection.readyState === 1 ? 'Connected' : 'Not Connected'}`);
    
    // Check collections
    const db = conn.connection.db;
    const collections = await db.listCollections().toArray();
    
    console.log(`\n📦 Collections (${collections.length}):`);
    for (const collection of collections) {
      const count = await db.collection(collection.name).countDocuments();
      console.log(`   - ${collection.name}: ${count} documents`);
    }
    
    await mongoose.connection.close();
    console.log('\n✅ Connection check completed!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Connection failed!');
    console.error(`   Error: ${error.message}`);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Check if MongoDB is running (local) or accessible (Atlas)');
    console.error('   2. Verify MONGODB_URI in .env file');
    console.error('   3. For Atlas: Check IP whitelist and credentials');
    console.error('   4. For local: Ensure MongoDB service is started');
    process.exit(1);
  }
};

checkConnection();

