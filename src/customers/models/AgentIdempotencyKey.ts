import mongoose, { Schema, Document } from 'mongoose';

const AGENT_IDEMPOTENCY_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export interface IAgentIdempotencyKey extends Document {
  key: string;
  method: string;
  path: string;
  bodyHash: string;
  state: 'pending' | 'completed';
  statusCode?: number;
  responseBody?: unknown;
  requestId: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AgentIdempotencyKeySchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      trim: true
    },
    method: {
      type: String,
      required: true,
      trim: true
    },
    path: {
      type: String,
      required: true,
      trim: true
    },
    bodyHash: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      enum: ['pending', 'completed'],
      required: true,
      default: 'pending'
    },
    statusCode: {
      type: Number
    },
    responseBody: {
      type: Schema.Types.Mixed
    },
    requestId: {
      type: String,
      required: true,
      trim: true
    },
    // Auto-expire old idempotency records to keep the collection bounded.
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + AGENT_IDEMPOTENCY_TTL_MS),
      index: { expires: 0 }
    }
  },
  {
    timestamps: true
  }
);

AgentIdempotencyKeySchema.index(
  { key: 1, method: 1, path: 1 },
  { unique: true, name: 'agent_idempotency_key_method_path_unique' }
);

if (mongoose.models.AgentIdempotencyKey) {
  delete mongoose.models.AgentIdempotencyKey;
}

export default mongoose.model<IAgentIdempotencyKey>(
  'AgentIdempotencyKey',
  AgentIdempotencyKeySchema
);
