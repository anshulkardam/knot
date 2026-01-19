import { model, Schema, Types } from 'mongoose';

export interface ILink {
  title: string;
  destination: string;
  code: string;           
  creator: Types.ObjectId;
  isActive: boolean;
  totalVisitCount: number;
  expiresAt?: Date | null;
}

const linkSchema = new Schema<ILink>(
  {
    title: { type: String, required: true },

    destination: { type: String, required: true },

    code: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    totalVisitCount: {
      type: Number,
      default: 0,
    },

    expiresAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default model<ILink>('Link', linkSchema);
