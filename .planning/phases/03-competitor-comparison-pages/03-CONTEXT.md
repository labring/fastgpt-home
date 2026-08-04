# Phase 3: 竞品对比页发布 - Context

**Gathered:** 2026-08-04
**Status:** Ready for planning

<domain>
## Phase Boundary

把 W2 已交付的四篇中文竞品对比初稿接入 FastGPT 官网，形成四个稳定、可核验、响应式的内容页。页面范围固定为 Dify、自研或直接运行开源、RAGFlow、MaxKB；每页都要经过产品、销售、法务签发门禁，完整记录来源、核验日期、版本或套餐、更新记录与 90 天复核日期。待签发页面继续提供预览，带有 `noindex`，从 sitemap 与公开导航排除，并进入失败清单。

</domain>

<decisions>
## Implementation Decisions

### Stable routes and locale scope

- **D-301:** 四个 slug 沿用已签发源稿的稳定值，不在本阶段重命名、改大小写或增加别名：
  - `/zh/compare/dify-vs-fastgpt`
  - `/zh/compare/self-build-vs-platform`
  - `/zh/compare/ragflow-vs-fastgpt`
  - `/zh/compare/maxkb-vs-fastgpt`
- **D-302:** 路由放在现有 `src/app/[lang]` 体系下的 `compare/[slug]`，只生成 `zh` 内容。`en`、`zh-hant` 和其他 locale 没有伪造译文，访问时保持 404 或现有 fallback 之外的明确缺失行为。Phase 3 不增加 `/compare` 索引页、筛选、搜索或分页。
- **D-303:** 中文页面的 canonical 固定为 `https://fastgpt.cn/zh/compare/{slug}`。`https://fastgpt.io/zh/compare/{slug}` 可以继续访问同一中文页面，但 canonical 指向 `.cn`；sitemap 只提交四个已发布的 `.cn` URL。没有真实英文译文时不输出 `en` hreflang，`zh`、`zh-CN` 与 `x-default` 指向中文 canonical。
- **D-304:** 四个 slug 是 W2 内容身份的一部分，后续批次沿用它们。Phase 3 不做 slug 规范化、301、删除或合并。

### Page content contract

- **D-305:** 四页共享同一内容顺序，标题和正文从对应 V1.0 草稿导入并保留含义：
  1. 产品重心分别是什么（首屏先说明双方适用条件并承认竞品强项）。
  2. 能力对照表（只有一方公开列出、双方都有但实现不同、对方强项三类）。
  3. 许可证与商业边界（开源/商业边界、二开、去品牌、多租户 SaaS，以及三年 TCO 成本项模板）。
  4. 怎么自己验证（同一数据集、模型、硬件与验收标准的 POC 方法）。
  5. 中性选型建议（按项目成败因素给出进入候选或 POC 的条件）。
- **D-306:** 能力表、POC 表和 TCO 表使用结构化数据模型渲染，页面正文保持中文优先。表格行必须能追溯到来源记录；读者看到的是事实、验证方法和选型条件，页面不写未经测量的优劣排名。
- **D-307:** 统一保留源稿的表述纪律：用“截至核验日，官方公开资料未列出”描述公开资料边界，用“待 POC”或“待合同”表示尚未形成结论；不把公开资料未列出写成绝对能力判断，不声明任一方普遍更准确、更高性能、更安全或更可靠，不把私有化写成数据绝不出域，不把开源写成没有商业限制。
- **D-308:** 四篇正文不出现任何竞品或 FastGPT 价格数字。涉及成本时只呈现许可/订阅、模型、解析/OCR、基础设施、实施、维保、升级、二开、运维与风险准备金等成本项，以及由读者按当日官网或书面报价填写的三年 TCO 模板；采购形态可以写，价格水平不能写。
- **D-309:** 现阶段不引用客户名称、案例数字、NDA 内容、非公开报价、销售演示截图、逆向工程细节或传闻。没有客户案例授权时，页面保留零案例正文的状态。
- **D-310:** 每页至少有一张信息图/示意图，图片使用稳定的 page asset、明确 alt 文本和固定宽高比；不得使用竞品 Logo 暗示背书。图片缺失、占位或版权边界未清时，页面保持预览并阻断公开。

