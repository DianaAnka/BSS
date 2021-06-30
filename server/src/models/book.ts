import { IBook } from "./../types/book";
import { model, Schema } from "mongoose";

const bookSchema: Schema = new Schema(
  {
    author: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
    },
    abstract: {
      type: String,
    },
    tags: {
      type: [String],
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    likesCount: {
      type: Number,
    },
    dislikesCount: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default model<IBook>("Book", bookSchema);
