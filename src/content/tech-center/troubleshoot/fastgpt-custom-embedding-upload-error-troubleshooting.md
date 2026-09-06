---
title: FastGPT自定义嵌入模型知识库上传报错的排查方案
slug: /zh/troubleshoot/fastgpt-custom-embedding-upload-error-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/172
source_type: GitHub issue
---

# FastGPT自定义嵌入模型知识库上传报错的排查方案

## 现象
对接本地模型时，修改OPENAI_BASE_URL与OPENAIKEY后可正常进行简单对话，但将config.json中的VectorModels配置为本地模型后，执行知识库上传操作时报错。报错关联本地模型/v1/embeddings接口返回的数据长度，部分场景下会出现特定embeddings报错，格式为{"error":{"message":"embeddings max batch size is 16, and can not be 0","type":"baidu_error","param":"","code":336003}}。3.X版本无法支持部分自定义嵌入模型，4.0版本已支持对应模型。

## 可能原因
FastGPT默认向量维度适配OpenAI模型，当使用自定义嵌入模型时，若该模型生成的向量维度与默认配置不一致，会引发上传知识库报错。部分模型存在embeddings批量处理参数限制，如单次最大batch size为16，超出限制会触发报错。3.X版本无法支持部分自定义嵌入模型，4.0版本已提供对应支持。

## 排查步骤
1. 确认当前使用的FastGPT版本，判断是否支持所使用的嵌入模型。
2. 查看所使用的本地嵌入模型生成的向量维度参数。
3. 检查知识库上传时的报错日志，确认是否存在向量维度不匹配或embeddings相关错误。
4. 核对所使用模型的相关参数是否符合要求。

## 解决与验证
1. 若向量维度不匹配：登录PostgreSQL向量数据库，执行ALTER TABLE modeldata alter COLUMN vector type vector(对应模型维度); 例如部分自定义嵌入模型的对应维度为384时，执行ALTER TABLE modeldata alter COLUMN vector type vector(384); 完成后重启FastGPT服务。
2. 若使用3.X版本且不支持目标嵌入模型，可升级至4.0版本以获得支持。
3. 若出现embeddings batch size限制报错，调整模型调用的批量参数至符合模型要求。
完成操作后，重新上传知识库，确认操作成功且无报错，即可正常执行知识库+对话引导流程。

> 来源: [FastGPT GitHub issue #172](https://github.com/labring/FastGPT/issues/172)
