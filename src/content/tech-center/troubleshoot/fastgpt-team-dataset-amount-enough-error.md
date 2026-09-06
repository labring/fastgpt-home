---
title: FastGPT team模块datasetAmountNotEnough错误码说明
slug: /zh/troubleshoot/fastgpt-team-dataset-amount-enough-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts
source_type: 官方文档
---

# FastGPT team模块datasetAmountNotEnough错误码说明

## 这个错误是什么
该错误属于FastGPT的team模块，枚举名为datasetAmountNotEnough，对应statusText为datasetAmountNotEnough，国际化文案键为common:code_error.team_error.dataset_amount_not_enough，用于标识团队数据集额度不足的异常场景。

## 什么情况下会触发
当团队执行需要消耗数据集额度的操作时，若当前团队已用尽分配的数据集数量配额，将触发该错误。常见的触发场景包括新建数据集、导入数据集至团队空间等需要占用团队数据集额度的操作。

## 怎么定位
1. 首先确认触发错误时执行的具体操作，例如新建团队数据集、批量导入数据集文件等；
2. 检查错误提示中的statusText或国际化文案，确认是否为datasetAmountNotEnough或common:code_error.team_error.dataset_amount_not_enough；
3. 登录团队管理后台，查看当前团队的数据集配额总量与已使用数量，确认额度是否已耗尽。

## 处理与验证
处理该错误可通过两种方式：一是升级团队的数据集额度配额，以获取更多可用的数据集数量；二是删除团队内不再需要的数据集，释放已占用的额度。完成额度调整或资源清理后，重新执行触发错误的操作，验证错误是否不再出现。

> 来源: [FastGPT 官方文档与源码](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts)
