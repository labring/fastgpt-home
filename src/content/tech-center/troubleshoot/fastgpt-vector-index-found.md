---
title: 解决FastGPT生成向量时出现的idx:model:data:hash: no such index错误
slug: /zh/troubleshoot/fastgpt-vector-index-found
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/11
source_type: GitHub issue
---

# 解决FastGPT生成向量时出现的idx:model:data:hash: no such index错误

## 现象
部署使用FastGPT过程中，生成向量时出现报错：[ErrorReply: idx:model:data:hash: no such index]

## 可能原因
该报错对应Redis中未创建名为idx:model:data:hash的索引。

## 排查步骤
1. 进入FastGPT运行的Docker容器，执行命令：`docker exec -it 容器ID bash`
2. 连接本地Redis服务：`redis-cli -p 6379`
3. 完成Redis身份验证，若实际环境密码与示例不同，替换为对应密码：`auth psw1234`
4. 检查目标索引是否存在：执行`FT.INFO idx:model:data:hash`，若返回无该索引的提示，则需执行创建操作。

## 解决与验证
1. 执行以下命令创建目标索引：
```
FT.CREATE idx:model:data:hash ON HASH PREFIX 1 model:data: SCHEMA modelId TAG userId TAG status TAG q TEXT text TEXT vector VECTOR FLAT 6 DIM 1536 DISTANCE_METRIC COSINE TYPE FLOAT32
```
2. 验证索引创建成功：再次执行`FT.INFO idx:model:data:hash`，若返回索引相关信息则创建完成。
3. 重新执行向量生成操作，确认报错消失。

> 来源: [FastGPT GitHub issue #11](https://github.com/labring/FastGPT/issues/11)
