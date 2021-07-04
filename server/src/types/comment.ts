import { Document, ObjectId } from "mongoose";

export interface IComment extends Document {
  content: string;
  bookId: ObjectId;
  parentId: ObjectId;
  user: { id: ObjectId; name: string; profilePic: string };
}
