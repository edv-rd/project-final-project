import mongoose from "mongoose";

const Schema = mongoose.Schema;

const EntrySchema = new Schema({
    postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postedAt: { type: Date, default: Date.now() },
    postedTo: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    });

export default mongoose.model("Entry", EntrySchema);
// module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);