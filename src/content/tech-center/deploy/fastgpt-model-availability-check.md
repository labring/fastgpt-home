---
title: 检查FastGPT中各类模型可用性的具体步骤
slug: /zh/deploy/fastgpt-model-availability-check
page_type: 部署场景
source: https://doc.fastgpt.cn/self-host/troubleshooting/model-errors
source_type: 官方文档小节
---

# 检查FastGPT中各类模型可用性的具体步骤

当FastGPT出现模型调用相关报错时，首先需要排查模型本身的可用性。排查流程分为三个核心阶段，先验证上游模型自身运行状态，再通过OneAPI测试中转调用链路，最后在FastGPT平台内完成最终验证。

### 模型可用性测试步骤
可以通过CURL命令直接测试各类模型的接口可用性，以下是对应类型的测试示例：

#### LLM模型测试
```bash
curl https://api.openai.com/v1/chat/completions \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $OPENAI_API_KEY" \
-d '{
"model": "gpt-4o",
"messages": [
{"role": "system", "content": "You are a helpful assistant."},
{"role": "user", "content": "Hello!"}
]
}'
```

#### Embedding模型测试
```bash
curl https://api.openai.com/v1/embeddings \
-H "Authorization: Bearer $OPENAI_API_KEY" \
-H "Content-Type: application/json" \
-d '{
"input": "The food was delicious and the waiter...",
"model": "text-embedding-ada-002",
"encoding_format": "float"
}'
```

#### Rerank模型测试
```bash
curl --location --request POST 'https://xxxx.com/api/v1/rerank' \
--header 'Authorization: Bearer {{ACCESS_TOKEN}}' \
--header 'Content-Type: application/json' \
--data-raw '{
"model": "bge-rerank-m3",
"query": "导演是谁",
"documents": ["你是谁？\n我是电影《铃芽之旅》助手"]
}'
```

#### TTS模型测试
```bash
curl https://api.openai.com/v1/audio/speech \
-H "Authorization: Bearer $OPENAI_API_KEY" \
-H "Content-Type: application/json" \
-d '{
"model": "tts-1",
"input": "The quick brown fox jumped over the lazy dog.",
"voice": "alloy"
}' \
--output speech.mp3
```

#### Whisper模型测试
```bash
curl https://api.openai.com/v1/audio/transcriptions \
-H "Authorization: Bearer $OPENAI_API_KEY" \
-H "Content-Type: multipart/form-data" \
-F file="@/path/to/file/audio.mp3" \
-F model="whisper-1"
```

完成CURL测试后，如果接口返回正常响应，则可以排除模型本身的问题，转而检查FastGPT的模型配置。如果CURL测试失败，则需要排查上游模型的运行状态、网络连通性或认证配置是否正确。最后在FastGPT平台内使用对应模型发起测试，验证平台调用链路是否正常。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/troubleshooting/model-errors)
