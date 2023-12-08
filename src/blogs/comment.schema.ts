import { Schema, Types } from 'mongoose';
const ObjectId = Types.ObjectId;
export const CommentSchema = new Schema({
  // _id: { type: String, required: true },
  cid: { type: ObjectId, required: true }, //文章id
  content: { type: String }, //评论内容
  publishdate: { type: String, required: true }, //评论发布时间
  userId: { type: String, required: true }, //评论人
  // articleId: { type: String, required: true }, //评论所属文章ID
  thumbup: { type: String }, //评论被点赞数
  head: { type: String },
  parentId: { type: String, required: true }, //0表示评论文章；若是评论的是评论则为被评论的评论c_id
  email: { type: String },
  url: { type: String },
  commentNum: { type: Number },
  city: { type: String },
});
