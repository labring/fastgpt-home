---
title: FastGPT中调用ChatGLM2与M3E自定义模型的API测试方法
slug: /zh/reference/fastgpt-chatglm2-m3e-api-test
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/custom-models/chatglm2-m3e
source_type: 官方文档小节
---

# FastGPT中调用ChatGLM2与M3E自定义模型的API测试方法

# FastGPT中调用ChatGLM2与M3E自定义模型的API测试方法

## 结论
可通过标准curl命令测试FastGPT对接的ChatGLM2对话模型与M3E向量模型。测试时需使用正确的授权密钥与模型名称，即可完成两类模型的接口调用验证。

## 具体怎么做
1. 配置请求基础信息：需设置请求头包含`Authorization: Bearer 密钥`与`Content-Type: application/json`，示例测试密钥为`YOUR_API_KEY`，实际使用需替换为真实密钥。
2. 测试M3E向量模型：使用embeddings端点发起POST请求，示例命令如下：
```bash
curl --location --request POST 'https://domain/v1/embeddings' \
--header 'Authorization: Bearer YOUR_API_KEY' \
--header 'Content-Type: application/json' \
--data-raw '{\n\"model\": \"m3e\",\n\"input\": [\"laf是什么\"]\n}'
```
3. 测试ChatGLM2对话模型：使用chat/completions端点发起POST请求，示例命令如下：
```bash
curl --location --request POST 'https://domain/v1/chat/completions' \
--header 'Authorization: Bearer YOUR_API_KEY' \
--header 'Content-Type: application/json' \
--data-raw '{\n\"model\": \"chatglm2\",\n\"messages\": [{\"role\": \"user\", \"content\": \"Hello!\"}]\n}'
```
*注：请将命令中的`https://domain`替换为实际部署的API服务域名，`YOUR_API_KEY`替换为自有密钥，`model`字段值替换为One API中填写的自定义模型名称。*

## 注意事项
1. 授权密钥需与One API中配置的完全一致，格式为`Bearer sk-xxx`，错误密钥会触发认证失败；示例密钥仅用于测试场景，实际使用需替换为真实API密钥。
2. `model`字段（或model参数）必须填写One API中注册的自定义模型名称，不可直接使用默认值，且需与One API中填写的自定义模型名称完全匹配。
3. 请求头`Content-Type`需固定为`application/json`，否则请求将被拒绝。
4. 示例中的`https://domain`需替换为实际部署的API服务域名，请求地址需与FastGPT部署的接口路径匹配，不可随意修改。
5. 向量请求的input需为字符串数组格式，对话请求的messages需符合role与content的格式要求。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/custom-models/chatglm2-m3e)
> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/custom-models/chatglm2)
