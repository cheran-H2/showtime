const { MongoMemoryServer } = require('mongodb-memory-server');
const fs = require('fs');
const path = require('path');

async function main() {
  const dbPath = path.join(__dirname, 'mongodb_data');
  if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(dbPath, { recursive: true });
  }

  console.log('Starting MongoDB Database Server on port 27017...');

  const mongoServer = await MongoMemoryServer.create({
    instance: {
      port: 27017,
      dbName: 'TicketBooking',
      dbPath: dbPath,
      storageEngine: 'wiredTiger'
    }
  });

  console.log('==================================================');
  console.log('SUCCESS: MongoDB Server is up and running!');
  console.log('Connection URI: mongodb://localhost:27017/TicketBooking');
  console.log('Port: 27017');
  console.log('Database Name: TicketBooking');
  console.log('MongoDB Compass string: mongodb://localhost:27017');
  console.log('==================================================');

  process.on('SIGINT', async () => {
    console.log('Stopping MongoDB server...');
    await mongoServer.stop();
    process.exit(0);
  });
}

main().catch((err) => {
  console.error('Failed to start MongoDB server:', err);
  process.exit(1);
});
