import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
  categoryId: mongoose.Types.ObjectId | string;
  categoryName: string; // 冗余字段提升查询性能
  slug: string;
  title: string;
  storageFolder: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  publishedAt: Date | null;
  isPublicCase: boolean;
  caseOrg: string;
  clearanceLevel: 'A' | 'B' | 'C' | '';
  caseNo: number;
  citedNumbers: string;
  relatedCustomerIds: string[];
  imageUrl: string;
  thumbnailUrl: string;
  freeUseUrl: string;
  likesCount: number;
  usageCount: number;
  helpfulCount: number;
  unhelpfulCount: number;
  content: string; // Markdown 详情
  mediaUrls: string[]; // 保存的S3媒体URL列表
  isPublished: boolean;
  deletedAt: Date | null; // 支持软删除
  deletedSource: 'admin' | 'agent' | null;
  createdAt: Date;
  updatedAt: Date;
  // 虚拟属性
  formattedUsageCount: string;
}

const CustomerSchema = new Schema(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      index: true
    },
    categoryName: {
      type: String,
      required: true,
      index: true,
      trim: true
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    storageFolder: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500
    },
    metaTitle: {
      type: String,
      trim: true,
      default: '',
      maxlength: 100
    },
    metaDescription: {
      type: String,
      trim: true,
      default: '',
      maxlength: 500
    },
    publishedAt: {
      type: Date,
      default: null
    },
    isPublicCase: {
      type: Boolean,
      default: false
    },
    caseOrg: {
      type: String,
      trim: true,
      default: ''
    },
    clearanceLevel: {
      type: String,
      enum: ['A', 'B', 'C', ''],
      default: ''
    },
    caseNo: {
      type: Number,
      default: 0
    },
    citedNumbers: {
      type: String,
      default: ''
    },
    relatedCustomerIds: {
      type: [String],
      default: []
    },
    imageUrl: {
      type: String,
      required: true
    },
    thumbnailUrl: {
      type: String,
      default: ''
    },
    freeUseUrl: {
      type: String,
      default: '',
      trim: true
    },
    likesCount: {
      type: Number,
      default: 0,
      min: 0
    },
    usageCount: {
      type: Number,
      default: 0,
      min: 0
    },
    helpfulCount: {
      type: Number,
      default: 0,
      min: 0
    },
    unhelpfulCount: {
      type: Number,
      default: 0,
      min: 0
    },
    content: {
      type: String,
      required: true
    },
    mediaUrls: {
      type: [String],
      default: []
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true
    },
    deletedAt: {
      type: Date,
      default: null,
      index: true // 方便过滤掉已删除的记录
    },
    deletedSource: {
      type: String,
      enum: ['admin', 'agent', null],
      default: null
    }
  },
  {
    timestamps: true,
    collection: 'customers',
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// 全文索引：支持搜索功能
CustomerSchema.index({ title: 'text', description: 'text' });

// 复合索引：常用的列表查询 (如：分类 + 排序)
CustomerSchema.index({ categoryName: 1, isPublished: 1, deletedAt: 1, createdAt: -1 });

// 案例页列表与相关推荐
CustomerSchema.index({ isPublicCase: 1, isPublished: 1, deletedAt: 1, createdAt: -1 });
CustomerSchema.index({ categoryName: 1, isPublished: 1, deletedAt: 1, publishedAt: -1 });

// 全量已发布内容查询（sitemap / llms / 首页 AI 目录 / 相关推荐）：发布 + 未删除 + 时间排序
CustomerSchema.index({ isPublished: 1, deletedAt: 1, createdAt: -1 });

// 分类过滤列表查询：分类 + 发布 + 未删除 + 时间排序（sortBy=time 时排序走索引）
CustomerSchema.index({ categoryId: 1, isPublished: 1, deletedAt: 1, createdAt: -1 });

// 虚拟属性：格式化 usageCount (例如：12000 -> 1.2w+)
CustomerSchema.virtual('formattedUsageCount').get(function(this: ICustomer) {
  if (this.usageCount >= 10000) {
    return (this.usageCount / 10000).toFixed(1).replace(/\.0$/, '') + 'w+';
  }
  if (this.usageCount >= 1000) {
    return (this.usageCount / 1000).toFixed(1).replace(/\.0$/, '') + 'k+';
  }
  return this.usageCount.toString();
});

// 查询中间件：默认过滤掉已软删除的文档
CustomerSchema.pre(/^find/, function(this: mongoose.Query<unknown, ICustomer>) {
  if (this.getQuery().deletedAt === undefined) {
    this.where({ deletedAt: null });
  }
});

// 在开发环境中，由于 Next.js HMR (热更新) 会导致 Schema 被缓存，
// 如果新增了字段 (如 helpfulCount)，旧缓存的 Schema 依然在生效，
// 从而导致 Mongoose 严格模式下静默忽略新字段的更新。
// 因此我们需要在重新编译时清理掉旧的 Model 缓存。
if (mongoose.models.Customer) {
  delete mongoose.models.Customer;
}

export default mongoose.model<ICustomer>('Customer', CustomerSchema);
