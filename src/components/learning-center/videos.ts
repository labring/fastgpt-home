export type Video = {
  _id?: string;
  title: string;
  desc: string;
  url: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category:
    | 'beginner-tutorial'
    | 'technical-tutorial'
    | 'deployment'
    | 'feature-intro'
    | 'operations'
    | 'industry-cases'
    | 'customer-cases';
  series?: string;
  type?: 'doc';
  featured?: boolean;
};

export const staticVideos: Video[] = [
  {
    title: 'FastGPT 全平台操作手册',
    desc: '完整的 FastGPT 使用手册，涵盖所有功能模块的详细操作说明和配置指南。',
    url: 'https://fael3z0zfze.feishu.cn/wiki/TRsDwq96LiWvFRktDj3cJffNntb',
    level: 'beginner',
    category: 'beginner-tutorial',
    type: 'doc'
  },
  {
    title: '新手教程',
    desc: '专为新手用户打造的快速入门教程，带你从零开始掌握 FastGPT 的核心功能。',
    url: 'https://fael3z0zfze.feishu.cn/wiki/BxwqwfRzDimhQbke04mcFzqInAF',
    level: 'beginner',
    category: 'beginner-tutorial',
    type: 'doc'
  },
  {
    title: '知识库模块01-通用知识库',
    desc: '学习如何创建和管理 FastGPT 的通用知识库，掌握知识库的基础配置与数据导入方法。',
    url: 'https://www.bilibili.com/video/BV1Xfcmz3EA5/',
    level: 'beginner',
    category: 'technical-tutorial',
    series: '知识库 · 01'
  },
  {
    title: '知识库模块02-web知识库',
    desc: '深入了解 FastGPT 的 Web 知识库功能，学习如何爬取和管理网页内容作为知识来源。',
    url: 'https://www.bilibili.com/video/BV1P7cUzFEMo/',
    level: 'beginner',
    category: 'technical-tutorial',
    series: '知识库 · 02'
  },
  {
    title: '知识库模块03-标签/权限设置',
    desc: '掌握知识库的标签分类和权限管理，实现多用户协作和精细化的访问控制。',
    url: 'https://www.bilibili.com/video/BV1sLcUzhEij/',
    level: 'intermediate',
    category: 'technical-tutorial',
    series: '知识库 · 03'
  },
  {
    title: 'Agent搭建模块01-对话Agent',
    desc: '从零开始搭建你的第一个对话 Agent，了解对话流程设计和参数配置的基础知识。',
    url: 'https://www.bilibili.com/video/BV1nucQzwEKh/',
    level: 'beginner',
    category: 'technical-tutorial',
    series: 'Agent搭建 · 01'
  },
  {
    title: 'Agent搭建模块02-工作流',
    desc: '学习如何使用 FastGPT 的工作流编排功能，构建复杂的多步骤 AI 应用。',
    url: 'https://www.bilibili.com/video/BV1aycDzEEbV/',
    level: 'intermediate',
    category: 'technical-tutorial',
    series: 'Agent搭建 · 02'
  },
  {
    title: 'Agent搭建模块03-发布',
    desc: '了解如何发布和分享你的 Agent，包括 API 接口、网页嵌入和多渠道分发。',
    url: 'https://www.bilibili.com/video/BV1ezcDzQEBZ/',
    level: 'intermediate',
    category: 'technical-tutorial',
    series: 'Agent搭建 · 03'
  },
  {
    title: '知识库搜索节点',
    desc: '详细讲解知识库搜索节点的使用方法，包括搜索策略、相似度设置和结果优化技巧。',
    url: 'https://www.bilibili.com/video/BV1ZywQzcEbN/',
    level: 'intermediate',
    category: 'technical-tutorial'
  },
  {
    title: '问题分类节点',
    desc: '学习使用问题分类节点实现智能路由，根据用户意图自动分发到不同的处理流程。',
    url: 'https://www.bilibili.com/video/BV1uwwXzSE5T/',
    level: 'intermediate',
    category: 'technical-tutorial'
  },
  {
    title: 'FastGPT商业版命令行部署教程',
    desc: '完整的命令行部署指南，从服务器配置到服务启动，快速完成 FastGPT 商业版的部署。',
    url: 'https://www.bilibili.com/video/BV1voPVzxEBV/',
    level: 'beginner',
    category: 'deployment',
    series: '部署 · 01'
  },
  {
    title: 'FastGPT模型配置教程视频',
    desc: '学习如何配置和管理 FastGPT 的 AI 模型，包括多模型切换、参数调优和成本控制。',
    url: 'https://www.bilibili.com/video/BV1FLAoznE69/',
    level: 'intermediate',
    category: 'deployment',
    series: '部署 · 03'
  },
  {
    title: '数据统计查看',
    desc: '了解 FastGPT 的数据统计功能，掌握如何查看使用量、消费统计和用户行为分析数据。',
    url: 'https://www.bilibili.com/video/BV1RyPjzwEHb/',
    level: 'intermediate',
    category: 'feature-intro'
  },
  {
    title: '知识库导入',
    desc: '学习多种知识库导入方式，包括文本、文档、网页和 API 导入的详细操作流程。',
    url: 'https://www.bilibili.com/video/BV1aTPjz4Eej/',
    level: 'beginner',
    category: 'feature-intro'
  },
  {
    title: 'MCP配置使用',
    desc: '深入了解 MCP (Model Context Protocol) 的配置和使用方法，提升模型的上下文理解能力。',
    url: 'https://www.bilibili.com/video/BV1tZPzzDEQb/',
    level: 'advanced',
    category: 'feature-intro'
  },
  {
    title: '智能体调试技巧',
    desc: '掌握智能体开发中的调试技巧，包括日志查看、错误排查和性能优化方法。',
    url: 'https://www.bilibili.com/video/BV1iPPrziE6J/',
    level: 'intermediate',
    category: 'feature-intro'
  },
  {
    title: '知识库参数设置',
    desc: '详细讲解知识库的各项参数配置，优化检索效果和问答质量。',
    url: 'https://www.bilibili.com/video/BV1msPCzfEBQ/',
    level: 'intermediate',
    category: 'feature-intro'
  },
  {
    title: '权限分配管理操作',
    desc: '学习如何进行团队协作和权限管理，包括角色分配、资源共享和访问控制。',
    url: 'https://www.bilibili.com/video/BV1SaPSzEEod/',
    level: 'intermediate',
    category: 'feature-intro'
  },
  {
    title: 'FastGPT 更新日志',
    desc: '查看 FastGPT 最新版本更新内容，了解新功能、优化改进和问题修复。',
    url: 'https://doc.fastgpt.cn/self-host/upgrading/upgrade-instruction',
    level: 'beginner',
    category: 'operations',
    type: 'doc'
  },
  {
    title: '企业通用服务案例-人力资源部',
    desc: '人力资源部门如何利用 FastGPT 实现简历筛选、员工咨询和培训管理的智能化。',
    url: 'https://www.bilibili.com/video/BV16UPfzbECs/',
    level: 'beginner',
    category: 'industry-cases',
    series: '企业案例'
  },
  {
    title: '企业通用服务案例-法务部',
    desc: '法务部门使用 FastGPT 进行合同审查、法律咨询和风险预警的实践案例。',
    url: 'https://www.bilibili.com/video/BV1PcPfzaEHk/',
    level: 'beginner',
    category: 'industry-cases',
    series: '企业案例'
  },
  {
    title: '企业通用服务案例-办公效率',
    desc: '通过 FastGPT 提升办公效率，实现会议纪要生成、邮件自动回复等智能办公场景。',
    url: 'https://www.bilibili.com/video/BV1eWNczWEsR/',
    level: 'beginner',
    category: 'industry-cases',
    series: '企业案例'
  },
  {
    title: '企业通用服务案例-财务部',
    desc: '财务部门利用 FastGPT 实现报销审核、财务咨询和数据分析的智能化应用。',
    url: 'https://www.bilibili.com/video/BV1VCNFzQEmq/',
    level: 'beginner',
    category: 'industry-cases',
    series: '企业案例'
  },
  {
    title: '企业通用服务案例-采购部',
    desc: '采购部门使用 FastGPT 优化供应商管理、询价比价和采购流程的案例分享。',
    url: 'https://www.bilibili.com/video/BV12ZNFz3EeR/',
    level: 'beginner',
    category: 'industry-cases',
    series: '企业案例'
  },
  {
    title: '企业通用服务案例-数据中心',
    desc: '数据中心如何借助 FastGPT 实现数据查询、报表生成和数据分析的智能化。',
    url: 'https://www.bilibili.com/video/BV1ABcfzxEKw/',
    level: 'intermediate',
    category: 'industry-cases',
    series: '企业案例'
  },
  {
    title: '零售&电商场景案例',
    desc: '零售电商行业利用 FastGPT 实现智能客服、商品推荐和订单处理的实战案例。',
    url: 'https://www.bilibili.com/video/BV1yGcZzWEJo/',
    level: 'beginner',
    category: 'industry-cases',
    series: '行业案例'
  },
  {
    title: '医疗健康案例-Neutriva健康服务推荐助手',
    desc: '医疗健康领域使用 FastGPT 构建智能健康咨询和服务推荐系统的成功案例。',
    url: 'https://www.bilibili.com/video/BV19ZcfzrEuX/',
    level: 'intermediate',
    category: 'industry-cases',
    series: '行业案例'
  },
  {
    title: '金融服务案例-AI金融日报助手',
    desc: '金融行业利用 FastGPT 实现金融资讯聚合、市场分析和投资建议的智能助手。',
    url: 'https://www.bilibili.com/video/BV1qXcBzsErh/',
    level: 'intermediate',
    category: 'industry-cases',
    series: '行业案例'
  },
  {
    title: '教育培训场景案例',
    desc: '教育培训机构使用 FastGPT 打造智能答疑、学习规划和课程推荐系统。',
    url: 'https://www.bilibili.com/video/BV1jGcBzXEsQ/',
    level: 'beginner',
    category: 'industry-cases',
    series: '行业案例'
  },
  {
    title: '媒体运营场景案例',
    desc: '媒体运营团队利用 FastGPT 实现内容创作、舆情监控和粉丝互动的智能化。',
    url: 'https://www.bilibili.com/video/BV1jAcCzPETb/',
    level: 'beginner',
    category: 'industry-cases',
    series: '行业案例'
  },
  {
    title: '制造业场景案例',
    desc: '制造业企业使用 FastGPT 实现生产管理、质量检测和设备维护的智能化应用。',
    url: 'https://www.bilibili.com/video/BV18kc2zPE4R/',
    level: 'intermediate',
    category: 'industry-cases',
    series: '行业案例'
  },
  {
    title: '客户案例集锦',
    desc: '查看更多 FastGPT 客户的成功案例和应用场景，获取灵感和最佳实践参考。',
    url: 'https://www.canva.com/design/DAG7qTZT_IQ/2SHmfMyd7IE5KTx-qqdKvg/view',
    level: 'beginner',
    category: 'customer-cases',
    type: 'doc'
  },
  {
    title: '【节点介绍】AI对话节点',
    desc: '掌握AI对话节点的功能',
    url: 'https://www.bilibili.com/video/BV1pQwDzqEdP/',
    level: 'beginner',
    category: 'technical-tutorial'
  },
  {
    title: '【节点介绍】文本内容提取',
    desc: '了解如何使用文本内容提取节点',
    url: 'https://www.bilibili.com/video/BV1t4w9zHEJh/',
    level: 'beginner',
    category: 'technical-tutorial'
  },
  {
    title: '【节点介绍】工具参数配置',
    desc: '工具参数配置节点如何使用',
    url: 'https://www.bilibili.com/video/BV1kZwXz3EYU/',
    level: 'beginner',
    category: 'technical-tutorial'
  },
  {
    title: '【节点介绍】用户选择节点',
    desc: '介绍用户选择节点的使用',
    url: 'https://www.bilibili.com/video/BV1gPwCz4ET9/',
    level: 'beginner',
    category: 'technical-tutorial'
  },
  {
    title: '【节点介绍】表单输入节点',
    desc: '介绍表单输入节点的功能',
    url: 'https://www.bilibili.com/video/BV1YowkzwEep/',
    level: 'beginner',
    category: 'technical-tutorial'
  },
  {
    title: '【节点介绍】指定回复节点',
    desc: '介绍指定回复节点的功能',
    url: 'https://www.bilibili.com/video/BV1nkwkzrEw2/',
    level: 'beginner',
    category: 'technical-tutorial'
  },
  {
    title: '【节点介绍】文档解析节点',
    desc: '介绍文档解析节点的功能',
    url: 'https://www.bilibili.com/video/BV1mGw1zfEsX/',
    level: 'beginner',
    category: 'technical-tutorial'
  },
  {
    title: '【节点介绍】HTTP请求节点',
    desc: 'HTTP请求节点功能介绍',
    url: 'https://www.bilibili.com/video/BV18WAjzQEb7/?spm_id_from=333.1387.homepage.video_card.click',
    level: 'beginner',
    category: 'technical-tutorial'
  },
  {
    title: '【节点介绍】判断器节点',
    desc: '判断器节点功能介绍',
    url: 'https://www.bilibili.com/video/BV1GwAJzeEd6/',
    level: 'beginner',
    category: 'technical-tutorial'
  },
  {
    title: '【节点介绍】变量更新节点',
    desc: '介绍变量更新节点的功能',
    url: 'https://www.bilibili.com/video/BV1YnAEzhEeK/',
    level: 'beginner',
    category: 'technical-tutorial'
  },
  {
    title: '【节点介绍】代码运行节点',
    desc: '代码运行节点功能介绍',
    url: 'https://www.bilibili.com/video/BV1JXAnzEEza/',
    level: 'beginner',
    category: 'technical-tutorial'
  },
  {
    title: '【节点介绍】代码运行节点场景',
    desc: '代码运行节点适用场景介绍',
    url: 'https://www.bilibili.com/video/BV16uAnzmEEf/',
    level: 'beginner',
    category: 'technical-tutorial'
  },
  {
    title: '【节点介绍】批量执行节点',
    desc: '批量执行节点功能介绍',
    url: 'https://www.bilibili.com/video/BV17AQ9BrEEz/',
    level: 'beginner',
    category: 'technical-tutorial'
  },
  {
    title: '【节点介绍】知识库搜索引用合并节点',
    desc: '知识库搜索引用合并节点功能介绍',
    url: 'https://www.bilibili.com/video/BV1TaQZBMEiR/',
    level: 'beginner',
    category: 'technical-tutorial'
  },
  {
    title: '【节点介绍】问题优化节点',
    desc: '问题优化节点功能介绍',
    url: 'https://www.bilibili.com/video/BV19AQBBxEhm/',
    level: 'beginner',
    category: 'technical-tutorial'
  },
  {
    title: '【节点介绍】自定义反馈节点',
    desc: '自定义反馈节点功能介绍',
    url: 'https://www.bilibili.com/video/BV1PwQqBME3m/',
    level: 'beginner',
    category: 'technical-tutorial'
  },
  {
    title: 'FastGPT 运维文档',
    desc: '升级和日常使用中的问题解决方案',
    url: 'https://fael3z0zfze.feishu.cn/wiki/ITZDw8tDMikuipkfdImc8ESsnef?from=from_copylink',
    level: 'beginner',
    category: 'operations',
    type: 'doc',
    featured: true
  },
  {
    title: 'FastGPT V4.15.0 更新介绍',
    desc: '版本更新介绍',
    url: 'https://www.bilibili.com/video/BV1fdTF6JEAU/?spm_id_from=333.1387.homepage.video_card.click',
    level: 'beginner',
    category: 'feature-intro',
    featured: true
  }
];
