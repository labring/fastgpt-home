---
title: 通过API创建FastGPT数据集集合并分割文件内容
slug: /zh/api/fastgpt-api-dataset-collection-create
page_type: API与文档
source: https://doc.fastgpt.cn/openapi/dataset
source_type: 官方文档小节
---

# 通过API创建FastGPT数据集集合并分割文件内容

该API用于通过接口创建FastGPT数据集集合，系统会读取指定文件的内容并自动分割，目前支持pdf、docx、md、txt、html、csv六种格式的文件。使用代码上传时，需注意中文文件名需要进行encode处理，否则容易出现乱码问题。

### 接口调用配置步骤
请求地址为`http://localhost:3000/api/core/dataset/collection/create/apiCollection`，请求方式为POST。需携带`Authorization: Bearer fastgpt-xxx`请求头，替换`fastgpt-xxx`为实际的API密钥。调用时需使用POST form-data格式，包含file和data两个字段。其中data字段为集合的配置参数，各参数说明如下：name为集合名称，建议使用文件名，为必填项；apiFileId为文件的ID，必填；datasetId为目标知识库的ID，必填；parentId为父级目录ID，不填则默认使用根目录；trainingType为训练模式，为必填项；chunkSize为每个分片的长度，可选，chunk模式取值范围为100到3000，qa模式取值范围为4000到模型最大token，16k模型通常建议不超过10000；chunkSplitter为自定义优先分割符号，可选；qaPrompt为QA拆分自定义提示词，可选。

### 接口响应说明
接口调用成功时，会返回code为200的响应结果。响应数据中的`data`字段包含`collectionId`，即新创建的集合ID，同时`results`字段下会返回`insertLen`，表示成功插入的文本分片数量。若请求存在参数错误或格式问题，会返回对应错误码及提示信息。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/dataset)
