---
title: FastGPT中source字段的定义与使用方法说明
slug: /zh/glossary/fastgpt-source-field-usage
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/template
source_type: 官方文档
---

# FastGPT中source字段的定义与使用方法说明

## 一句话定义
source是FastGPT中用于知识库元数据标识与远程调试路径匹配的标识字段。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
在知识库导入场景中，source需作为metadata列的JSON键值对存在，官方示例格式为`{"source":"product-doc","category":"overview"}`，可根据实际需求自定义source的取值。使用的导入模板需满足扩展名.xlsx、仅包含一个工作表、无合并单元格、第一行为预设模板表头的要求。在远程调试场景中，当调试source命中后，将按远程调试路径处理请求，断连或session不存在时请求会失败，不会回退到生产插件运行时；多副本Gateway部署时，需保证session删除请求能路由到持有WebSocket的节点，或接受Redis session删除后后续调用失败。与调试相关的敏感信息包括CONNECTION_GATEWAY_AUTH_TOKEN、JWT_SECRET、connectionKey、connectToken，禁止写入日志、截图或公开文档。

## 容易搞错的地方
部分使用者会误将source作为单独列添加到导入模板中，实际source需嵌套在metadata列的JSON结构内。调试相关密钥如connectionKey属于长期调试连接密钥，仅在开启或刷新调试通道时明文返回，泄露后需立即刷新或关闭调试通道。多副本Gateway部署时，若未正确配置session删除请求的路由，会导致请求失败。CONNECTION_GATEWAY_AUTH_TOKEN仅提供给Plugin Server使用，本地CLI不需要也不应获取该密钥。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/dataset/template)

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/remote-debug-suite)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
