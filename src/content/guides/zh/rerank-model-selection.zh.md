<!--
Delivery metadata (not published with the body)
slug: rerank-model-selection
locale: zh
canonical: https://fastgpt.cn/guide/rerank-model-selection
hreflang: zh-CN | zh-CN → https://fastgpt.cn/guide/rerank-model-selection | en → https://fastgpt.io/guide/rerank-model-selection | x-default → https://fastgpt.io/guide/rerank-model-selection
Meta title: FastGPT 重排模型选型：相关性、时延与单位成本
Meta description: 使用固定候选和标注问题集比较重排模型，核对相关性过滤、RRF 融合、端到端延迟与失败回退，按合格回答衡量重排收益和成本。
keywords: FastGPT,rerank,model,selection
结构化数据: Article + BreadcrumbList
内链: FastGPT 更换向量模型：知识库重建、对照与回滚 / FastGPT 本地模型 TCO：接入验收、容量与任务成本
配图需求: Text and accessible tables; no image is required for this release.
发布批次: Week07
-->

# FastGPT 重排模型选型：相关性、延迟与成本

重排模型接收一组已召回的候选内容，并评估它们与问题的相关性。选型的起点是确认候选集中已经包含正确证据，再衡量重排对结果质量与端到端性能的影响。知识内容缺失、解析错误和候选召回范围不足，需要在前面的链路处理。

FastGPT 官方检索文档说明了向量、全文、混合检索与重排之间的关系。最终检索结果还涉及 RRF 融合与过滤条件，因此验收应观察实际返回的证据和答案。

## 固定比较条件

使用相同的知识库快照、embedding 模型、问题集、候选数量与生成模型。为问题标注能支持正确答案的文档或分段，覆盖简称、长问题、专业词、相似文档与无答案问题。先保存关闭重排时的结果作为基线。

| 指标 | 测量内容 | 用途 |
| --- | --- | --- |
| 候选覆盖 | 正确证据是否进入重排候选集 | 判断上游召回是否具备改进空间 |
| 排序质量 | 相关证据的位置与前 k 条覆盖 | 比较模型对候选的区分能力 |
| 回答与引用 | 答案正确性、证据充分性与引用目标 | 确认排序变化对业务结果的价值 |
| 时延 | 重排耗时与端到端延迟分位数 | 检查用户体验与峰值负载 |
| 用量与费用 | 候选数量、文本长度、调用量和资源占用 | 计算质量改善对应的成本 |
| 失败表现 | 超时、限流、无效响应与回退结果 | 检查业务可用性 |

## 按真实输入测试候选模型

先确认模型接口、语言覆盖、输入长度与返回格式适配当前版本。用少量固定样本检查鉴权与响应，再进行完整问题集评估。比较时固定候选内容，保存模型返回及最终检索结果，便于解释分数过滤和结果融合的影响。

对中文、英文与混合语言分别统计。专业缩写和长段落可能产生不同表现；总体平均值应配合关键场景结果一起查看。候选数增加会带来更多重排输入，应同时测量质量收益与延迟变化。

## 正确理解分数和过滤

不同重排模型的分数范围与分布可能不同。更换模型后，需要基于标注样本重新选择相关性阈值，并观察过滤后剩余证据是否足以回答问题。将旧模型的阈值直接复制到新模型，会增加结果偏差的风险。

在实际业务入口查看最终返回内容，并对照重排分数、过滤与 RRF 融合的作用。需要诊断单个问题时，保存召回候选、模型输出和最终证据三份记录。

## 演练重排失败

所引用的 FastGPT 源码快照在重排失败时保留原文本召回，并设置 `usingReRank=false`。部署时应核对该版本的行为，并测试请求超时、凭据错误和服务不可用，确认业务得到的结果与观测记录符合预期。

回退到基础召回后，回答质量可能变化。把这一场景纳入关键问题集，检查答案与引用，并让运维能够区分正常重排与回退请求。

## 用收益决定启用范围

先对收益明确的问题类型启用，再扩大到更广的应用。采购比较应计入重排服务调用或自托管计算资源、网关与网络、监控运维以及峰值冗余。按每个通过质量验收的回答计算成本，可以把模型价格与实际业务价值联系起来。

## 继续阅读

- [FastGPT 更换向量模型：知识库重建、对照与回滚](https://fastgpt.cn/guide/embedding-model-migration)
- [FastGPT 本地模型 TCO：接入验收、容量与任务成本](https://fastgpt.cn/guide/local-model-tco)

## 参考资料

- [FastGPT 模型配置](https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro)
- [FastGPT 检索原理](https://doc.fastgpt.cn/zh-CN/guide/dataset/dataset_engine)
- [FastGPT 重排失败回退实现](https://github.com/labring/FastGPT/blob/2bab5c1e06c46362f40a454d49d963e8bf0c62bc/packages/service/core/dataset/search/defaultRecall/rerank.ts)
- [BAAI BGE Reranker v2 M3 模型卡](https://huggingface.co/BAAI/bge-reranker-v2-m3)
