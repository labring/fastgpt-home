---
title: FastGPT team reRankNotEnough错误码说明
slug: /zh/troubleshoot/fastgpt-team-rerank-enough-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts
source_type: 官方文档
---

# FastGPT team reRankNotEnough错误码说明

## 这个错误是什么
该错误属于FastGPT team模块的错误码，模块基础编号为500000，枚举名为reRankNotEnough，statusText为reRankNotEnough，对应国际化文案键为common:code_error.team_error.re_rank_not_enough，用于标识团队重排序相关的资源配额不足问题。同模块下还有针对团队规模、成员数量、AI点数、数据集等资源的配额不足类错误码。

## 什么情况下会触发
当通过团队账号执行需要使用重排序功能的操作时，若当前团队的重排序配额无法覆盖本次操作的需求，将触发该错误。该场景常见于团队绑定的知识库重排序、应用重排序等依赖重排序资源的功能调用过程中。

## 怎么定位（可照做的步骤）
1. 确认系统返回的错误statusText为reRankNotEnough，匹配当前枚举名；
2. 核对当前操作是否涉及团队级的重排序资源调用，例如团队共享知识库的重排序处理；
3. 结合团队资源配置信息，确认当前可用重排序额度是否低于本次操作的消耗需求。

## 处理与验证
处理该错误可通过以下方式：首先，若拥有团队管理权限，可通过团队管理界面调整重排序配额至满足操作需求的额度；若不具备管理权限，可联系团队管理员协助调整配额。其次，可优化操作流程，降低单次或累计的重排序资源使用量。完成处理后，重新执行原操作，验证错误是否不再出现。

> 来源: [FastGPT 官方文档与源码](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts)
