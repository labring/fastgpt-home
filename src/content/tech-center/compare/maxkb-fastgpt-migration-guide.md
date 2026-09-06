---
title: 从 MaxKB 迁移到 FastGPT：文档导出与配置映射
slug: /zh/compare/maxkb-fastgpt-migration-guide
page_type: 对比与迁移
source: https://maxkb.cn/docs/v2/user_manual/dataset/doclist.html
source_type: 官方文档
---

# 从 MaxKB 迁移到 FastGPT：文档导出与配置映射

迁移前记录 MaxKB 的版本、产品形态、文档来源和正在使用的应用。先完成一批代表性文档与一条完整业务流程的迁移，再根据实测结果扩批。源系统保留到目标端通过内容、流程与权限验收。

## 核对可取得的知识资产

MaxKB 官方文档提供 Excel/ZIP 文档导出与批量导出。原文档下载仅覆盖手动上传来源；网页或其他同步来源需要另行保存可核对的原始内容。

旧版本还有额外边界：MaxKB 官方 v1 到 v2 迁移说明指出，v1 上传的知识库文档未保存原文件，迁移到 v2 后对应文档也无法下载原文档。该官方迁移工具覆盖 MaxKB v1.10.10-lts 及以上到 v2.1.0 的指定升级路径。跨产品迁移应单独准备原文件恢复或经过校对的文本导出。

官方文档还说明，“替换原文档”操作更新原文件，已向量化和分段内容保持原状。因此应同时检查当前原文件和人工修订分段，明确目标端采用的内容版本。

## 建立字段与操作映射

| 源端资产 | 目标端处理 | 通过标准 |
| --- | --- | --- |
| 原文件或已校对文本 | 在 FastGPT 选择模型与分段方式后导入 | 关键内容、单位和限定条件完整 |
| 人工修订分段与问答对 | 按目标版本支持的结构转换并抽查 | 修订后的业务含义得到保留 |
| 文档来源 ID 与链接 | 保存源记录到目标文档的映射 | 引用与原文入口能定位到正确内容 |
| 提示词、条件与变量 | 逐项配置目标工作流 | 相同输入得到符合预期的业务结果 |
| HTTP/MCP 与其他工具 | 重配接口、鉴权、错误处理和回调 | 正常、超时与权限失败场景通过 |
| 用户、群组与资源 | 按 FastGPT 权限模型重新授权 | 实际成员样本的访问符合预期 |

## 执行一批小规模迁移

1. 备份源系统，导出样本文档、分段与流程记录，列出缺失原文件。
2. 配置目标模型并创建 FastGPT 知识库，导入原文或已校对文本，等待处理完成。
3. 核对输入、成功、失败和重复数量，保存源文档 ID 到目标记录的映射。
4. 用固定问题检查正确证据、引用和答案，记录重建后的分段差异。
5. 逐节点实现提示词、检索、条件分支与工具调用，检查输入输出类型与失败分支。
6. 使用普通成员、编辑者与负责人账号测试访问，再验证真实应用入口和 API 调用。

模型和工具凭据在目标环境按所需范围重新配置。涉及外部业务写操作时，使用可控测试数据，并核对重复执行与恢复行为。

## 处理切换期间的新增内容

选择短暂冻结源内容，或记录并追赶新增、修改和删除事件。切换前再次核对目标内容与源快照，保存旧应用入口和旧 API 配置。权限、关键问答和业务工具通过后，再扩大入口流量。

观察期结束后，按组织的数据策略保留备份、映射和所需历史记录。资源回收应覆盖旧模型服务、数据库、对象存储和外部同步任务，避免遗留费用与重复同步。

## 相关指南

- [MaxKB 与 FastGPT 产品选型对比](https://fastgpt.cn/compare/maxkb-vs-fastgpt)
- [迁移前的资产盘点清单](https://fastgpt.cn/compare/competitors-fastgpt-comparison)
- [并行验证、灰度切换与恢复](https://fastgpt.cn/compare/migrate-fastgpt-ragflow-maxkb)

> 来源: [MaxKB 文档操作、导出与原文替换](https://maxkb.cn/docs/v2/user_manual/dataset/doclist.html)
> 来源: [MaxKB v1 到 v2 迁移工具与原文件边界](https://maxkb.cn/docs/v2/installation/migrate.html)
> 来源: [FastGPT 知识库 API](https://doc.fastgpt.cn/zh-CN/openapi/dataset)
> 来源: [FastGPT 团队与资源权限](https://doc.fastgpt.cn/zh-CN/guide/workspace/team/team_roles_permissions)
