import { IComment } from "./../types/comment";
import { model, Schema } from "mongoose";

const commentSchema: Schema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    bookId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    user: {
      id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      profilePic: {
        type: String,
      },
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IComment>("Comment", commentSchema);
