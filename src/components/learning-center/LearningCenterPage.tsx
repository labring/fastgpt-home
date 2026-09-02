'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './LearningCenterPage.module.css';

interface Video {
  _id?: string;
  title: string;
  desc: string;
  url: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: 'beginner-tutorial' | 'technical-tutorial' | 'deployment' | 'feature-intro' | 'operations' | 'industry-cases' | 'customer-cases';
  series?: string;
  type?: 'doc';
  featured?: boolean;
}

interface Announcement {
  content: string;
  enabled: boolean;
}

interface Settings {
  heroTitle: string;
  heroDescription: string;
  heroBadge: string;
}

const categoryLabels: Record<Video['category'], string> = {
  'beginner-tutorial': '新手教学',
  'technical-tutorial': '技术教程',
  deployment: '部署教程',
  'feature-intro': '功能介绍',
  operations: '基础运维',
  'industry-cases': '行业案例',
  'customer-cases': '客户案例'
};

function VideoCover({ video, compact = false }: { video: Video; compact?: boolean }) {
  const label = video.series || categoryLabels[video.category];
  const format = video.type === 'doc' ? '官方文档' : '学习中心';

  return (
    <div
      className={`${styles.codeCover} ${compact ? styles.codeCoverCompact : ''} ${
        video.type === 'doc' ? styles.codeCoverDocument : ''
      }`}
      role="img"
      aria-label={`${label}：${video.title}`}
    >
      <span className={styles.codeCoverGrid} aria-hidden="true" />
      <span className={styles.codeCoverArc} aria-hidden="true" />
      <div className={styles.codeCoverTop}>
        <span className={styles.codeCoverBrand}>
          <Image src="/logo-nav.svg" alt="" width={22} height={22} />
          <span>FastGPT</span>
        </span>
        <span className={styles.codeCoverFormat}>{format}</span>
      </div>
      <div className={styles.codeCoverBody}>
        <span className={styles.codeCoverSeries}>{label}</span>
        <h4>{video.title}</h4>
      </div>
      <div className={styles.codeCoverFooter}>
        <span>FASTGPT LEARNING CENTER</span>
        <span className={styles.codeCoverIndex}>01</span>
      </div>
    </div>
  );
}

