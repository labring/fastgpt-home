---
title: 解释FastGPT中的ServerDisconnectedError错误的含义与排查解决方法
slug: /zh/glossary/fastgpt-server-disconnected-error
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/3960
source_type: 官方文档
---

# 解释FastGPT中的ServerDisconnectedError错误的含义与排查解决方法

## 一句话定义
ServerDisconnectedError是FastGPT API客户端触发的Server disconnected类型错误。

## 在FastGPT里怎么用（参数 / 位置 / 步骤）
该错误出现于FastGPT API客户端调用场景，涉及的私有部署版本包括4.8.23、4.9，部署环境为宝塔面板。当并发数为15，并发10时会触发该错误。部分场景下曾被关联到cookie问题，也有用户怀疑FastGPT API本身存在并发相关问题，FastGPT云端服务API端口也曾出现该错误。

## 容易搞错的地方
曾有用户将该错误关联为cookie问题，或误认为仅为服务器、系统本身的问题，也可能误认为仅本地远程调用场景触发该错误。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3960)
> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4076)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
