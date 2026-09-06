---
title: FastGPT dataset模块unAuthDataset错误码的说明与处理
slug: /zh/troubleshoot/fastgpt-dataset-unauth-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/dataset.ts
source_type: 官方文档
---

# FastGPT dataset模块unAuthDataset错误码的说明与处理

## 这个错误是什么
该错误属于FastGPT dataset模块的501000系列错误码，枚举名为unAuthDataset，对应statusText为unAuthDataset，错误提示文案通过i18nT加载，文案键为common:core.dataset.error.unAuthDataset，用于标识数据集访问权限验证失败的场景。

## 什么情况下会触发
当用户发起的数据集相关操作未通过权限验证时，会触发该错误。例如尝试访问不属于自身或未被授权的数据集，调用数据集的查询、编辑、同步等接口时，返回该错误标识。

## 怎么定位
1.  提取接口响应的statusText字段，确认其值为unAuthDataset；
2.  核对错误所属模块为dataset，对应错误码区间为501000；
3.  检查请求参数中的数据集ID，确认该数据集存在且当前用户已被分配对应访问权限；
4.  查看国际化配置中common:core.dataset.error.unAuthDataset对应的文案，匹配错误场景。

## 处理与验证
1.  联系系统管理员申请对应数据集的访问权限，完成权限配置；
2.  待权限生效后，重新发起之前触发错误的数据集相关操作；
3.  验证接口响应不再返回unAuthDataset错误，正常获取或操作数据集资源；
4.  若权限已配置仍触发该错误，再次核对请求中的数据集ID参数是否正确，避免指向未授权的数据集资源。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/dataset.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
