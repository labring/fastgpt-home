---
title: 解决FastGPT调用OneAPI转发的Embedding服务生成向量失败问题
slug: /zh/troubleshoot/fastgpt-oneapi-embedding-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/637
source_type: GitHub issue
---

# 解决FastGPT调用OneAPI转发的Embedding服务生成向量失败问题

## 现象
用户在私有部署的FastGPT中，调用OneAPI转发的私有Embedding服务编制文档索引时出现报错，无法获取向量完成索引编制。用户的复现流程为：1. 在OneAPI中添加自定义渠道，指向本地Embedding服务；2. 修改data/config.json，添加名称为`local-embedding`的VectorModel记录；3. 在FastGPT新建知识库，选择对应Embedding模型；4. 导入PDF文件，文件创建成功，但编制索引环节触发报错。经测试，直接通过curl调用OneAPI的embedding接口可正常返回结果。

## 可能原因
结合现象与测试结果，可能的失败原因包括：FastGPT调用Embedding服务的请求格式与OneAPI自定义渠道的接收要求不匹配；配置的VectorModel参数与OneAPI自定义渠道的模型名称、令牌限制存在不一致；编制索引时的文本长度超出了私有Embedding服务或OneAPI渠道的令牌限制。

## 排查步骤
1. 检查data/config.json中配置的VectorModel的`model`字段值，确保与OneAPI自定义渠道中设置的模型名称完全一致，排查拼写错误。
2. 对比curl调用OneAPI接口的请求格式与FastGPT默认的Embedding请求格式，确认请求路径、请求头、输入文本的传递方式是否匹配。
3. 核对配置的`defaultToken`、`maxToken`参数，确认其值符合私有Embedding服务和OneAPI渠道的令牌限制，用户当前配置的`defaultToken`为450，`maxToken`为5000。
4. 查看FastGPT的服务日志，获取具体的报错信息，定位失败的具体环节。

## 解决与验证
根据排查结果调整对应配置：若请求格式不匹配，修改FastGPT调用Embedding服务的请求参数以符合OneAPI自定义渠道的要求；若令牌参数超出限制，调整data/config.json中的`defaultToken`、`maxToken`参数至合理范围。调整完成后，重新导入文档至知识库，等待索引编制完成，确认无报错且成功生成向量索引。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/637)
