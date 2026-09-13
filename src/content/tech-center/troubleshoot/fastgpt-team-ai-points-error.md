---
title: FastGPT team模块aiPointsNotEnough错误码的详细说明与处理
slug: /zh/troubleshoot/fastgpt-team-ai-points-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts
source_type: 官方文档
---

# FastGPT team模块aiPointsNotEnough错误码的详细说明与处理

## 这个错误是什么
该错误属于FastGPT team模块的标准化错误枚举，枚举名为aiPointsNotEnough，对应statusText为aiPointsNotEnough，关联的国际化文案键为common:code_error.team_error.ai_points_not_enough，用于明确反馈团队维度下的AI点数不足类异常。

## 什么情况下会触发
当执行需要消耗团队AI点数的操作时，若当前团队的可用AI点数不足以覆盖该操作的消耗额度，就会触发该错误。具体操作场景包括调用团队绑定的AI推理服务、使用团队级别的依赖AI点数的功能模块等。

## 怎么定位
可按照以下步骤定位该错误：1. 确认当前操作所属的团队范围，区分个人与团队操作场景；2. 查看接口返回的statusText字段，确认其值为aiPointsNotEnough；3. 核对触发错误时的操作是否涉及团队AI点数的消耗，例如团队共享的AI调用额度；4. 匹配国际化文案键common:code_error.team_error.ai_points_not_enough，进一步确认错误类型。

## 处理与验证
处理该错误的核心方式为为当前团队补充足够的AI点数额度。完成点数补充后，重新执行触发错误的操作，即可验证错误是否已解决。若操作正常执行且无异常报错，则说明处理生效。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
