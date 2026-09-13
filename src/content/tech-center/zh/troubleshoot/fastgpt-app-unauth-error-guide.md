---
title: FastGPT app模块unAuthApp错误码的说明与排查
slug: /zh/troubleshoot/fastgpt-app-unauth-error-guide
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/app.ts
source_type: 官方文档
---

# FastGPT app模块unAuthApp错误码的说明与排查

## 这个错误是什么
这是FastGPT app模块下的unAuthApp错误，对应错误码为502001，错误标识statusText为unAuthApp，国际化文案键为common:code_error.app_error.un_auth_app。该错误表示当前操作的应用未通过权限验证，无法执行对应操作。

## 什么情况下会触发
当用户尝试访问或操作未被授权的FastGPT应用时触发该错误。包括非应用所有者、未被分配对应操作权限的用户，尝试查看应用配置、编辑应用信息或调用应用接口等场景。

## 怎么定位
1. 查看接口返回的statusText字段，确认其值为unAuthApp；
2. 核对当前操作的应用ID与当前用户的权限关系；
3. 检查目标应用的所有者配置或权限分配列表；
4. 通过错误码502001进一步确认错误类型。

## 处理与验证
1. 确认当前用户是否为应用的合法授权用户，包括应用所有者或被分配了对应权限的协作者；
2. 若为应用所有者，检查应用的权限配置是否符合预期；
3. 使用合法授权的用户身份重新发起对应操作；
4. 验证接口返回的错误提示文案匹配common:code_error.app_error.un_auth_app对应的内容，确认错误已解决。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/app.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
