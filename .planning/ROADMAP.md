# Roadmap: FastGPT 官网 W2 内容发布

## Overview

本里程碑先建立可审计的源数据与内容身份基线，再依次交付新增 FAQ、竞品对比页和存量 FAQ 修复，最后以自动化、人工与线上证据完成整批发布验收。五个阶段共同守住内容一致性、存量 URL 稳定性、双域 SEO 信号和批量操作可回滚性。

## Milestone v1.0 W2 官网内容上线

**Milestone Goal:** 将 60 条精选规范 FAQ、4 篇竞品对比页、100 条存量 FAQ Meta 与 2,000 条分类重挂完整发布到官网，并建立可重复执行的验证与回滚流程。

## Phases

- [x] **Phase 1: 源数据与身份基线** - 锁定有效输入，完成 60 条新增 FAQ 校验、2,000 行存量身份对齐与九类分类契约。
- [ ] **Phase 2: 新增 FAQ 发布与双域 SEO** - 让 60 条中文 FAQ 可发现、可访问、可索引，并输出准确的页面与双域 SEO 信息。
- [ ] **Phase 3: 竞品对比页发布** - 通过签发门禁发布四篇信息完整、响应式且可持续复核的竞品对比页。
- [ ] **Phase 4: 存量 FAQ 批量修复** - 在身份基线上安全写入 100 条 Meta 与 2,000 条分类，并保全正文和 URL。
- [ ] **Phase 5: 整批发布验收与交接** - 以构建、自动化、人工和线上证据验收 64 条新内容与 2,100 条存量修复。

## Phase Details

### Phase 1: 源数据与身份基线
**Goal**: 发布人员拥有确定、完整、可追溯的 W2 输入，以及可作为后续存量写入门禁的唯一内容身份映射。
**Depends on**: Nothing (first phase)
**Requirements**: FAQ-01, FAQ-02, LEG-01, LEG-02
**Success Criteria** (what must be TRUE):
  1. 发布人员可以从 V1.1 `FAQ Data` 重复读取恰好 60 条 FAQ，获得八个发布字段、两个审计字段和一致的源文件指纹。
  2. 数据审计报告证明 60 条记录覆盖 14 类，所有 slug 唯一且符合规则，必填字段完整，逐字段内容与有效源文件一致。
  3. 2,000 行存量清单中的每一行都获得唯一内容身份或明确冲突状态，报告可以解释仓内 1,400 条、590 个缺失对象和 10 组重复 URL 的差异。
  4. 发布人员可以通过九个稳定分类 ID 管理分类，中英文页面分别显示对应本地化标签。
**Plans**: 3 plans

Plans:
- [x] 01-01-PLAN.md — Build the deterministic V1.1 XLSX reader and source manifest contract
- [x] 01-02-PLAN.md — Validate and snapshot the 60-row FAQ source baseline
- [x] 01-03-PLAN.md — Resolve 2,000 inventory identities and validate the nine-category gate contract

### Phase 2: 新增 FAQ 发布与双域 SEO
**Goal**: 用户与搜索引擎可以在正确域名和语言关系下发现、访问并理解全部 60 条新增中文 FAQ。
**Depends on**: Phase 1
**Requirements**: FAQ-03, FAQ-04, FAQ-05, FAQ-06
**Success Criteria** (what must be TRUE):
  1. 用户可以在中文 FAQ 列表中搜索或按分类筛选全部新增记录，并从详情页访问同类相关问题。
  2. 60 个中文独有 slug 均出现在静态路由和 sitemap 中，现有 1,400 条 FAQ 路由及 locale fallback 继续可用。
  3. 每个新增详情页都在 HTML head、Open Graph 与 Twitter 中输出独立 Title 和 Description，并提供 Keywords、BreadcrumbList 与 FAQPage 结构化数据。
  4. `fastgpt.cn` 中文页面输出自身 canonical，`fastgpt.io/zh` 同文页面指向对应 `.cn` 页面，显式真实译文映射决定 hreflang 输出。
