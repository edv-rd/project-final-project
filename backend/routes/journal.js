import express from "express";
import Entry from "../db/entryModel.js";
import { authenticateUser } from "./authenticate.js";

const router = express.Router();

router.get("/:journalId", authenticateUser, async (req, res) => {
  try {
    const journalEntries = await Entry.find({
      postedBy: req.user,
      origin: "journal",
    })
      .populate("postedBy")
      .sort({ postedAt: -1 })
      .limit(10)
      .exec();

    if (journalEntries) {
      return res
        .status(200)
        .json({ body: { owner: req.user, journalEntries } });
    } else {
      return res.status(404).json({ body: { owner: req.params.journalId } });
    }
  } catch (e) {
    return "Error: " + e.message;
  }
});

router.post("/", authenticateUser, async (req, res) => {
  const postedBy = req.user;
  const title = req.body.title;
  const content = req.body.content;

  try {
    const newEntry = await new Entry({
      postedBy: postedBy,
      title: title,
      content: content,
      origin: "journal",
    }).save();

    if (newEntry) {
      return res.status(200).json({ success: true, body: { entry: newEntry } });
    }
  } catch (e) {
    return "Error: " + e.message;
  }
});

export default router;
