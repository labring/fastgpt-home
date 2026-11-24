---
title: 通过One API将本地模型接入FastGPT自定义模型的配置步骤
slug: /zh/reference/fastgpt-oneapi-local-model-config
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/custom-models/xinference
source_type: 官方文档小节
---

# 通过One API将本地模型接入FastGPT自定义模型的配置步骤

## 结论
通过配置One API的自定义渠道，可以将Xinference部署的本地模型接入FastGPT使用。本文将给出具体的配置参数、操作步骤与测试命令。

## 具体怎么做
1. 参考One API官方部署接入文档完成One API的基础部署。
2. 在One API管理后台新增自定义模型渠道，配置以下必填参数：
   - Base URL：填写Xinference服务的访问端点
   - 模型UID：设置为`qwen-chat`
3. 使用以下curl命令测试接口连通性，替换占位参数后执行：
```bash
curl --location --request POST 'https://[oneapi_url]/v1/chat/completions' \
--header 'Authorization: Bearer [oneapi_token]' \
--header 'Content-Type: application/json' \
--data-raw '{"model": "qwen-chat", "messages": [{"role": "user", "content": "Hello!"}]}
```
其中`[oneapi_url]`替换为你的One API访问地址，`[oneapi_token]`替换为你的One API访问令牌，`model`字段需与One API中配置的自定义模型名称一致。

## 注意事项
1. 模型UID必须设置为`qwen-chat`，不可随意修改，否则将无法正确匹配目标模型。
2. Base URL需填写Xinference服务的正确访问地址，确保One API可以正常访问该端点。
3. 执行测试命令时，需完全替换所有占位符，保留方括号会导致请求失败。
4. 测试前需确保One API与Xinference服务均处于正常运行状态。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/custom-models/xinference)
