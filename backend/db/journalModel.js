import mongoose from "mongoose";

const Schema = mongoose.Schema;

const EntrySchema = new Schema({
    postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postedAt: { type: Date, default: Date.now },
    title: { type: String, required: true },
    content: { type: String, required: true },
    });

export default mongoose.model("JournalEntry", EntrySchema);
// module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);