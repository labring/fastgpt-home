---
title: FastGPT 配置与开发参考：API 与对外发布（110 篇清单）
slug: /zh/guide/ref-api-and-publishing
page_type: 问题清单聚合页
source: https://doc.fastgpt.cn/zh-CN/openapi/intro
source_type: 站内已发布文档的程序化归类
check_day: 2026-10-19
article_section: 配置与开发参考
is_part_of: FastGPT 技术中心
date_modified: 2026-10-26
---

# FastGPT 配置与开发参考：API 与对外发布

本页汇总站内已发布的OpenAPI 接口调用、鉴权，以及发布到即时通讯渠道与网页相关文档，共 110 篇，按标题排序列出。

## 这一类文档通常在讲什么

1. OpenAPI 的鉴权、对话接口与知识库接口怎样调用
2. 接口返回值与常见报错的含义
3. 发布到企业微信、钉钉、公众号或网页时的配置步骤

若问题与上述三个方向都不匹配，可返回[配置与开发参考全景](/zh/guide/reference-overview)查找API 调用与渠道发布之外的关联主题。

## 阅读顺序建议

1. 先从表中选择与API 调用与渠道发布当前问题直接对应的条目，核对文档适用版本
2. 对照API 调用与渠道发布的关联条目，列出需要共同配置的依赖项
3. 将API 调用与渠道发布涉及的设置项逐一与参考资料中的官方说明对照

## 已发布的文档清单（110 篇）

