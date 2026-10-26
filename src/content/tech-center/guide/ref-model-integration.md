---
title: FastGPT 配置与开发参考：模型接入与配置（77 篇清单）
slug: /zh/guide/ref-model-integration
page_type: 问题清单聚合页
source: https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro
source_type: 站内已发布文档的程序化归类
check_day: 2026-10-19
article_section: 配置与开发参考
is_part_of: FastGPT 技术中心
date_modified: 2026-10-26
---

# FastGPT 配置与开发参考：模型接入与配置

本页汇总站内已发布的语言模型、索引模型、重排模型与语音模型的接入和配置相关文档，共 77 篇，按标题排序列出。

## 这一类文档通常在讲什么

1. 怎样接入 Ollama、Xinference 或第三方平台上的模型
2. 自定义模型的请求地址与参数怎样填写
3. 向量维度、重排模型与语音模型的配置和报错处理

若问题与上述三个方向都不匹配，可返回[配置与开发参考全景](/zh/guide/reference-overview)查找模型渠道与参数配置之外的关联主题。

## 阅读顺序建议

1. 先从表中选择与模型渠道与参数配置当前问题直接对应的条目，核对文档适用版本
2. 对照模型渠道与参数配置的关联条目，列出需要共同配置的依赖项
3. 将模型渠道与参数配置涉及的设置项逐一与参考资料中的官方说明对照

## 已发布的文档清单（77 篇）

