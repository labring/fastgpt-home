---
title: FastGPT 批量上传文件功能的排查与使用指南
slug: /zh/troubleshoot/fastgpt-batch-upload-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2489
source_type: GitHub issue
---

# FastGPT 批量上传文件功能的排查与使用指南

## 现象
用户在使用FastGPT过程中，发现平台仅提供单个文件集合创建接口，无法直接实现批量上传文件到数据集的需求，且尝试调用现有单个文件上传接口无法完成批量提交操作。

## 可能原因
当前FastGPT公开的文件上传接口仅支持单次上传单个文件，未提供官方批量上传文件的接口，因此无法直接完成批量上传操作。

## 排查步骤
1. 确认当前使用的文件上传接口为/api/core/dataset/collection/create/localFile，该接口为官方提供的单个文件上传接口。
2. 检查接口调用参数，单个文件上传需通过form表单提交单个file字段及对应数据集配置参数，包括datasetId、trainingType、chunkSize等。
3. 核对官方接口文档或可用接口列表，确认未发现批量上传相关的官方接口。

## 解决与验证
由于当前线程未提供批量上传接口的官方解法，需按实际环境确认是否存在第三方扩展或自定义批量上传方案。若需使用单个文件上传接口，可参考以下命令：
```bash
curl --location --request POST 'http://localhost:3000/api/core/dataset/collection/create/localFile' \
--header 'Authorization: Bearer {{authorization}}' \
--form 'file=@"C:\Users\user\Desktop\fastgpt测试文件\index.html"' \
--form 'data="{\"datasetId\":\"6593e137231a2be9c5603ba7\",\"parentId\":null,\"trainingType\":\"chunk\",\"chunkSize\":512,\"chunkSplitter\":\"\",\"qaPrompt\":\"\",\"metadata\":{}}"'
```
调用该命令可完成单个文件的上传，验证上传结果是否符合预期。若需实现批量上传，需等待官方更新接口或自行开发适配逻辑。

> 来源: [FastGPT GitHub issue #2489](https://github.com/labring/FastGPT/issues/2489)
