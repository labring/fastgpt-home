---
title: FastGPT team模块notUser错误码的说明与处理
slug: /zh/troubleshoot/fastgpt-team-notuser-error-guide
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts
source_type: 官方文档
---

# FastGPT team模块notUser错误码的说明与处理

## 这个错误是什么
该错误是FastGPT团队模块中的权限类错误，枚举标识为TeamErrEnum.notUser，状态文本为notUser，对应多语言国际化文案键为common:code_error.team_error.not_user，用于统一标识当前用户不具备对应团队成员身份的异常场景。

## 什么情况下会触发
当操作涉及团队相关资源时，若当前用户未被纳入目标团队，会触发该错误。具体包括调用团队资源管理、团队配置修改、团队数据查询等接口时，未携带合法的团队成员身份凭证，或身份凭证未匹配到对应团队的成员记录。

## 怎么定位（可照做的步骤）
1. 查看后端接口返回的错误响应体，确认statusText字段值为notUser。
2. 查看当前接口的业务参数，确认操作关联的团队ID或团队名称。
3. 核对当前登录用户的团队成员列表，确认是否被纳入目标团队。
4. 检查身份凭证的有效性，确认未过期或被篡改。

## 处理与验证
1. 将当前用户添加至目标团队，配置对应操作所需的团队权限。
2. 若为临时测试场景，可临时赋予当前用户临时团队访问权限。
3. 重新执行触发错误的操作，确认错误不再出现，业务流程正常推进。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
