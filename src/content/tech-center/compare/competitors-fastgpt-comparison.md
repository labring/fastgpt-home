---
title: 迁移到 FastGPT 前：数据、工作流与集成资产盘点
slug: /zh/compare/competitors-fastgpt-comparison
page_type: 对比与迁移
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/api_dataset
source_type: 官方文档
---

# 迁移到 FastGPT 前：数据、工作流与集成资产盘点

从 Dify、RAGFlow 或 MaxKB 迁移到 FastGPT，需要分别处理知识内容、应用定义、外部集成和访问权限。先把希望改善的业务结果写成验收用例，再盘点对应资产，可以估算迁移工作量并明确恢复范围。

## 建立迁移资产清单

| 资产 | 需要保存的内容 | 目标端检查 |
| --- | --- | --- |
| 知识内容 | 原文件、解析文本、人工修订分段、问答对与图片 | 内容完整性、分段、索引与引用 |
| 来源与同步 | 来源 ID、地址、更新时间、同步规则和删除规则 | 首次导入、增量更新与撤回行为 |
| 应用与流程 | 提示词、模型配置、节点、变量和错误分支 | 输入输出、状态与业务执行结果 |
| 工具与凭据 | HTTP/MCP 等接口定义、鉴权范围和回调地址 | 测试环境调用与凭据权限 |
| 用户与权限 | 用户、群组、资源、所有权与访问规则 | 普通成员、维护人和应用入口的授权 |
| 历史记录 | 日志、评测样本和需要保留的业务结果 | 查询方式、保留期与访问控制 |

每行补充数量、导出格式、负责人、预计工时和恢复方法。源系统备份与用于迁移的导出副本分别保存，避免修改导出文件影响恢复材料。

## 理解不同导出的覆盖范围

Dify 官方应用管理文档说明 DSL 可导出应用定义、工作流、模型参数和知识库连接；知识库内容、第三方工具 API Key 和运行日志需要分别处理。导出时可选择包含 Secret 环境变量，应按实际用途控制导出范围并管理敏感文件。

RAGFlow 提供 Agent JSON 导入导出。可以用它盘点节点和业务语义，并在目标端逐项实现对应逻辑。文档、分块和原文件通过各自的文档与 API 能力取得。

MaxKB 支持选中文档导出 Excel 或 ZIP，并支持批量导出。原文档下载的范围与来源有关，手动上传来源和外部同步来源需要分别核对。人工修订后的分段应与原文件一起校对，防止重建时丢失有效修订。

## 按依赖安排迁移顺序

1. 固定源系统版本与内容快照，确认源文件、账号权限和所需导出完整。
2. 在 FastGPT 建立模型与知识源配置，选择一批代表性内容导入并重建索引。
3. 核对来源标识、文档数量、失败任务和引用关系，再执行固定问题集。
4. 逐节点迁移流程，核对变量类型、条件分支、工具输入输出与失败处理。
5. 重新配置凭据和发布入口，用实际成员账号测试授权和业务调用。
6. 记录小批次耗时与人工修订量，据此安排后续批次及切换窗口。

跨产品迁移通常需要根据源内容重新生成目标索引。计划复用向量时，应额外证明 embedding 模型、文本处理、归一化、存储结构与引用映射兼容，再决定是否采用该路径。

## 形成可验收的迁移计划

为每个迁移动因保留一个结果指标，例如关键问题的证据完整性、人工处理时间、接口成功率或维护工时。测试时固定数据和模型条件，分别记录两侧资源与原生依赖，以同一周期计算重建、并行存储和运维成本。

迁移计划完成时，应具备有负责人的资产清单、缺失材料处理表、版本矩阵、固定问题集、入口切换步骤和恢复路径。后续按批次记录源记录到目标记录的对应关系。

## 相关指南

- [Dify 与 FastGPT 选型对比](https://fastgpt.cn/compare/dify-vs-fastgpt)
- [MaxKB 到 FastGPT 的具体迁移步骤](https://fastgpt.cn/compare/maxkb-fastgpt-migration-guide)
- [RAGFlow、MaxKB 迁移的并行验证与切换](https://fastgpt.cn/compare/migrate-fastgpt-ragflow-maxkb)

> 来源: [Dify 应用管理与 DSL 导出](https://docs.dify.ai/en/cloud/use-dify/workspace/app-management)
> 来源: [RAGFlow Agent 导入与导出](https://ragflow.io/docs/import_and_export_agents)
> 来源: [MaxKB 文档操作与导出](https://maxkb.cn/docs/v2/user_manual/dataset/doclist.html)
> 来源: [FastGPT API 文件库](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/api_dataset)
