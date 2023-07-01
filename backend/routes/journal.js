app.get("/journal/:journalId", authenticateUser, async (req, res) => {
    const postedBy = req.params.journalId;
    try {
      const journalEntries = await JournalEntry.find({ postedBy: postedBy })
        .populate("postedBy")
        .sort({ postedAt: -1 })
        .limit(10)
        .exec();
  
      if (journalEntries) {
        return res
          .status(200)
          .json({ body: { owner: postedBy, journalEntries } });
      }
    } catch (e) {
      return "Error: " + e.message;
    }
  });
  
  app.post("/journal/", authenticateUser, async (req, res) => {
    const postedBy = req.user;
    const title = req.body.title;
    const content = req.body.content;
  
    try {
      const newEntry = await new JournalEntry({
        postedBy: postedBy,
        title: title,
        content: content,
      }).save();
  
      if (newEntry) {
        return res.status(200).json({ success: true, body: { entry: newEntry } });
      }
    } catch (e) {
      return "Error: " + e.message;
    }
  });