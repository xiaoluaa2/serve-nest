import { Schema } from 'mongoose';

export const BlogsSchema = new Schema({
  // _id: { type: String, required: true },
  Title: { type: String, required: true },
  order: { type: String },
  Summary: { type: String, required: true },
  Content: { type: String, required: true },
  CreateDate: { type: String, required: true },
  ArticleTag: { type: String },
  ArticleCover: { type: String, required: true },
  CommentNum: { type: Number },
  hits: { type: Number },
});
