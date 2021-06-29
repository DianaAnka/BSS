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
      type: Boolean,
    },
    abstract: {
      type: Boolean,
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
