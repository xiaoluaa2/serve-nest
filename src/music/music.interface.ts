import { Document } from 'mongoose';

export interface Music extends Document {
  // readonly _id: string;
  name: string;
  artist: string;
  url: string;
  cover: string;
}
