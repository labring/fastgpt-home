import mongoose, { Document, Schema } from 'mongoose';

export interface IInteractionDailyStat extends Document {
  dateKey: string;
  views: number;
  likesDelta: number;
  createdAt: Date;
  updatedAt: Date;
}

const InteractionDailyStatSchema = new Schema(
  {
    dateKey: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true
    },
    views: {
      type: Number,
      default: 0
    },
    likesDelta: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

if (mongoose.models.InteractionDailyStat) {
  delete mongoose.models.InteractionDailyStat;
}

export default mongoose.model<IInteractionDailyStat>(
  'InteractionDailyStat',
  InteractionDailyStatSchema
);
