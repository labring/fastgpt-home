---
title: FastGPT通过本地文件调用API创建知识库文件集合
slug: /zh/reference/fastgpt-local-file-dataset-collection-create
page_type: 技术速查
source: https://doc.fastgpt.cn/openapi/dataset
source_type: 官方文档小节
---

# FastGPT通过本地文件调用API创建知识库文件集合

## 结论
通过FastGPT的官方API，可以传入本地文件创建知识库集合，支持pdf、docx、md、txt、html、csv格式的文件。调用成功后会返回创建的集合ID与插入的文档数量。

## 具体怎么做
1.  添加请求头：`Authorization: Bearer {{authorization}}`，其中`{{authorization}}`替换为你的授权令牌
2.  构造`form-data`格式的请求参数：
    - `file`：本地目标文件，注意中文文件名需先进行编码处理
    - `data`：JSON序列化后的知识库配置字符串，包含以下必填/可选字段：
      | 参数名 | 说明 | 默认值 |
      | --- | --- | --- |
      | `datasetId` | 目标知识库ID | 必填 |
      | `parentId` | 父集合ID | `null` |
      | `trainingType` | 文档训练类型 | `"chunk"` |
      | `chunkSize` | 文本分片大小 | `512` |
      | `chunkSplitter` | 自定义分片分隔符 | `""` |
      | `qaPrompt` | QA生成提示词 | `""` |
      | `metadata` | 自定义元数据 | `{}` |
3.  发送POST请求到接口地址：`http://localhost:3000/api/core/dataset/collection/create/localFile`

成功响应示例：
```json
{
  "code": 200,
  "data": {
    "collectionId": "65abc044e4704bac793fbd81",
    "results": {"insertLen": 1}
  }
}
```

## 注意事项
1.  必须使用`POST form-data`格式上传请求，仅支持`file`和`data`两个字段
2.  中文文件名需进行encode处理，否则会出现乱码问题
3.  支持的文件格式包括：pdf、docx、md、txt、html、csv
4.  `data`字段必须为JSON序列化后的字符串，不可直接传入原生JSON对象

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/dataset)
