app.get("/profile/:profileId", async (req, res) => {
    const profile = await User.findOne({ _id: req.params.profileId });
    res.send(profile);
  });
  
  
  app.post("/profile/edit", async (req, res) => {
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

  app.post(
    "/upload",
    upload.single("image"),
    async (req, res) => {
      try {
        const user = await User.findOne({ _id: req.body.id });
        const buffer = await sharp(req.file.buffer).resize({ width: 100, height: 150}).png().toBuffer()
        user.profile.image = buffer;
        user.save();
        res.send();
      } catch (e) {
        res.status(400).send(e);
      }
    },
    (error, req, res, next) => {
      res.status(400).send({ error: error.message });
    }
  );
  
  app.get("/:profileId/image", async (req, res) => {
    try {
      const user = await User.findById(req.params.profileId);
      if (!user || !user.profile.image) {
        throw new Error();
      }
      //response header, use set
      res.set("Content-Type", "image/png");
      res.send(user.profile.image);
    } catch (e) {
      res.status(404).send();
    }
  });
  
  app.delete("/upload", async (req, res) => {
    try {
      const user = await Users.findById(req.body.id);
      user.image = undefined;
      user.save();
      res.send();
    } catch (e) {
      res.status(400).send(e);
    }
  });