| 文档 |
| --- |
| [FastGPT 4.8.16后新版猜你想问OpenAPI接口调用指南](/reference/fastgpt-new-question-guide-api) |
| [FastGPT API接口的鉴权、调用范围与基础配置说明](/tutorial/fastgpt-openapi-auth-config) |
| [FastGPT API接口鉴权与基础配置使用说明](/api/fastgpt-api-basic-config) |
| [FastGPT OpenAPI 接口的鉴权与基础配置说明](/api/fastgpt-openapi-basic-config) |
| [FastGPT OpenAPI对话接口的调用配置与使用规范](/api/fastgpt-chat-api-usage) |
| [FastGPT OpenAPI更新对话点赞与点踩反馈的操作方法](/reference/fastgpt-openapi-update-chat-feedback) |
| [FastGPT OpenAPI的使用方法与配置说明](/tutorial/fastgpt-openapi-usage-config) |
| [FastGPT OpenAPI知识库数据结构与索引参数说明](/reference/fastgpt-dataset-data-structure) |
| [FastGPT RAG API 文件上传支持相关说明](/glossary/rag-api-file-upload-support) |
| [FastGPT v46版本初始化API的标准执行步骤说明](/reference/fastgpt-v46-init-api-steps) |
| [FastGPT 发起会话API请求的参数说明与使用示例](/api/fastgpt-chat-api-request-usage) |
| [FastGPT 发起会话接口的四种响应格式与参数说明](/api/fastgpt-chat-response-format) |
| [FastGPT 数据集单条数据修改API的使用说明](/reference/fastgpt-dataset-single-data-update) |
| [FastGPT 调用官方OpenAPI创建知识库的完整方法速查](/reference/fastgpt-openapi-create-dataset) |
| [FastGPT 集合删除接口的调用方法与参数说明](/reference/fastgpt-delete-collection-api) |
| [FastGPT中defaultSystemChatPrompt与图片生成API报错的说明](/glossary/fastgpt-api-error-troubleshooting-2) |
| [FastGPT中find查询与API配置相关问题的说明](/glossary/fastgpt-find-query-issues) |
| [FastGPT中secret密钥配置与API调用报错的排查指南](/glossary/fastgpt-secret-errors-troubleshooting) |
| [FastGPT中usage相关日志与接口报错排查](/glossary/fastgpt-usage-api-errors) |
| [FastGPT中并行运行节点与文件读取接口的data字段说明](/glossary/fastgpt-data-field-usage) |
| [FastGPT中请求超时与API调用超限报错的解决方法](/glossary/fastgpt-request-exceeded-error) |
| [FastGPT商业版4.8.10及以上版本接入飞书机器人的操作方法](/reference/fastgpt-feishu-bot-integration) |
| [FastGPT商业版4.8.16+版本接入钉钉机器人的操作方法](/reference/fastgpt-commercial-dingtalk-access) |
| [FastGPT商业版接入微信公众号的具体操作说明](/reference/fastgpt-wechat-official-account-access) |
| [FastGPT商业版接入微信公众号的配置与使用方法](/integration/fastgpt-wechat-official-account-config) |
| [FastGPT商业版接入钉钉机器人的配置与使用教程](/integration/fastgpt-dingtalk-bot-config) |
| [FastGPT商业版接入飞书机器人的完整配置步骤](/integration/fastgpt-feishu-bot-configuration) |
| [FastGPT外链嵌入与初始化加载的load事件使用规范](/glossary/fastgpt-load-event-usage) |
| [FastGPT对话删除接口的使用与参数说明](/api/fastgpt-delete-chat-api) |
| [FastGPT对话接口API的调用方法与参数配置说明](/api/fastgpt-chat-api-guide) |
| [FastGPT嵌入接口参数适配与对话传文档功能说明](/glossary/fastgpt-embeddings-docs-function) |
| [FastGPT应用接口日志及统计数据查询操作说明](/api/fastgpt-app-log-query-api) |
| [FastGPT应用版本快照保存与正式发布操作说明](/tutorial/fastgpt-version-snapshot-publish) |
| [FastGPT微信个人号接入的配置步骤与使用方法](/integration/fastgpt-wechat-personal-access) |
| [FastGPT批量添加数据集数据接口返回值说明](/glossary/fastgpt-batch-dataset-add-api) |
| [FastGPT接入企业微信智能机器人的配置与使用教程](/integration/fastgpt-wecom-bot-config) |
| [FastGPT接入企业微信智能机器人的配置步骤与排查方法](/integration/fastgpt-wecom-bot-configuration) |
| [FastGPT接入企业微信机器人的配置方法说明](/reference/fastgpt-wecom-bot-integration-guide) |
| [FastGPT接入微信个人号的完整配置步骤与注意事项](/integration/fastgpt-wechat-personal-config) |
| [FastGPT接入微信公众号的参数配置与完整操作步骤](/integration/fastgpt-wechat-official-account-setup) |
| [FastGPT接入钉钉机器人的商业版配置流程](/integration/fastgpt-dingtalk-bot-setup) |
| [FastGPT接入飞书机器人的配置步骤与注意事项](/integration/fastgpt-feishu-bot-config) |
| [FastGPT数据库与API操作类报错排查方法](/glossary/fastgpt-operation-error-troubleshooting) |
| [FastGPT数据集单条数据删除API的使用说明](/api/fastgpt-dataset-single-data-delete) |
| [FastGPT流程编排中分享链接shareId参数的获取与使用说明](/glossary/fastgpt-flow-shareid-retrieval) |
| [FastGPT知识库OpenAPI接口的参数说明与调用示例](/api/fastgpt-dataset-api) |
| [FastGPT知识库OpenAPI接口的调用方法与参数配置说明](/api/fastgpt-dataset-openapi-guide) |
| [FastGPT第三方API数据集获取文件树的操作方法](/reference/fastgpt-third-party-api-file-tree) |
| [FastGPT第三方应用对接的API参数配置说明](/glossary/fastgpt-third-party-api-config) |
| [FastGPT获取组织列表的标准接口使用说明](/reference/fastgpt-get-org-list-api) |
| [FastGPT通过OpenAPI创建空集合或目录的操作指引](/reference/fastgpt-create-collection-or-directory) |
| [FastGPT通过OpenAPI获取会话列表的操作方法](/reference/fastgpt-openapi-get-session-list) |
| [FastGPT通过本地文件调用API创建知识库文件集合](/reference/fastgpt-local-file-dataset-collection-create) |
| [为FastGPT的Markdown渲染提供HTML嵌入与交互渲染能力](/tutorial/fastgpt-markdown-html-rendering) |
| [介绍FastGPT中APIKey的定义与配置使用方法](/glossary/fastgpt-apikey-usage-guide) |
| [使用 FastGPT 官方 OpenAPI 修改会话标题的具体操作步骤](/reference/modify-fastgpt-session-title) |
| [使用API获取FastGPT应用日志图表数据的调用指南](/api/fastgpt-app-log-chart-api) |
| [使用FastGPT API文件库对接自建文档库](/integration/fastgpt-api-file-library-2) |
| [使用FastGPT OpenAPI创建纯文本知识库集合](/reference/fastgpt-openapi-create-text-collection) |
| [使用FastGPT OpenAPI创建网络链接类型的知识库集合](/reference/fastgpt-create-link-collection) |
| [使用FastGPT OpenAPI删除指定知识库的操作说明](/api/delete-fastgpt-dataset-api) |
| [使用FastGPT OpenAPI推送训练数据至训练队列](/api/fastgpt-openapi-push-training-data) |
| [使用FastGPT OpenAPI更新数据集集合的信息](/api/fastgpt-dataset-collection-update) |
| [使用FastGPT OpenAPI获取对话列表的操作方法](/reference/fastgpt-get-chat-list-api) |
| [使用FastGPT OpenAPI获取知识库列表的详细操作指南](/reference/fastgpt-get-dataset-list) |
| [使用FastGPT商业版API创建外部文件库集合的方法](/reference/fastgpt-create-external-file-collection) |
| [使用FastGPT官方API获取对话会话的基本信息](/api/get-fastgpt-chat-session-info) |
| [使用FastGPT应用API获取应用日志与统计数据](/api/fastgpt-app-log-stat-api) |
| [使用FastGPT第三方API获取指定文件的详情信息](/reference/fastgpt-third-party-api-file-detail) |
| [创建FastGPT知识库训练订单的API使用方法](/reference/create-fastgpt-dataset-training-order) |
| [在FastGPT中通过Markdown嵌入HTML内容的渲染与交互](/tutorial/fastgpt-markdown-html-render) |
| [指导构建适配FastGPT的MinerU镜像并解决API调用422报错](/glossary/fastgpt-compatible-mineru-mirror) |
| [获取FastGPT单个对话运行详情的API调用方法](/api/get-fastgpt-single-chat-run-detail) |
| [获取FastGPT应用总体数据统计的日志接口使用参考](/reference/fastgpt-app-total-stats-api) |
| [获取FastGPT指定知识库集合列表的API调用方法](/api/get-fastgpt-dataset-collection-list) |
| [获取FastGPT数据集单条数据详情的接口使用说明](/api/fastgpt-dataset-single-data-detail) |
| [获取FastGPT数据集集合数据列表的API调用指南](/api/fastgpt-dataset-data-list-api) |
| [获取FastGPT知识库详情的API接口使用说明](/api/fetch-fastgpt-dataset-detail) |
| [获取FastGPT知识库集合详情的OpenAPI调用指南](/api/get-fastgpt-collection-detail-api) |
| [获取FastGPT第三方API数据集的单个文件内容](/reference/fastgpt-api-get-file-content) |
| [获取并配置FastGPT应用的API调用凭证与访问接口](/integration/fastgpt-app-api-key-config) |
| [获取并配置飞书机器人接入FastGPT所需的凭证参数](/integration/feishu-bot-configuration-fastgpt) |
| [获取飞书机器人凭证并配置FastGPT发布渠道参数](/tutorial/fastgpt-feishu-bot-config) |
| [解决FastGPT中API密钥与调用频率超限报错问题](/glossary/fastgpt-api-error-resolution) |
| [解决FastGPT部署配置错误与API调用超限问题](/glossary/fastgpt-deploy-api-error-handling) |
| [解释FastGPT OpenAPI会话管理接口中statusText字段的含义与用法](/glossary/fastgpt-openapi-statustext) |
| [解释FastGPT第三方数据集与会话管理API请求使用规范](/glossary/fastgpt-api-request-spec) |
| [讲解FastGPT的JSON格式输入输出API功能与用法](/glossary/fastgpt-json-input-output-api) |
| [详细说明调用包含交互节点的FastGPT会话API接口方法](/api/fastgpt-interactive-chat-api) |
| [说明FastGPT OpenAPI调用的环境变量配置规则](/glossary/fastgpt-openapi-config) |
| [说明FastGPT中Invalid header与API连接报错的排查方法](/glossary/fastgpt-api-error-troubleshooting) |
| [说明FastGPT中Tab组件value属性与接口参数的使用方法](/glossary/fastgpt-tab-value-interface-usage) |
| [说明FastGPT会话历史删除与清空API的使用方法](/glossary/fastgpt-chat-history-delete-api) |
| [说明FastGPT应用API访问的APIKey配置与调用参数使用方法](/reference/fastgpt-api-key-usage-call-parameters) |
| [说明FastGPT第三方与开放API的调用方法](/glossary/fastgpt-api-usage-guide) |
| [说明FastGPT网关内部HTTP API的配置与访问规则要求](/glossary/fastgpt-gateway-internal-api) |
| [说明FastGPT获取文件阅读链接API的参数与使用步骤](/glossary/fastgpt-file-read-api) |
| [说明使用Nginx代理FastGPT发布后应用的方法](/glossary/nginx-proxy-fastgpt-deployed-apps) |
| [调用FastGPT自定义词库接口获取匹配问题的方法](/reference/fastgpt-wordbank-match-api) |
| [通过API创建FastGPT数据集集合并分割文件内容](/api/fastgpt-api-dataset-collection-create) |
| [通过API清空FastGPT应用指定会话历史的操作指南](/api/clear-fastgpt-app-session-history) |
| [通过API调用FastGPT应用的凭证获取与配置方法](/integration/fastgpt-app-api-access-config) |
| [通过FastGPT OpenAPI删除单个会话的详细操作指南](/api/fastgpt-openapi-delete-single-chat) |
| [通过FastGPT OpenAPI调用知识库搜索测试接口](/api/fastgpt-dataset-search-test) |
| [配置FastGPT API文件库对接自有文档库的完整方法](/integration/fastgpt-api-file-library) |
| [配置FastGPT HTTP节点的接口返回值提取规则与方法](/node/fastgpt-http-return-value-extract) |
| [配置FastGPT分享链接的身份验证与上报接口](/integration/fastgpt-share-auth-config) |
| [配置FastGPT分享链接身份验证及实践案例](/integration/fastgpt-share-auth-practice) |
| [配置FastGPT对接微信公众号所需的IP白名单](/reference/fastgpt-wechat-official-account-ip-whitelist) |
| [配置FastGPT的API基础地址与密钥参数的使用方法](/glossary/fastgpt-api-base-url-config) |

