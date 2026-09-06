---
title: 解决FastGPT知识库语义检索结果不相关或相似度低的问题
slug: /zh/troubleshoot/fastgpt-semantic-retrieval-low-similarity
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4197
source_type: GitHub issue
---

# 解决FastGPT知识库语义检索结果不相关或相似度低的问题

## 现象
用户最初在升级到FastGPT 4.9.0-fix2私有部署版本后，使用知识库搜索测试的语义检索功能，搜索结果相似度极低或完全不相关。全文检索可正常返回相关内容，手动重新添加索引后，语义检索可正常工作。用户回退到升级前的版本后，该问题依然存在。本次部署使用docker-compose启动Milvus，索引模型为m3e，文本理解模型为deepseek-r1。

## 可能原因
结合问题表现和参考的已修复issue #2895，大概率的原因是已生成的向量索引未正确更新或关联，导致语义检索无法匹配到正确的知识库内容。此外，Milvus服务的运行状态、向量存储的完整性异常，也可能引发该问题，具体需按实际部署环境确认。

## 排查步骤
1.  确认当前知识库使用的索引模型为m3e，文本理解模型配置正确。
2.  进入对应知识库的索引管理页面，查看已生成索引的状态是否正常。
3.  执行手动重新添加索引的操作，等待索引生成完成后，再次进行语义检索测试。
4.  检查Milvus服务的运行状态，确认无连接异常或服务中断情况。
5.  核对已修复的issue #2895中的相关配置，确认向量索引的关联设置正确。

## 解决与验证
可通过手动重新生成知识库的向量索引解决该问题。操作完成后，再次进行语义检索测试，若能正常返回相关的知识库内容，则问题解决。若问题仍存在，需进一步核对Milvus的连接配置、向量存储的完整性，以及FastGPT的知识库关联设置。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4197)
