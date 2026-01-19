import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

export type IUser = {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  totalVisitCount: number;
  // passwordResetToken: string | null;
};

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      required: true,
    },

    totalVisitCount: {
      type: Number,
      default: 0,
    },

    // passwordResetToken: {
    //   type: String,
    //   default: null,
    //   select: false,
    // },
  },
  { timestamps: true },
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

export default model<IUser>('User', userSchema);
