/* mongoDB 사용 */
const {MongoClient} = require('mongodb')
const dotenv = require("dotenv")
const path = require("path")

dotenv.config({path: path.resolve(__dirname,"../config.js")})

const uri = `mongodb+srv://${process.env.username}:${process.env.password}@database.37cntpp.mongodb.net/`
const client = new MongoClient(uri)

async function run() {
    try {
        await client.connect();
    }finally{
        //Close the database connection when finished or an error occurs
        await client.close();
    }
}

export default run;