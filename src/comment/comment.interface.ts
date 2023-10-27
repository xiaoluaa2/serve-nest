import { Document } from 'mongoose';

export interface Comment extends Document {
  readonly _id: string;
  content: string;
  publishdate: string;
  userId: string;
  // articleId: string;
  thumbup: number;
  parentId: string | number;
  commentNum: number;
  city: string;
}
