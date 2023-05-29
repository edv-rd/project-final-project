import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
import User from "./db/userModel.js";
import Entry from "./db/guestbookModel.js";

const mongoUrl =
  process.env.MONGO_URL || "mongodb://localhost:27017/final-project";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const port = process.env.PORT || 3000;
const app = express();

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({ accessToken: accessToken });
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({
        success: false,
        response: "Please log in",
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      response: e,
    });
  }
};

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hej värld!");
});

app.get("/auth", async (req, res) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({ accessToken: accessToken });
    if (user) {
      res.status(201).json({ success: true, response: { user: user } });
    }
  } catch (e) {
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

//app.get("/profile/edit", authenticateUser);

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
    const guestbookMessages = await Entry.find({ postedTo: guestbookId })
      .sort({ postedAt: -1 })
      .limit(10);


    if (guestbookMessages) {
      res
        .status(200)
        .json({ response: { guestbookMessages: guestbookMessages } });
    } else {
      return res.status(404).json({ body: { message: "Nope!" } });
    }
  } catch (e) {
    return "Error: " + e.message;
  }
});

app.post("/guestbook/:guestbookId", authenticateUser, async (req, res) => {
  const postedBy = req.user._id;
  const postedTo = req.params.guestbookId;
  const content = req.body.content;


  try {
    const newEntry = await new Entry({
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

app.listen(port, () => {
  console.log(`server körandes på http://localhost:${port}`);
});
