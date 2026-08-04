# Phase 1: 源数据与身份基线 - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-04
**Phase:** 1-源数据与身份基线
**Mode:** `--auto` autonomous discussion; recommended options selected from source evidence.
**Areas discussed:** 权威源与指纹, FAQ 字段保真与校验, 存量身份匹配, 重复/缺失冲突, 九类分类契约, dry-run/失败/回滚门禁

---

## 权威源与指纹

| Option | Description | Selected |
|--------|-------------|----------|
| V1.1 `FAQ Data` / V1.1 分类明细 | 使用标注有效版本的明细 sheet，记录 SHA-256 与结构统计；汇总 sheet 只交叉核对 | ✓ |
| V1.0 或汇总 sheet | 依赖历史工作簿或派生汇总，无法保证当前修订和逐行证据 | |

**Auto choice:** 选用 V1.1 明细源；新增 FAQ 指纹 `53a6f0d89f1ef2cd688e4c50dc7b59d69276a8ebb24e65f9979e0156e8a85547`，分类指纹 `751a479680bfc987b9394c7429100d8f09269cc7ad8a698ff97b34415a6733b0`。

## FAQ 字段保真与校验

| Option | Description | Selected |
|--------|-------------|----------|
| 十字段快照保留 + 严格计数/唯一性/必填校验 | 八发布字段和两审计字段原样留存，60 行、14 类、slug 规则和逐字段比对全部入门禁 | ✓ |
| 仅映射运行时六字段 | 会丢失事实来源和客户确认状态，无法满足审计要求 | |

**Auto choice:** `FAQ Data` 恰好 60 行、14 类、60 个唯一合法 slug，八发布字段无空值，按此作为 Phase 2 输入门禁。

## 存量身份匹配

| Option | Description | Selected |
|--------|-------------|----------|
| URL 证据优先，唯一问句匹配校正，repo key 校验 | URL/问句冲突阻断；key 与问句不一致时保留冲突 | ✓ |
| repo key 优先 | 当前仅 25 个 URL 尾段直接命中，且旧 key 存在截断/命名差异，覆盖不足 | |
| 模糊相似度自动合并 | 无法提供可审计的唯一身份，可能改写错误对象 | |

**Auto choice:** 1,400 个唯一问句可命中仓内对象，590 个唯一源对象缺失；所有匹配保留原 URL、原问句和 repo key 证据。

## 重复与缺失冲突

| Option | Description | Selected |
|--------|-------------|----------|
| 显式冲突状态并 fail-closed | 10 组重复 URL 和 590 个缺失对象进入失败清单，默认批次零写入 | ✓ |
| 首行胜出或静默跳过 | 会丢失源行、破坏可追溯性并掩盖批次差异 | |

**Auto choice:** 每行必须有稳定源行身份或 `duplicate-url`/`unmatched-source` 等状态，异常不自动创建或覆盖 FAQ。

## 九类分类契约

| Option | Description | Selected |
|--------|-------------|----------|
| 稳定英文 ID + locale 标签映射 | 存储值与显示语言分离，保留原分类/新分类/置信度/复核证据 | ✓ |
| 直接存中文显示标签 | 语言耦合，后续英文页面和重命名会破坏身份稳定性 | |

**Auto choice:** 锁定九个 kebab-case ID，中文标签来自 V1.1，补充对应 English label；新增 FAQ 的 14 类保持独立。

## dry-run/失败/回滚门禁

| Option | Description | Selected |
|--------|-------------|----------|
| 预检零写入、冲突即阻断、批次快照可回滚 | 源指纹和行级证据绑定批次，重复执行为幂等 no-op | ✓ |
| 允许部分写入后补救 | 会留下半批次结果，难以证明正文/URL 未被误改 | |

**Auto choice:** 事务实现留给 Phase 4 规划；行为门禁固定为 dry-run、完整失败清单、无半批次结果、批次级回滚。

## the agent's Discretion

- XLSX 解析库、快照序列化格式、持久化介质与事务技术实现。

## Deferred Ideas

- 新增 FAQ 页面/SEO 接入、竞品页、存量 Meta/分类实际写入、整批发布验收分别留在 Phase 2–5。
