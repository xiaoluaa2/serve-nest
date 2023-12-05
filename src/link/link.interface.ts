import { Document } from 'mongoose';

export interface Link extends Document {
  // readonly _id: string;
  author_name: string;
  author_link: string;
  author_avatar: string;
  author_descr: string;
  author_siteshot: string;
  type: string;
}
