# Phase 1: 源数据与身份基线 - Context

**Gathered:** 2026-08-04
**Status:** Ready for planning

<domain>
## Phase Boundary

本阶段建立 W2 的可审计输入契约：锁定 V1.1 精选 FAQ 的权威工作表与字段保真规则，完成 2,000 行存量分类表与现有 1,400 条仓内 FAQ 的身份差异说明，定义九类分类 ID/本地化标签契约，并为后续批量写入规定 dry-run、失败阻断和回滚证据门禁。阶段只产出验证与身份/category contract 的规划依据，不修改生产 FAQ、路由、sitemap 或页面代码。

</domain>

<decisions>
## Implementation Decisions

### 权威源与指纹
- **D-01:** 新增 FAQ 的唯一导入源是交付包中的 `FastGPT-精选规范FAQ-首批60条-V1.1-星触达-20260730.xlsx` 的 `FAQ Data` sheet。V1.1 工作簿中的 `V1.1 变更记录` 只作为版本溯源，不参与记录读取；V1.0 工作簿保留为历史对照。
- **D-02:** 每个导入/验证批次必须记录源文件 SHA-256、文件字节数、sheet 名称、表头顺序、有效数据行数和生成时间。当前有效 FAQ 源指纹为 `53a6f0d89f1ef2cd688e4c50dc7b59d69276a8ebb24e65f9979e0156e8a85547`，大小 47,878 bytes，`FAQ Data` 数据行 60。
- **D-03:** 存量身份与分类的唯一源是 `存量修复/FastGPT-存量FAQ分类重挂对照表-V1.1-星触达-20260730.xlsx` 的 `分类重挂对照表` 数据区（表头后 2,000 行）；`汇总` 与 `迁移矩阵` 只用于交叉核对。当前有效指纹为 `751a479680bfc987b9394c7429100d8f09269cc7ad8a698ff97b34415a6733b0`，大小 155,689 bytes。

### 新增 FAQ 字段与校验
- **D-04:** `FAQ Data` 的八个发布字段按原列名和顺序保留：`slug`、`no`、`category`、`question`、`answer`、`title`、`description`、`keywords`；两个审计字段 `事实来源`、`待客户确认` 同步保留。任何导入层改名、截断、拼接、翻译或丢弃审计列都构成校验失败。
- **D-05:** 当前基线必须证明恰好 60 行、14 个 category、60 个唯一 slug、slug 全部符合全小写连字符规则 `^[a-z0-9]+(?:-[a-z0-9]+)*$`、`no` 从 1 到 60 连续，以及上述八个发布字段逐行非空。当前校验结果：60/60、14 类、60 个唯一 slug、无坏 slug、无空必填字段。
- **D-06:** 新 FAQ 的 14 个业务 category 保留源值，后续页面阶段再处理显示与路由；本阶段不把它们强行折叠到存量 FAQ 的九类体系。逐字段比对以工作簿原值为准，生产代码中的 `FaqItem` 六字段模型不足以替代十字段审计快照。

### 存量身份匹配与冲突状态
- **D-07:** 存量匹配建立三路候选并按以下优先级裁决：①规范化后的完整线上 URL/路径证据；②规范化空白后的完整 `问题（原文）` 唯一匹配；③仓内 repo key 仅作一致性校验和最后候选。URL 与问句命中不同对象时标记冲突并阻断；repo key 与问句不一致时同样标记冲突，不以 key 覆盖正文身份。
- **D-08:** “规范化”只处理 URL 主机名大小写、尾部 `/` 和可逆 URL 编码，以及问句两端空白/Unicode NFC；保留原始 URL、原始问句和仓内 key 作为证据列。存量正文、slug 和线上 URL 是只读字段，身份基线不生成新 slug、不改 URL。
- **D-09:** 当前证据基线固定为：仓内 `src/faq/en.ts` 有 1,400 个唯一 key/问句；分类表有 2,000 行、1,990 个唯一 URL 和 1,990 个唯一问句；其中 1,400 个唯一问句可命中仓内对象，590 个唯一源对象没有仓内对象。URL 尾段直接等于仓内 key 只有 25 条，证明旧 key 不能独立承担身份匹配。
- **D-10:** 10 组重复 URL（每组两行）在身份解析前进入 `duplicate-url` 冲突状态，保留两条源行及其行号、问句、分类建议和置信度；重复行不能互相覆盖，也不能自动择一。当前重复 URL 组为：`How-to-use-AI-to-improve-the-accuracy-of-knowledge-Q&A`、`Can-AI-automatically-generate-data-security-reports`、`What-does-Prompt-Engineering-mean`、`What-is-the-difference-between-zero-shot-learning-and-few-shot-learning`、`How-to-make-AI-generate-a-brand-reputation-analysis-report`、`Can-AI-analyze-competitors'-marketing-strategies`、`Can-AI-help-me-write-a-short-video-script`、`How-to-prevent-AI-Agents-from-giving-irrelevant-answers`、`How-to-prevent-AI-Agents-from-outputting-inappropriate-content`、`How-to-ensure-the-long-term-maintainability-of-AI-Agents`。
- **D-11:** 无 URL、问句和 repo key 三路唯一命中的源行进入 `unmatched-source` 冲突状态；当前 590 个缺失源对象必须全部出现在失败清单。冲突状态是可审计输出，不允许静默丢弃、自动创建占位 FAQ 或写入分类/Meta。
- **D-12:** 每一行都保留稳定的源行身份（源文件指纹 + sheet + 行号），匹配成功的行再绑定仓内 repo key；冲突行使用 `duplicate-url`、`unmatched-source`、`url-question-conflict` 或 `key-question-conflict` 状态。后续计划负责选择具体序列化字段和哈希算法，但状态名称与“每行唯一身份或明确冲突”是锁定契约。

