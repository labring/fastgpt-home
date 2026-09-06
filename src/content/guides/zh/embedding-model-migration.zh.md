<!--
Delivery metadata (not published with the body)
slug: embedding-model-migration
locale: zh
canonical: https://fastgpt.cn/guide/embedding-model-migration
hreflang: zh-CN | zh-CN → https://fastgpt.cn/guide/embedding-model-migration | en → https://fastgpt.io/guide/embedding-model-migration | x-default → https://fastgpt.io/guide/embedding-model-migration
Meta title: FastGPT 更换向量模型：知识库重建、对照与回滚
Meta description: 按原文、分段与模型配置准备迁移，在目标知识库重建向量，使用固定问题集比较召回、引用、延迟与成本，并保留应用绑定回滚路径。
keywords: FastGPT,embedding,model,migration
结构化数据: Article + BreadcrumbList
内链: FastGPT 重排模型选型：相关性、时延与单位成本 / FastGPT 知识库生命周期：内容归属、更新与恢复
配图需求: Text and accessible tables; no image is required for this release.
发布批次: Week07
-->

# FastGPT 更换向量模型：重建、对照与回滚

更换 embedding 模型会改变文档与问题的向量表示。即使两个模型输出维度相同，向量空间也可能不同。迁移应以原始文档、分段和索引重新生成目标模型的向量，再通过固定问题集确认检索质量。

模型更换与向量数据库迁移分别影响语义表示和存储方式。计划中应分别列出两项变化及其验收条件。一次只改变一个主要变量，能够更容易定位召回质量和性能变化。

## 迁移前保留哪些材料

| 材料 | 用途 | 核对内容 |
| --- | --- | --- |
| 原始文档与来源关系 | 为目标库重新解析和生成向量 | 文件完整性、来源标识与更新时间 |
| 分段和索引规则 | 解释检索差异 | 分段长度、重叠、标题和自定义索引 |
| 旧库与应用绑定 | 保留恢复入口 | 模型、检索配置、应用与权限 |
| 固定问题集 | 比较迁移前后结果 | 正确证据、无答案问题和易混淆问题 |
| 容量与时间预算 | 估算重建成本 | 文本量、embedding 用量、并发和双库存储 |

## 确认模型与存储维度

FastGPT 官方 M3E 接入文档说明知识库模型在创建时确定，绑定模型需要符合原有 embedding 模型要求。迁移时应先确认部署版本提供的创建与绑定入口，再新建使用目标模型的知识库。

模型的原始输出维度与 FastGPT 适配后写入数据库的维度需要分别记录。所引用的 FastGPT 源码快照包含向量截断、归一化或补零逻辑，因此直接套用数据库产品的通用维度上限会遗漏应用层处理。使用一个短文本调用目标模型，检查返回长度和实际入库结果。

## 按六步完成迁移

1. 固定旧环境的模型、文档、检索参数和问题集，保存结果与引用。
2. 在目标环境配置新 embedding 模型，先验证鉴权、输出格式、长输入和失败响应。
3. 创建目标知识库，从原文重新导入；需要保持分段时，核对该版本支持的导入方式并抽查分段对应关系。
4. 等待训练任务完成，核对文档数量、失败任务、索引数量与抽样检索结果。
5. 使用固定问题集比较旧库与新库，分别记录召回、回答证据、延迟与成本。
6. 通过测试应用切换目标库，小范围观察后扩大流量；保留旧绑定与旧库直到观察期结束。

## 分开评价质量与速度

为每个问题标注可以支持答案的文档或分段，比较相关证据在前 k 个结果中的覆盖情况。将空召回、引用错误和答案正确但证据错误分别记录。生成模型、提示词与重排设置保持一致，便于解释 embedding 变化造成的影响。

性能记录包含批量重建耗时、在线查询延迟和模型用量。数据库索引调优在存储层单独验证。例如 `hnsw.iterative_scan`、`hnsw.scan_mem_multiplier` 与 `hnsw.max_scan_tuples` 属于 pgvector 的配置，应用前应核对 PostgreSQL 扩展版本。

## 用应用绑定保留回滚路径

预先定义召回下降、失败比例或延迟超过业务阈值时的恢复动作。恢复旧应用绑定后，用同一问题集复测，并记录切换期间新增的文档与修改。迁移观察期内需要同步维护这些增量，确保旧库仍能承担恢复后的流量。

双库阶段结束后，按组织的数据保留策略处理旧库和备份。清理前确认应用引用、审计要求和恢复窗口，并保留迁移结果记录。

## 继续阅读

- [FastGPT 重排模型选型：相关性、时延与单位成本](https://fastgpt.cn/guide/rerank-model-selection)
- [FastGPT 知识库生命周期：内容归属、更新与恢复](https://fastgpt.cn/guide/kb-lifecycle-ownership)

## 参考资料

- [FastGPT M3E 接入说明](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/m3e)
- [FastGPT 知识库 API 定义](https://github.com/labring/FastGPT/blob/2bab5c1e06c46362f40a454d49d963e8bf0c62bc/packages/global/openapi/core/dataset/api.ts)
- [FastGPT 向量格式化实现](https://github.com/labring/FastGPT/blob/2bab5c1e06c46362f40a454d49d963e8bf0c62bc/packages/service/core/ai/embedding/index.ts)
- [pgvector 索引与迭代扫描](https://github.com/pgvector/pgvector#indexing)
