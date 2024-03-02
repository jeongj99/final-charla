const express = require("express");

const app = express();

// Root route: http://localhost:8000/
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(8000, () => console.log("Server running on port 8000"));