# Requirements: FastGPT 官网 W2 内容发布

**Defined:** 2026-08-04
**Core Value:** 让用户与搜索引擎稳定获得准确、可核验、可访问的 FastGPT 产品信息。
**Source package:** `/Users/longnv/bin/repo/fastgpt-data/W2-内容方向与首批内容-20260730/`

## v1 Requirements

Requirements for milestone v1.0 W2 官网内容上线. Each requirement maps to exactly one roadmap phase.

### 60 条 FAQ

- [ ] **FAQ-01**: 发布流程可以从 V1.1 `FAQ Data` 确定性读取恰好 60 条精选规范 FAQ，并保留 slug、no、category、question、answer、title、description、keywords 八个发布字段和事实来源、确认备注两个审计字段。
- [ ] **FAQ-02**: 数据校验可以证明 60 条记录覆盖 14 类、slug 全部唯一且符合全小写连字符规则、必填字段完整，并通过源文件指纹和逐字段比对确认内容一致。
- [ ] **FAQ-03**: 中文独有 FAQ slug 可以进入静态参数与 sitemap，现有 1,400 条 FAQ 路由和 locale fallback 行为继续可用。
- [ ] **FAQ-04**: 用户可以在中文 FAQ 列表中搜索和分类筛选全部新增记录，打开对应详情页并查看同类相关问题。
- [ ] **FAQ-05**: FAQ 明细页可以将独立 Title 与 Description 输出到 HTML head、Open Graph、Twitter，并同步输出 Keywords、BreadcrumbList 与 FAQPage 结构化数据。
- [ ] **FAQ-06**: `fastgpt.cn` 作为中文主版本输出正确 canonical；`fastgpt.io/zh` 同文页面指向对应 `.cn` 页面；FAQ 明细页仅在存在显式真实译文映射时输出 hreflang。
- [ ] **FAQ-07**: 自动化发布验证可以覆盖静态路由、sitemap、robots、Meta、canonical、hreflang、结构化数据、分类与源数据一致性，并将失败结果设为发布阻断项。

### 4 篇竞品对比页

- [ ] **CMP-01**: 用户可以通过四个稳定 URL 分别访问 Dify、自研或直接运行开源、RAGFlow、MaxKB 与 FastGPT 的对比页。
- [ ] **CMP-02**: 每个对比页可以完整呈现五段正文结构、能力对照表、同条件 POC 方法和中性选型建议，并在桌面端与移动端保持可读。
- [ ] **CMP-03**: 每个对比页可以输出独立 Meta、Open Graph、Twitter、Article 与 BreadcrumbList 结构化数据。
- [ ] **CMP-04**: 每个对比页可以记录真实内链、信息图、事实来源、核验日期、版本或套餐、更新记录与 90 天复核日期。
- [ ] **CMP-05**: 发布流程可以记录产品、销售与法务签发证据；签发证据缺失时页面保持预览状态并进入失败清单。

### 2,100 条存量修复

- [ ] **LEG-01**: 导入流程可以建立 2,000 行权威存量对象清单，解释仓内 1,400 条、590 个缺失对象和 10 组重复 URL 的身份差异，并为每一行生成唯一内容身份或明确冲突状态。
- [ ] **LEG-02**: 九类重挂体系可以使用稳定分类 ID 与中英文页面适用的本地化标签，确保分类存储值与显示语言分离。
- [ ] **LEG-03**: 首批 100 条 Meta 可以精确绑定对应线上 FAQ，并将独立 Title 与 Description 输出到 HTML、Open Graph 与 Twitter。
- [ ] **LEG-04**: 2,000 条分类建议可以完整应用到九类体系，并保留置信度、人工复核状态、原分类、新分类与导入结果。
- [ ] **LEG-05**: 存量正文、slug 与 URL 在导入前后保持一致，并通过哈希或结构化快照生成逐条验证证据。
- [ ] **LEG-06**: 批量导入工具可以执行 dry-run、幂等重放、失败清单生成、批次记录与回滚。

### 发布验收

- [ ] **REL-01**: 仓库可以通过 TypeScript、lint、数据校验、路由测试、SEO 测试、结构化数据测试与生产静态构建。
- [ ] **REL-02**: 上线清单可以精确记录 64 条新内容和 2,100 条存量修复，并包含每项 URL、源版本、批次与验收结果。
- [ ] **REL-03**: 人工验收可以覆盖桌面端与移动端的列表、搜索、分类、详情、响应式表格、Meta、canonical、hreflang、内链与社交预览。
- [ ] **REL-04**: 线上验收可以证明目标 URL 可访问、内容版本正确、搜索引擎可抓取且双域名 SEO 信号一致。
- [ ] **REL-05**: 发布交接包可以记录源文件指纹、代码提交、构建版本、导入批次、自动与人工验收结果、开放项和回滚步骤。

## v2 Requirements

Deferred to later content cycles.

### 后续内容与扩展

- **NEXT-01**: W3 起按周生产并发布 20 篇深度场景文章。
- **NEXT-02**: 为剩余 1,900 条存量 FAQ 生成并导入独立 Title 与 Description。
- **NEXT-03**: 按相同模板、签发与复核流程发布 HiAgent 竞品对比页。
- **NEXT-04**: 扩展中英文 FAQ 的显式逐篇译文映射，增加合法 hreflang 覆盖。

## Out of Scope

| Feature | Reason |
|---------|--------|
| 存量 FAQ 正文改写 | W2 以正文稳定为发布约束 |
| 存量 slug 规范化、301、删除与合并 | W2 以线上 URL 稳定为发布约束 |
| 竞品价格数字 | 当前有效口径采用成本项与计算模板 |
| 未获签发证据的竞品公开页 | 页面保持预览状态直至签发门禁完成 |
| SEM 落地页、关键词包与付费投放 | 当前增长目标聚焦自然流量与 AI 搜索可见度 |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FAQ-01 | Phase 1 | Pending |
| FAQ-02 | Phase 1 | Pending |
| FAQ-03 | Phase 2 | Pending |
| FAQ-04 | Phase 2 | Pending |
| FAQ-05 | Phase 2 | Pending |
| FAQ-06 | Phase 2 | Pending |
| FAQ-07 | Phase 5 | Pending |
| CMP-01 | Phase 3 | Pending |
| CMP-02 | Phase 3 | Pending |
| CMP-03 | Phase 3 | Pending |
| CMP-04 | Phase 3 | Pending |
| CMP-05 | Phase 3 | Pending |
| LEG-01 | Phase 1 | Pending |
| LEG-02 | Phase 1 | Pending |
| LEG-03 | Phase 4 | Pending |
| LEG-04 | Phase 4 | Pending |
| LEG-05 | Phase 4 | Pending |
| LEG-06 | Phase 4 | Pending |
| REL-01 | Phase 5 | Pending |
| REL-02 | Phase 5 | Pending |
| REL-03 | Phase 5 | Pending |
| REL-04 | Phase 5 | Pending |
| REL-05 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 23 total
- Mapped to phases: 23
- Unmapped: 0

---
*Requirements defined: 2026-08-04*
*Last updated: 2026-08-04 after roadmap creation*
