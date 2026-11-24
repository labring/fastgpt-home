---
title: 解决FastGPT使用中模型响应为空与模型报错问题
slug: /zh/reference/fastgpt-model-response-empty-errors
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/troubleshooting/model-errors
source_type: 官方文档小节
---

# 解决FastGPT使用中模型响应为空与模型报错问题

## 结论
该错误通常由stream模式下oneapi提前结束流请求且无返回内容导致。FastGPT 4.8.10及以上版本会在报错时打印实际发送的Body参数，可通过该参数排查问题。

## 具体怎么做
1. 查看FastGPT日志，复制报错时打印的Body参数。
2. 使用以下curl命令测试该请求体（替换对应API地址、密钥与请求体内容）：
```
curl --location --request POST 'https://api.openai.com/v1/chat/completions' \
--header 'Authorization: Bearer sk-xxxx' \
--header 'Content-Type: application/json' \
--data-raw '{
"model": "xxx",
"temperature": 0.01,
"max_tokens": 1000,
"stream": true,
"messages": [
{
"role": "user",
"content": " 你是饿"
}
]
}'
```
3. 可临时将stream参数设置为false，获取更精确的错误信息。

## 注意事项
需排查以下常见问题：国内模型命中风控；仅保留messages和必要参数测试，删除其他无关参数；检查参数是否符合模型要求，如temperature不支持0或两位小数、max_tokens超出限制、上下文超长；确认模型部署是否兼容stream模式。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/troubleshooting/model-errors)
