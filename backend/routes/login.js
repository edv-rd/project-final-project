app.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        res.status(200).json({
          success: true,
          response: {
            username: user.name,
            id: user._id,
            accessToken: user.accessToken,
          },
        });
      } else {
        res.status(400).json({
          success: false,
          response: "Credentials do not match",
        });
      }
    } catch (e) {
      res.status(500).json({
        success: false,
        response: e,
      });
    }
  });