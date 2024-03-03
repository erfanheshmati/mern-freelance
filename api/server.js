import express from "express";

const app = express();

app.listen(5000, (req, res) => {
  console.log("Server is running on port 5000");
});
