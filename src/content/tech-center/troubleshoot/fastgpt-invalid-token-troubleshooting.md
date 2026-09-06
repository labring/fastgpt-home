---
title: 解决FastGPT配置令牌后提示无效令牌的问题
slug: /zh/troubleshoot/fastgpt-invalid-token-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1730
source_type: GitHub issue
---

# 解决FastGPT配置令牌后提示无效令牌的问题

## 现象
在管理渠道测通本地模型并配置令牌后，仍提示无效令牌。

## 可能原因
使用的令牌非OneAPI申请的密钥；令牌的「模型范围」填写后限制了模型调用；令牌配置未正确生效。

## 排查步骤
1. 确认令牌为OneAPI申请的密钥。
2. 检查OneAPI令牌的「模型范围」是否填写，若填写可能限制embedding模型调用。
3. 确认密钥已配置到FastGPT的docker-compose.yml文件的CHAT_API_KEY参数中。
4. 确认密钥已粘贴到FastGPT渠道对应的LLM和Embedding模型配置中。
5. 确认服务已按配置重启。

## 解决与验证
1. 在OneAPI申请令牌，复制其sk-key。
2. 将sk-key填入FastGPT的docker-compose.yml文件的CHAT_API_KEY参数。
3. 在FastGPT渠道的LLM和Embedding模型配置中粘贴该sk-key。
4. 在docker-compose.yml所在目录执行以下命令重启服务：
```bash
docker compose down
docker compose up -d
```
5. 测试FastGPT知识库功能，确认正常。
6. 若需测试Embedding模型，可使用以下curl命令（OneAPI不支持直接测试Embedding，会返回404错误）：
```bash
curl --location --request POST 'http://<模型IP:端口>/v1/embeddings' \
--header 'Authorization: Bearer <sk-key>' \
--header 'Content-Type: application/json' \
--data-raw '{
"model": "m3e",
"input": ["laf是什么"]
}'
```

> 来源: [FastGPT GitHub issue #1730](https://github.com/labring/FastGPT/issues/1730)
