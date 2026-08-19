import mongoose, { Document, Schema } from 'mongoose';

export type SolutionInteractionType = 'like' | 'view' | 'vote';
export type SolutionVoteType = 'helpful' | 'unhelpful';

export interface ISolutionInteraction extends Document {
  solutionId: mongoose.Types.ObjectId;
  visitorKey: string;
  type: SolutionInteractionType;
  liked?: boolean;
  votedType?: SolutionVoteType;
  lastViewDateKey?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SolutionInteractionSchema = new Schema(
  {
    solutionId: {
      type: Schema.Types.ObjectId,
      ref: 'Solution',
      required: true,
      index: true
    },
    visitorKey: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    type: {
      type: String,
      required: true,
      enum: ['like', 'view', 'vote'],
      index: true
    },
    liked: {
      type: Boolean
    },
    votedType: {
      type: String,
      enum: ['helpful', 'unhelpful']
    },
    lastViewDateKey: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

SolutionInteractionSchema.index(
  { solutionId: 1, visitorKey: 1, type: 1 },
  { unique: true, name: 'solution_interaction_unique_visitor_type' }
);

if (mongoose.models.SolutionInteraction) {
  delete mongoose.models.SolutionInteraction;
}

export default mongoose.model<ISolutionInteraction>(
  'SolutionInteraction',
  SolutionInteractionSchema
);
