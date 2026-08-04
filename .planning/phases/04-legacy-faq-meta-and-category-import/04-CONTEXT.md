# Phase 4: 存量 FAQ Meta 与分类导入 - Context

**Gathered:** 2026-08-04
**Status:** Ready for planning

<domain>
## Phase Boundary

本阶段把 W2 存量修复包接入现有英文 FAQ：精确读取补 Meta 工作簿的 100 行，形成 English FAQ 的 Title/Description overlay；读取分类重挂工作簿的完整 2,000 行，保留九类稳定分类 ID、原分类、置信度、人工复核标记和每行导入结果。源表中的 Keywords 只作为审计证据，运行时保留既有值。写入只作用于已经存在且身份唯一的线上 FAQ 元数据与分类字段，正文、问题、slug、线上 URL永久保持原值。批次必须先 dry-run，完整批次在身份冲突时 fail-closed；任何可写子集只能由显式源行 allowlist 授权，并以独立批次记录、前置快照和可验证回滚完成。

</domain>

<decisions>
## Implementation Decisions

### Meta overlay source and scope

- **D-401:** Meta 的唯一权威输入是 `/Users/longnv/bin/repo/fastgpt-data/W2-内容方向与首批内容-20260730/存量修复/FastGPT-存量FAQ补Meta-首批100条-V1.0-星触达-20260728.xlsx` 的 `FAQ Data` sheet。文件指纹固定为 SHA-256 `d9aeb3ede23d29a2c2a65eee61df381366db68c0301df9cedeee2e7ae9489811`、30,716 bytes；表头顺序为 `no`、`category`、`question`、`title`、`description`、`keywords`、`url`、`字符数(T/D)`、`生成方式`，数据区为第 2–101 行，恰好 100 行。
- **D-402:** 100 行是一个完整、可审计的 overlay 数据集：100 个唯一 `question`、100 个唯一 `url`、源行号和 `no` 都保留。每一行先按 Phase 1 的 URL → 问句 → repo key 证据优先级解析到唯一仓内 key；当前按问句可命中 76 行，24 行需要补齐真实对象或进入失败清单。未形成唯一身份的行不会被静默丢弃，也不会让批次宣称完成 100 行。
- **D-403:** Meta 写入字段严格限定为源行的 `title`、`description`；源 `keywords` 只进入审计报告，既有关键词值保持原样。`category` 仅作为源证据，分类改挂由独立分类批次负责。Meta 批次只更新 English FAQ 记录，保持现有 Chinese overlay、locale fallback、路由集合和 hreflang 关系；不生成翻译、不新增别名 URL。
- **D-404:** 每行 Meta 通过既有源审计纪律：Title 35–58 个英文字符且不超过 60，Description 125–155 个英文字符；Title 不复述问句或追加固定后缀，Description 不截取答案前缀；跨行 Title/Description 不重复；内容只使用该条已发布答案中的事实；`100%`、`guaranteed`、`the best`、`fully secure` 等绝对化表述阻断导入。工作簿的 100/100、Title 40–58、Description 126–155、重复 0 作为输入验收基线。

### Category rehang and identity conflicts

- **D-405:** 分类的唯一权威输入是 `/Users/longnv/bin/repo/fastgpt-data/W2-内容方向与首批内容-20260730/存量修复/FastGPT-存量FAQ分类重挂对照表-V1.1-星触达-20260730.xlsx` 的 `分类重挂对照表` 数据区（表头后 2,000 行），使用 Phase 1 已锁定指纹 `751a479680bfc987b9394c7429100d8f09269cc7ad8a698ff97b34415a6733b0`、155,689 bytes 和 canonical digest `13afa8ce3191062584fed1677a739889d3d6947762120264723a7ed96ef31959`。`汇总`、`迁移矩阵` 只做交叉核对，不能作为导入源。
- **D-406:** 存量分类只存稳定九类 ID，显示标签由 locale 映射；锁定 ID 为 `data-and-document-processing`、`deployment-and-security`、`content-and-creativity`、`industry-applications`、`concepts-and-selection`、`office-and-collaboration-automation`、`platform-value-and-trends`、`integration-and-development`、`customer-service-and-support`。每条结果保留源 `原分类`、新分类 ID、置信度、人工复核状态、原问句、原 URL、源行身份和导入结果；V1.1 分布与高/中/LLM/低置信度统计必须可复核。
- **D-407:** 默认分类操作是涵盖全部 2,000 行的 full batch。Phase 1 身份报告当前为 1,394 matched、585 `unmatched-source`、20 `duplicate-url`、1 `url-question-conflict`（共 606 个冲突行），因此 full batch 的 dry-run 状态为 `blocked` 且写入数为 0。冲突行原样进入失败清单，使用已锁定状态名 `duplicate-url`、`unmatched-source`、`url-question-conflict`、`key-question-conflict`；系统不自动择一、不用 repo key 覆盖问句身份、不创建占位 FAQ。
- **D-408:** 任何可写子集都必须显式提交源行 allowlist（源 SHA-256、sheet、源行号/稳定行身份、allowlist digest），并创建独立 batch ID。实现只能按 allowlist 精确处理，不能用“过滤掉异常行”“仅处理 matched”或隐式状态筛选代替授权；allowlist 内每一行仍需重新验证身份、分类 ID、locale 和正文/slug/URL 快照。

