---
title: FastGPT common模块missingParams错误码说明
slug: /zh/troubleshoot/fastgpt-common-missingparams-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/common.ts
source_type: 官方文档
---

# FastGPT common模块missingParams错误码说明

## 这个错误是什么
该错误为FastGPT common模块的参数缺失类错误，枚举项为CommonErrEnum.missingParams，状态文本为missingParams，对应错误码为507004。错误信息通过i18nT('common:error.missingParams')生成，未额外指定HTTP状态码，使用接口默认状态。

## 什么情况下会触发
当调用FastGPT的相关接口时，未传入接口定义中明确要求的必选请求参数，将触发该错误。此类场景多出现于涉及公共模块的接口调用流程中。

## 怎么定位
1.  查看接口返回的statusText字段，确认其值为missingParams；
2.  对照对应接口的必选参数清单，逐一检查已传入的请求参数；
3.  读取接口返回的message字段，该字段将直接展示本地化的参数缺失提示内容；
4.  通过接口日志查看完整的请求参数列表，对比必选参数定位具体缺失的项。

## 处理与验证
首先补充所有缺失的必选请求参数，确保接口要求的全部必选参数都已正确传入并格式合规。随后重新发起接口请求，检查返回的statusText是否不再为missingParams。若请求成功，将获得正常的业务响应内容，无该错误相关的返回。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/common.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
