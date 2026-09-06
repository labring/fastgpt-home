---
title: FastGPT dataset模块notSupportSync错误
slug: /zh/troubleshoot/fastgpt-dataset-notsupportsync-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/dataset.ts
source_type: 官方文档
---

# FastGPT dataset模块notSupportSync错误

## 这个错误是什么
该错误属于FastGPT的dataset模块错误码体系，枚举名为notSupportSync，对应statusText为notSupportSync，国际化文案键为common:core.dataset.error.notSupportSync，用于标识该模块下涉及不被支持的同步操作的异常场景，是dataset模块预定义的错误类型之一。

## 什么情况下会触发
当在dataset模块中执行未被该模块官方支持的同步类操作时，会触发该错误。此类操作可能包括不符合模块设计规范的数据集同步流程，或尝试调用未开放的同步相关功能。

## 怎么定位（可照做的步骤）
1. 查看系统返回的报错信息，提取其中的statusText与文案键，确认为notSupportSync与common:core.dataset.error.notSupportSync；
2. 确认当前执行的操作属于dataset模块的功能范畴，可通过操作路径与模块功能说明进行核对；
3. 排查操作是否属于同步类操作，且未被dataset模块支持。

## 处理与验证
可通过调整操作至dataset模块支持的同步操作范围内，重新执行目标操作。例如，若尝试使用未支持的同步工具或流程，可切换至模块官方支持的同步方式。若调整后的操作执行顺利，未再出现该错误提示，则处理完成。若仍存在异常，可进一步核对dataset模块的功能文档与当前操作的配置参数，确认是否存在其他不符合规范的设置。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/dataset.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
