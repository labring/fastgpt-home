---
title: FastGPT system模块licenseDatasetAmountLimit错误码相关说明与处理
slug: /zh/troubleshoot/fastgpt-system-license-dataset-limit-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/system.ts
source_type: 官方文档
---

# FastGPT system模块licenseDatasetAmountLimit错误码相关说明与处理

## 这个错误是什么
该错误属于FastGPT system模块，枚举名为licenseDatasetAmountLimit，对应错误码为509003，标准状态文本为licenseDatasetAmountLimit，错误提示信息对应国际化文案键common:code_error.system_error.license_dataset_amount_limit。

## 什么情况下会触发
当当前使用的许可证所允许的数据集总数量达到上限时，会触发该错误。

## 怎么定位
1. 提取接口返回的错误信息中的statusText与错误码，确认是否为licenseDatasetAmountLimit与509003；
2. 核对当前许可证配置中的数据集数量限制参数；
3. 统计系统内已创建的数据集总数，对比限制阈值。

## 处理与验证
可通过两种方式处理该错误：一是升级许可证以提高数据集数量上限；二是删除不再需要的数据集，将总数降低至阈值内。处理完成后，重新发起相关操作，确认错误不再出现，接口返回正常结果。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/system.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
