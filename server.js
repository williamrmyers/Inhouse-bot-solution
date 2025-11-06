const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static build output
app.use("/dist", express.static(path.join(__dirname, "dist")));

// Serve static assets from 'public'
app.use(express.static(path.join(__dirname, "public")));

// Serve static files from 'static'
app.use(express.static(path.join(__dirname, "static")));

// Optional: serve index.html on root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
