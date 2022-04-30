const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const uniqid = require("uniqid");
const avatar = app.use(cors());
app.use(express.json());
app.use(express.static("assets"));
require("dotenv").config();
const PORT = process.env.PORT || 8080;

//Get Route

app.get("/videos", (req, res) => {
  const videosInfo = fs.readFileSync("./data/videos.json");
  const videosData = JSON.parse(videosInfo);
  res.status(200).json(videosData);
});

// Another get route for video list of Aside
app.get("/videoList", (req, res) => {
  const videosInfo = fs.readFileSync("./data/videos.json");
  const videosData = JSON.parse(videosInfo);
  const videoList = videosData.map((video) => {
    return {
      title: video.title,
      channel: video.channel,
      image: video.image,
      id: video.id,
    };
  });
  res.status(200).json(videoList);
});

app.get("/videos/:videoId", (req, res) => {
  const videosInfo = fs.readFileSync("./data/videos.json");
  const videosData = JSON.parse(videosInfo);

  const exactVideo = videosData.find(
    (video) => video.id === req.params.videoId
  );

  if (!exactVideo) {
    res.status(404).send("Video not found");
    return;
  }
  res.status(200).json(exactVideo);
});

//Post Route
app.post("/videos", (req, res) => {
  const videosInfo = fs.readFileSync("./data/videos.json");
  const videosData = JSON.parse(videosInfo);
  const newVideo = {
    id: uniqid(),
    title: req.body.title,
    description: req.body.description,
    channel: "mock channel",
    image: "/images/pngkey.com-ega-png-2332677.png",
    comments: [
      { name: "name", comment: "blown", likes: 25, timestamp: new Date() },
      { name: "name", comment: "blown", likes: 25, timestamp: new Date() },
    ],
    likes: 25000,
    timestamp: new Date(),
    video: "https://project-2-api.herokuapp.com/stream",
    views: 19000,
    duration: "4:01",
  };

  videosData.push(newVideo);

  const stringifiedVideosData = JSON.stringify(videosData);
  fs.writeFileSync("./data/videos.json", stringifiedVideosData);

  res.status(201).json(newVideo);
});

//Port setup
app.listen(PORT, () => {
  console.log("server running on  port 8080");
});
