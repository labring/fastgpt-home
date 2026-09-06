---
title: 解释FastGPT中ServerDisconnectedError错误的含义、触发场景与排查方向
slug: /zh/glossary/fastgpt-server-disconnected-error-2
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/3960
source_type: 官方文档
---

# 解释FastGPT中ServerDisconnectedError错误的含义、触发场景与排查方向

## 一句话定义
ServerDisconnectedError是FastGPT API客户端触发的连接断开类报错，标准报错文本为"FastGPT API 客户端错误: Server disconnected (类型: ServerDisconnectedError)"。

## 在FastGPT里怎么用（参数 / 位置 / 步骤）
该错误出现于FastGPT API调用场景，涉及的私有部署版本包括4.8.23、4.9版本。部署于宝塔面板时，Docker部署的2核4G、4核16G服务器均会触发该报错，且会在并发数15、单次并发10的情况下出现。部署到宝塔面板后，同一面板内其他程序调用时会提示该错误，本地远程调用时也可能出现，曾被怀疑与cookie配置相关。使用FastGPT云端服务API端口时，也出现过同样的错误。

## 容易搞错的地方
该错误的具体触发原因未在相关语料中明确说明，曾被关联怀疑与cookie配置、服务器性能、系统限制或API并发上限相关，但无官方定论。部分用户曾猜测该错误由FastGPT API本身的并发限制导致，但未得到验证。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3960)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
