---
title: 解决FastGPT中百度千帆v2模型AIProxy配置调用异常问题
slug: /zh/troubleshoot/fastgpt-baidu-qianfan-v2-config-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4226
source_type: GitHub issue
---

# 解决FastGPT中百度千帆v2模型AIProxy配置调用异常问题

## 现象
在FastGPT v4.9.1版本的AIPROXY模块中配置百度千帆v2模型时，系统要求密钥使用v1版本的【ak|sk】格式。使用符合v2模型要求的apikey格式密钥时，会触发格式校验报错，且使用v1格式的密钥无法完成正常调用。

## 可能原因
当前FastGPT v4.9.1版本的AIPROXY百度千帆v2模型配置校验逻辑，未适配v2模型的apikey格式要求，仍沿用v1版本的ak|sk格式校验规则。

## 排查步骤
1. 登录FastGPT后台，进入AIPROXY渠道配置页面，选择百度智能云v2模型。
2. 查看密钥输入区域的格式提示与校验规则。
3. 输入符合百度千帆v2模型官方要求的apikey格式密钥，观察系统返回的报错信息。
4. 对比百度千帆v1与v2模型的密钥格式差异，确认当前配置的密钥格式是否匹配v2版本要求。

## 解决与验证
按照百度千帆v2模型的官方规范，使用apikey格式的密钥完成配置。需注意，当前v4.9.1版本的配置校验可能存在格式校验不兼容的情况，需按实际界面提示调整输入内容。
完成配置后，发起模型调用测试，确认调用流程正常且无格式报错。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4226)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
