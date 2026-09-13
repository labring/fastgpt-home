---
title: FastGPT S3模块fileUploadDisabled错误码的说明与处理
slug: /zh/troubleshoot/fastgpt-s3-fileupload-disabled-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/s3.ts
source_type: 官方文档
---

# FastGPT S3模块fileUploadDisabled错误码的说明与处理

## 这个错误是什么
该错误是FastGPT S3模块预定义的错误类型之一，枚举名为fileUploadDisabled，对应的statusText为FileUploadDisabled，错误码为510002，报错信息关联国际化文案键common:error.file_upload_disabled，用于标识文件上传被禁用的相关场景。

## 什么情况下会触发
该错误的触发场景为系统禁止执行S3模块的文件上传操作，具体触发条件需结合系统的S3存储配置与权限规则确定。

## 怎么定位（可照做的步骤）
定位该错误可按照以下步骤操作：1. 提取错误返回的statusText与错误码，确认为FileUploadDisabled与510002，归属S3模块的fileUploadDisabled错误；2. 核查系统中S3文件上传相关的配置项，确认是否存在禁用上传的设置；3. 核对国际化文案的配置，确保文案键common:error.file_upload_disabled的翻译与加载正常。

## 处理与验证
处理该错误需先调整系统配置，启用S3模块的文件上传功能，修正禁用上传的相关设置；其次检查对应存储桶的上传权限，确保权限配置符合上传要求；最后触发一次文件上传操作，验证错误是否不再出现。若上传操作成功完成且未抛出该错误，则说明处理生效。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/s3.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
