---
title: FastGPT common folderDepthLimit错误说明
slug: /zh/troubleshoot/fastgpt-common-folder-depth-limit-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/common.ts
source_type: 官方文档
---

# FastGPT common folderDepthLimit错误说明

## 这个错误是什么
该错误属于FastGPT common模块的folderDepthLimit错误，对应错误码为507006，状态文本为folderDepthLimit，错误提示信息由国际化键common:error.folderDepthLimit定义，用于标识文件夹嵌套深度超出系统限制的场景。

## 什么情况下会触发
该错误会在创建文件夹的操作中触发，当操作涉及的文件夹嵌套层级超过系统预设的最大允许深度时，系统会返回该错误。

## 怎么定位（可照做的步骤）
1. 提取报错返回的状态文本与错误码，确认状态文本为folderDepthLimit，错误码为507006；
2. 梳理当前操作涉及的文件夹路径，统计其嵌套层级，排查是否存在超出系统限制的情况；
3. 核对相关接口的请求参数，确认文件夹路径参数的格式与内容符合系统要求。

## 处理与验证
处理该错误需先调整文件夹的嵌套层级，使其符合系统限定的最大深度阈值。调整完成后重新执行原操作，即可验证错误是否被解决。若操作成功完成且未再触发该错误，则代表问题已修复。此外，可通过记录错误码507006与状态文本folderDepthLimit，快速在系统日志中定位该类错误。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/common.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
