# FastGPT 必应广告「一词一页」落地页实施方案

## 状态与范围

本文分析 `/Users/longnv/bin/repo/fastgpt-data/Week08/Bing落地页-20260911/` 的三份交付物，定义必应搜索广告落地页进入本仓库的路由、数据、表单、归因与验证方案。本文只交付方案；源码保持原样，实现经 GSD 工作流启动。

- 仓库基线：分支 `bing-ad`（`6c2ae501`）
- 证据日期：2026-09-14（Asia/Shanghai）
- 源素材：《必应搜索广告一词一页落地页方案 V1.0》PPTX（23 页）、《必应广告落地页替换表 V1.0-20260911》XLSX（页面内容 / 广告文案 / 口径说明 三个工作表）、8 张静态 HTML 预览 + 1 张索引页
- 决策方式：两轮共 13 项问答逐项确认（2026-09-14），关键决策已固化为 ADR 0013、0014 与 CONTEXT.md「Advertising」术语
- 唯一内容源：20260911 替换表 V1.0 与 8 张 HTML 预览，数据化时文案一字不改

## 背景与目标

2026-01-01 至 2026-05-28 必应账户 949 个关键词消费 ¥20,342.48，全部指向同一落地页（fastgpt.hzdfkj.cn，公网实测 403）；57.9% 的消费花在竞品词上，落地页却没有一页讲对比。一词一页方案用首批 8 张页覆盖 95.9% 的期间消费。进入本仓库的目标是三件事：与官网表单同域承接（来源参数与访客标识不跨域丢失）、来源参数随线索入库、表单提交回传必应转化事件。

## 已确认决策

| # | 决策点 | 结论 |
|---|--------|------|
| 1 | 路由与数据组织 | `src/app/ads/[slug]/page.tsx` + 类型化数据注册表，`dynamicParams = false`，`generateStaticParams` 从注册表生成 |
| 2 | 构建变体 | cn 与 preview 构建输出，io 构建不输出 |
| 3 | 视觉与导航 | 1:1 还原预览稿：浅色独立 CSS module、精简导航（logo + 定价/文档/案例 + 主按钮），不复用 HeroUI/官网主题（ADR 0013） |
| 4 | 表单形态 | 一步式 4 字段（姓名、手机或邮箱、公司、咨询主题）+ 隐私勾选；CRM 支持线索补交后可升两步式 |
| 5 | 归因字段 | utm 五项 + `source_page_path` + `visitor_id` + `consent_at` + `consent_version` 随 `/contacts/submit` 提交（ADR 0014） |
| 6 | 隐私政策链接 | 勾选框与同意记录入库先行，协议 URL 暂用占位，列入上线前置项 |
| 7 | UET 转化回传 | 本轮实现：`NEXT_PUBLIC_BING_UET_ID` 驱动，缺省静默返回 null，表单成功后触发转化事件 |
| 8 | 内容源 | 替换表 V1.0 定稿；LOGO 墙保留占位区块；案例数字沿用 contact 页表述 |
| 9 | CRM 容忍度 | CRM 对未知字段按忽略处理，直接按新字段集发送 |
| 10 | ContactForm | 官网 /contact 表单不动，新字段只进 `AdsLeadForm` |
| 11 | 索引页 | 生产站不建 `/ads/` 索引页（投放数字属内部数据）；走查用 fastgpt-data 预览包 |
| 12 | 交付拆分 | 单 PR：页面 + 注册表 + 表单 + 归因 + UET + 验证脚本 |
| 13 | 方案文档 | 写入本仓库 docs/reviews/（即本文） |

## 信息架构与路由

新增 `src/app/ads/[slug]/page.tsx`，复刻 `src/app/compare/[slug]/page.tsx` 的静态路由模式：

- `generateStaticParams`：`currentSiteVariant === 'io'` 时返回 `[]`（io 构建不产出任何 /ads/ 页），cn 与 preview 返回 8 个 slug。无需改 `scripts/clean-locale-output.js`。
- `dynamicParams = false`：未注册 slug 直接 404。
- `generateMetadata`：
  - `robots` 用 `getRobotsPolicy(false, true)`（`noindex,follow`，`src/lib/seo.ts:8`）——/ads/ 页与站内对比页、FAQ 主题重叠，同时进索引互相稀释（替换表口径说明）。
  - `alternates.canonical` 用 `getOwnedLocaleUrl('zh', '/ads/{slug}')`——cn 构建产出自身 canonical，preview 构建也指向生产 owner 域名，与既有 preview 页惯例一致。
  - 无 hreflang（单语言页，不输出 alternates.languages）；不输出 OpenGraph，与预览稿一致。
