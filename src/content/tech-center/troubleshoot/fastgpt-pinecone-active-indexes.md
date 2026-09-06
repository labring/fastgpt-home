---
title: 解决FastGPT调用Pinecone时无活动索引的报错问题
slug: /zh/troubleshoot/fastgpt-pinecone-active-indexes
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1452
source_type: GitHub issue
---

# 解决FastGPT调用Pinecone时无活动索引的报错问题

## 现象
使用FastGPT时触发报错，报错文本为：ValueError: No active indexes found in your Pinecone project, are you sure you're using the right Pinecone API key and Environment? 且已确认自身的密钥可正常使用。

## 可能原因
1. 配置的Pinecone API密钥不正确
2. 配置的Pinecone环境参数与实际项目环境不匹配
3. 对应Pinecone项目中未创建或未激活可用的索引

## 排查步骤
1. 访问Pinecone控制台，核对当前使用的API密钥与控制台展示的内容是否一致
2. 核对FastGPT配置中的Pinecone环境参数，与控制台中项目的环境标识是否匹配
3. 进入Pinecone控制台的索引管理页面，确认存在已激活的可用索引

## 解决与验证
修正错误的Pinecone API密钥或环境参数，确保与控制台配置一致。在FastGPT的对应配置项中更新正确参数后，重新发起相关调用，确认不再出现指定的ValueError报错，功能正常运行。

> 来源: [FastGPT GitHub issue #1452](https://github.com/labring/FastGPT/issues/1452)
