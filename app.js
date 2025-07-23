require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const app = express();

connectDB();
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/tasks", require("./routes/task"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
