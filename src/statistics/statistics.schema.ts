import { Schema, Types } from 'mongoose';
const ObjectId = Types.ObjectId;
export const statisticsSchema = new Schema({
  clientIp: { type: String, required: true },
  location: { type: String, required: true },
  fromUrl: { type: String, required: true },
  time: { type: String, required: true },
  browser: { type: String, required: true },
  moduleType: { type: String, required: true },
  operateType: { type: String, required: true },
  operateContent: { type: String, required: true },
});
