---
title: 解决FastGPT本地文件数据集导入的API调用异常问题
slug: /zh/troubleshoot/fastgpt-local-file-dataset-import
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1911
source_type: GitHub issue
---

# 解决FastGPT本地文件数据集导入的API调用异常问题

## 现象
调用FastGPT本地文件数据集导入API时无法成功完成导入操作，已确认使用的密钥可正常使用。

## 可能原因
可能的原因包括API访问地址配置错误、请求头的授权信息格式错误、表单提交的data字段JSON格式有误、上传文件的本地路径不存在、数据集ID无效，部分参数需按实际环境确认。

## 排查步骤
1. 替换示例命令中的服务地址172.16.1.85:3000为实际部署的FastGPT服务地址。
2. 替换Authorization头中的示例密钥为已验证可用的FastGPT密钥，确保格式为Bearer + 空格 + 密钥。
3. 确认本地文件路径与命令中指定的路径一致，确保目标上传文件存在。
4. 修改data字段中的datasetId为实际需要导入的数据集ID，其他参数按需调整。
5. 检查请求的POST方法和multipart/form-data表单格式是否符合API要求。

## 解决与验证
使用官方提供的标准curl命令发起请求，替换其中的服务地址、密钥、文件路径、datasetId为实际值，命令示例如下：
```bash
curl --location --request POST 'http://localhost:3000/api/core/dataset/collection/create/localFile' \
--header 'Authorization: Bearer YOUR_API_KEY' \
--form 'file=@"/home/gpt/file/人生.txt"' \
--form 'data="{"datasetId":"667e7b838c9069d1a46c72b1","parentId":null,"trainingType":"chunk","chunkSize":512,"chunkSplitter":"","qaPrompt":"","metadata":{}}"'
```
若命令执行后返回正常的数据集导入结果，则问题解决。

> 来源: [FastGPT GitHub issue #1911](https://github.com/labring/FastGPT/issues/1911)