### Source, fact, date and evidence handling

- **D-311:** 有效内容源固定为 W2 V1.1 的《FastGPT 竞品对比页选型与口径》与 `竞品对比页-首批4篇/` 四篇 V1.0 草稿；客户 KB 第 7 节及各篇官方公开资料是事实依据。V1.0/V1.1 的源文件、版本和 SHA-256 进入生成的 Phase 3 manifest，导入层不静默改写正文。
- **D-312:** 每个事实记录至少携带 `sourceId`、来源标题或官方 URL、来源章节/页面、抓取或核验日期、适用版本/套餐和证据状态。证据状态只允许 `official-public`、`not-publicly-listed`、`poc-required`、`contract-required`；`not-publicly-listed` 只描述公开资料范围，不推导产品无法实现。公开页面展示可访问的官方来源标签/链接，内部 manifest 保留本地交付文件与哈希。
- **D-313:** 初始事实核验日固定为 `2026-07-20`；源稿版本为 `V1.0 (2026-07-30)`，选型与口径文件为 `V1.1 (2026-07-30)`。`datePublished` 取实际公开签发日，`dateModified` 取最后一次内容/事实更新日，`nextReviewOn` 按最近一次成功核验或更新日加 90 个日历日计算。版本号、模板/插件数量、Cloud 配额、支持档位和价格等高频字段必须在复核时重新取证；价格继续不进入正文。
- **D-314:** 事实来源、核验日期、版本与套餐、更新记录四字段在页面底部公开显示。每条高风险能力表述都要有来源映射；POC/合同结论必须明确其验证条件与证据产物，不能把建议当作已验证事实。
- **D-315:** 生成 `artifacts/phase3/competitor-pages-manifest.json`（每页 slug、源指纹、status、sourceRefs、date fields、asset、internalLinks、signoffs、failures）和对应失败报告。manifest 是发布交接与 90 天复核的单一审计入口；实现可选择具体序列化细节，但必须保留这些可观察字段。

### Sign-off and publication gates

- **D-316:** 每页独立记录三方签发证据，三方均有 `status`、签发人/角色、时间戳、证据引用：
  - 产品：确认当期版本边界、能力表述和稳定公开资料；实验版、`rc` 或 `main` 分支能力不计入稳定事实。
  - 销售：确认 FastGPT 商业/采购形态、三年 TCO 写法、CTA 和全文不出现价格数字。
  - 法务：确认商标识别方式、比较广告风险、许可证的 SaaS/去品牌/二开分发边界；Logo 仅在有明确授权时使用。
- **D-317:** 签发门禁之外还必须通过内容审计：五个一级 H2 齐全，Meta title/description、keywords、来源四字段齐全，三类对照表与同条件 POC 方法存在，无价格数字、清单外产品点名、客户案例、绝对化未证实断言和残留占位符；官方来源链接、三条真实内链和 page asset 可解析。合规纪律声明中出现被禁止词时，审计器要识别其声明语境并打印豁免项，不能静默放过。
- **D-318:** 发布流程 fail-closed。任何来源、版本、签发、法务、内链、图片或内容审计失败都不得标记为公开；失败报告列出 slug、门禁、原因和证据路径。已签发的页面可以独立公开，未签发的页面继续预览，不用等待其他页面补齐。

### Preview and public state

