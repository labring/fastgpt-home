# FastGPT Website

This context defines the language used for the shared FastGPT marketing website and its domain-specific publications.

## Language

**Site Variant**:
A publication profile for the shared FastGPT website: the China Site, International Site, or a Preview Host. It determines locale and search behavior.
_Avoid_: Separate site, fork, deployment environment, domain mode

**China Site**:
The production website at `fastgpt.cn`, serving Simplified Chinese content for Mainland China.
_Avoid_: Chinese site

**International Site**:
The production website at `fastgpt.io`, serving English, Traditional Chinese, Japanese, Arabic, Vietnamese, Thai, Indonesian, and Malay content.
_Avoid_: English site, overseas site

**Simplified Chinese**:
The Chinese locale owned by the China Site.
_Avoid_: Chinese

**Traditional Chinese**:
The Chinese locale owned by the International Site.
_Avoid_: Chinese

**Locale Owner**:
The production site that provides the canonical URLs for a locale.
_Avoid_: Default domain

**Primary Locale**:
The locale served at a production site's root URL. Simplified Chinese is primary on the China Site, and English is primary on the International Site.
_Avoid_: Default language

**Supported Locale**:
A locale available on a production site across its localized experience. Individual pages may publish a narrower locale set.
_Avoid_: Published language

**Published Locale Set**:
The locales for which a specific page has complete, indexable localized content.
_Avoid_: Supported languages, available languages

**Preview Host**:
A temporary website used to review every supported locale before release. Search indexing is outside its purpose.
_Avoid_: Other domain, preview domain

**FAQ Social Preview**:
The branded title, description, and image shown when an FAQ list or detail URL is shared.
_Avoid_: Thumbnail, banner

**P0 Remediation**:
A release-blocking website correction that restores a required security, discoverability, or social-preview outcome identified by the current audit.
_Avoid_: General cleanup, redesign

## Content

**深度场景内容**:
面向企业决策与实施评估的长篇中文文章，覆盖部署、平台选型、版本形态与业务场景等主题。
_Avoid_: 新闻稿, 技术文档

**技术中心分类**:
用于技术中心列表筛选与相关文章关联的产品分类。W3 深度场景内容统一归入“教程”分类。
_Avoid_: 编辑体裁

**精选规范 FAQ**:
按批次发布的中文 FAQ 集合（首批 60 条、第二批 61–90 条），源数据为客户交付物仓库中的 xlsx，站点内为逐批转录的运行时快照，slug 手工维护。
_Avoid_: 存量 FAQ, legacy FAQ

**FAQ 分类体系**:
跨批次稳定的中文 FAQ 分类（私有化部署、企业知识库、选型对比、智能客服、开发集成、开源与商业版、Agent 与工作流、POC 与实施、安全合规、行业场景、成本与用量等），站点筛选与内容审计共用。
_Avoid_: 栏目, 编辑体裁
