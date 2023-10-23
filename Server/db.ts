// db.ts
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../config.env') });

const uri = `mongodb+srv://${process.env.dbuser}:${process.env.password}@database.37cntpp.mongodb.net/`;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('inhye'); // 데이터베이스 선택
    console.log("db 연결완료....")
    return database;
  } catch (error) {
    console.error('MongoDB Connection Error: ', error);
    throw error;
  }
}

module.exports = { run };