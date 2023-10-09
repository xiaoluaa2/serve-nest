import { Schema } from 'mongoose';

export const TypesSchema = new Schema({
  // _id: { type: String, required: true },
  TagName: { type: String, required: true },
  TagNo: { type: String },
  TagId: { type: String },
});
