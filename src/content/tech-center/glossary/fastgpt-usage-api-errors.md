---
title: FastGPT中usage相关日志与接口报错排查
slug: /zh/glossary/fastgpt-usage-api-errors
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/1034
source_type: 官方文档
---

# FastGPT中usage相关日志与接口报错排查

## 一句话定义
usage是FastGPT中用于标识token使用统计、计费相关接口及对应报错信息的专用术语。

## 在 FastGPT 里怎么用
在QA队列执行场景中，usage字段会作为执行结果的统计参数出现，包含prompt_tokens（提示词token数量）、total_tokens（总token数量）、completion_tokens（补全token数量）三个子项，会被记录在[QA Queue] Finish的日志内容中，可用于排查知识库导入后的向量模型索引更新问题。在训练订单创建场景中，可通过调用/support/wallet/usage/createTrainingUsage接口发起请求，请求体需携带name参数（如测试文件名），请求头需通过Authorization字段以Bearer格式传入有效的api_key，用于创建对应训练订单。

## 容易搞错的地方
一是导入知识库后，若系统返回[QA Queue] Finish日志并伴随Collection is not exist错误，需检查当前操作对应的知识库集合是否存在，避免因集合删除或配置错误导致执行失败。二是调用训练订单创建接口时，即使传入的api_key有效且可用于其他接口，若未获得对应数据集的访问权限，会返回code为501000、状态文本为unAuthDataset的报错，需确认数据集权限配置是否正确。

> [FastGPT GitHub issue 1034](https://github.com/labring/FastGPT/issues/1034), [FastGPT GitHub issue 1928](https://github.com/labring/FastGPT/issues/1928)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
