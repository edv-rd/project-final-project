import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
import User from "./db/userModel.js";


import multer from "multer";
import sharp from "sharp";

import profile from "./routes/profile.js";
import guestbook from "./routes/guestbook.js";
import journal from "./routes/journal.js";
import messages from "./routes/messages.js";
import bulletin from "./routes/bulletin.js";
import entry from "./routes/entry.js";

import { authenticateUser } from "./routes/authenticate.js";

const mongoUrl =
  process.env.MONGO_URL || "mongodb://localhost:27017/final-project";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const upload = multer({
  limits: {
    fileSize: 10000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      cb(new Error("Please upload an image."));
    }
    cb(undefined, true);
  },
  filename: function (req, file, cb) {
    cb(null, req.body.id);
  },
});

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hej värld!");
});

app.get("/auth", authenticateUser, async (req, res) => {
  if (req.user) {
    res.status(201).json({
      success: true,
      response: { user: req.user, profile: req.user.profile },
    });
  } else {
    return "Error: " + e.message;
  }
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync();
    const newUser = await new User({
      name: name,
      email: email,
      password: bcrypt.hashSync(password, salt),
    }).save();
    res.status(201).json({
      success: true,
      response: {
        name: newUser.name,
        id: newUser._id,
        accessToken: newUser.accessToken,
      },
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      response: e,
    });
  }
});

app.use("/profile", profile);

app.use("/guestbook", guestbook);

app.use("/journal", journal);

app.use("/bulletin", bulletin);

app.use("/messages", messages);

app.use("/entry", entry)

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.status(200).json({
        success: true,
        response: {
          username: user.name,
          id: user._id,
          accessToken: user.accessToken,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        response: "Credentials do not match",
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      response: e,
    });
  }
});

app.post(
  "/upload",
  upload.single("image"),
  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body.id });
      const buffer = await sharp(req.file.buffer)
        .resize({ width: 100, height: 150 })
        .png()
        .toBuffer();
      user.profile.image = buffer;
      user.save();
      res.send();
    } catch (e) {
      res.status(400).send(e);
    }
  },
  (error, res) => {
    res.status(400).send({ error: error.message });
  }
);

app.get("/:profileId/image", async (req, res) => {
  try {
    const user = await User.findById(req.params.profileId);
    if (!user || !user.profile.image) {
      throw new Error();
    }
    //response header, use set
    res.set("Content-Type", "image/png");
    res.send(user.profile.image);
  } catch (e) {
    res.status(404).send();
  }
});

app.delete("/upload", async (req, res) => {
  try {
    const user = await Users.findById(req.body.id);
    user.image = undefined;
    user.save();
    res.send();
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log(`server körandes på http://localhost:${port}`);
});
