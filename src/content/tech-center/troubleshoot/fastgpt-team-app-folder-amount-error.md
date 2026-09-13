---
title: FastGPT team模块appFolderAmountNotEnough错误码说明
slug: /zh/troubleshoot/fastgpt-team-app-folder-amount-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts
source_type: 官方文档
---

# FastGPT team模块appFolderAmountNotEnough错误码说明

## 这个错误是什么
该错误属于FastGPT team模块的标准化错误枚举项，枚举名为TeamErrEnum.appFolderAmountNotEnough，对应statusText为appFolderAmountNotEnough，关联的国际化文案键为common:code_error.team_error.app_folder_amount_not_enough。该错误用于统一标识团队应用文件夹相关的配额异常，属于团队管理模块下的预定义错误类型。

## 什么情况下会触发
当执行涉及团队应用文件夹的创建、调整或使用操作时，若当前团队已使用的应用文件夹数量达到套餐限定的最大配额，会触发该错误。该错误仅在团队维度的资源配额校验不通过时触发，不涉及个人空间的应用文件夹操作。

## 怎么定位
1. 确认当前操作是否涉及团队应用文件夹的相关操作；
2. 查看错误返回的响应内容，提取statusText字段，确认其值为appFolderAmountNotEnough；
3. 核对团队当前的应用文件夹使用量与套餐配置的配额标准，确认是否存在超限情况。

## 处理与验证
处理该错误可通过两种方式：一是清理不再使用的团队应用文件夹，释放已占用的配额；二是升级团队套餐，获取更高的应用文件夹配额上限。完成处理后重新执行原操作，即可验证错误是否已解决。操作前也可先查看团队资源配额页面，提前确认使用情况，避免重复触发该错误。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
