const express = require('express')
const app = express()
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const connectDB = require('./config/db')
const cors = require('cors');
connectDB()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/articles', require('./routes/articleRoute'))

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})