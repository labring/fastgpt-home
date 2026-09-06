---
title: FastGPT dataset模块unLinkCollection错误码详细说明
slug: /zh/troubleshoot/fastgpt-dataset-unlink-collection-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/dataset.ts
source_type: 官方文档
---

# FastGPT dataset模块unLinkCollection错误码详细说明

## 这个错误是什么
该错误属于FastGPT dataset模块的标准错误项，枚举名为DatasetErrEnum.unLinkCollection，对应statusText为unLinkCollection，关联的国际化文案键为common:core.dataset.error.unLinkCollection。

## 什么情况下会触发
当执行取消数据集集合关联的相关操作时，会触发该错误。

## 怎么定位
1. 提取错误返回的statusText字段，确认其值为unLinkCollection；
2. 检查待操作的数据集集合是否存在于当前绑定的数据集中；
3. 验证执行操作的主体是否拥有对应数据集的关联管理权限；
4. 核对接口调用的参数是否符合接口要求。

## 处理与验证
根据定位到的具体问题进行处理：若目标集合不存在，修正待操作的集合参数；若权限不足，申请对应数据集的操作权限；若参数格式错误，调整参数后重新发起请求。完成处理后，重新执行取消关联操作，确认错误不再出现且关联关系已正确处理。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/dataset.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