- 不进 `src/app/sitemap.ts`（noindex 页不入站点地图）；不改 `robots.ts`（全站 allow，靠页面 meta 收敛）。
- 不加站内导航：header/footer 是词典手工链接列表，本批不加链接，广告访客只能从广告进入。
- 不建 `/ads/` 索引页；nginx 按 `try_files $uri $uri.html`（`nginx.conf:123`）直接服务静态导出，无需新增配置。

## 数据注册表

8 个 slug（按期间消费降序）：`dify-vs-fastgpt`、`private-deployment`、`brand`、`coze-vs-fastgpt`、`opensource-vs-fastgpt`、`agent-workflow`、`ai-customer-service`、`enterprise-knowledge-base`。

两个文件，读写边界严格分离（遵循 AGENTS.md 内容卫生约束）：

**`src/content/ads/pages.ts`（读者可见内容，server component 引用）**

每页一行，字段与替换表 Sheet1 一一对应：

```ts
interface AdsLandingPage {
  slug: string;                    // '/ads/dify-vs-fastgpt' → 'dify-vs-fastgpt'
  category: string;                // 首屏徽标：平台选型 / 版本与授权 …
  keywordGroup: string;            // 承接词组（dify、dify ai、dify 企业版）
  h1: string;
  subtitle: string;
  sections: { heading: string; body: string }[];  // 三段递进正文，恰好 3 段
  trustLine: string;
  form: { title: string; subtitle: string; button: string };
  readingLinks: { label: string; url: string }[]; // 延伸阅读，恰好 3 条
  updatedAt: string;               // 页脚「页面更新：2026年9月11日」
}
```

**`src/content/ads/ad-ops.json`（非渲染注册表，仅验证脚本消费）**

每页：期间消费/点击率/均价（投放数字，不进页面）、广告标题 1-3、描述 1-2、显示网址、附加信息、带参最终地址。本文件不得被 `src/app`、`src/components` 引入，只被 `scripts/verify-ads.js` 读取——内部投放数据与页面渲染物理解耦，仓库任何页面都不会把它带进产物。

**`src/content/ads/loader.ts`（构建期校验）**

仿照 `src/lib/tech-center-content.ts` 与 `src/content/competitor/loader.ts`：slug 白名单校验、字段齐全性（3 段正文、3 条链接、非空字符串）、延伸阅读 URL 必须是 `https://fastgpt.cn` 或 `https://solutions.fastgpt.cn` 公网地址、校验失败 throw 带页名的描述性错误。导出 `getAdsPage(slug)`、`getAdsPageSlugs()`、`isAdsPageEnabled()`（按 `currentSiteVariant` 判定 io 关闭）。

## 组件设计

全部位于 `src/components/ads/`，样式单一文件 `ads.module.css`，视觉取自预览 HTML 的 Arco 色板（`--brand:#3370ff` 等 CSS 变量原样保留）：

- **`AdsLandingPage.tsx`（server）**：组合第一屏（逐词）与第二屏（共用）。第二屏各模块（为什么选 FastGPT 三卡、案例三卡 + LOGO 占位、延伸阅读、底部回表单、页脚）只在此文件出现一次；新增一张页 = 注册表加一行。
- **`AdsNavbar.tsx`（server）**：logo + 定价 / 文档 / 案例中心 + 「商务咨询」锚点按钮，链接与预览稿一致（`fastgpt.cn/price`、`doc.fastgpt.cn`、`solutions.fastgpt.cn/customers`）。
- **`AdsLeadForm.tsx`（'use client'）**：见下节。位于第一屏右侧 `position: sticky`，移动端按预览稿媒体查询下移；页尾「领取 ××」按钮锚回 `#form`。
- **LOGO 墙**：预览稿的虚线占位区块原样保留，素材到位前是注册表一个 `logoWallPending: true` 标记，verify 脚本放行该占位文案。

## 表单与归因链路

**可见字段（4）**：姓名、手机或邮箱（`name="phone"`，沿用官网「手机或邮箱」语义）、公司名称、咨询主题（select：私有化部署 / SaaS 版 / 渠道合作 / 其他）。

**提交归因字段（9，替换表口径全量）**：`utm_source`、`utm_medium`、`utm_campaign`、`utm_term`、`utm_content`、`source_page_path`、`visitor_id`、`consent_at`、`consent_version`。

