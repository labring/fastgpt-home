---
title: 获取FastGPT数据集集合数据列表的API调用指南
slug: /zh/api/fastgpt-dataset-data-list-api
page_type: API与文档
source: https://doc.fastgpt.cn/openapi/dataset
source_type: 官方文档小节
---

# 获取FastGPT数据集集合数据列表的API调用指南

本文档针对FastGPT的数据集集合数据列表获取API展开说明，该API用于查询指定数据集集合下的知识库分片数据条目，支持分页查询与模糊搜索功能。调用该API需使用POST请求方法，并携带合法的认证令牌与必要的请求参数。

### 调用配置与参数说明
1.  配置请求基础信息：请求目标地址为`http://localhost:3000/api/core/dataset/data/v2/list`，请求方法为POST。
2.  添加请求头：需包含`Authorization: Bearer {{authorization}}`（替换为实际获取的认证令牌）与`Content-Type: application/json`。
3.  构造请求体，需包含以下字段：
    - `offset`：偏移量，选填，用于设置分页查询的起始位置
    - `pageSize`：每页返回的条目数量，选填，最大值为30
    - `collectionId`：目标数据集集合的唯一标识，为必填项
    - `searchText`：模糊搜索关键词，选填，用于匹配数据条目的文本内容
示例请求体如下：
```json
{
  "offset": 0,
  "pageSize": 10,
  "collectionId": "65abd4ac9d1448617cba6171",
  "searchText": ""
}
```

### 响应结果说明
当请求成功时，会返回状态码为200的响应，响应体包含`code`、`statusText`、`message`与`data`字段。其中`data`字段包含两个子项：`list`为符合查询条件的知识库数据条目列表，`total`为符合条件的总条目数。
每个列表项包含以下详细字段：`_id`为数据条目的唯一ID，`datasetId`为所属数据集的ID，`collectionId`为所属集合的ID，`q`为分片后的知识库文本内容，`a`为关联的回答内容（示例中为空），`chunkIndex`为该文本在原文档中的分片索引。完整的响应示例片段如下：
```json
{
  "code": 200,
  "statusText": "",
  "message": "",
  "data": {
    "list": [
      {
        "_id": "65abd4b29d1448617cba61db",
        "datasetId": "65abc9bd9d1448617cba5e6c",
        "collectionId": "65abd4ac9d1448617cba6171",
        "q": "N o . 2 0 2 2 1 2中 国 信 息 通 信 研 究 院京东探索研究院2022年 9月人工智能生成内容（AIGC）白皮书(2022 年)版权声明本白皮书版权属于中国信息通信研究院和京东探索研究院，并受法律保护。转载、摘编或利用其它方式使用本白皮书文字或者观点的，应注明“来源：中国信息通信研究院和京东探索研究院”。违反上述声明者，编者将追究其相关法律责任。前 言习近平总书记曾指出，“数字技术正以新理念、新业态、新模式全面融入人类经济、政治、文化、社会、生态文明建设各领域和全过程”。在当前数字世界和物理世界加速融合的大背景下，人工智能生成内容（Artificial Intelligence Generated Content，简称 AIGC）正在悄然引导着一场深刻的变革，重塑甚至颠覆数字内容的生产方式和消费模式，将极大地丰富人们的数字生活，是未来全面迈向数字文明新时代不可或缺的支撑力量。",
        "a": "",
        "chunkIndex": 0
      }
    ],
    "total": 63
  }
}
```

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/dataset)
