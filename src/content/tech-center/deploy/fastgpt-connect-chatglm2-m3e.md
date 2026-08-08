---
title: 在FastGPT中配置接入ChatGLM2和M3E私有化模型的方法
slug: /zh/deploy/fastgpt-connect-chatglm2-m3e
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/chatglm2-m3e
source_type: 官方文档
---

# 在FastGPT中配置接入ChatGLM2和M3E私有化模型的方法

【接入背景】
FastGPT默认使用OpenAI的大语言模型与向量模型，若需进行私有化部署，可使用ChatGLM2-6B与M3E-large模型。本文提供由社区用户贡献的接入方法，所用Docker镜像直接集成了这两个模型，无需额外单独部署，可直接使用。

【配置与部署步骤】
1. 部署镜像：使用官方提供的镜像`stawky/chatglm2-m3e:latest`，国内加速镜像为`registry.cn-hangzhou.aliyuncs.com/fastgpt_docker/chatglm2-m3e:latest`，容器需映射端口6006。默认安全凭证为`sk-aaabbbcccdddeeefffggghhhiiijjjkkk`，也可通过环境变量`sk-key`自定义凭证内容。
2. 接入AI Proxy：分别为向量模型与语言模型创建渠道，向量模型的模型标识填入`m3e`，语言模型的模型标识填入`chatglm2`。可通过以下curl命令测试接口连通性：
向量模型测试命令：
```bash
curl --location --request POST https://domain/v1/embeddings \
--header "Authorization: Bearer sk-aaabbbcccdddeeefffggghhhiiijjjkkk" \
--header "Content-Type: application/json" \
--data-raw '{"model": "m3e", "input": ["laf是什么"]}'
```
语言模型测试命令：
```bash
curl --location --request POST https://domain/v1/chat/completions \
--header "Authorization: Bearer sk-aaabbbcccdddeeefffggghhhiiijjjkkk" \
--header "Content-Type: application/json" \
--data-raw '{"model": "chatglm2", "messages": [{"role": "user", "content": "Hello!"}]}'
```
3. 修改FastGPT配置：编辑项目根目录下的`config.json`文件，在`llmModels`数组中添加ChatGLM2的配置项，在`vectorModels`数组中添加M3E的配置项，完整配置示例如下：
```json
"llmModels": [
  // 其他对话模型配置
  {
    "model": "chatglm2",
    "name": "chatglm2",
    "maxToken": 8000,
    "price": 0,
    "quoteMaxToken": 4000,
    "maxTemperature": 1.2,
    "defaultSystemChatPrompt": ""
  }
],
"vectorModels": [
  {
    "model": "text-embedding-ada-002",
    "name": "Embedding-2",
    "price": 0.2,
    "defaultToken": 500,
    "maxToken": 3000
  },
  {
    "model": "m3e",
    "name": "M3E（测试使用）",
    "price": 0.1,
    "defaultToken": 500,
    "maxToken": 1800
  }
]
```

【使用注意事项】
使用M3E向量模型时，创建知识库需在模型选择环节选中该模型，且一旦选择后无法修改知识库的向量模型。导入数据后可进行搜索测试，应用绑定知识库时，仅可绑定使用同一向量模型的知识库，不可跨模型绑定。同时不同向量模型的相似度阈值存在差异，需自行测试调整合适的参数。使用ChatGLM2模型时，在应用的模型选择环节直接选择`chatglm2`即可正常调用。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/custom-models/chatglm2-m3e