- **D-319:** 内容状态只有 `preview` 和 `published`。四个记录都可构建为预览供审核，`preview` 页面显示清晰的预览标识，输出 `robots: noindex, nofollow`，从 sitemap、公开导航和 Article 的公开发布时间分发中排除；直接访问 URL 仍可供审核人员核验。
- **D-320:** 只有对应页面的三方 sign-off、内容审计、source manifest、真实内链和图片门禁全部通过，状态才能转换为 `published`。`published` 页面输出 `robots: index, follow`，进入 sitemap，并使用实际 `datePublished`/`dateModified`。状态转换必须更新 manifest 和失败报告，不依赖手工注释或隐式默认值。

### Metadata, structured data and links

- **D-321:** 每页独立使用源稿交付元数据中的 title、description、keywords；Open Graph 类型为 `article`，Twitter 使用 `summary_large_image`，图片指向该页信息图。交付元数据 HTML 注释只作为内部输入，不原样输出到正文。
- **D-322:** JSON-LD 只输出 `Article` 与 `BreadcrumbList`，不输出 `FAQPage`。`Article` 至少包含 headline、description、image、inLanguage、author/publisher、canonical `mainEntityOfPage`、datePublished 和 dateModified；BreadcrumbList 使用可访问的首页与当前页，避免指向尚未存在的比较索引页。
- **D-323:** 每页保留源稿列出的三类内链目标（私有化方案、开源/商业版说明、定价或 POC 指南）。当前仓库可确认 `/${lang}/price`，其他目标必须在实现时绑定到真实、可访问的 FastGPT 页面或官方文档链接；`#`、`TODO`、空 href 和无法解析的临时地址一律阻断公开。链接数据同时记录 label、target、locale、是否外部和验证结果。

### Responsive and existing code patterns

- **D-324:** 复用现有 `src/app/[lang]` 页面壳、`Navbar`、主题修正、站点 SEO helper、`JsonLd` 与静态 sitemap 模式；比较页使用独立内容数据模块和页面模板，避免把审计字段塞进现有 FAQ `FaqItem`。中文 canonical 复用 Phase 2 的 `.cn` 域名分流逻辑，不能直接套用只面向 `.io` 的通用 locale helper。
- **D-325:** 桌面端保持三列能力表和清晰的比较宽度；移动端将每一行转为带字段标签的纵向块（或等价的可读堆叠），POC/TCO 表也采用同样的行级堆叠，避免缩小字体、裁切文字或产生横向页面溢出。正文使用稳定的移动/桌面边距、行高和表格宽度，图片保留比例并在窄屏降为单列。
- **D-326:** 响应式验收覆盖至少一个桌面宽度和一个窄屏宽度：H1、首屏结论、五段 H2、表格字段、页脚来源和内链均可读、无重叠、无隐藏关键内容；预览与公开状态都要检查。

### the agent's Discretion

- 具体 TypeScript 类型、内容序列化格式、页面组件拆分、manifest 哈希实现、审计脚本实现和图片文件命名由研究与计划阶段决定，只要满足上述字段、路由、状态、门禁和可观察证据。
- 具体官方来源 URL 与三条内链目标由实现阶段按交付时可访问性核验后绑定；源稿里只有概念标签的目标不能被猜测填充。
- 具体 CSS token 和表格堆叠组件可沿用现有设计系统；不引入新的 UI 框架或内容编辑器。

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project contracts

- `.planning/PROJECT.md` — W2 目标、内容数量、竞品页发布纪律和三方签发约束。
- `.planning/REQUIREMENTS.md` — CMP-01 至 CMP-05 的路由、结构、SEO、证据和签发验收要求。
- `.planning/ROADMAP.md` — Phase 3 的固定边界、成功标准与 Phase 5 依赖。
- `.planning/STATE.md` — 当前阶段状态与 Phase 1/2 已锁定决策。
- `.planning/phases/01-source-data-identity-baseline/01-CONTEXT.md` — 源数据版本、审计/回滚门禁和既有实现边界。
- `.planning/phases/01-source-data-identity-baseline/01-03-SUMMARY.md` — 已实现的源身份与发布门禁证据模式。
- `.planning/phases/02-new-faq-bilingual-seo/02-CONTEXT.md` — `.cn` 中文 canonical、locale fallback 与静态 SEO 规则。
- `.planning/phases/02-new-faq-bilingual-seo/02-03-SUMMARY.md` — 静态构建、Meta、sitemap 和 JSON-LD 验证方式。