取值方式（提交时从 URL 与已有归因存储组装 JSON；勾选时间保存在表单状态）：

- `utm_*`：`location.search` 直读；缺省时回退 `leadAttribution` 已存的 last-touch 快照。
- `source_page_path`：`location.pathname`。
- `visitor_id`：`getVisitorId()`（`src/lib/visitorId.ts`）。
- `consent_at`：勾选隐私框时写 ISO 时间戳。
- `consent_version`：常量 `'bing-ads-2026-09'`。

**提交**：`POST ${NEXT_PUBLIC_CRM_API_URL}/contacts/submit`，payload 为既有 10 字段 + 9 个归因字段：

```json
{
  "name": "…", "phone": "…", "company": "…", "consultation_topic": "…",
  "position": null, "used_open_source": null, "project_stage": null,
  "budget": null, "notes": null,
  "visitor_id": "…", "source": "bing_ads",
  "utm_source": "bing", "utm_medium": "cpc", "utm_campaign": "dify-vs-fastgpt",
  "utm_term": "…", "utm_content": "…", "source_page_path": "/ads/dify-vs-fastgpt",
  "consent_at": "…", "consent_version": "bing-ads-2026-09"
}
```

- 提交前照抄 ContactForm 的双保险：`trackVisit()` + `void reportAnonymousAttribution()`（`/visitors/track` 按 visitor_id 关联的旧链路继续生效，新字段是主链路）。
- `source` 固定 `'bing_ads'`；若 `getSubmissionSource()` 有枚举校验，在常量层扩展该枚举。
- 无 CRM URL 时按 preview 站点假提交（同 `ContactForm.tsx:435` 模式）。
- 成功态：替换文案 + Rybbit 事件（沿用 `RYBBIT_EVENTS.businessConsultSubmitSuccess`）+ UET 转化事件。

**msclkid 不进表单 payload**：替换表隐藏字段清单未含它，最终地址的 `{msclkid}` 由既有 `leadAttribution` click-id 捕获经 `/visitors/track` 入库，链路已存在。

## 广告最终地址

投放后台统一按替换表 Sheet1 末列填入（动态插入参数以必应后台当日校验为准）：

```text
https://fastgpt.cn/ads/{slug}?utm_source=bing&utm_medium=cpc&utm_campaign={slug}&utm_term={keyword}&utm_content={MatchType}&msclkid={msclkid}
```

## 转化回传（UET）

- 新增 `src/app/UetAnalytics.tsx`（'use client'）：仿照 `BaiDuAnalytics.tsx` 模式，`NEXT_PUBLIC_BING_UET_ID` 缺省返回 null；存在时加载 UET 脚本并挂到 `DeferredSiteIntegrations`。
- 新增 `src/lib/uet.ts`：`fireUetConversion()` 向 `window.uetq` 推送转化事件（事件名 `lead_submit`，与必应后台转化目标对应）。
- root layout 已挂 `DeferredSiteIntegrations` + `LeadAttribution`，/ads/ 页自动继承：utm/msclkid 捕获、Rybbit/Baidu/Clarity 照常工作，无需页面级接线。
- 必应后台的 tag ID 与转化目标配置是上线前置项（见下）。

## 验证

新增 `scripts/verify-ads.js`（遵循 verify-* 家族惯例：`console.error` + exit 1，通过打印 `ADS verification passed`），并在 `package.json` 增加 `verify:ads`、纳入 `verify-release.js` 聚合（若该脚本为聚合入口）。检查项：

1. **产物存在**：cn 构建 `out/ads/*.html` 恰好 8 张；io 构建产物中无 `/ads/` 路径。
2. **收录策略**：每张页含 `noindex, follow` robots meta、canonical 指向 `https://fastgpt.cn/ads/{slug}`、sitemap.xml 不含 `/ads/`。
3. **四处一致**：`ad-ops.json` 中每行的 slug、最终地址、广告字段完整性及关键词组对应关系由脚本核对；关键词、广告标题与 H1 的语义一致性由内容审核确认。
4. **表单完整**：每张页 HTML 含 4 个可见字段、隐私勾选框和政策阅读链接；`verify:ads-regression` 检查实际发送至 CRM 的完整 19 字段 JSON，其中包含 9 个归因字段。
5. **延伸阅读**：3 条 URL 与注册表一致且为公网 HTTPS 地址。
6. **占位白名单**：LOGO 墙占位文案放行，其余「需客户提供 / 占位 / TODO」字样按 content-hygiene 既有规则拦截。

