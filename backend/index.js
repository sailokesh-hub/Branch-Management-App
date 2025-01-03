const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo db connected");
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

const userRoutes = require('./routes/users')
app.use("/api/users", userRoutes)

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
