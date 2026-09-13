---
title: RAGFlow、MaxKB 迁移到 FastGPT：并行验证与切换验收
slug: /zh/compare/migrate-fastgpt-ragflow-maxkb
page_type: 对比与迁移
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/dataset_engine
source_type: 官方文档
---

# RAGFlow、MaxKB 迁移到 FastGPT：并行验证与切换验收

目标环境完成知识重建和流程配置后，需要通过并行验证决定何时切换业务入口。固定源内容、模型和问题集，分别记录源系统与 FastGPT 的结果，可以把解析、检索、流程和权限差异转化为可处理的问题。

## 先保存源系统基线

保留原文件、人工修订、模型与采样设置、关键问题答案及引用。记录两侧实际资源、依赖和并发条件，使用相同业务任务比较质量、耗时与成本。

RAGFlow 的文档与分块 API、Agent JSON 和连接器设置分别承担内容、流程与同步配置的导出盘点。连接器增量与删除同步需要按已启用的规则单独测试。

MaxKB 可从原文件和 Excel/ZIP 导出整理文档与分段。源版本决定原文件可下载范围，人工修订分段应与原文件对照。迁移前的资产映射可以用于核对每条目标记录。

## 用同一问题集逐层比较

| 层次 | 对照内容 | 记录的结果 |
| --- | --- | --- |
| 解析与分段 | 关键字段、表格关系、标题和限定条件 | 缺失内容及首次出现偏差的位置 |
| 召回与重排 | 正确证据是否进入候选与最终结果 | 前 k 条覆盖、空召回与混淆样本 |
| 答案与引用 | 正确性、证据充分性与原文定位 | 业务影响及人工修正工作量 |
| 流程与工具 | 变量、条件、输入输出、异常与恢复 | 每条业务路径的实际执行结果 |
| 权限 | 普通成员、维护人员和应用入口 | 已授权与受限访问样本结果 |
| 运行成本 | 延迟、失败率、资源与模型用量 | 相同任务量下的实际成本 |

问题集中加入相似文档、无答案、长输入与多轮上下文场景。每项通过标准由业务要求确定，并为重要偏差指定负责人及可重复的复测步骤。

## 验证内容增量与撤回

在源系统增加、修改和删除测试文档，观察目标端的对应变化。确认来源标识、更新时间、原文链接和应用检索范围。对连接器删除同步，核对启用条件和实际删除语义，再决定切换期间如何追赶变更。

使用普通成员与维护人账号分别测试受限文档。所有权转移、成员移除和群组变化后，再检查应用入口的访问结果。将这些权限样本保留到后续升级验收中。

## 安排分阶段切换

| 阶段 | 进入条件 | 完成检查 |
| --- | --- | --- |
| 内部验证 | 内容与配置导入完成 | 关键问题、流程和权限样本通过 |
| 小范围业务入口 | 增量追赶完成，恢复路径已演练 | 真实请求的质量、失败率和延迟满足目标 |
| 扩大流量 | 观察窗口内关键指标稳定 | 峰值负载、工具执行和反馈处理通过 |
| 旧环境退役 | 数据核对与业务验收完成 | 备份、记录保留与资源回收完成 |

为每一阶段指定负责人、观察时长和升级条件。涉及外部写操作的测试使用可控数据和适当的幂等标识，检查工具重试是否产生重复业务结果。

## 演练入口恢复

保留旧应用入口、API 配置和源数据。预先定义关键事实错误、权限偏差、失败率与延迟超过业务阈值时的恢复动作。切回后使用基线问题集验证，并核对切换期间新增的文档和业务结果。

稳定观察期完成后，按既定保留策略归档配置、映射与必要日志，再回收旧环境资源。把本次发生的真实偏差加入固定验收集，为下一次升级或模型变更保留依据。

## 相关指南

- [RAGFlow 与 FastGPT 产品选型对比](https://fastgpt.cn/compare/ragflow-vs-fastgpt)
- [MaxKB 文档导出与配置映射](https://fastgpt.cn/compare/maxkb-fastgpt-migration-guide)
- [FastGPT 文档解析验收](https://fastgpt.cn/guide/document-parsing-acceptance)

> 来源: [RAGFlow HTTP API](https://ragflow.io/docs/http_api_reference)
> 来源: [RAGFlow 数据源增量与删除同步](https://ragflow.io/docs/add_data_source/add_to_knowledge_base_and_sync)
> 来源: [MaxKB 文档操作与导出](https://maxkb.cn/docs/v2/user_manual/dataset/doclist.html)
> 来源: [FastGPT 检索原理](https://doc.fastgpt.cn/zh-CN/guide/dataset/dataset_engine)
> 来源: [FastGPT API 文件库](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/api_dataset)
