---
title: FastGPT team模块datasetFolderAmountNotEnough错误码说明
slug: /zh/troubleshoot/fastgpt-team-dataset-folder-amount-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts
source_type: 官方文档
---

# FastGPT team模块datasetFolderAmountNotEnough错误码说明

## 这个错误是什么
该类错误属于FastGPT team模块的标准化错误枚举项，包含两个相关错误码：
1.  `datasetFolderAmountNotEnough`：对应返回的`statusText`为`datasetFolderAmountNotEnough`，关联的国际化文案键为`common:code_error.team_error.dataset_folder_amount_not_enough`，用于标识团队数据集文件夹数量超出配额的异常场景。
2.  `datasetAmountNotEnough`：对应返回的`statusText`为`datasetAmountNotEnough`，关联的国际化文案键为`common:code_error.team_error.dataset_amount_not_enough`，用于标识团队数据集相关的额度不足类错误。

## 什么情况下会触发
### 针对`datasetFolderAmountNotEnough`
当团队执行数据集文件夹的创建、配置调整等相关操作时，若当前团队已使用的数据集文件夹数量达到系统预设的团队配额上限，系统会抛出该错误。该限制用于管控团队内数据集文件夹的整体规模，保障平台资源的合理分配与使用效率。

### 针对`datasetAmountNotEnough`
当团队执行需要创建或调用数据集的操作时，若当前团队已使用的数据集数量达到了配置的上限，就会触发该错误。

## 怎么定位
1. 查看错误返回的`statusText`字段，确认匹配对应错误类型的标识：`datasetFolderAmountNotEnough`或`datasetAmountNotEnough`；
2. 回溯触发错误的操作日志，结合业务场景确认错误归属team模块；
3. 登录团队管理后台，核对团队当前的对应资源使用配额与已创建数量，确认是否已达上限。
针对`datasetFolderAmountNotEnough`，需确认操作涉及数据集文件夹的创建或配额变更；针对`datasetAmountNotEnough`，需确认操作涉及数据集的创建或调用。

## 处理与验证
### 针对`datasetFolderAmountNotEnough`
处理路径包括：一是升级团队套餐，获取更高额度的数据集文件夹配额；二是清理团队内不再使用的数据集文件夹，释放已占用的配额资源。
验证方式：完成配额调整或释放操作后，重新执行原触发错误的业务操作，验证错误是否不再出现。若操作仍失败，需再次核对团队配额配置与当前使用量的匹配状态，确认配额调整已生效。

### 针对`datasetAmountNotEnough`
处理方式包括：删除不再需要的数据集以释放已占用的额度，或升级团队配置以获取更高的数据集额度上限。
验证方式：重新执行触发该错误的操作，确认错误不再出现且操作可正常完成。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts)
> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
