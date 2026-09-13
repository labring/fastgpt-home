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

**China Site Analytics**:
Traffic and visitor-behavior measurements for the China Site, with a reporting scope separate from the International Site and Preview Hosts.
_Avoid_: Global site analytics, shared cross-site analytics

**FAQ Social Preview**:
The branded title, description, and image shown when an FAQ list or detail URL is shared.
_Avoid_: Thumbnail, banner

**P0 Remediation**:
A release-blocking website correction that restores a required security, discoverability, or social-preview outcome identified by the current audit.
_Avoid_: General cleanup, redesign

## Conversion

**内容咨询入口**:
技术中心、指南文章与 FAQ 详情页中引导读者提交商务咨询、业务需求或 POC 评估的转化入口。
_Avoid_: 留资 CTA, 咨询按钮

**案例咨询入口**:
案例中心中引导访客提交商务咨询、业务需求或 POC 评估的转化入口；导航、首页、空状态与案例详情中的同类入口属于同一概念。
_Avoid_: CTA, 表单弹窗, POC 按钮

**商务咨询页**:
承载商务咨询与 POC 评估需求提交的独立页面，可通过咨询链接直接访问。
_Avoid_: 咨询弹窗, 内嵌表单

**商务咨询弹窗**:
访客通过站内商务咨询入口打开的需求提交窗口，在当前页面承载商务咨询、业务需求或 POC 评估。
_Avoid_: 商务咨询页, 社群二维码

## Content

**深度场景内容**:
面向企业决策与实施评估的长篇中文文章，覆盖部署、平台选型、版本形态与业务场景等主题。
_Avoid_: 新闻稿, 技术文档

**技术中心分类**:
用于技术中心列表筛选与相关文章关联的产品分类。W3 深度场景内容统一归入“教程”分类。
_Avoid_: 编辑体裁

**技术页批次基线**:
一次技术内容导入开始前的已发布技术页身份集合，用于区分净新增技术页与技术页更新。
_Avoid_: 当前文件数, 交付记录数

**净新增技术页**:
技术页身份未出现在技术页批次基线中，并在本次导入中被接受的技术页。
_Avoid_: 导入记录, 新文件, 末段 slug

**技术页更新**:
技术页身份已出现在技术页批次基线中，并在本次导入中采用新正文或元数据的技术页。
_Avoid_: 替换页面, 净新增页面

**技术页导入量**:
一次导入运行中唯一且被接受的技术页身份数量，等于净新增技术页与技术页更新之和；被拒绝的重复项不计入。
_Avoid_: 文件数量, 交付记录数量, 页面总增量

**技术页导入清单**:
声明一次导入运行中每个已接受技术页身份、导入操作和来源追溯的版本化权威记录。
_Avoid_: 文件目录, 原始交付表

**技术内容决策账本**:
记录技术内容修正、拒绝和批准例外及其理由的版本化权威记录。
_Avoid_: 页面元数据源, 临时评审笔记

**技术页来源**:
支撑技术页正文的唯一外部资料 URL；同一 URL 重复出现时计为一个来源。
_Avoid_: 来源标记行, 未去重来源数

**技术页身份**:
由 locale 与归属方相对 canonical 路径组成，在技术内容域内唯一识别一个技术页。
_Avoid_: 末段 slug, 文件名

**归属方相对 canonical 路径**:
技术页在其 Locale Owner 上的稳定路径，不包含协议、域名和 locale 前缀。
_Avoid_: 完整 URL, 原始路由, 交付文件路径

**技术页交付源**:
内容负责人提供的外部原始材料，用于显式触发一次导入并保留来源追溯。日常构建和一致性检查使用仓库内的技术页导入清单、决策账本和发布投影。
_Avoid_: 日常构建输入, CI 依赖

**技术页发布投影**:
从技术页导入清单、决策账本和规范化正文派生的运行时注册表、搜索数据与发布内容。
_Avoid_: 独立权威来源, 原始交付物

**可发布技术页**:
身份、正文、来源与完整性校验均通过，可以进入发布流程的技术页。
_Avoid_: 已验证导出技术页, 已发布技术页

**已验证导出技术页**:
在指定 Site Variant 的静态导出产物中通过验证的可发布技术页。
_Avoid_: 已部署技术页, 已发布技术页

**已发布技术页**:
已部署并可通过生产 canonical URL 访问的技术页。
_Avoid_: Git 提交, 构建产物, 已验证导出技术页

**精选规范 FAQ**:
按批次发布的中文 FAQ 集合（首批 60 条、第二批 61–90 条），源数据为客户交付物仓库中的 xlsx，站点内为逐批转录的运行时快照，slug 手工维护。
_Avoid_: 存量 FAQ, legacy FAQ

**FAQ Meta Candidate**:
供应方提供并等待映射到现有 FAQ 内容身份的 metadata 建议记录。
_Avoid_: FAQ 页面, FAQ 内容身份

**URL Alias Authority**:
记录历史 `source host + path` 到 Terminal Target 的版本化、带证据裁决集合。
_Avoid_: FAQ 路由注册表, 重定向脚本

**Terminal Target**:
直接返回 canonical 内容与 HTTP 200 的最终 URL。
_Avoid_: Alias URL, 重定向链终点猜测

**FAQ 分类体系**:
跨批次稳定的中文 FAQ 分类（私有化部署、企业知识库、选型对比、智能客服、开发集成、开源与商业版、Agent 与工作流、POC 与实施、安全合规、行业场景、成本与用量等），站点筛选与内容审计共用。
_Avoid_: 栏目, 编辑体裁

**指南索引**:
`/guide` 及其本地化入口，按决策、实施、行业三类组织指南文章，并承担文章发现与返回导航。
_Avoid_: 指南首页, 资源中心

**指南文章**:
`/guide/{slug}` 下的单篇企业 AI 决策或实施内容，包含标题摘要、更新时间、正文与相关资源。
_Avoid_: 博客文章, 技术文章

**Deferred Technical Candidate**:
因证据、人工改写或版本验证尚待完成而保持未发布状态的临时技术内容候选；批次 authority
关闭前必须转成 accepted 或 denied。
_Avoid_: Denied Technical Candidate, Published Technical Page