### 九类分类契约
- **D-13:** 存量新分类只存稳定 ID，显示标签按 locale 映射。锁定以下 ID 与标签：

  | ID | 中文标签 | English label |
  | --- | --- | --- |
  | `data-and-document-processing` | 数据与文档处理 | Data & Document Processing |
  | `deployment-and-security` | 部署与安全 | Deployment & Security |
  | `content-and-creativity` | 内容创作 | Content & Creativity |
  | `industry-applications` | 行业应用 | Industry Applications |
  | `concepts-and-selection` | 概念与选型 | Concepts & Selection |
  | `office-and-collaboration-automation` | 办公与协作自动化 | Office & Collaboration Automation |
  | `platform-value-and-trends` | 平台价值与趋势 | Platform Value & Trends |
  | `integration-and-development` | 集成与开发 | Integration & Development |
  | `customer-service-and-support` | 客户服务与支持 | Customer Service & Support |

- **D-14:** 分类导入同时保留源 `原分类`、新分类 ID、置信度、人工复核状态、原问句和原 URL。当前 V1.1 分布为 350/292/272/234/223/190/164/140/135，合计 2,000；置信度为高 576、中 43、LLM 913、低 468，人工复核标记为抽检 913、是 468。V1.0 汇总中旧的“待人工归类 913 / 需复核 1,381”属于过期中间态，不能作为导入依据。

### 发布门禁、失败与回滚
- **D-15:** 所有批次先执行 dry-run，生成源指纹、候选匹配统计、分类计数、重复/缺失/不一致冲突清单和预期写入数；dry-run 本身零写入。源指纹、表头、行数、必填字段、唯一性或字段哈希任一失败，批次状态为 `blocked`。
- **D-16:** 默认全量批次采用 fail-closed：存在任何重复 URL、未匹配源行、URL/问句/key 不一致、分类 ID/locale 缺失或正文/slug/URL 变化时，禁止部分写入。后续若需要处理已匹配子集，必须使用显式行号 allowlist 和独立批次记录，不能把异常行从总数中隐去。
- **D-17:** 成功写入必须绑定不可变批次 ID、源 SHA-256、逐行前置快照和结果清单；相同批次与相同指纹重复执行应为幂等 no-op，指纹变化必须创建新批次并重新 dry-run。回滚只接受对应批次 ID 的前置快照，恢复正文、slug、URL 和元数据到写入前状态。
- **D-18:** 事务/文件锁/数据库实现方式留给 Phase 4 规划；本阶段锁定可观察行为：预检失败零写入、失败清单完整、成功批次可重放、回滚输入可验证，任何失败不得留下半批次结果。

### the agent's Discretion
后续研究与计划可以决定 XLSX 解析库、哈希快照的具体序列化格式、存储介质及事务实现，只要满足上述字段保真、身份优先级、冲突状态、dry-run 和回滚行为。

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project contracts
- `.planning/PROJECT.md` — W2 目标、有效版本、数量边界、发布安全约束。
- `.planning/REQUIREMENTS.md` — FAQ-01/02 与 LEG-01/02 验收要求及唯一 phase 映射。
- `.planning/ROADMAP.md` — Phase 1 边界、成功标准和后续依赖。
- `.planning/STATE.md` — 当前里程碑状态与恢复入口。

