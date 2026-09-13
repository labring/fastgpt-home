---
title: FastGPT dataset模块unAuthDatasetCollection错误码详细说明
slug: /zh/troubleshoot/fastgpt-dataset-unauth-collection-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/dataset.ts
source_type: 官方文档
---

# FastGPT dataset模块unAuthDatasetCollection错误码详细说明

## 这个错误是什么
该错误属于dataset模块，枚举名为unAuthDatasetCollection，statusText为unAuthDatasetCollection，对应文案键为common:core.dataset.error.unAuthDatasetCollection，是FastGPT系统中用于标识数据集集合权限校验失败的错误类型。

## 什么情况下会触发
当操作者尝试访问或操作未被授予对应权限的数据集集合时，会触发该错误。此类操作涵盖查看、修改、删除该数据集集合内的资源，或执行依赖该集合权限的相关业务流程。

## 怎么定位
1. 确认当前操作涉及的数据集集合的归属与权限配置范围；2. 检查系统返回的报错信息，确认statusText字段值为unAuthDatasetCollection，匹配当前错误类型；3. 核对操作者的角色权限列表，确认是否被分配了对应数据集集合的操作权限；4. 确认操作的数据集ID、集合ID等参数是否与目标资源一致，避免误操作其他数据集集合。

## 处理与验证
1. 联系数据集管理员申请对应数据集集合的操作权限；2. 待权限配置更新完成后，重新执行原操作；3. 验证操作是否成功完成，无权限相关报错返回；4. 若仍出现报错，再次核对权限配置与操作参数，确认无误后再次尝试。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/dataset.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