## 这份清单的适用范围

这份API 调用与渠道发布清单依据文档标题归类；跨主题的问题还需查阅关联目录。使用时先核对以下条件：

- API 调用与渠道发布的文档版本与当前部署版本是否一致
- 当前版本是否包含API 调用与渠道发布所需的商业版功能
- API 调用与渠道发布涉及的环境依赖是否与私有化部署文档一致

## 继续阅读

- 从API 调用与渠道发布返回[FastGPT 配置与开发参考全景](/zh/guide/reference-overview)
- 核对API 调用与渠道发布前阅读[版本升级与变更说明](/zh/guide/ref-upgrade-and-changes)
- 配合API 调用与渠道发布查看[模型接入与配置](/zh/guide/ref-model-integration)

## 参考资料

- [OpenAPI 介绍](https://doc.fastgpt.cn/zh-CN/openapi/intro)
- [免登录链接](https://doc.fastgpt.cn/zh-CN/guide/build/publish/link)

## 需要进一步确认时

这些条目可用于核对API 调用与渠道发布的配置前提。确定实施方式前，建议准备当前版本、部署形态和一组真实样本；涉及现有系统的数据边界或业务流程时，可据此进行商务咨询并评估实施条件。

- 商务咨询：结合现有系统讨论API 调用与渠道发布的实施条件
- 立即开始：用真实样本验证API 调用与渠道发布
- 定价：按API 调用与渠道发布的部署需求比较可选形态
