import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISystemConfig extends Document {
  key: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

const SystemConfigSchema: Schema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    value: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const SystemConfig: Model<ISystemConfig> =
  mongoose.models.SystemConfig || mongoose.model<ISystemConfig>('SystemConfig', SystemConfigSchema);