const staticVideos: Video[] = [
  // ========== 新手教学 ==========
  {
    title: "FastGPT 全平台操作手册",
    desc: "完整的 FastGPT 使用手册，涵盖所有功能模块的详细操作说明和配置指南。",
    url: "https://fael3z0zfze.feishu.cn/wiki/TRsDwq96LiWvFRktDj3cJffNntb",
    level: "beginner",
    category: "beginner-tutorial",
    type: "doc"
  },
  {
    title: "新手教程",
    desc: "专为新手用户打造的快速入门教程，带你从零开始掌握 FastGPT 的核心功能。",
    url: "https://fael3z0zfze.feishu.cn/wiki/BxwqwfRzDimhQbke04mcFzqInAF",
    level: "beginner",
    category: "beginner-tutorial",
    type: "doc"
  },

  // ========== 技术教学教程 - 知识库模块 ==========
  {
    title: "知识库模块01-通用知识库",
    desc: "学习如何创建和管理 FastGPT 的通用知识库，掌握知识库的基础配置与数据导入方法。",
    url: "https://www.bilibili.com/video/BV1Xfcmz3EA5/",
    level: "beginner",
    category: "technical-tutorial",
    series: "知识库 · 01"
  },
  {
    title: "知识库模块02-web知识库",
    desc: "深入了解 FastGPT 的 Web 知识库功能，学习如何爬取和管理网页内容作为知识来源。",
    url: "https://www.bilibili.com/video/BV1P7cUzFEMo/",
    level: "beginner",
    category: "technical-tutorial",
    series: "知识库 · 02"
  },
  {
    title: "知识库模块03-标签/权限设置",
    desc: "掌握知识库的标签分类和权限管理，实现多用户协作和精细化的访问控制。",
    url: "https://www.bilibili.com/video/BV1sLcUzhEij/",
    level: "intermediate",
    category: "technical-tutorial",
    series: "知识库 · 03"
  },

  // ========== 技术教学教程 - Agent搭建模块 ==========
  {
    title: "Agent搭建模块01-对话Agent",
    desc: "从零开始搭建你的第一个对话 Agent，了解对话流程设计和参数配置的基础知识。",
    url: "https://www.bilibili.com/video/BV1nucQzwEKh/",
    level: "beginner",
    category: "technical-tutorial",
    series: "Agent搭建 · 01"
  },
  {
    title: "Agent搭建模块02-工作流",
    desc: "学习如何使用 FastGPT 的工作流编排功能，构建复杂的多步骤 AI 应用。",
    url: "https://www.bilibili.com/video/BV1aycDzEEbV/",
    level: "intermediate",
    category: "technical-tutorial",
    series: "Agent搭建 · 02"
  },
  {
    title: "Agent搭建模块03-发布",
    desc: "了解如何发布和分享你的 Agent，包括 API 接口、网页嵌入和多渠道分发。",
    url: "https://www.bilibili.com/video/BV1ezcDzQEBZ/",
    level: "intermediate",
    category: "technical-tutorial",
    series: "Agent搭建 · 03"
  },
  {
    title: "知识库搜索节点",
    desc: "详细讲解知识库搜索节点的使用方法，包括搜索策略、相似度设置和结果优化技巧。",
    url: "https://www.bilibili.com/video/BV1ZywQzcEbN/",
    level: "intermediate",
    category: "technical-tutorial"
  },
  {
    title: "问题分类节点",
    desc: "学习使用问题分类节点实现智能路由，根据用户意图自动分发到不同的处理流程。",
    url: "https://www.bilibili.com/video/BV1uwwXzSE5T/",
    level: "intermediate",
    category: "technical-tutorial"
  },

  // ========== 部署教程 ==========
  {
    title: "FastGPT商业版命令行部署教程",
    desc: "完整的命令行部署指南，从服务器配置到服务启动，快速完成 FastGPT 商业版的部署。",
    url: "https://www.bilibili.com/video/BV1voPVzxEBV/",
    level: "beginner",
    category: "deployment",
    series: "部署 · 01"
  },
  {
    title: "FastGPT商业版部署教程视频",
    desc: "详细的商业版部署流程演示，涵盖环境准备、配置文件设置和常见问题排查。",
    url: "https://www.bilibili.com/video/BV1voPVzxEBV/",
    level: "beginner",
    category: "deployment",
    series: "部署 · 02"
  },
  {
    title: "FastGPT模型配置教程视频",
    desc: "学习如何配置和管理 FastGPT 的 AI 模型，包括多模型切换、参数调优和成本控制。",
    url: "https://www.bilibili.com/video/BV1FLAoznE69/",
    level: "intermediate",
    category: "deployment",
    series: "部署 · 03"
  },

  // ========== 功能介绍 ==========
  {
    title: "数据统计查看",
    desc: "了解 FastGPT 的数据统计功能，掌握如何查看使用量、消费统计和用户行为分析数据。",
    url: "https://www.bilibili.com/video/BV1RyPjzwEHb/",
    level: "intermediate",
    category: "feature-intro"
  },
  {
    title: "知识库导入",
    desc: "学习多种知识库导入方式，包括文本、文档、网页和 API 导入的详细操作流程。",
    url: "https://www.bilibili.com/video/BV1aTPjz4Eej/",
    level: "beginner",
    category: "feature-intro"
  },
  {
    title: "MCP配置使用",
    desc: "深入了解 MCP (Model Context Protocol) 的配置和使用方法，提升模型的上下文理解能力。",
    url: "https://www.bilibili.com/video/BV1tZPzzDEQb/",
    level: "advanced",
    category: "feature-intro"
  },
  {
    title: "智能体调试技巧",
    desc: "掌握智能体开发中的调试技巧，包括日志查看、错误排查和性能优化方法。",
    url: "https://www.bilibili.com/video/BV1iPPrziE6J/",
    level: "intermediate",
    category: "feature-intro"
  },
  {
    title: "知识库参数设置",
    desc: "详细讲解知识库的各项参数配置，优化检索效果和问答质量。",
    url: "https://www.bilibili.com/video/BV1msPCzfEBQ/",
    level: "intermediate",
    category: "feature-intro"
  },
  {
    title: "权限分配管理操作",
    desc: "学习如何进行团队协作和权限管理，包括角色分配、资源共享和访问控制。",
    url: "https://www.bilibili.com/video/BV1SaPSzEEod/",
    level: "intermediate",
    category: "feature-intro"
  },

  // ========== 基础运维教程 ==========
  {
    title: "FastGPT 更新日志",
    desc: "查看 FastGPT 最新版本更新内容，了解新功能、优化改进和问题修复。",
    url: "https://doc.fastgpt.cn/docs/upgrading/4-14/4145",
    level: "beginner",
    category: "operations",
    type: "doc"
  },

  // ========== 行业应用案例 - 企业通用服务 ==========
  {
    title: "企业通用服务案例-人力资源部",
    desc: "人力资源部门如何利用 FastGPT 实现简历筛选、员工咨询和培训管理的智能化。",
    url: "https://www.bilibili.com/video/BV16UPfzbECs/",
    level: "beginner",
    category: "industry-cases",
    series: "企业案例"
  },
  {
    title: "企业通用服务案例-法务部",
    desc: "法务部门使用 FastGPT 进行合同审查、法律咨询和风险预警的实践案例。",
    url: "https://www.bilibili.com/video/BV1PcPfzaEHk/",
    level: "beginner",
    category: "industry-cases",
    series: "企业案例"
  },
  {
    title: "企业通用服务案例-办公效率",
    desc: "通过 FastGPT 提升办公效率，实现会议纪要生成、邮件自动回复等智能办公场景。",
    url: "https://www.bilibili.com/video/BV1eWNczWEsR/",
    level: "beginner",
    category: "industry-cases",
    series: "企业案例"
  },
  {
    title: "企业通用服务案例-财务部",
    desc: "财务部门利用 FastGPT 实现报销审核、财务咨询和数据分析的智能化应用。",
    url: "https://www.bilibili.com/video/BV1VCNFzQEmq/",
    level: "beginner",
    category: "industry-cases",
    series: "企业案例"
  },
  {
    title: "企业通用服务案例-采购部",
    desc: "采购部门使用 FastGPT 优化供应商管理、询价比价和采购流程的案例分享。",
    url: "https://www.bilibili.com/video/BV12ZNFz3EeR/",
    level: "beginner",
    category: "industry-cases",
    series: "企业案例"
  },
  {
    title: "企业通用服务案例-数据中心",
    desc: "数据中心如何借助 FastGPT 实现数据查询、报表生成和数据分析的智能化。",
    url: "https://www.bilibili.com/video/BV1ABcfzxEKw/",
    level: "intermediate",
    category: "industry-cases",
    series: "企业案例"
  },

  // ========== 行业应用案例 - 行业案例 ==========
  {
    title: "零售&电商场景案例",
    desc: "零售电商行业利用 FastGPT 实现智能客服、商品推荐和订单处理的实战案例。",
    url: "https://www.bilibili.com/video/BV1yGcZzWEJo/",
    level: "beginner",
    category: "industry-cases",
    series: "行业案例"
  },
  {
    title: "医疗健康案例-Neutriva健康服务推荐助手",
    desc: "医疗健康领域使用 FastGPT 构建智能健康咨询和服务推荐系统的成功案例。",
    url: "https://www.bilibili.com/video/BV19ZcfzrEuX/",
    level: "intermediate",
    category: "industry-cases",
    series: "行业案例"
  },
  {
    title: "金融服务案例-AI金融日报助手",
    desc: "金融行业利用 FastGPT 实现金融资讯聚合、市场分析和投资建议的智能助手。",
    url: "https://www.bilibili.com/video/BV1qXcBzsErh/",
    level: "intermediate",
    category: "industry-cases",
    series: "行业案例"
  },
  {
    title: "教育培训场景案例",
    desc: "教育培训机构使用 FastGPT 打造智能答疑、学习规划和课程推荐系统。",
    url: "https://www.bilibili.com/video/BV1jGcBzXEsQ/",
    level: "beginner",
    category: "industry-cases",
    series: "行业案例"
  },
  {
    title: "媒体运营场景案例",
    desc: "媒体运营团队利用 FastGPT 实现内容创作、舆情监控和粉丝互动的智能化。",
    url: "https://www.bilibili.com/video/BV1jAcCzPETb/",
    level: "beginner",
    category: "industry-cases",
    series: "行业案例"
  },
  {
    title: "制造业场景案例",
    desc: "制造业企业使用 FastGPT 实现生产管理、质量检测和设备维护的智能化应用。",
    url: "https://www.bilibili.com/video/BV18kc2zPE4R/",
    level: "intermediate",
    category: "industry-cases",
    series: "行业案例"
  },

  // ========== 客户案例 ==========
  {
    title: "客户案例集锦",
    desc: "查看更多 FastGPT 客户的成功案例和应用场景，获取灵感和最佳实践参考。",
    url: "https://www.canva.com/design/DAG7qTZT_IQ/2SHmfMyd7IE5KTx-qqdKvg/edit",
    level: "beginner",
    category: "customer-cases",
    type: "doc"
  },

  // ========== 节点介绍 ==========
  {
    title: "【节点介绍】AI对话节点",
    desc: "掌握AI对话节点的功能",
    url: "https://www.bilibili.com/video/BV1pQwDzqEdP/",
    level: "beginner",
    category: "technical-tutorial"
  },
  {
    title: "【节点介绍】文本内容提取",
    desc: "了解如何使用文本内容提取节点",
    url: "https://www.bilibili.com/video/BV1t4w9zHEJh/",
    level: "beginner",
    category: "technical-tutorial"
  },
  {
    title: "【节点介绍】工具参数配置",
    desc: "工具参数配置节点如何使用",
    url: "https://www.bilibili.com/video/BV1kZwXz3EYU/",
    level: "beginner",
    category: "technical-tutorial"
  },
  {
    title: "【节点介绍】用户选择节点",
    desc: "介绍用户选择节点的使用",
    url: "https://www.bilibili.com/video/BV1gPwCz4ET9/",
    level: "beginner",
    category: "technical-tutorial"
  },
  {
    title: "【节点介绍】表单输入节点",
    desc: "介绍表单输入节点的功能",
    url: "https://www.bilibili.com/video/BV1YowkzwEep/",
    level: "beginner",
    category: "technical-tutorial"
  },
  {
    title: "【节点介绍】指定回复节点",
    desc: "介绍指定回复节点的功能",
    url: "https://www.bilibili.com/video/BV1nkwkzrEw2/",
    level: "beginner",
    category: "technical-tutorial"
  },
  {
    title: "【节点介绍】文档解析节点",
    desc: "介绍文档解析节点的功能",
    url: "https://www.bilibili.com/video/BV1mGw1zfEsX/",
    level: "beginner",
    category: "technical-tutorial"
  },
  {
    title: "【节点介绍】HTTP请求节点",
    desc: "HTTP请求节点功能介绍",
    url: "https://www.bilibili.com/video/BV18WAjzQEb7/?spm_id_from=333.1387.homepage.video_card.click",
    level: "beginner",
    category: "technical-tutorial"
  },
  {
    title: "【节点介绍】判断器节点",
    desc: "判断器节点功能介绍",
    url: "https://www.bilibili.com/video/BV1GwAJzeEd6/",
    level: "beginner",
    category: "technical-tutorial"
  },
  {
    title: "【节点介绍】变量更新节点",
    desc: "介绍变量更新节点的功能",
    url: "https://www.bilibili.com/video/BV1YnAEzhEeK/",
    level: "beginner",
    category: "technical-tutorial"
  },
  {
    title: "【节点介绍】代码运行节点",
    desc: "代码运行节点功能介绍",
    url: "https://www.bilibili.com/video/BV1JXAnzEEza/",
    level: "beginner",
    category: "technical-tutorial"
  },
  {
    title: "【节点介绍】代码运行节点场景",
    desc: "代码运行节点适用场景介绍",
    url: "https://www.bilibili.com/video/BV16uAnzmEEf/",
    level: "beginner",
    category: "technical-tutorial"
  },
  {
    title: "【节点介绍】批量执行节点",
    desc: "批量执行节点功能介绍",
    url: "https://www.bilibili.com/video/BV17AQ9BrEEz/",
    level: "beginner",
    category: "technical-tutorial"
  },
  {
    title: "【节点介绍】知识库搜索引用合并节点",
    desc: "知识库搜索引用合并节点功能介绍",
    url: "https://www.bilibili.com/video/BV1TaQZBMEiR/",
    level: "beginner",
    category: "technical-tutorial"
  },
  {
    title: "【节点介绍】问题优化节点",
    desc: "问题优化节点功能介绍",
    url: "https://www.bilibili.com/video/BV19AQBBxEhm/",
    level: "beginner",
    category: "technical-tutorial"
  },
  {
    title: "【节点介绍】自定义反馈节点",
    desc: "自定义反馈节点功能介绍",
    url: "https://www.bilibili.com/video/BV1PwQqBME3m/",
    level: "beginner",
    category: "technical-tutorial"
  },
  {
    title: "FastGPT 运维文档",
    desc: "升级和日常使用中的问题解决方案",
    url: "https://fael3z0zfze.feishu.cn/wiki/ITZDw8tDMikuipkfdImc8ESsnef?from=from_copylink",
    level: "beginner",
    category: "operations",
    type: "doc",
    featured: true
  },
  {
    title: "FastGPT V4.15.0 更新介绍",
    desc: "版本更新介绍",
    url: "https://www.bilibili.com/video/BV1fdTF6JEAU/?spm_id_from=333.1387.homepage.video_card.click",
    level: "beginner",
    category: "feature-intro",
    featured: true
  }
];