**Plans**: TBD
**UI hint**: yes

### Phase 3: 竞品对比页发布
**Goal**: 用户可以通过四个稳定 URL 阅读经签发、可核验且适配桌面端与移动端的竞品对比内容。
**Depends on**: Phase 1
**Requirements**: CMP-01, CMP-02, CMP-03, CMP-04, CMP-05
**Success Criteria** (what must be TRUE):
  1. 用户可以通过四个稳定 URL 分别访问 Dify、自研或直接运行开源、RAGFlow、MaxKB 与 FastGPT 的对比页，桌面端与移动端均保持可读。
  2. 每个页面都完整呈现五段正文、能力对照表、同条件 POC 方法和中性选型建议。
  3. 每个页面都输出独立 Meta、Open Graph、Twitter、Article 与 BreadcrumbList 结构化数据。
  4. 用户与复核人员可以看到或追溯真实内链、信息图、事实来源、核验日期、版本或套餐、更新记录及 90 天复核日期。
  5. 产品、销售与法务签发证据完整的页面可以公开发布；待签发页面保持预览状态并进入失败清单。
**Plans**: TBD
**UI hint**: yes

### Phase 4: 存量 FAQ 批量修复
**Goal**: 发布人员可以基于已审计身份安全应用 100 条 Meta 与 2,000 条分类建议，同时保持存量正文、slug 和 URL 稳定。
**Depends on**: Phase 1, Phase 2
**Requirements**: LEG-03, LEG-04, LEG-05, LEG-06
**Success Criteria** (what must be TRUE):
  1. 首批 100 条 Meta 精确绑定对应线上 FAQ，页面在 HTML、Open Graph 与 Twitter 中呈现各自的 Title 和 Description。
  2. 2,000 条分类建议全部产生九类体系下的导入结果，每条结果保留置信度、人工复核状态、原分类和新分类。
  3. 发布人员可以通过逐条哈希或结构化快照证明批量导入前后的正文、slug 与 URL 一致。
  4. 发布人员可以 dry-run 批次、幂等重放相同输入、查看失败清单和批次记录，并使用回滚输入恢复写入前状态。
**Plans**: TBD
**UI hint**: yes

### Phase 5: 整批发布验收与交接
**Goal**: 发布人员可以用完整证据确认 64 条新内容和 2,100 条存量修复已正确上线，并可在需要时执行回滚。
**Depends on**: Phase 2, Phase 3, Phase 4
**Requirements**: FAQ-07, REL-01, REL-02, REL-03, REL-04, REL-05
**Success Criteria** (what must be TRUE):
  1. TypeScript、lint、数据校验、路由、SEO、结构化数据测试和生产静态构建全部通过，任一失败结果都会阻断发布。
  2. 上线清单精确列出 64 条新内容与 2,100 条存量修复，并为每项记录 URL、源版本、批次和验收结果。
  3. 验收人员可以在桌面端与移动端核验列表、搜索、分类、详情、响应式表格、Meta、canonical、hreflang、内链与社交预览。
  4. 线上证据证明全部目标 URL 可访问、内容版本正确、搜索引擎可抓取且双域名 SEO 信号一致。
  5. 发布交接包包含源文件指纹、代码提交、构建版本、导入批次、自动与人工验收结果、开放项和可执行回滚步骤。
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:** Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5. Phase 3 在 Phase 1 完成后具备独立实施条件；Phase 4 的所有存量写入以 Phase 1 身份基线和 Phase 2 FAQ Meta 输出能力为前置条件。

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. 源数据与身份基线 | 3/3 | Complete | 2026-08-04 |
| 2. 新增 FAQ 发布与双域 SEO | 0/TBD | Not started | - |
| 3. 竞品对比页发布 | 0/TBD | Not started | - |
| 4. 存量 FAQ 批量修复 | 0/TBD | Not started | - |
| 5. 整批发布验收与交接 | 0/TBD | Not started | - |
