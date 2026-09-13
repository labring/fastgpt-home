---
title: FastGPT team模块groupNotExist错误码详细说明
slug: /zh/troubleshoot/fastgpt-team-group-exist-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts
source_type: 官方文档
---

# FastGPT team模块groupNotExist错误码详细说明

## 这个错误是什么
该错误属于FastGPT team模块的错误码枚举项，枚举名为groupNotExist，对应statusText为groupNotExist，国际化文案键为common:code_error.team_error.group_not_exist，用于标识团队分组不存在的异常场景。

## 什么情况下会触发
该错误触发于尝试访问、修改或操作不存在的团队分组的业务场景。例如查询不存在的分组信息、修改不存在分组的配置、向不存在的分组添加成员或绑定资源等操作，均会触发该错误。

## 怎么定位
1. 查看接口返回的statusText字段，确认其值为groupNotExist。2. 提取当前操作中传入的团队分组标识，核对系统内已创建的团队分组清单。3. 确认目标分组是否已被删除，或未完成创建流程。

## 处理与验证
1. 修正操作中的团队分组标识，替换为系统中已存在的有效分组信息。2. 重新发起对应业务操作，确认错误不再出现。3. 验证操作结果，确保业务流程正常执行。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