既有门禁自动覆盖：`content-hygiene`（HTML 模式扫 `out/`）、`clean-locale-output`（变体产物清理）、`fix-html-lang.js`（html lang 修正对 /ads/ 同样生效，需为 `zh-CN`）。

## 风险与上线前置项

| # | 项 | 说明 | 责任 |
|---|----|------|------|
| 1 | CRM 对缺失字段的必填性 | 现网 `/contacts/submit` 此前总带 `position/used_open_source/project_stage`；服务端是否容忍 `null` 未验证。**上线前对 CRM 真实提交一次 4 字段样例**；若拒绝，回退方案是表单扩到 7 字段或恢复两步式 | 待确认 |
| 2 | 隐私政策 URL | 复用官网配置的隐私政策地址 `https://doc.fastgpt.cn/docs/protocol/privacy`，保留勾选框与 `consent_at/consent_version` | 已补阅读入口；咨询用途适用范围由业务确认 |
| 3 | UET tag ID 与转化目标 | `NEXT_PUBLIC_BING_UET_ID` + 必应后台配 `lead_submit` 转化目标 | 投放侧 |
| 4 | 动态插入参数 | `{keyword}/{MatchType}/{msclkid}` 可用清单以投放后台当日校验为准 | 投放侧 |
| 5 | LOGO 墙素材 | 需可公开授权素材后替换占位区块 | 客户 |
| 6 | 钩子物料 | 八份承诺交付的物料（对比清单、自查表等）必须真实存在，由顾问发送 | 星触达 |
| 7 | 隐私勾选基线差异 | 官网 /contact 实测无勾选框，落地页有；两入口的合规口径不一致，留待全站统一 | 待定 |

## 交付物清单

**新增**：

- `src/app/ads/[slug]/page.tsx`
- `src/content/ads/pages.ts`、`src/content/ads/ad-ops.json`、`src/content/ads/loader.ts`
- `src/components/ads/AdsLandingPage.tsx`、`AdsNavbar.tsx`、`AdsLeadForm.tsx`、`ads.module.css`
- `src/app/UetAnalytics.tsx`、`src/lib/uet.ts`
- `scripts/verify-ads.js`

**修改**：`package.json`（`verify:ads`）、`scripts/verify-release.js`（聚合入口，若适用）、`src/app/DeferredSiteIntegrations.tsx`（挂 UetAnalytics）。

**不动**：`sitemap.ts`、`robots.ts`、`ContactForm.tsx`、Navbar/Footer、`src/locales/*`、nginx 配置。

**本次已落**：`CONTEXT.md`（Advertising 术语）、`docs/adr/0013`、`docs/adr/0014`、本文。

## 实施步骤

单 PR（决策 #12），经 `/gsd-execute-phase` 执行，顺序：

1. 注册表 + loader + 路由 + `AdsLandingPage`/`AdsNavbar`/样式：8 张页静态可访问，cn 构建产物含全部页面。
2. `AdsLeadForm`：4 字段 + 提交时归因 payload + 成功态；preview 站点可走查全流程。
3. UET：`UetAnalytics` + `fireUetConversion` 接入提交成功回调。
4. `verify-ads.js` + release 聚合 + 三变体构建验证（cn 全量 8 页 / io 零页 / preview 可走查）。
5. 上线核对清单逐项打勾（上表 1-4 项为开闸前置）。

## 验收对照

| 项目 | 口径 | 取数来源 |
|------|------|----------|
| 落地页数量 | 已上线且可访问的 /ads/ 页面数 = 8 | 站点地图外逐条访问实测 |
| 收录策略 | 8 张页均 noindex,follow 且不入 sitemap | `verify:ads` |
| 四处一致 | 词、广告标题、H1、地址一致的广告组占比 100% | `verify:ads` + 投放后台导出逐条核对 |
| 归因完整率 | 带齐 9 个归因字段的线索数 ÷ 全部广告线索数 | 线索表字段完整率统计 |
| 单条线索成本 | 消费 ÷ 去重后有效线索数 | 投放后台转化列与 CRM 双向核对 |
| 点击率 | 按承接词组分组，与改造前同组对比 | 必应推广后台关键词报表 |

线索去重与有效线索判定口径需在第一阶段与客户 CRM 现有规则对齐后写入执行文档，之后不再变更（PPT 验收口径原文）。
