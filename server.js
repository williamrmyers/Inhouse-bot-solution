const express = require("express");
const path = require("path"); // Import the path module
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Optional: Serve a specific HTML file for the root route (e.g., index.html)
app.get("/", (req, res) => {
  const _path = path.join(__dirname, "index.html");
  res.sendFile(_path);
});

app.use(express.static("static"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
