---
title: FastGPT团队模块应用数量不足错误码说明
slug: /zh/troubleshoot/fastgpt-team-app-amount-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts
source_type: 官方文档
---

# FastGPT团队模块应用数量不足错误码说明

## 这个错误是什么
该错误属于FastGPT team模块的官方错误码体系，枚举名为`appAmountNotEnough`，对应返回的statusText为`appAmountNotEnough`，国际化文案键为`common:code_error.team_error.app_amount_not_enough`，用于标识团队应用数量维度的异常场景，是团队管理类错误的细分类型之一。

## 什么情况下会触发
当团队的已创建应用数量达到平台设定的团队应用数量上限，或团队可用的应用创建额度不足以支撑当前新增应用、扩容应用相关操作时，会触发该错误。该错误仅会在团队维度的应用配额相关操作中出现。

## 怎么定位
1. 首先确认接口返回的错误字段中，statusText为`appAmountNotEnough`，或错误提示文案匹配`common:code_error.team_error.app_amount_not_enough`对应的国际化展示内容；
2. 进入团队管理页面，查看当前团队的应用数量配额设置，核对已创建的应用总数是否接近或达到设定上限；
3. 回溯触发错误的操作流程，确认操作是否涉及新增应用、调整应用配额等与团队应用数量相关的动作。

## 处理与验证
处理该错误可通过两种方式：一是删除团队内闲置、未使用的应用，释放已占用的应用额度；二是联系团队管理员或平台运营方，申请调整团队的应用数量上限，升级团队应用配额。验证该错误已解决的方式为：完成上述处理后，重新执行触发错误的操作，确认操作可正常完成，且无该错误提示返回。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
