import { Document } from 'mongoose';

export interface Statistics extends Document {
  location: string;
  fromUrl: string;
  time: string;
  browser: string;
  moduleType: string;
  operateType: string;
  operateContent: string;
  clientIp: string;
}
