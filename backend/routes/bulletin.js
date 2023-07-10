import express from "express";
import Entry from "../db/entryModel.js";
import { authenticateUser } from "./authenticate.js";

const router = express.Router();

router.get("/", authenticateUser, async (req, res) => {
  try {
    const bulletins = await Entry.find({ origin: "bulletin" })
      .populate("postedBy")
      .sort({ postedAt: -1 })
      .limit(10)
      .exec();

    if (bulletins) {
      return res.status(200).json({ body: { owner: req.user, bulletins } });
    } else {
      return res.status(404).json({ body: { message: "Not Found" } });
    }
  } catch (e) {
    return "Error: " + e.message;
  }
});

router.post("/", authenticateUser, async (req, res) => {
  const postedBy = req.user;
  const content = req.body.content;

  try {
    const newBulletin = await new Entry({
      postedBy: postedBy,
      content: content,
      origin: "bulletin",
    }).save();

    if (newBulletin) {
      return res
        .status(200)
        .json({ success: true, body: { content: newBulletin } });
    }
  } catch (e) {
    return "Error: " + e.message;
  }
});

export default router;
