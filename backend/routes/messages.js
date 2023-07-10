import express from "express";
import Entry from "../db/entryModel.js";
import { authenticateUser } from "./authenticate.js";

const router = express.Router();

router.get("/", authenticateUser, async (req, res) => {
  const postedTo = req.user;
  try {
    const messages = await Entry.find({ postedTo: postedTo, origin: "message" })
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

router.post("/", authenticateUser, async (req, res) => {
  const postedBy = req.user;
  const title = req.body.title;
  const content = req.body.content;
  const postedTo = req.body.postedTo;

  try {
    const newMessage = await new Entry({
      postedBy: postedBy,
      title: title,
      content: content,
      postedTo: postedTo,
      origin: "message",
      read: req.body.read
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

export default router;