### W2 source package
- `/Users/longnv/bin/repo/fastgpt-data/W2-内容方向与首批内容-20260730/README.md` — 有效版本、字段、数量和存量边界说明。
- `/Users/longnv/bin/repo/fastgpt-data/W2-内容方向与首批内容-20260730/FastGPT-精选规范FAQ-首批60条-V1.1-星触达-20260730.xlsx` (`FAQ Data`) — 60 条新增 FAQ 权威数据；SHA-256 `53a6f0d89f1ef2cd688e4c50dc7b59d69276a8ebb24e65f9979e0156e8a85547`。
- `/Users/longnv/bin/repo/fastgpt-data/W2-内容方向与首批内容-20260730/存量修复/FastGPT-存量FAQ分类重挂对照表-V1.1-星触达-20260730.xlsx` (`分类重挂对照表`) — 2,000 行身份与九类建议；SHA-256 `751a479680bfc987b9394c7429100d8f09269cc7ad8a698ff97b34415a6733b0`。
- `/Users/longnv/bin/repo/fastgpt-data/W2-内容方向与首批内容-20260730/存量修复/README.md` — 存量只改元数据、URL 正文保护和 V1.1 汇总修正说明。
- `/Users/longnv/bin/repo/fastgpt-data/W2-内容方向与首批内容-20260730/FastGPT-存量内容比对与冲突检查-V1.0-星触达-20260728.md` — 存量与新增内容边界及原分类错位证据。

### Current FAQ implementation
- `src/faq/index.ts` — `faq` 英文 key 集合作为静态参数/sitemap 来源，中文 locale overlay 与英文 fallback 规则。
- `src/faq/en.ts` — 当前 1,400 条英文仓内 key、问句和线上 URL 生成基础。
- `src/faq/zh.ts` — `FaqItem` 六字段类型及中文 overlay 现状；不足以承载十字段审计快照。
- `src/app/[lang]/faq/page.tsx` — FAQ 列表读取与分类/搜索数据边界。
- `src/app/[lang]/faq/[id]/page.tsx` — 详情页按 repo key 解码、查找和生成静态参数的现状。
- `src/app/sitemap.ts` — FAQ sitemap 当前遍历 `Object.keys(faq)` 的约束。

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/faq/index.ts` 的 `getFaqData`、`getFaqItem`、`resolveFaqLocale` 已集中封装 locale fallback，可作为后续新增数据接入时的边界参考。
- 详情路由已有 `decodeURIComponent` 后按 ID 查找的路径，说明保留现有 URL 与编码行为是稳定性前提。

### Established Patterns
- FAQ 数据当前以静态 TypeScript 对象导出，英文 key 驱动 `generateStaticParams` 和 sitemap；中文数据按同 key overlay。
- 现有 `FaqItem` 只包含 Category、Question、Answers、Title、Description、Keywords，审计字段应留在独立源快照/导入清单，不能伪装成运行时字段。

### Integration Points
- Phase 2 将消费本阶段的 60 条 FAQ 校验结果并扩展静态参数、列表、详情和 sitemap。
- Phase 4 将消费本阶段的身份映射、九类 ID、冲突清单和批次门禁写入存量 Meta/分类；Phase 5 消费指纹、批次和回滚证据。

</code_context>

<specifics>
## Specific Ideas

- 有效输入版本以交付包标注的 V1.1 为准；V1.0 仅用于变更追溯。
- 存量 FAQ 的正文、slug、URL 保持原样；身份基线解释差异并阻断异常行，后续批次不静默补齐 590 个缺失对象。
- 中文 FAQ 的 14 个业务类别与存量九类重挂体系保持分离，避免把新增内容的发布分类误当成存量分类 ID。

</specifics>

<deferred>
## Deferred Ideas

- Phase 2：把 60 条中文 FAQ 接入运行时数据、静态参数、列表筛选、详情页、sitemap 和双域 SEO。
- Phase 3：竞品对比页正文、签发门禁和响应式模板。
- Phase 4：实现 XLSX 导入、100 条 Meta 与 2,000 条分类写入、幂等批次和可执行回滚。
- Phase 5：整批构建、自动化、人工与线上验收交接包。

</deferred>

---

*Phase: 1-源数据与身份基线*
*Context gathered: 2026-08-04*
