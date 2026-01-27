import { Schema, model, Types } from 'mongoose';

export type LinkTreeItemCategory = 'social' | 'link';

export interface ILinkTreeItem {
  id: string;
  title: string;
  url: string;
  category: LinkTreeItemCategory;
  order: number;
  isActive: boolean;
}

export interface ILinkTree {
  username: string;
  title: string;
  bio?: string;
  creator: Types.ObjectId;
  isActive: boolean;
  items: ILinkTreeItem[];
}

const linkTreeItemSchema = new Schema<ILinkTreeItem>(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    category: {
      type: String,
      enum: ['social', 'link'],
      required: true,
    },
    order: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
  },
  { _id: false },
);

const linkTreeSchema = new Schema<ILinkTree>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    title: { type: String, required: true },
    bio: String,
    creator: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    isActive: { type: Boolean, default: true },

    items: {
      type: [linkTreeItemSchema],
      default: [],
    },
  },
  { timestamps: true },
);

export default model<ILinkTree>('LinkTree', linkTreeSchema);
