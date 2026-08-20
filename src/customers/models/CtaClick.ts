import mongoose, { Document, Schema } from 'mongoose';
import { CTA_SOURCES, type CtaSource } from '@/customers/lib/cta-constants';

export interface ICtaClick extends Document {
  source: CtaSource;
  dateKey: string;
  customerId?: string;
  customerTitle?: string;
  categoryName?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CtaClickSchema = new Schema(
  {
    source: {
      type: String,
      required: true,
      enum: CTA_SOURCES,
      index: true
    },
    dateKey: {
      type: String,
      required: true,
      index: true,
      trim: true
    },
    customerId: {
      type: String,
      trim: true
    },
    customerTitle: {
      type: String,
      trim: true
    },
    categoryName: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

CtaClickSchema.index({ source: 1, dateKey: 1 }, { name: 'cta_click_source_date' });
// 90 天 TTL 自动清理，防止数据无限增长
CtaClickSchema.index({ createdAt: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60, name: 'cta_click_ttl' });

if (mongoose.models.CtaClick) {
  delete mongoose.models.CtaClick;
}

export default mongoose.model<ICtaClick>('CtaClick', CtaClickSchema);
