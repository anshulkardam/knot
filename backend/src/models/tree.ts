import { Schema, model, Types } from 'mongoose';

export interface ILinkTree {
  username: string; // karzemo
  title: string; // Karzemo | Links
  bio?: string;
  creator: Types.ObjectId;
  isActive: boolean;
}

const linkTreeSchema = new Schema<ILinkTree>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    creator: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default model<ILinkTree>('LinkTree', linkTreeSchema);
