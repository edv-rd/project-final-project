import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import crypto from "crypto";
import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";

const mongoUrl =
  process.env.MONGO_URL || "mongodb://localhost:27017/final-project";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const User = mongoose.model("User", {
  name: {
    type: String,
    unique: true,
    minlength: 3,
    maxlength: 12,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
  profile: {
    about_me: { type: String, default: "",  maxlength: 200 },
    interests: { type: String, default: "",  maxlength: 200 },
    occupation: { type: String, default: "",  maxlength: 200 },
    picture: { type: String, default: "" },
    // TODO: picture uploading
    birthday: { type: String, default: "" },
    // TODO: birthday
  },

  // would be nice to have also loaded here one "page" of users posts
});

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
  console.log(req.body);
  try {
    const user = await User.findOneAndUpdate(
      { accessToken: accessToken }, 
      { $set: {"profile.about_me": req.body.about_me, 
      "profile.interests": req.body.interests,
    "profile.occupation": req.body.occupation}});
    if (user) {
      res.status(201).json({ success: true, response: { user: user } });
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
