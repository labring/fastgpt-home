import mongoose, { Document, Schema } from 'mongoose';

export type CustomerInteractionType = 'like' | 'view' | 'vote';
export type CustomerVoteType = 'helpful' | 'unhelpful';

export interface ICustomerInteraction extends Document {
  customerId: mongoose.Types.ObjectId;
  visitorKey: string;
  type: CustomerInteractionType;
  liked?: boolean;
  votedType?: CustomerVoteType;
  lastViewDateKey?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CustomerInteractionSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
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
    timestamps: true,
    collection: 'customerinteractions'
  }
);

CustomerInteractionSchema.index(
  { customerId: 1, visitorKey: 1, type: 1 },
  { unique: true, name: 'customer_interaction_unique_visitor_type' }
);

if (mongoose.models.CustomerInteraction) {
  delete mongoose.models.CustomerInteraction;
}

export default mongoose.model<ICustomerInteraction>(
  'CustomerInteraction',
  CustomerInteractionSchema
);