### W2 source package

- `/Users/longnv/bin/repo/fastgpt-data/W2-内容方向与首批内容-20260730/README.md` — V1.1 有效版本、四篇交付物、价格纪律和签发开放项。
- `/Users/longnv/bin/repo/fastgpt-data/W2-内容方向与首批内容-20260730/FastGPT-竞品对比页选型与口径-V1.1-星触达-20260730.md` — 四篇范围、五段模板、七条禁用表述、三方签发流程和 90 天复核规则。
- `/Users/longnv/bin/repo/fastgpt-data/W2-内容方向与首批内容-20260730/竞品对比页-首批4篇/README.md` — 四篇草稿自检结果、页面纪律、元数据字段和发布前配合事项。
- `/Users/longnv/bin/repo/fastgpt-data/W2-内容方向与首批内容-20260730/竞品对比页-首批4篇/01-Dify与FastGPT怎么选-V1.0-星触达-20260730.md` — Dify 页面正文、Meta、来源、内链和签发要求。
- `/Users/longnv/bin/repo/fastgpt-data/W2-内容方向与首批内容-20260730/竞品对比页-首批4篇/02-自研或直接跑开源与FastGPT怎么选-V1.0-星触达-20260730.md` — 自研/开源页面正文、四组成本、POC 和 TCO 模板。
- `/Users/longnv/bin/repo/fastgpt-data/W2-内容方向与首批内容-20260730/竞品对比页-首批4篇/03-RAGFlow与FastGPT怎么选-V1.0-星触达-20260730.md` — RAGFlow 页面正文、复杂文档 POC、许可证和版本边界。
- `/Users/longnv/bin/repo/fastgpt-data/W2-内容方向与首批内容-20260730/竞品对比页-首批4篇/04-MaxKB与FastGPT怎么选-V1.0-星触达-20260730.md` — MaxKB 页面正文、采购形态、三年 TCO、沙箱和治理 POC。

### Existing implementation patterns

- `src/app/[lang]/faq/[id]/page.tsx` — 动态 locale 内容页、静态参数、独立 Meta、canonical 和 JSON-LD 的现有页面模式。
- `src/app/[lang]/faq/page.tsx` — locale 数据读取、面包屑和列表 JSON-LD 的现有模式。
- `src/app/[lang]/price/page.tsx` — 中文本地化页面与 `/price` 真实内链目标。
- `src/app/[lang]/layout.tsx` — locale layout、站点配置、alternates 和静态语言参数。
- `src/app/sitemap.ts` — 静态 sitemap 生成和 locale-aware URL 枚举约束。
- `src/lib/seo.ts` — Phase 2 的 `.cn`/`.io` canonical 分流与 hreflang helper；竞品页需在此模式上补充专用逻辑。
- `src/components/JsonLd.tsx` — JSON-LD script、BreadcrumbList 和既有结构化数据组件。
- `src/components/home/Navbar.tsx`、`src/components/home/HomeThemeFix.tsx`、`src/components/home/Footer.tsx` — 现有站点壳与稳定外部 FastGPT 链接。
- `src/styles/globals.css` — 全局断点、字体和溢出行为。

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- `src/app/[lang]/faq/[id]/page.tsx` 的异步 params、`generateStaticParams`、`generateMetadata`、canonical、Open Graph/Twitter 和 `BreadcrumbJsonLd` 可作为比较页页面边界参考。
- `src/lib/seo.ts` 的 `getFaqCanonicalBaseUrl`、`getFaqCanonicalUrl`、`getFaqAlternates` 已表达 `.cn` 中文主域和 `.io/zh` 访问关系，比较页可提取共享 helper 或新增同语义函数。
- `src/components/JsonLd.tsx` 的 JSON-LD script 与 BreadcrumbList 可复用；Article schema 需要独立内容模型。
- `src/app/sitemap.ts` 已集中枚举静态 URL，比较页发布状态可在同一处过滤。
- `Navbar`、`HomeThemeFix`、现有全局样式和 `price` 页面提供页面壳、中文 locale 和移动布局基线。

