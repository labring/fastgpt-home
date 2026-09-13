---
title: 修复FastGPT调用InternVL3-14B的400报错
slug: /zh/troubleshoot/fastgpt-internvl3-400-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4879
source_type: GitHub issue
---

# 修复FastGPT调用InternVL3-14B的400报错

## 现象
私有部署V4.9.9版本的FastGPT调用InternVL3-14B模型时，返回`400 status code (no body)`报错。具体报错日志和信息如下：
```
[Warn] 2025-05-23 06:08:32 LLM response error {"requestBody":{"model":"/models/lnternVL3-14B","messages":[{"role":"user","content":"hi"}],"stream":false}}
[Error] 2025-05-23 06:08:32 Api response error: /api/core/ai/model/test?model=%2Fmodels%2FlnternVL3-14B, 400 status code (no body)
```
完整错误对象包含以下内容：
```json
{
  "message": "400 status code (no body)",
  "stack": "Error: 400 status code (no body)\n    at tJ.generate (/app/projects/app/.next/server/chunks/20115.js:9:419588)\n    at ic.makeStatusError (/app/projects/app/.next/server/chunks/20115.js:9:411253)\n    ..."
}
```
同时使用curl命令直接调用模型接口可正常返回结果，curl命令如下：
```bash
curl -X POST http://10.151.71.200:12000/v1/completions  \
  -H "Content-Type: application/json" \
  -d '{
    "model": "/models/InternVL3-14B",
    "prompt": "请描述以下图片内容。",
    "max_tokens": 512,
    "stream": false
  }'
```
该curl请求可正常返回文本生成结果。

## 可能原因
结合报错信息和测试结果，可能的原因包括：
1. FastGPT配置的模型名称与实际部署的模型名称存在大小写或拼写差异，比如FastGPT请求中使用的`lnternVL3-14B`与实际部署的`InternVL3-14B`存在首字母大小写差异；
2. FastGPT调用模型的请求参数格式与模型部署的接口要求不匹配，FastGPT使用了带`messages`字段的Chat Completions格式请求，而curl测试使用的是`prompt`字段的Completions格式请求，需确认模型是否支持Chat格式；
3. FastGPT配置的模型接口地址与实际部署的模型接口地址不一致。

## 排查步骤
1. 核对FastGPT中配置的模型名称与实际部署的模型名称，检查大小写、拼写是否完全一致，重点关注首字母和中间字符的差异；
2. 对比FastGPT的请求体和curl测试的请求体，确认请求参数格式是否匹配，检查是否使用了`messages`字段或`prompt`字段；
3. 确认FastGPT中配置的模型接口地址与实际部署的模型接口地址是否一致；
4. 查看FastGPT的完整日志，确认请求发送的完整参数是否符合预期。

## 解决与验证
解决方法：
1. 修正FastGPT中的模型名称，将`lnternVL3-14B`调整为与实际部署一致的`InternVL3-14B`；
2. 调整FastGPT的请求参数格式，使其与模型部署的接口支持的格式匹配，若模型仅支持Completions格式，则需将`messages`字段转换为对应格式；
3. 确认FastGPT配置的模型接口地址正确无误。
验证方法：在FastGPT中重新执行模型测试，确认不再返回`400 status code (no body)`报错，同时可再次使用curl命令测试模型接口，确保调用正常。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4879)
