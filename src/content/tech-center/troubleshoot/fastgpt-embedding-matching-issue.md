---
title: 解决FastGPT中text-embedding-v1模型匹配度异常
slug: /zh/troubleshoot/fastgpt-embedding-matching-issue
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/469
source_type: GitHub issue
---

# 解决FastGPT中text-embedding-v1模型匹配度异常

## 现象
该问题出现于私有部署版本的FastGPT，使用阿里通义text-embedding-v1模型进行搜索测试时，匹配度未处于预期的0-1区间。

## 可能原因
目前公开信息中未明确该问题的具体诱因，需结合实际的部署环境、调用配置以及模型接口返回逻辑进行排查确认。

## 排查步骤
1. 确认当前使用的模型为阿里通义text-embedding-v1，且对应的调用密钥已正确配置且可正常使用。
2. 检查FastGPT中搜索测试的相关配置参数，确认匹配度计算的逻辑是否符合预设要求。
3. 抓取模型返回的原始接口结果，核对返回数值的范围是否符合0-1的标准区间。
4. 对比其他模型的测试结果，确认该异常仅出现在当前指定模型的调用场景中。

## 解决与验证
若经排查发现模型返回的原始数值范围不符合0-1的要求，需联系对应模型的服务商确认接口返回逻辑是否存在异常。若为FastGPT内部的匹配度计算逻辑出现问题，需检查相关的配置项与代码逻辑。完成排查与修复后，重新发起搜索测试，确认匹配度处于0-1的合理区间。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/469)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