### Established Patterns

- App Router 页面以 `[lang]` 为 locale 边界、静态 `generateStaticParams` 为路由集合，`dynamicParams = false` 可用于阻止未登记 slug。
- FAQ 页面将运行时展示字段与审计源快照分离；竞品页应保持同一边界，把来源、签发和复核字段放进独立内容/manifest 模型。
- Meta、canonical、social tags 和 JSON-LD 已有脚本验收；比较页应增加独立 exact-set、status、Article/Breadcrumb、source/evidence 和 responsive 检查。
- 现有站点有中文 `/zh/price`，私有化/开源说明多为外部官方文档或咨询链接；比较页必须验证每条内链可访问再发布。

### Integration Points

- 新比较页数据、页面路由和专用内容组件接入 `src/app/[lang]/compare/[slug]/`、SEO helper、JSON-LD、sitemap 和静态构建。
- Phase 5 将消费四页的 source manifest、签发状态、失败清单、构建产物、sitemap、Meta、结构化数据和桌面/移动验收证据。
- Phase 3 不修改 FAQ 数据或存量导入模块；生产代码之外的源稿继续作为只读输入。

</code_context>

<specifics>
## Specific Ideas

- 四篇源稿 SHA-256（用于首个 manifest 基线）：
  - Dify `c25614d6a8c7a1c294a5b828f93cd35fae00cc566b2355a27afb0e6f50adc27c`
  - 自研/开源 `311664f8f4dbbd77d4480675d0cdaef640584c5b944f1db6d0e166f7f378ca20`
  - RAGFlow `aff17f5fffdbdc9f2186334cdfef59267a0d69697cd7a069d41daf1360f8f1c1`
  - MaxKB `60162fa80f25cae929f5ca60c5461d6e57760f319d2f2b42f23b28dff7bb7002`
- 选型与口径 V1.1 SHA-256 为 `5877bce6f14d209c07bbf21c37cfd489fec1510c2022194ad2226e3010707a52`；四篇 README SHA-256 为 `77616d2543fd3a58a54f11ff201ae5e33890ba99dc1d15e6d2dbd12454a378b1`。
- W3 排期页面是 Dify 与自研/直接跑开源，W4 页面是 RAGFlow 与 MaxKB；排期信息保留在 manifest，不能成为跳过签发的理由。
- 当前源稿 audit 结果是硬 FAIL=0：四篇均有五段 H2、页脚四字段、Meta、POC/同条件声明、90 天复核，价格数字/清单外点名/客户案例/绝对化断言/占位符均为 0。

</specifics>

<deferred>
## Deferred Ideas

- HiAgent 页面（P2/W5，闭源且公开规格较少）单独建立内容与法务策略，等待前四篇签发流程跑通。
- Coze、腾讯元器、阿里百炼、n8n 本期不点名、不新增对比页；相关通用需求属于后续不点名内容方向。
- 英文及其他 locale 的正式译文、hreflang、比较页索引/搜索/筛选、客户案例、动态价格接入、实时 POC 结果、SEM 落地页和新的内容编辑后台留到后续阶段。
- 具体私有化、开源/商业说明和 POC 指南的最终目标 URL必须先取得真实可访问链接；链接门禁保持在本阶段，未解析的临时地址不能带入公开页。

</deferred>

---

*Phase: 3-竞品对比页发布*
*Context gathered: 2026-08-04*
