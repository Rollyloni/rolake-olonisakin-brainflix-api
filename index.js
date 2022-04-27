const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");

app.use(cors());

app.get("/videos", (req, res) => {
  const videosInfo = fs.readFileSync("./data/videos.json");
  const videosData = JSON.parse(videosInfo);
  res.json(videosData);
  console.log(videosData[0]);
});

app.listen(8080, () => {
  console.log("server running on  port 8080");
});