### Immutable records and write boundary

- **D-409:** `Answers`/正文、`Question`、repo key/slug 和线上 URL 是只读身份字段。匹配只允许做主机名大小写、尾部 `/`、可逆 URL 编码和问题两端空白/Unicode NFC 规范化；规范化值用于证据比对，原始 URL、原始问句和仓内 key 保留在 manifest。导入器不重命名 slug、不改 URL、不做 301、不删除或合并记录。
- **D-410:** 每个写入行生成前置快照，至少覆盖 repo key、URL、Question、Answers/body、旧 Category、旧 Title、旧 Description、旧 Keywords；结果清单同时记录拟写字段、前后字段哈希、身份匹配方法、批次和失败原因。应用后逐条比较只读字段，任一正文/问题/slug/URL 变化立即使批次失败并留下完整证据。
- **D-411:** Meta overlay 与 category rehang 是可区分的 operation，默认使用独立批次和独立结果清单；同一批次可同时携带两个操作时，manifest 必须分 operation 记录计划数、写入数、跳过数和失败数。Meta 不能借分类冲突跳过自身身份校验，分类不能覆盖 Meta 的前置快照。

### Batch safety, idempotency and rollback

- **D-412:** 所有批次先执行 dry-run，读取源文件指纹、sheet/表头/行数、字段哈希、身份候选、分类分布、allowlist digest 和预期写入数；dry-run 零写入。源指纹、表头、行数、必填字段、唯一性、Meta 规则、身份冲突、分类 ID/locale 或只读字段哈希任一失败，批次状态为 `blocked`，禁止部分写入。
- **D-413:** 成功 apply 必须绑定不可变 `batch_id`、源 SHA-256、操作类型、allowlist digest（full batch 记录完整 2,000 行集合）、逐行前置快照、预期/实际写入数、失败清单和结果 manifest。相同 `batch_id`、相同源指纹、相同 allowlist 与相同输入快照的重放返回 `idempotent-no-op`；源指纹、allowlist 或快照变化必须创建新 batch 并重新 dry-run。
- **D-414:** rollback 只接受目标 `batch_id` 的前置快照，并验证源指纹、allowlist digest、快照 digest 与当前后置哈希；校验失败时不写入。通过校验后恢复该批次修改的 Meta 与分类字段，同时再次证明正文、Question、slug 和 URL 与导入前完全一致；回滚也写入结果清单并可被重复验证。
- **D-415:** 事务、文件锁、原子文件替换或数据库实现方式留给研究与计划阶段；实现必须呈现 Phase 1 publish-gate contract 的可观察行为：预检失败零写入、失败清单完整、批次结果可重放、回滚输入可验证、任何失败不留下半批次结果。

### the agent's Discretion

- 具体 XLSX 解析库、TypeScript 数据模块/JSON manifest 形状、稳定哈希序列化方式、批次存储介质、原子提交/锁实现和测试拆分由研究与计划阶段决定。
- 具体 24 条 Meta 未命中对象的补证来源由实现阶段按 Phase 1 证据优先级核验；补证前保持 `blocked`，不猜测 key、不从 URL 尾段强行生成 slug。
- 页面模板如何消费九类 ID 并渲染中英文标签由现有 FAQ locale 数据边界决定，只要存储 ID 与显示标签分离且不改变既有 URL。

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project contracts

- `.planning/PROJECT.md` — W2 数量、存量只改元数据、URL 稳定和发布安全约束。
- `.planning/REQUIREMENTS.md` — `LEG-03` 至 `LEG-06` 的 Meta、分类、不可变字段、dry-run、幂等与回滚验收。
- `.planning/ROADMAP.md` — Phase 4 边界、成功标准和 Phase 5 依赖。
- `.planning/STATE.md` — 里程碑状态与恢复入口。

### Phase 1 identity and gate contracts

- `.planning/phases/01-source-data-identity-baseline/01-CONTEXT.md` — D-07–D-18 的身份优先级、冲突状态、九类 ID、dry-run、fail-closed、allowlist、批次和回滚行为。
- `.planning/phases/01-source-data-identity-baseline/01-03-SUMMARY.md` — 已实现的身份解析与 category/publish-gate 验证结果。
- `artifacts/phase1/identity-baseline.json` — 2,000 行逐行身份报告；当前 606 个冲突行和匹配证据。
- `artifacts/phase1/category-contract-report.json` — 九类 ID、2,000 行分布、置信度和人工复核统计。
- `artifacts/phase1/publish-gate-contract.json` — Phase 4 必须遵守的 dry-run、fail-closed、allowlist、batch、snapshot、idempotency 和 rollback contract。
- `scripts/phase1/identity_baseline.mjs` — URL/问题/repo key 规范化与候选身份解析模式。
- `scripts/phase1/category_contract.mjs` — 九类分类映射及发布门禁输出模式。

