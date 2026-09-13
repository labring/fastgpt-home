---
title: FastGPT V4.8.10版本升级操作与功能说明
slug: /zh/deploy/upgrade-v4-8-10
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4810
source_type: 官方文档
---

# FastGPT V4.8.10版本升级操作与功能说明

## 这个版本改了什么
该版本包含多项功能新增、体验优化与问题修复。功能新增包括模板市场，工作流节点拖动自动对齐吸附，用户选择节点（Debug模式暂未支持），工作流uid全局变量，撤销重做功能，本次编辑记录取代自动保存，工作流版本重命名，工作流应用调用节点迁移为独立插件节点，插件使用说明配置，插件自定义输入单选框，HTTP节点text/plain模式，HTTP模块超时配置与更多Body类型支持，工作流导出导入JSON功能，发送验证码安全校验。商业版新增飞书机器人接入、公众号接入、自助开票申请、SSO定制。优化项涵盖工作流循环校验与并发执行、嵌套执行参数污染问题、全局变量数据类型约束、节点选择报错问题、React Markdown组件与base64图片支持、对话框性能、单选框自动滚动、知识库目录禁用递归修改、SSE响应代码、无SSL证书复制功能、知识库列表与详情页UI、无网络运行支持、.env.template中MongoDB相关说明、支付模式、用户默认头像。修复项包含Prompt模式stream=false携带标记、对话日志鉴权、Milvus知识库导出、应用副本系统配置复制、图片识别正则、内容提取数据类型、工作流运行时间统计、stream模式工具调用undefined、reranker与home host拼写错误、i18n显示异常、全局变量重复定义、Debug模式与API中全局变量持久化、OpenAPI detail=false模式返回逻辑、知识库标签重复加载、网络链接自定义分隔符、插件全局变量污染等问题。

## 升级前要确认的事
升级前需完成全量数据备份，避免数据丢失。若部署商业版，需提前准备沙盒服务地址，用于配置镜像环境变量。同时需确认当前部署的FastGPT与FastGPT商业版镜像的版本，以便后续更新镜像tag。

## 升级步骤（照做）
1. 更新镜像tag：将FastGPT社区版镜像tag设为v4.8.10，FastGPT商业版镜像tag设为v4.8.10，Sandbox镜像无需更新。
2. 配置商业版环境变量：为fastgpt-pro镜像添加SANDBOX_URL=http://xxxxx:3000环境变量；同时为fastgpt-pro与fastgpt镜像添加LOG_LEVEL=debug、STORE_LOG_LEVEL=warn环境变量，用于优化系统日志存储。
3. 执行初始化操作：通过任意终端发起HTTP POST请求，替换{{rootkey}}为环境变量中的rootkey，{{host}}为FastGPT域名，请求地址为https://{{host}}/api/admin/initv4810，请求头需携带rootkey与Content-Type: application/json，具体命令为：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4810' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
该请求用于初始化发布记录版本标记与开票记录。

## 升级后怎么验证
升级完成后，可通过访问FastGPT域名测试核心功能可用性。检查工作流节点是否支持拖动自动对齐吸附、撤销重做等新增功能，确认商业版新增的飞书机器人、公众号接入等配置是否生效。同时查看系统日志是否按配置的LOG_LEVEL与STORE_LOG_LEVEL正常生成，验证初始化请求是否完成版本标记与开票记录的初始化，确保知识库、应用副本等原有功能运行正常。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4810)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
