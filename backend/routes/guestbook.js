import express from "express";
import Entry from "../db/entryModel.js";
import { authenticateUser } from "./authenticate.js";

const router = express.Router();

router.get("/:guestbookId", async (req, res) => {
  try {
    const guestbookMessages = await Entry.find({
      origin: "guestbook",
      postedTo: req.params.guestbookId,
    })
      .populate("postedBy")
      .populate("postedTo")
      .sort({ postedAt: -1 })
      .limit(10)
      .exec();

    if (guestbookMessages) {
      res.status(200).json({
        response: {
          guestbookOwner: req.params.guestbookId,
          guestbookMessages: guestbookMessages,
        },
      });
    } else {
      res.status(404).json({ 
        response: { 
          guestbookOwner: req.params.guestbookId 
        } 
      });
    }
  } catch (e) {
    return "Error: " + e.message;
  }
});

router.post("/:guestbookId", authenticateUser, async (req, res) => {
  try {
    const newEntry = await new Entry({
      postedBy: req.user,
      postedTo: req.params.guestbookId,
      content: req.body.content,
      origin: "guestbook",
    }).save();

    if (newEntry) {
      return res.status(200).json({ success: true, body: { entry: newEntry } });
    }
  } catch (e) {
    return "Error: " + e.message;
  }
});

export default router;
