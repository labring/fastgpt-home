import mongoose, { Document, Schema } from 'mongoose';

export interface IAdminSession extends Document {
  tokenHash: string;
  userAgent?: string;
  lastSeenAt: Date;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSessionSchema = new Schema(
  {
    tokenHash: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    userAgent: {
      type: String,
      default: ''
    },
    lastSeenAt: {
      type: Date,
      required: true,
      default: Date.now
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.AdminSession ||
  mongoose.model<IAdminSession>('AdminSession', AdminSessionSchema);
