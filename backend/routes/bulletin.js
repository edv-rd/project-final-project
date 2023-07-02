import express from "express";
import BulletinEntry from "../db/bulletinModel.js";
import { authenticateUser } from "./authenticate.js";

const router = express.Router();


router.get("/", authenticateUser, async (req, res) => {
    try {
      const messages = await BulletinEntry.find({  })
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
  
  router.post("/", authenticateUser, async (req, res) => {
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

  export default router;