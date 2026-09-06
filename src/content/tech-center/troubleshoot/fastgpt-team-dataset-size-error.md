---
title: FastGPT team模块datasetSizeNotEnough错误码说明
slug: /zh/troubleshoot/fastgpt-team-dataset-size-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts
source_type: 官方文档
---

# FastGPT team模块datasetSizeNotEnough错误码说明

## 这个错误是什么
该错误属于FastGPT team模块，枚举名为datasetSizeNotEnough，对应statusText为datasetSizeNotEnough，国际化文案键为common:code_error.team_error.dataset_size_not_enough，用于标识团队数据集大小配额不足的错误场景。

## 什么情况下会触发
当团队所使用的数据集总占用大小超出当前配置的配额上限时，会触发该错误。该错误属于team模块下的资源超限类错误，枚举值为datasetSizeNotEnough。

## 怎么定位
1. 查看团队的数据集配额配置信息；2. 统计团队下所有数据集的总占用大小；3. 匹配错误日志中的statusText字段为datasetSizeNotEnough，即可确认该错误类型。可通过团队管理页面的资源统计模块查看已使用配额与剩余配额，或通过接口返回的statusText字段识别该错误。

## 处理与验证
处理该错误可通过删除团队内不再需要的数据集以释放存储空间，或升级团队套餐以提升数据集大小配额上限。验证时，调整配额或释放空间后重新执行触发错误的操作，确认不再返回datasetSizeNotEnough错误，且团队数据集总大小低于当前配额上限即可。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
