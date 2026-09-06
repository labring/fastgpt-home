---
title: FastGPT团队模块groupNameEmpty错误码的详细说明
slug: /zh/troubleshoot/fastgpt-team-groupname-empty-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts
source_type: 官方文档
---

# FastGPT团队模块groupNameEmpty错误码的详细说明

## 这个错误是什么
该错误属于FastGPT team模块的groupNameEmpty错误，枚举名为groupNameEmpty，对应statusText为groupNameEmpty，文案键为common:code_error.team_error.group_name_empty，用于标识团队分组名称为空的异常场景。

## 什么情况下会触发
当执行团队分组的创建或编辑操作时，提交的分组名称参数为空或仅包含空白字符时，会触发该错误。

## 怎么定位
1. 查看接口返回的statusText字段，确认其值为groupNameEmpty；
2. 检查对应请求的分组名称参数，确认参数是否未填写或仅为空白字符；
3. 核对业务逻辑中关于团队分组名称的参数校验环节，排查是否遗漏了非空校验。

## 处理与验证
处理该错误需为团队分组填写合法的非空名称，确保符合系统要求的命名规则。验证方式为重新提交团队分组的创建或编辑请求，确认接口未返回该错误，且分组操作成功完成。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
