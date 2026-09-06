---
title: FastGPT混合检索结果异常及检索性能优化排错方法
slug: /zh/troubleshoot/fastgpt-knowledge-retrieval-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/980
source_type: GitHub issue
---

# FastGPT混合检索结果异常及检索性能优化排错方法

## 现象
用户在私有部署的FastGPT中导入40万条、约4千万汉字的数据集至知识库后，遇到以下问题：混合检索时部分结果仅返回语义检索结果，部分同时返回语义检索与全文检索结果；部分检索结果相关性不符合预期；初始检索耗时约8秒，调整PostgreSQL参数后降至2.714秒；无法直接修改pgvector的hnsw参数m和ef_construction。

## 可能原因
1. 全文检索可能返回空结果，导致混合检索仅展示语义检索结果；
2. 采用文本直接分段的存储方式，可能影响检索结果的相关性；
3. 初始PostgreSQL数据库配置未优化，导致检索效率较低；
4. FastGPT代码中pgvector的hnsw参数固定，无法通过前端直接修改。

## 排查步骤
1. 检查单次检索的全文检索返回结果，确认是否存在无匹配数据的情况；
2. 对比不同文本分段策略下的检索效果，验证分段方式对相关性的影响；
3. 调整PostgreSQL数据库的shared_buffers参数，设置为可用内存的25%；
4. 如需修改pgvector的hnsw参数，需先连接数据库删除现有索引，再重建索引并指定新的m和ef_construction参数。

## 解决与验证
1. 调整shared_buffers为可用内存的25%后，可有效降低检索耗时，用户实测从8秒降至2.714秒；
2. 优化文本分段策略或增加自定义索引，可提升检索结果的相关性；
3. 如需修改pgvector的hnsw参数，需通过数据库操作完成，FastGPT代码中该参数固定，无法直接通过前端调整。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/980)
