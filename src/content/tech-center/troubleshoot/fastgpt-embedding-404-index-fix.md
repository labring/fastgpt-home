---
title: 解决FastGPT部署后使用embedding服务时知识库索引报404的问题
slug: /zh/troubleshoot/fastgpt-embedding-404-index-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1372
source_type: GitHub issue
---

# 解决FastGPT部署后使用embedding服务时知识库索引报404的问题

## 现象
使用embedding服务时可正常聊天、服务连接无异常，但知识库上传数据时卡在索引步骤。docker日志返回报错`Embedding Error ez [Error]: 404 404 page not found`，同时日志中包含`error => 404 404 page not found`的提示信息。

## 可能原因
目标embedding服务的访问地址为`api/embeddings`，而默认配置的embedding访问地址为`v1/embeddings`，两者路径不兼容，导致请求返回404错误。

## 排查步骤
1.  执行curl命令测试目标embedding接口地址，确认接口可正常访问。
2.  查看FastGPT的向量模型配置，核对`requestUrl`参数的配置内容。
3.  对比目标服务实际的embedding接口路径与FastGPT配置的路径是否一致。

## 解决与验证
修改向量模型的`requestUrl`配置，将其指定为目标服务实际的embedding接口地址，示例配置如下：
```json
"vectorModels": [
{
"model": "m3e-base:latest",
"name": "m3e-base:latest",
"avatar": "/imgs/model/openai.svg",
"charsPointsPrice": 0,
"defaultToken": 512,
"maxToken": 8192,
"weight": 100,
"dbConfig": {},
"queryConfig": {},
"requestUrl":"http://host.docker.internal:11434/api/embeddings"
}
]
```
配置完成后，重启FastGPT服务并重新上传知识库数据，验证索引流程是否正常完成，无404报错。

> 来源: [FastGPT GitHub issue #1372](https://github.com/labring/FastGPT/issues/1372)
