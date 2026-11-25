
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// Check backend connection
app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "Backend is running!"
  });
});

// Handle frontend demo request
app.post("/api/demo", (req, res) => {
  const responseData = {
    status: "success",
    message: "Frontend successfully connected to backend!",
    data: {
      user: "Demo User",
      project: "3D Frontend Backend Visualization",
      database: "Sample database response"
    }
  };

  res.json(responseData);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
