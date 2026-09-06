---
title: FastGPT dataset模块unAuthDatasetData错误的说明与处理
slug: /zh/troubleshoot/fastgpt-dataset-unauth-data-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/dataset.ts
source_type: 官方文档
---

# FastGPT dataset模块unAuthDatasetData错误的说明与处理

## 这个错误是什么
该错误属于FastGPT dataset模块的权限类错误，枚举名为unAuthDatasetData，对应statusText为unAuthDatasetData，错误文案键为common:core.dataset.error.unAuthDatasetData，用于标识数据集数据权限校验失败的场景。

## 什么情况下会触发
当执行与数据集数据相关的操作时，若当前操作主体不具备对应数据集数据的访问或操作权限，将触发该错误。该错误对应枚举值DatasetErrEnum.unAuthDatasetData，属于dataset模块的权限校验失败场景。

## 怎么定位
1. 查看接口返回的statusText字段，确认其值为unAuthDatasetData；
2. 核对当前操作的数据集数据所属的数据集范围；
3. 确认当前操作主体是否被配置了该数据集数据的对应权限；
4. 通过错误文案键common:core.dataset.error.unAuthDatasetData匹配对应错误提示，确认错误类型。

## 处理与验证
处理步骤：1. 联系数据集所有者或管理员申请对应数据集数据的访问或操作权限；2. 切换至具备对应权限的操作主体重新发起操作；3. 检查数据集权限配置，修正错误配置。验证方式：重新执行原操作，若不再返回该错误码，即可确认问题已解决。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/dataset.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
