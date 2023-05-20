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
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

const port = process.env.PORT || 3000;
const app = express();

const authenticateUser = async (req, res, next) => {
    const user = await User.findOne({ accessToken: req.header('Authorization') });
    if (user) {
        req.user = user;
        next();
    } else {
        res.status(401).json({loggedOut: true})
    }
}

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hej värld!");
});

app.post("/users", async (req, res) => {
    try {
        const {name, password} = req.body;
        const user = new User({name, password: bcrypt.hashSync(password)});
        user.save();
        res.status(201).json({id: user._id, accessToken: user.accessToken})
    } catch (err) { 
        res.status(400).json({message: "Could not create user", errors: err.errors});
}})

app.post("/profile", authenticateUser);
app.post("/profile", (req, res) => {
     res.send(req.user)
});

app.post("/sessions", async (req, res) => {
  const user = await User.findOne({ name: req.body.name });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({ userId: user._id, accessToken: user.accessToken });
  } else {
    res.json({ notFound: true });
  }
});

app.listen(port, () => {
  console.log(`server körandes på http://localhost:${port}`);
});
