import mongoose from "mongoose";
import crypto from "crypto";


const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        unique: true,
        minlength: 3,
        maxlength: 12,
      },
      email: {
        type: String,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        select: false
      },
      accessToken: {
        type: String,
        default: () => crypto.randomBytes(128).toString("hex"),
        select: false
      },
      profile: {
        about_me: { type: String, default: "",  maxlength: 200 },
        interests: { type: String, default: "",  maxlength: 200 },
        occupation: { type: String, default: "",  maxlength: 200 },
        // TODO: picture uploading
        // TODO: birthday
        birthday: { type: String, default: "" },
        image: {
          type: Buffer
          }
        
      },
      // would be nice to have also loaded here one "page" of users posts
});

export default mongoose.model("User", UserSchema);
// module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);