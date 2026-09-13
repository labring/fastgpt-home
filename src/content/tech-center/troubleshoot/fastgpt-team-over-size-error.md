---
title: FastGPT team模块teamOverSize错误码的说明
slug: /zh/troubleshoot/fastgpt-team-over-size-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts
source_type: 官方文档
---

# FastGPT team模块teamOverSize错误码的说明

## 这个错误是什么
该错误属于FastGPT team模块的错误类型，枚举名为teamOverSize，对应statusText为teamOverSize，国际化文案键为common:code_error.team_error.over_size，用于标识团队整体规模或资源配额超限的异常场景。

## 什么情况下会触发
该错误会在执行涉及团队规模校验的操作时触发，具体场景涵盖团队创建、资源扩容、成员加入等操作，当相关操作突破团队预设的规模限制阈值时，会抛出该错误。

## 怎么定位
1. 捕获报错信息，确认statusText字段为teamOverSize；
2. 通过前端报错弹窗或后端日志获取完整错误详情，进入FastGPT团队管理界面，查看团队的各项资源配额使用详情；
3. 对比系统预设的团队配额限制与当前实际使用量，定位超限的具体资源项。

## 处理与验证
1. 根据定位到的超限资源类型，调整团队的资源使用状态，减少对应项的占用；
2. 若团队配额不足，可按照平台规则调整资源使用策略或申请配额升级；
3. 重新执行触发该错误的操作，验证报错是否不再出现；
4. 若报错持续存在，核对团队的配额配置信息，确认是否存在配置偏差。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
