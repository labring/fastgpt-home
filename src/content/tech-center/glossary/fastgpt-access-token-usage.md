---
title: FastGPT中ACCESS_TOKEN的定义、配置与常见问题
slug: /zh/glossary/fastgpt-access-token-usage
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/57
source_type: 官方文档
---

# FastGPT中ACCESS_TOKEN的定义、配置与常见问题

## 一句话定义
ACCESS_TOKEN是FastGPT中用于身份验证的密钥凭证，用于对接外部服务时校验调用合法性。

## 在 FastGPT 里怎么用
在FastGPT中，ACCESS_TOKEN用于对接外部工具时的身份校验。Docker环境下，可通过启动命令的-e参数传入该凭证，示例命令为docker run -itd --name whisper-api -p 3003:3003 -e ACCESS_TOKEN=[REDACTED_CREDENTIAL] --gpus all --restart=always whisper。非Docker环境下，需手动修改对应服务的ACCESS_TOKEN配置项。当出现InvalidAccessKeyId.NotFound: code: 404, Specified access key is not found报错时，代表当前使用的ACCESS_TOKEN无效或未正确配置。

## 容易搞错的地方
Docker环境下修改ACCESS_TOKEN未生效，可能是启动命令参数配置错误，或未重新创建容器。非Docker环境下未正确修改对应服务的配置项，导致身份验证失败。需注意，ACCESS_TOKEN需与对接服务的校验规则匹配，否则会触发身份验证失败报错。

> [FastGPT GitHub issue 57](https://github.com/labring/FastGPT/issues/57), [FastGPT GitHub issue 2039](https://github.com/labring/FastGPT/issues/2039)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