| 文档 |
| --- |
| [FastGPT 向量库后端对照表](/reference/vector-db-backends) |
| [FastGPT 对话模型能力分档表](/reference/llm-capability-tiers) |
| [FastGPT 配置文件中模型配置新增provider字段的更新指南](/reference/fastgpt-model-config-provider-update) |
| [FastGPT上传文件过大报错及语音输入异常排查](/glossary/fastgpt-file-voice-issue) |
| [FastGPT中ChatGLM2自定义模型的部署配置与启动方法](/glossary/chatglm2-deployment-fastgpt) |
| [FastGPT中DeerAPI大语言模型提供商的配置说明](/glossary/deerapi-fastgpt-provider-config) |
| [FastGPT中Jina重排模型与late chunking功能的具体使用说明](/glossary/fastgpt-jina-rerank-latechunk) |
| [FastGPT中Marker自定义PDF解析模型的部署与使用说明](/glossary/fastgpt-marker-pdf-parser-2) |
| [FastGPT中OneAPI接入自定义模型的配置说明](/glossary/fastgpt-oneapi-custom-model-config) |
| [FastGPT中OneAPI联动配置与常见报错排查指南](/glossary/fastgpt-oneapi-debug-guide) |
| [FastGPT中RAG模型的局限性及优化方案说明](/dataset/fastgpt-rag-limitations-optimization) |
| [FastGPT中RAG模型的核心机制与应用场景说明](/reference/fastgpt-rag-principles-scenarios) |
| [FastGPT中Xinference模块引擎的选择方法与注意事项](/glossary/fastgpt-xinference-engine-selection) |
| [FastGPT中调用ChatGLM2与M3E自定义模型的API测试方法](/reference/fastgpt-chatglm2-m3e-api-test) |
| [FastGPT中通过Ollama部署大模型的问题排查与使用说明](/glossary/fastgpt-ollama-model-deployment) |
| [FastGPT云服务账号登录与模型接入常见问题解答](/tutorial/fastgpt-cloud-service-faq) |
| [FastGPT使用Ollama的主机安装与监听配置方法](/reference/fastgpt-ollama-host-install-config) |
| [FastGPT向量搜索的原理与优化使用要点](/reference/fastgpt-vector-search-guide) |
| [FastGPT多模态识别功能的配置与使用注意事项](/reference/fastgpt-multimodal-recognition-setup) |
| [FastGPT应用设置模型选择列表为空问题处理](/glossary/fastgpt-app-model-selection-list) |
| [FastGPT接入ChatGLM2-6B私有化模型的操作指南](/reference/fastgpt-connect-chatglm2-6b) |
| [FastGPT接入bge-rerank重排模型的配置操作指南](/reference/fastgpt-connect-bge-rerank) |
| [FastGPT文心一言-Speed模型知识库图片展示配置](/glossary/fastgpt-speed-model-image-config) |
| [FastGPT新增自定义模型供应商目录的配置方法](/reference/add-custom-model-provider-directory) |
| [FastGPT模型配置中requestUrl参数的含义与配置方法](/glossary/fastgpt-rerank-requesturl) |
| [FastGPT环境下MiniMax大模型API的接入配置方法](/reference/fastgpt-minimax-api-access) |
| [FastGPT百度文心千帆配置及调用报错的排查参考](/glossary/fastgpt-baidu-config-troubleshooting) |
| [FastGPT直接接入Ollama模型的配置步骤说明](/glossary/fastgpt-ollama-direct-connect) |
| [FastGPT知识库RAG模型的工作原理与配置使用说明](/dataset/fastgpt-knowledgebase-rag-mechanism) |
| [FastGPT知识库向量存储结构的实现与配置说明](/tutorial/fastgpt-dataset-vector-storage) |
| [FastGPT硅基流动平台模型接入配置操作说明](/reference/fastgpt-siliconcloud-model-config) |
| [FastGPT私有部署版本iOS语音输入音频转码适配说明](/glossary/fastgpt-private-deployment-ios-audio-transcode) |
| [FastGPT自定义模型请求地址的配置与使用说明](/glossary/fastgpt-custom-model-request-url) |
| [FastGPT语音输入功能的使用与常见问题排查](/glossary/fastgpt-voice-input-troubleshooting) |
| [FastGPT调用微软Azure接口的适配与使用说明](/glossary/fastgpt-azure-interface-guide) |
| [FastGPT通过AI Proxy接入Ollama模型的配置步骤](/reference/fastgpt-ollama-proxy-configuration) |
| [FastGPT预定义模型参数提示词管理功能使用说明](/glossary/fastgpt-preset-prompt-library) |
| [为FastGPT在个人设备部署Xinference并使用CTransformers作为推理后端](/reference/fastgpt-xinference-ctransformers-setup) |
| [为FastGPT已有供应商新增、修改模型配置列表的操作方法](/tutorial/fastgpt-add-edit-model-list) |
| [为FastGPT插件系统新增与维护模型预设的操作说明](/tutorial/fastgpt-plugin-model-presets-2) |
| [为FastGPT配置接入ChatGLM2与m3e-large私有化模型的详细操作步骤](/reference/fastgpt-chatglm2-m3e-integration) |
| [介绍FastGPT中embedding的功能与配置方法](/glossary/fastgpt-embedding-usage) |
| [介绍FastGPT知识库检索流程中的Rerank重排功能与用法](/glossary/fastgpt-rerank-usage) |
| [优化FastGPT中RAG模型的回答生成与输出效果](/dataset/fastgpt-rag-answer-generation-optimization) |
| [使用Docker部署适配FastGPT所需的BGE重排序模型服务](/reference/docker-deploy-bge-rerank-fastgpt) |
| [合并多个知识库搜索结果并按RRF规则重排序与令牌过滤](/node/knowledge-base-search-merge) |
| [在FastGPT中为AIProxy协议新增模型渠道的配置方法](/reference/add-aiproxy-channel-fastgpt) |
| [在FastGPT中使用Xinference接入本地模型的具体操作方法](/reference/fastgpt-xinference-local-model) |
| [在FastGPT中配置Ollama接入本地大模型的操作步骤](/reference/fastgpt-ollama-local-model-access) |
| [在FastGPT中配置接入ChatGLM2与M3E模型的操作方法](/reference/fastgpt-chatglm2-m3e-config) |
| [在FastGPT中配置新增模型渠道的完整详细操作方法](/reference/fastgpt-model-channel-setup) |
| [在Linux或Windows服务器部署Xinference以支持FastGPT自定义模型调用](/reference/deploy-xinference-server-fastgpt) |
| [将OneAPI渠道配置迁移到FastGPT AI Proxy的操作方法](/reference/migrate-oneapi-fastgpt-aiproxy) |
| [将本地Qwen模型接入FastGPT的完整配置操作步骤](/reference/add-local-qwen-model-fastgpt) |
| [提升FastGPT向量搜索精度的配置与优化方法](/tutorial/fastgpt-vector-search-precision-optimization) |
| [解决FastGPT中ChatGLM2-6B的system消息失效问题](/glossary/fastgpt-chatglm2-system-issue) |
| [解决FastGPT中PG Vector向量维度超限的报错问题](/glossary/fastgpt-pgvector-dimension-limit) |
| [解决FastGPT使用中模型响应为空与模型报错问题](/reference/fastgpt-model-response-empty-errors) |
| [解决FastGPT调用Azure OpenAI嵌入接口的适配与报错问题](/glossary/fastgpt-azure-openai-embeddings-issues) |
| [解释FastGPT中text-embedding-ada-002的配置与报错处理](/glossary/fastgpt-ada-002-model-config) |
| [讲解FastGPT插件系统中模型预设的新增与配置方法](/tutorial/fastgpt-plugin-model-presets) |
| [详细说明FastGPT中模型预设的定义与使用方法](/glossary/fastgpt-model-preset-config) |
| [说明FastGPT中ASR功能的申请规则与相关要求](/glossary/fastgpt-asr-request) |
| [说明FastGPT中BGE重排序模型的部署、获取与使用步骤](/glossary/fastgpt-bge-rerank-models) |
| [说明FastGPT中OneAPI联动的配置规则与报错处理](/glossary/fastgpt-oneapi-setup-issue) |
| [说明FastGPT中vector向量检索与存储的配置与使用](/glossary/fastgpt-vector-storage-retrieval) |
| [说明FastGPT中多模态模型调用报错与变量引用配置规则](/glossary/fastgpt-multimodal-variable-config) |
| [说明FastGPT直接接入Ollama模型的配置方法与注意事项](/glossary/fastgpt-direct-ollama-configuration) |
| [说明FastGPT私有部署版GPT4-V模型按钮无响应问题](/glossary/fastgpt-gpt4v-button-response) |
| [说明FastGPT自定义模型的Docker部署与文件配置](/glossary/fastgpt-custom-model-docker-deploy) |
| [这一页提供FastGPT App/Admin共享变量与数据库缓存向量库配置参考](/reference/fastgpt-shared-env-db-cache-vector) |
| [通过One API将本地模型接入FastGPT自定义模型的配置步骤](/reference/fastgpt-oneapi-local-model-config) |
| [通过OneAPI将Ollama接入FastGPT部署环境的具体操作方法](/reference/oneapi-connect-ollama-fastgpt) |
| [配置FastGPT的AI思考强度参数与多模型平台适配](/tutorial/fastgpt-ai-thinking-settings) |
| [配置FastGPT自定义模型的completion请求参数与路径](/glossary/fastgpt-custom-model-completion-config) |
| [配置与使用FastGPT应用的语音输入功能](/tutorial/fastgpt-voice-input-config-2) |
| [配置并使用FastGPT应用的语音输入功能详细说明](/tutorial/fastgpt-voice-input-config) |

