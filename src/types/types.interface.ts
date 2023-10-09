import { Document } from 'mongoose';

export interface Types extends Document {
  // readonly _id: string;
  TagName: string;
  TagNo: string;
  TagId: string;
}
