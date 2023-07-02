import express from "express";
import GuestbookEntry from "../db/guestbookModel.js";
import { authenticateUser } from "./authenticate.js";



const router = express.Router();

router.get("/:guestbookId", async (req, res) => {
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
  
  router.post("/:guestbookId", authenticateUser, async (req, res) => {
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

export default router;
