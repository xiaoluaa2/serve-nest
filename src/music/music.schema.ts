import { Schema } from 'mongoose';
export const musicSchema = new Schema({
  name: { type: String, required: true },
  artist: { type: String, required: true },
  url: { type: String, required: true },
  cover: { type: String, required: true },
});
