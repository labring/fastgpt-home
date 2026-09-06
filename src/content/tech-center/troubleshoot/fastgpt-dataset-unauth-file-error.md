---
title: FastGPT dataset模块unAuthDatasetFile错误码的详细说明与处理
slug: /zh/troubleshoot/fastgpt-dataset-unauth-file-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/dataset.ts
source_type: 官方文档
---

# FastGPT dataset模块unAuthDatasetFile错误码的详细说明与处理

## 这个错误是什么
该错误是FastGPT dataset模块定义的unAuthDatasetFile错误，对应statusText为unAuthDatasetFile，关联的文案键为common:core.dataset.error.unAuthDatasetFile，用于提示当前操作的数据集文件未获得访问权限。

## 什么情况下会触发
当执行与数据集文件相关的操作时，若当前账号未被授予对应数据集文件的访问权限，就会触发该错误。

## 怎么定位
1.  查看报错信息中的statusText字段，确认其值为unAuthDatasetFile，且归属dataset模块；
2.  核对当前账号的权限配置，确认是否被分配了对应数据集文件的访问权限；
3.  检查目标数据集的权限设置，确认当前账号是否在允许访问的用户列表中。

## 处理与验证
处理该错误的方式为联系数据集管理员，申请对应数据集文件的访问权限。验证方式为：在权限申请通过后，重新执行之前触发错误的操作，确认报错信息不再出现，操作可正常完成。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/dataset.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
