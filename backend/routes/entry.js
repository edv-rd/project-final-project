import express from "express";
import Entry from "../db/entryModel.js";
import { authenticateUser } from "./authenticate.js";

const router = express.Router();

router.patch("/read/:id", authenticateUser, async (req, res) => {
    try {
      const id = req.params.id;
      const entry = await Entry.findByIdAndUpdate(
        { _id: id },
        { "read": true } 
      );
  
      if (entry) {
        res.status(200).json({
          success: true,
        });
      } else {
        res.status(400).json({ success: false });
      }
    } catch (e) {
      res.status(500).json({
        success: false,
        response: e,
      });
    }
  });

  router.patch("/like/:id", authenticateUser, async (req, res) => {
    try {
      const id = req.params.id;
      const entry = await Entry.findByIdAndUpdate(
        { _id: id },
        { $push: {"likes": req.user} } 
      ).populate("likes");
  
      if (entry) {
        res.status(200).json({
          success: true,
          entry: entry
        });
      } else {
        res.status(400).json({ success: false });
      }
    } catch (e) {
      res.status(500).json({
        success: false,
        response: e,
      });
    }
  });

  export default router;