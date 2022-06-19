const mongoose = require('mongoose')

const connectionString = process.env.MONGO_DB_URI_TEST

mongoose.connect(connectionString)
  .then(() => console.log('Database connected'))
