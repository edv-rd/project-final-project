import express from "express";
import User from "../db/userModel.js";

const router = express.Router();

router.get("/:profileId", async (req, res) => {
  const profile = await User.findOne({ _id: req.params.profileId });
  res.send(profile);
});

router.post("/edit", async (req, res) => {
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



export default router;
