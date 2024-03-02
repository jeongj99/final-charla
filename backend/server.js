import express from "express";
import dotenv from "dotenv";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5001;

// Root route: http://localhost:8000/
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/auth/signup", (req, res) => {
  console.log("Signup route");
});

app.get("/api/auth/login", (req, res) => {
  console.log("Login route");
});

app.get("/api/auth/logout", (req, res) => {
  console.log("Logout route");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));