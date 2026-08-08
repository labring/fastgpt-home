---
title: 为FastGPT接入ChatGLM2与M3E私有模型的完整配置流程
slug: /zh/deploy/fastgpt-chatglm2-m3e-setup
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/chatglm2-m3e
source_type: 官方文档
---

# 为FastGPT接入ChatGLM2与M3E私有模型的完整配置流程

FastGPT 默认使用 OpenAI 的 LLM 模型和向量模型，如需进行私有化部署，可使用 ChatGLM2-6B 与 m3e-large 模型。本文的接入方案由用户@不做了睡大觉 提供，所用镜像已集成两款模型，可直接投入使用。

## 配置步骤
1.  **部署镜像**：使用指定容器镜像，官方镜像为 `stawky/chatglm2-m3e:latest`，国内加速镜像为 `registry.cn-hangzhou.aliyuncs.com/fastgpt_docker/chatglm2-m3e:latest`，容器暴露端口为 6006。默认安全凭证为 `sk-aaabbbcccdddeeefffggghhhiiijjjkkk`，也可通过环境变量 `sk-key` 自定义安全凭证。
2.  **接入 AI Proxy**：为向量模型和语言模型分别添加渠道，向量模型使用 `m3e`，语言模型使用 `chatglm2`。可通过以下命令测试接口连通性：
```bash
# 测试向量模型接口
curl --location --request POST https://domain/v1/embeddings \
--header "Authorization: Bearer sk-aaabbbcccdddeeefffggghhhiiijjjkkk" \
--header "Content-Type: application/json" \
--data-raw '{"model": "m3e", "input": ["laf是什么"]}'
```
```bash
# 测试语言模型接口
curl --location --request POST https://domain/v1/chat/completions \
--header "Authorization: Bearer sk-aaabbbcccdddeeefffggghhhiiijjjkkk" \
--header "Content-Type: application/json" \
--data-raw '{"model": "chatglm2", "messages": [{"role": "user", "content": "Hello!"}]}'
```
其中 `model` 参数需与 AI Proxy 中填写的自定义模型名称一致。
3.  **修改 FastGPT 配置**：编辑 `config.json` 文件，在 `llmModels` 数组中添加 ChatGLM2 配置：
```json
"llmModels": [
    // 其他对话模型
    {
        "model": "chatglm2",
        "name": "chatglm2",
        "maxToken": 8000,
        "price": 0,
        "quoteMaxToken": 4000,
        "maxTemperature": 1.2
    }
]
```
在 `vectorModels` 数组中添加 M3E 向量模型配置：
```json
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

## 使用注意事项
创建知识库时选择 M3E 模型后，将无法再修改该知识库的向量模型。应用仅能绑定使用同一向量模型的知识库，跨模型绑定不可行。不同向量模型的相似度计算逻辑存在差异，需自行测试调整相似度阈值。使用 ChatGLM2 模型时，直接在模型选择界面选中 `chatglm2` 即可完成调用。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/custom-models/chatglm2-m3e
