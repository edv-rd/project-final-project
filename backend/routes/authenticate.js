import User from "../db/userModel.js";


export const authenticateUser = async (req, res, next) => {
    const accessToken = req.header("Authorization");
    try {
      const user = await User.findOne({ accessToken: accessToken });

      if (user) {
        req.user = user._id;
        req.user.profile = user.profile;
        next();
      } else {
        res.status(401).json({
          success: false,
          response: "Please log in",
        });
      }
    } catch (e) {
      res.status(500).json({
        success: false,
        response: e,
      });
    }
  };