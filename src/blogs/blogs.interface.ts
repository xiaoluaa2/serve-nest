import { Document } from 'mongoose';

export interface Blogs extends Document {
  // readonly _id: string;
  Title: string;
  order: string;
  Summary: string;
  Content: string;
  CreateDate: string;
  ArticleTag: string;
  ArticleCover: string;
}
export interface Comment extends Document {
  readonly _id: string;
  cid: string;
  content: string;
  publishdate: string;
  userId: string;
  // articleId: string;
  thumbup: number;
  parentId: string | number;
  email: string;
  url: string;
  commentNum: number;
}
