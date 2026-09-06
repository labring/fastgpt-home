---
title: 解决FastGPT平台提示词获取与召回chunk溯源相关问题
slug: /zh/troubleshoot/fastgpt-prompt-chunk-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1406
source_type: GitHub issue
---

# 解决FastGPT平台提示词获取与召回chunk溯源相关问题

## 现象
用户在使用FastGPT过程中，存在两个未得到明确解答的疑问：一是希望获取官方提供的提示词案例，二是不清楚当精召回3个chunk后，模型如何确认答案基于哪个chunk生成。

## 可能原因
一是未找到官方公开的提示词示例资源，二是对精召回chunk后的模型答案溯源逻辑缺乏明确认知，三是未明确官方关于召回chunk处理的相关说明。

## 排查步骤
1. 确认是否已完整查看项目README与官方文档
2. 检查是否存在社区或官方发布的提示词参考案例
3. 确认精召回chunk的配置参数与调用流程是否符合文档要求
4. 核对精召回的chunk数量是否与配置参数一致
5. 确认是否已获取官方关于召回chunk处理的相关说明

## 解决与验证
对于提示词案例，需根据实际业务场景自行设计。对于精召回chunk的溯源逻辑，需按实际环境确认。

> 来源: [FastGPT GitHub issue #1406](https://github.com/labring/FastGPT/issues/1406)
