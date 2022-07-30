import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectionString = process.env.MONGO_DB_URI

mongoose
  .connect(connectionString)
  .then(() => console.log('CONNECTED TO MONGODB'))
  .catch((e) => console.error(e))
