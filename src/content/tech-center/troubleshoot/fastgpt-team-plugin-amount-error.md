---
title: FastGPT team模块pluginAmountNotEnough错误码说明
slug: /zh/troubleshoot/fastgpt-team-plugin-amount-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts
source_type: 官方文档
---

# FastGPT team模块pluginAmountNotEnough错误码说明

## 这个错误是什么
该类错误均属于FastGPT team模块的标准化额度/资源不足类错误，以下为两个具体错误码的说明：

### pluginAmountNotEnough
枚举名为pluginAmountNotEnough，对应状态文本为pluginAmountNotEnough，国际化文案键为common:code_error.team_error.plugin_amount_not_enough，用于标识团队在使用插件过程中出现的额度不足异常场景。

### reRankNotEnough
枚举名为reRankNotEnough，对应状态文本为reRankNotEnough，国际化文案键为common:code_error.team_error.re_rank_not_enough，用于标识团队维度下的重排序相关资源不足问题。

## 什么情况下会触发
### pluginAmountNotEnough
当团队使用的插件数量超过当前配置的可用额度上限时，会触发该错误。该错误与team模块下的aiPointsNotEnough、datasetAmountNotEnough、appAmountNotEnough等同级错误属于同一分类，均用于提示团队各类资源使用超出预设限制的情况。

### reRankNotEnough
当团队使用的重排序相关资源配额耗尽时，调用关联的功能会触发该错误。该错误与team模块下的aiPointsNotEnough、datasetSizeNotEnough等配额不足类错误属于同一分类。

## 怎么定位
通用定位步骤：
1. 提取报错信息中的statusText字段；
2. 核对错误枚举名与team模块的错误定义，排除其他模块的同名错误；

针对pluginAmountNotEnough的额外定位步骤：
- 确认statusText字段值为pluginAmountNotEnough；
- 登录系统后进入团队管理页面，查看团队的插件额度配置项与已使用的插件数量统计数据；
- 对比已使用插件数量与额度上限数值，确认是否存在使用量超出限制的情况。

针对reRankNotEnough的额外定位步骤：
- 确认statusText字段值为reRankNotEnough；
- 检查当前操作关联的团队资源配置，确认重排序相关的配额使用情况。

## 处理与验证
### pluginAmountNotEnough
处理该错误需调整团队的插件使用策略，使已使用的插件数量符合额度上限要求。可通过减少不必要的插件部署、停用闲置插件等方式降低使用量。验证时，重新执行触发该错误的操作，确认系统不再抛出该错误码对应的异常信息。

### reRankNotEnough
处理方式：调整团队的重排序资源配额，或优化重排序功能的调用以减少资源消耗。验证方式：重新执行触发错误的操作，确认返回的错误信息不再包含reRankNotEnough，相关功能恢复正常。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts)
> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