### W2 source package

- `/Users/longnv/bin/repo/fastgpt-data/W2-内容方向与首批内容-20260730/README.md` — 有效版本表与存量修复边界；Meta 仍为 V1.0，分类使用 V1.1。
- `/Users/longnv/bin/repo/fastgpt-data/W2-内容方向与首批内容-20260730/存量修复/README.md` §一–§五 — 九类分布、Meta 生成纪律、100 行实测结果、既有 slug 告警和应用顺序。
- `/Users/longnv/bin/repo/fastgpt-data/W2-内容方向与首批内容-20260730/存量修复/FastGPT-存量FAQ补Meta-首批100条-V1.0-星触达-20260728.xlsx` (`FAQ Data`) — 100 行 English overlay source。
- `/Users/longnv/bin/repo/fastgpt-data/W2-内容方向与首批内容-20260730/存量修复/FastGPT-存量FAQ分类重挂对照表-V1.1-星触达-20260730.xlsx` (`分类重挂对照表`) — 2,000 行 identity/category source。

### Existing FAQ runtime and SEO behavior

- `src/faq/index.ts` — English source、Chinese overlay 与 fallback 合并边界；Meta overlay 只进入 English source。
- `src/faq/en.ts` — 当前 1,400 个 repo key、正文、slug/URL 生成身份和运行时 Meta 字段。
- `src/faq/zh.ts` — Chinese overlay 与 `FaqItem` 六字段模型；不扩写审计字段到运行时对象。
- `src/app/[lang]/faq/[id]/page.tsx` — FAQ detail 的 metadata、Open Graph、Twitter 与静态路由消费路径。
- `src/lib/faqMetadata.ts` — Title/Description 长度与品牌规范化边界。
- `.planning/phases/02-new-faq-bilingual-seo/02-CONTEXT.md` — 双域 canonical、locale fallback 和新增 FAQ metadata 验收，不得被存量导入破坏。
- `.planning/phases/02-new-faq-bilingual-seo/02-03-SUMMARY.md` — 现有静态构建与全量 Meta/route 验证方式。

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- `scripts/phase1/identity_baseline.mjs` 的规范化函数、三路候选解析和逐行 evidence 结构可作为两个导入器的身份层。
- `scripts/phase1/category_contract.mjs` 与 `artifacts/phase1/publish-gate-contract.json` 已提供九类 ID/locale、冲突状态、allowlist 和批次门禁的机器可读基线。
- `src/faq/index.ts` 的 locale merge/fallback 与 `src/lib/faqMetadata.ts` 的元数据规范化可作为写入后页面消费和验证边界。

### Established Patterns

- FAQ 运行时是静态 TypeScript object，repo key 参与静态 params 与 sitemap；导入器应生成确定性数据模块/manifest，不在运行时猜测身份。
- Phase 1 将审计源快照与 `FaqItem` 运行时字段分离；Meta/分类审计字段继续留在导入 manifest 与结果清单。
- Phase 2 对每个页面的独立 Title/Description、Open Graph/Twitter、canonical 与静态构建有全量检查；存量导入必须保留这些既有断言。

### Integration Points

- Meta overlay 接入 `src/faq/en.ts` 或其生成源，并由 `src/app/[lang]/faq/[id]/page.tsx` 的 `generateMetadata` 消费；English 1,400 routes、Chinese fallback 和 sitemap 数量必须维持。
- Category rehang 接入现有 FAQ 数据的 Category 存储/显示边界，存储九类 ID、显示 locale label；Phase 5 消费每行导入结果、批次 manifest、快照和回滚证据。
- 导入脚本、源快照、失败报告和批次 manifest 构成可审计发布交接面，不能依赖手工注释或临时筛选。

</code_context>

<specifics>
## Specific Ideas

- Full 2,000-row category batch 在当前身份基线下预期为 `blocked`/zero writes；这是可观察的安全结果，不是异常吞掉。
- 允许的 matched subset 必须显式列出源行号/稳定行身份并独立记录，allowlist 之外的行在该批次保持未写入且仍出现在 full-batch failure report。
- Meta source 的 100 行必须保持完整计数；24 个当前未命中行继续作为失败或待补证项，任何“已写 76 行”都不能冒充 100 行 overlay 完成。
- 存量既有 URL 包含大小写不规范的历史 slug；本阶段保留该 URL 证据和已知告警，页面稳定性优先于 slug 规范化。

</specifics>

<deferred>
## Deferred Ideas

- 剩余 1,900 条存量 Meta 进入后续批次，沿用本阶段的同一 overlay、身份和批次 contract。
- 存量正文改写、slug 规范化、301、删除、合并和关键词策略重做属于后续内容/迁移工作。
- 24 条 Meta 未命中对象需要额外业务或研发来源确认；本阶段不猜测身份、不生成占位 FAQ。

</deferred>

---

*Phase: 4-存量 FAQ Meta 与分类导入*
*Context gathered: 2026-08-04*