## 这份清单的适用范围

这份模型渠道与参数配置清单依据文档标题归类；跨主题的问题还需查阅关联目录。使用时先核对以下条件：

- 模型渠道与参数配置的文档版本与当前部署版本是否一致
- 当前版本是否包含模型渠道与参数配置所需的商业版功能
- 模型渠道与参数配置涉及的环境依赖是否与私有化部署文档一致

## 继续阅读

- 从模型渠道与参数配置返回[FastGPT 配置与开发参考全景](/zh/guide/reference-overview)
- 核对模型渠道与参数配置前阅读[版本升级与变更说明](/zh/guide/ref-upgrade-and-changes)
- [FastGPT 配置与开发参考：Agent、技能与插件](/zh/guide/ref-agent-skill-plugin)

## 参考资料

- [模型配置说明](https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro)
- [环境变量](https://doc.fastgpt.cn/zh-CN/self-host/config/env)

## 需要进一步确认时

这些条目可用于核对模型渠道与参数配置的配置前提。确定实施方式前，建议准备当前版本、部署形态和一组真实样本；涉及现有系统的数据边界或业务流程时，可据此进行商务咨询并评估实施条件。

- 商务咨询：结合现有系统讨论模型渠道与参数配置的实施条件
- 立即开始：用真实样本验证模型渠道与参数配置
- 定价：按模型渠道与参数配置的部署需求比较可选形态
