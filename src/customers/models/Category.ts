import mongoose, { Schema, Document } from 'mongoose';
import {
  DEFAULT_CATEGORY_COLOR,
  getRandomCategoryColor,
  normalizeHexColor
} from '@/customers/lib/category-color';

export interface ICategory extends Document {
  name: string;
  slug: string;
  order: number;
  color: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: function(v: string) {
          return v !== '全部';
        },
        message: '分类名称不能为“全部”，该名称为系统保留字'
      }
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
      validate: {
        validator: function(value: string) {
          return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
        },
        message: '分类 Slug 只能包含小写字母、数字和连字符'
      }
    },
    order: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: getRandomCategoryColor,
      set: (value: string) => normalizeHexColor(value, DEFAULT_CATEGORY_COLOR),
      validate: {
        validator: function(value: string) {
          return /^#([0-9A-F]{6})$/.test(normalizeHexColor(value, DEFAULT_CATEGORY_COLOR));
        },
        message: '分类颜色必须是合法的十六进制色值'
      }
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Compound index for sorted active categories
CategorySchema.index({ isActive: 1, order: 1 });

if (mongoose.models.Category) {
  delete mongoose.models.Category;
}

export default mongoose.model<ICategory>('Category', CategorySchema);
