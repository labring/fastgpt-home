---
title: 获取FastGPT数据集单条数据详情的接口使用说明
slug: /zh/api/fastgpt-dataset-single-data-detail
page_type: API与文档
source: https://doc.fastgpt.cn/openapi/dataset
source_type: 官方文档小节
---

# 获取FastGPT数据集单条数据详情的接口使用说明

## 接口概述
该接口属于FastGPT开放API的数据集查询模块，用于精准获取数据集中单条数据的完整元信息。调用时需通过GET请求携带目标数据的ID参数，支持获取数据的问题文本、所属数据集信息、原始文件信息等详细内容，适用于知识库数据校验、单条数据详情查看等开发场景。

## 调用步骤
按照以下步骤可完成接口调用：
1. 确认FastGPT服务的运行地址，本地测试默认地址为`http://localhost:3000`。
2. 准备有效的Bearer类型授权令牌，将示例中的`{{authorization}}`替换为实际获取的令牌值。
3. 替换请求URL中的`id`参数值为目标数据的具体ID，例如示例中的`65abd4b29d1448617cba61db`。
4. 执行构造完成的curl命令：
```bash
curl --location --request GET 'http://localhost:3000/api/core/dataset/data/detail?id=65abd4b29d1448617cba61db' \
--header 'Authorization: Bearer {{authorization}}'
```
其中`id`为必填参数，用于指定需要查询的单条数据的唯一标识。

## 响应说明
当请求参数正确且目标数据存在时，将返回状态码为200的成功响应，响应结构如下：
```json
{
  "code": 200,
  "statusText": "",
  "message": "",
  "data": {
    "id": "65abd4b29d1448617cba61db",
    "q": "N o . 2 0 2 2 1 2中 国 信 息 通 信 研 究 院京东探索研究院2022年 9月人工智能生成内容（AIGC）白皮书(2022 年)版权声明本白皮书版权属于中国信息通信研究院和京东探索研究院，并受法律保护。转载、摘编或利用其它方式使用本白皮书文字或者观点的，应注明“来源：中国信息通信研究院和京东探索研究院”。违反上述声明者，编者将追究其相关法律责任。前 言习近平总书记曾指出，“数字技术正以新理念、新业态、新模式全面融入人类经济、政治、文化、社会、生态文明建设各领域和全过程”。在当前数字世界和物理世界加速融合的大背景下，人工智能生成内容（Artificial Intelligence Generated Content，简称 AIGC）正在悄然引导着一场深刻的变革，重塑甚至颠覆数字内容的生产方式和消费模式，将极大地丰富人们的数字生活，是未来全面迈向数字文明新时代不可或缺的支撑力量。",
    "a": "",
    "chunkIndex": 0,
    "indexes": [
      {
        "type": "default",
        "dataId": "3720083",
        "text": "N o . 2 0 2 2 1 2中 国 信 息 通 信 研 究 院京东探索研究院2022年 9月人工智能生成内容（AIGC）白皮书(2022 年)版权声明本白皮书版权属于中国信息通信研究院和京东探索研究院，并受法律保护。转载、摘编或利用其它方式使用本白皮书文字或者观点的，应注明“来源：中国信息通信研究院和京东探索研究院”。违反上述声明者，编者将追究其相关法律责任。前 言习近平总书记曾指出，“数字技术正以新理念、新业态、新模式全面融入人类经济、政治、文化、社会、生态文明建设各领域和全过程”。在当前数字世界和物理世界加速融合的大背景下，人工智能生成内容（Artificial Intelligence Generated Content，简称 AIGC）正在悄然引导着一场深刻的变革，重塑甚至颠覆数字内容的生产方式和消费模式，将极大地丰富人们的数字生活，是未来全面迈向数字文明新时代不可或缺的支撑力量。",
        "_id": "65abd4b29d1448617cba61dc"
      }
    ],
    "datasetId": "65abc9bd9d1448617cba5e6c",
    "collectionId": "65abd4ac9d1448617cba6171",
    "sourceName": "中文-AIGC白皮书2022.pdf",
    "sourceId": "65abd4ac9d1448617cba6166",
    "isOwner": true,
    "canWrite": true
  }
}
```
响应的`data`字段包含了目标数据的全部元信息，各核心字段含义如下：`id`为数据唯一标识，`q`为存储的问题文本，`a`为关联回答内容，`chunkIndex`为数据块索引，`indexes`为关联索引列表，`datasetId`为所属数据集ID，`collectionId`为所属知识库集合ID，`sourceName`为原始上传文件名，`sourceId`为原始文件标识，`isOwner`和`canWrite`分别标识调用者的所有权和编辑权限。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/dataset)
