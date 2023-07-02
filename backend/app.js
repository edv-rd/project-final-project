import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
import User from "./db/userModel.js";
import GuestbookEntry from "./db/guestbookModel.js";
import JournalEntry from "./db/journalModel.js";
import Message from "./db/messageModel.js";
import BulletinEntry from "./db/bulletinModel.js";
import multer from "multer";
import sharp from "sharp";

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

const port = process.env.PORT || 3000;
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

app.get("/profile/:profileId", async (req, res) => {
  const profile = await User.findOne({ _id: req.params.profileId });
  res.send(profile);
});

app.post("/profile/edit", async (req, res) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOneAndUpdate(
      { accessToken: accessToken },
      {
        $set: {
          "profile.about_me": req.body.about_me,
          "profile.interests": req.body.interests,
          "profile.occupation": req.body.occupation,
        },
      }
    );
    if (user) {
      res.status(201).json({ success: true, response: { user: user } });
    }
  } catch (e) {
    return "Error: " + e.message;
  }
});

app.get("/guestbook/:guestbookId", async (req, res) => {
  const guestbookId = req.params.guestbookId;
  try {
    const guestbookMessages = await GuestbookEntry.find({
      postedTo: guestbookId,
    })
      .populate("postedBy")
      .populate("postedTo")
      .sort({ postedAt: -1 })
      .limit(10)
      .exec();

    if (guestbookMessages) {
      res.status(200).json({
        response: {
          guestbookOwner: guestbookId,
          guestbookMessages: guestbookMessages,
        },
      });
    } else {
      return res.status(404).json({ body: { message: "Nope!" } });
    }
  } catch (e) {
    return "Error: " + e.message;
  }
});

app.post("/guestbook/:guestbookId", authenticateUser, async (req, res) => {
  const postedBy = req.user;
  const postedTo = req.params.guestbookId;
  const content = req.body.content;

  try {
    const newEntry = await new GuestbookEntry({
      postedBy: postedBy,
      postedTo: postedTo,
      content: content,
    }).save();

    if (newEntry) {
      return res.status(200).json({ success: true, body: { entry: newEntry } });
    }
  } catch (e) {
    return "Error: " + e.message;
  }
});

app.get("/journal/:journalId", authenticateUser, async (req, res) => {
  const postedBy = req.params.journalId;
  try {
    const journalEntries = await JournalEntry.find({ postedBy: postedBy })
      .populate("postedBy")
      .sort({ postedAt: -1 })
      .limit(10)
      .exec();

    if (journalEntries) {
      return res
        .status(200)
        .json({ body: { owner: postedBy, journalEntries } });
    }
  } catch (e) {
    return "Error: " + e.message;
  }
});

app.post("/journal/", authenticateUser, async (req, res) => {
  const postedBy = req.user;
  const title = req.body.title;
  const content = req.body.content;

  try {
    const newEntry = await new JournalEntry({
      postedBy: postedBy,
      title: title,
      content: content,
    }).save();

    if (newEntry) {
      return res.status(200).json({ success: true, body: { entry: newEntry } });
    }
  } catch (e) {
    return "Error: " + e.message;
  }
});

app.get("/inbox", authenticateUser, async (req, res) => {
  const postedTo = req.user;
  try {
    const messages = await Message.find({ postedTo: postedTo })
      .populate("postedTo")
      .populate("postedBy")
      .sort({ postedAt: -1 })
      .limit(10)
      .exec();

    if (messages) {
      return res.status(200).json({ body: { owner: postedTo, messages } });
    } else {
      return res.status(404).json({ body: { message: "Not Found" } });
    }
  } catch (e) {
    return "Error: " + e.message;
  }
});

app.post("/message", authenticateUser, async (req, res) => {
  const postedBy = req.user;
  const title = req.body.title;
  const content = req.body.content;
  const postedTo = req.body.postedTo;

  try {
    const newMessage = await new Message({
      postedBy: postedBy,
      title: title,
      content: content,
      postedTo: postedTo,
    }).save();

    if (newMessage) {
      return res
        .status(200)
        .json({ success: true, body: { message: newMessage } });
    }
  } catch (e) {
    return "Error: " + e.message;
  }
});

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
  (error, req, res, next) => {
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

app.get("/bulletin", authenticateUser, async (req, res) => {
  try {
    const messages = await BulletinEntry.find({})
      .populate("postedBy")
      .sort({ postedAt: -1 })
      .limit(10)
      .exec();

    if (messages) {
      return res.status(200).json({ body: { owner: req.user, messages } });
    } else {
      return res.status(404).json({ body: { message: "Not Found" } });
    }
  } catch (e) {
    return "Error: " + e.message;
  }
});

app.post("/bulletin", authenticateUser, async (req, res) => {
  const postedBy = req.user;
  const content = req.body.content;

  try {
    const newMessage = await new BulletinEntry({
      postedBy: postedBy,
      content: content,
    }).save();

    if (newMessage) {
      return res
        .status(200)
        .json({ success: true, body: { message: newMessage } });
    }
  } catch (e) {
    return "Error: " + e.message;
  }
});

app.listen(port, () => {
  console.log(`server körandes på http://localhost:${port}`);
});
