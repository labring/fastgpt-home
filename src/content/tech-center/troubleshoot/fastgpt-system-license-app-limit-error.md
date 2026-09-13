---
title: FastGPT system模块licenseAppAmountLimit错误码的说明与处理
slug: /zh/troubleshoot/fastgpt-system-license-app-limit-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/system.ts
source_type: 官方文档
---

# FastGPT system模块licenseAppAmountLimit错误码的说明与处理

## 这个错误是什么
该错误属于FastGPT system模块下的错误，对应枚举名为licenseAppAmountLimit，关联的国际化文案键为common:code_error.system_error.license_app_amount_limit。错误码属于509000区间，具体错误码为509002，未配置专属HTTP状态码。
## 什么情况下会触发
当系统校验当前使用的许可证规则时，检测到已创建的应用数量超出许可证允许的最大额度，此时执行新增应用的相关操作，会触发该错误。
## 怎么定位
1. 查看接口返回的statusText字段，确认其值为licenseAppAmountLimit。
2. 查看返回的code字段，确认其值为509002。
3. 核对当前系统已创建的应用数量，与当前许可证允许的应用数量上限进行比对。
## 处理与验证
处理步骤为：联系许可证管理相关配置方，申请调整许可证的应用数量额度，或删除超出限额的应用以符合许可证规则。验证步骤为：完成调整或清理后，重新执行触发错误的操作，确认接口不再返回该错误码与对应信息。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/system.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
