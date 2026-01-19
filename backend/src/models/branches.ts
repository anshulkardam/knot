import { Schema, model, Types } from 'mongoose';

export interface ILinkTreeItem {
  pageId: Types.ObjectId;
  title: string;
  url: string;
  order: number;
  isActive: boolean;
}

const linkTreeItemSchema = new Schema<ILinkTreeItem>(
  {
    pageId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default model<ILinkTreeItem>('LinkTreeItem', linkTreeItemSchema);
