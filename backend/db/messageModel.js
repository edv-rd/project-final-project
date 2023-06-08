import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postedAt: { type: Date, default: Date.now() },
    postedTo: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    title: { type: String, required: true },
    unread: { type: Boolean, default: true, required: true }
    });

export default mongoose.model("Message", MessageSchema);
// module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);