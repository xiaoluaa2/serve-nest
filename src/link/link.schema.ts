import { Schema, Types } from 'mongoose';
const ObjectId = Types.ObjectId;
export const linkSchema = new Schema({
  // _id: { type: String, required: true },
  author_name: { type: String, required: true },
  author_link: { type: String, required: true },
  author_avatar: { type: String, required: true },
  author_descr: { type: String, required: true },
  author_siteshot: { type: String, required: true },
  type: { type: String, required: true },
});