export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const videos = staticVideos;
  const announcement: Announcement = { content: '', enabled: false };
  const settings: Settings = {
    heroTitle: 'FastGPT 学习中心',
    heroDescription: '从入门到精通，系统化学习 FastGPT 的使用技巧、部署方案和最佳实践。所有视频均由官方团队精心制作。',
    heroBadge: '持续更新中'
  };

  const filteredVideos = activeCategory === 'all'
    ? videos
    : videos.filter(v => v.category === activeCategory);

  const featuredVideos = videos.filter(v => v.featured).slice(0, 4);

  const levelText = {
    'beginner': '入门',
    'intermediate': '中级',
    'advanced': '进阶'
  };

  return (
    <div className={styles.page}>
      {/* Glow blobs */}
      <div className={styles.glowBlob1}></div>
      <div className={styles.glowBlob2}></div>
      <div className={styles.glowBlob3}></div>

      {/* Main */}
      <header className={styles.navbar}>
        <div className={styles.navbarInner}>
          <a className={styles.brand} href="https://fastgpt.cn/" target="_blank" rel="noopener noreferrer">
            <Image src="/logo-nav.svg" alt="FastGPT" width={26} height={26} />
            <span>FastGPT</span>
          </a>
          <nav className={styles.navLinks} aria-label="主导航">
            <a className={styles.navLink} href="https://fastgpt.cn/price" target="_blank" rel="noopener noreferrer">
              定价
            </a>
            <a className={styles.navLink} href="https://doc.fastgpt.cn/docs/introduction" target="_blank" rel="noopener noreferrer">
              文档
            </a>
            <Link className={`${styles.navLink} ${styles.navLinkActive}`} href="/videos" aria-current="page">
              学习中心
            </Link>
            <a className={styles.navLink} href="https://solutions.fastgpt.cn/" target="_blank" rel="noopener noreferrer">案例中心</a>
          </nav>
          <div className={styles.navActions}>
            <a className={styles.navCta} href="https://fastgpt.cn/contact" target="_blank" rel="noopener noreferrer">商务咨询</a>
            <a className={styles.navTrial} href="https://cloud.fastgpt.cn" target="_blank" rel="noopener noreferrer">立即开始</a>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroBadge}>
              <div className={styles.heroBadgeDot}></div>
              {settings.heroBadge || '持续更新中'} · 已有 {videos.length}+ 个教程
            </div>
            <h1>{settings.heroTitle || 'FastGPT 学习中心'}</h1>
            <p>{settings.heroDescription || '从入门到精通，系统化学习 FastGPT 的使用技巧、部署方案和最佳实践。所有视频均由官方团队精心制作。'}</p>
            <div className={styles.heroActions}>
              <a
                className={styles.primaryCta}
                href="https://fastgpt.cn/contact"
                target="_blank"
                rel="noopener noreferrer"
              >
                商务咨询 <span aria-hidden="true">→</span>
              </a>
              <a
                className={styles.secondaryCta}
                href="https://fastgpt.cn/"
                target="_blank"
                rel="noopener noreferrer"
              >
                了解 FastGPT
              </a>
            </div>
          </div>
        </section>

        {/* Banner - Featured Videos & Announcement */}
        {(announcement.enabled && announcement.content) || featuredVideos.length > 0 ? (
          <section>
            <div className={styles.container}>
              {announcement.enabled && announcement.content && (
                <div className={styles.announcement}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  <span>{announcement.content}</span>
                </div>
              )}

              {featuredVideos.length > 0 && (
                <div className={styles.featuredSection}>
                  <h2 className={styles.featuredTitle}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    推荐视频
                  </h2>
                  <div className={styles.featuredGrid}>
                    {featuredVideos.map((video, index) => {
                      const isDoc = video.type === 'doc';
                      return (
                        <a
                          key={video._id || index}
                          href={video.url}
                          className={styles.featuredCard}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className={`${styles.featuredThumb} ${isDoc ? styles.docThumb : ''}`}>
                            <VideoCover video={video} compact />
                            <div className={styles.featuredOverlay}>
                              <div className={styles.featuredPlayBtn}>
                                {isDoc ? (
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                    <polyline points="14 2 14 8 20 8"/>
                                    <line x1="16" y1="13" x2="8" y2="13"/>
                                    <line x1="16" y1="17" x2="8" y2="17"/>
                                  </svg>
                                ) : (
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <polygon points="5 3 19 12 5 21 5 3"/>
                                  </svg>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className={styles.featuredInfo}>
                            <h3>{video.title}</h3>
                            <p>{video.desc}</p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </section>
        ) : null}

        {/* Videos */}
        <section>
          <div className={styles.container}>
            <div className={styles.videoCategories}>
              <button
                className={`${styles.videoCatBtn} ${activeCategory === 'all' ? styles.active : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                全部
              </button>
              <button
                className={`${styles.videoCatBtn} ${activeCategory === 'beginner-tutorial' ? styles.active : ''}`}
                onClick={() => setActiveCategory('beginner-tutorial')}
              >
                新手教学
              </button>
              <button
                className={`${styles.videoCatBtn} ${activeCategory === 'technical-tutorial' ? styles.active : ''}`}
                onClick={() => setActiveCategory('technical-tutorial')}
              >
                技术教学教程
              </button>
              <button
                className={`${styles.videoCatBtn} ${activeCategory === 'deployment' ? styles.active : ''}`}
                onClick={() => setActiveCategory('deployment')}
              >
                部署教程
              </button>
              <button
                className={`${styles.videoCatBtn} ${activeCategory === 'feature-intro' ? styles.active : ''}`}
                onClick={() => setActiveCategory('feature-intro')}
              >
                功能介绍
              </button>
              <button
                className={`${styles.videoCatBtn} ${activeCategory === 'operations' ? styles.active : ''}`}
                onClick={() => setActiveCategory('operations')}
              >
                基础运维教程
              </button>
              <button
                className={`${styles.videoCatBtn} ${activeCategory === 'industry-cases' ? styles.active : ''}`}
                onClick={() => setActiveCategory('industry-cases')}
              >
                行业应用案例
              </button>
              <button
                className={`${styles.videoCatBtn} ${activeCategory === 'customer-cases' ? styles.active : ''}`}
                onClick={() => setActiveCategory('customer-cases')}
              >
                客户案例
              </button>
            </div>

            <div className={styles.videoGrid}>
              {filteredVideos.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyStateIcon}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <polygon points="23 7 16 12 23 17 23 7"/>
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                    </svg>
                  </div>
                  <div className={styles.emptyStateText}>该分类暂无视频内容</div>
                </div>
              ) : (
                filteredVideos.map((video, index) => {
                const isDoc = video.type === 'doc';
                return (
                  <a
                    key={index}
                    href={video.url}
                    className={styles.videoCard}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className={`${styles.videoThumb} ${isDoc ? styles.docThumb : ''}`}>
                      <VideoCover video={video} compact />
                      <div className={styles.videoPlayOverlay}>
                        <div className={styles.videoPlayBtn}>
                          {isDoc ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                              <polyline points="14 2 14 8 20 8"/>
                              <line x1="16" y1="13" x2="8" y2="13"/>
                              <line x1="16" y1="17" x2="8" y2="17"/>
                              <polyline points="10 9 9 9 8 9"/>
                            </svg>
                          ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <polygon points="5 3 19 12 5 21 5 3"/>
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={styles.videoInfo}>
                      <h3>{video.title}</h3>
                      <p className={styles.videoDesc}>{video.desc}</p>
                      <div className={styles.videoInfoMeta}>
                        <span className={`${styles.videoLevel} ${styles[`level${video.level.charAt(0).toUpperCase() + video.level.slice(1)}`]}`}>
                          {levelText[video.level]}
                        </span>
                      </div>
                    </div>
                  </a>
                );
              }))}
            </div>

          </div>
        </section>

        <section className={styles.leadCta} aria-label="商务咨询">
          <div className={styles.container}>
            <div className={styles.leadCtaInner}>
              <div>
                <span className={styles.leadCtaEyebrow}>FastGPT 商务支持</span>
                <h2>想把 AI 应用真正落地？</h2>
                <p>留下需求和联系方式，FastGPT 团队会为你提供架构建议与 POC 支持。</p>
              </div>
              <a
                className={styles.primaryCta}
                href="https://fastgpt.cn/contact"
                target="_blank"
                rel="noopener noreferrer"
              >
                开始咨询 <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <a href="https://fastgpt.cn/" target="_blank" rel="noopener noreferrer">
                <Image src="/logo-nav.svg" alt="" width={30} height={30} />
                <span>FastGPT</span>
              </a>
              <p>企业级 AI 生产力引擎</p>
            </div>

            <div className={styles.footerColumns}>
              <div className={styles.footerColumn}>
                <h2>服务</h2>
                <a href="https://cloud.fastgpt.cn" target="_blank" rel="noopener noreferrer">云服务</a>
                <a href="https://fastgpt.cn/contact" target="_blank" rel="noopener noreferrer">私有化</a>
                <a href="https://github.com/labring/FastGPT" target="_blank" rel="noopener noreferrer">社区版</a>
              </div>
              <div className={styles.footerColumn}>
                <h2>链接</h2>
                <a href="https://doc.fastgpt.cn/docs/introduction" target="_blank" rel="noopener noreferrer">官网文档</a>
                <a href="https://doc.fastgpt.cn/docs/introduction" target="_blank" rel="noopener noreferrer">指南</a>
                <Link href="/videos">学习中心</Link>
                <a href="https://solutions.fastgpt.cn/" target="_blank" rel="noopener noreferrer">案例中心</a>
                <a href="https://fastgpt.cn/faq" target="_blank" rel="noopener noreferrer">常见问题</a>
                <a href="https://fastgpt.cn/tech-center" target="_blank" rel="noopener noreferrer">技术中心</a>
              </div>
              <div className={styles.footerColumn}>
                <h2>生态伙伴</h2>
                <a href="https://sealos.io/" target="_blank" rel="noopener noreferrer">Sealos</a>
                <a href="https://aiproxy.io/" target="_blank" rel="noopener noreferrer">AI Proxy</a>
              </div>
              <div className={styles.footerColumn + ' ' + styles.footerMore}>
                <h2>更多信息</h2>
                <a href="mailto:Dennis@sealos.io">邮箱：Dennis@sealos.io</a>
                <a href="https://www.lanqiao.cn/" target="_blank" rel="noopener noreferrer">蓝桥云课 x FastGPT 教程</a>
                <a href="https://fastgpt.cn/" target="_blank" rel="noopener noreferrer">FastGPT 官方教材（纸质书）</a>
              </div>
            </div>
          </div>

          <div className={styles.footerQrs}>
            <div>
              <span>官方公众号（微信）</span>
              <Image src="/fastgpt-footer/wechat.avif" alt="FastGPT 官方公众号二维码" width={80} height={80} />
            </div>
            <div>
              <span>官方社群（飞书）</span>
              <Image src="/fastgpt-footer/feishu.avif" alt="FastGPT 官方飞书社群二维码" width={80} height={80} />
            </div>
            <div>
              <span>官方社群（微信）</span>
              <Image src="/fastgpt-footer/community.avif" alt="FastGPT 官方微信社群二维码" width={80} height={80} />
            </div>
          </div>

          <div className={styles.footerBottom}>
            <div className={styles.footerLegal}>
              <span>© 2026 广州环际云计算有限公司 版权所有</span>
              <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">浙公网安备33011002017871号</a>
              <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">粤ICP备2023048773号</a>
            </div>
            <div className={styles.footerSocials} aria-label="FastGPT 社交媒体">
              <a href="https://www.douyin.com/" target="_blank" rel="noopener noreferrer" aria-label="抖音"><Image src="/fastgpt-footer/douyin.svg" alt="" width={24} height={24} /></a>
              <a href="https://www.xiaohongshu.com/" target="_blank" rel="noopener noreferrer" aria-label="小红书"><Image src="/fastgpt-footer/xhs.svg" alt="" width={24} height={24} /></a>
              <a href="https://space.bilibili.com/3632310442265468" target="_blank" rel="noopener noreferrer" aria-label="Bilibili"><Image src="/fastgpt-footer/bilibili.svg" alt="" width={24} height={24} /></a>
              <a href="https://www.zhihu.com/" target="_blank" rel="noopener noreferrer" aria-label="知乎"><Image src="/fastgpt-footer/zhihu.svg" alt="" width={24} height={24} /></a>
              <a href="https://github.com/labring/FastGPT" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Image src="/fastgpt-footer/github.svg" alt="" width={24} height={24} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
