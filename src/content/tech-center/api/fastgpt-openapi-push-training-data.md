---
title: 使用FastGPT OpenAPI推送训练数据至训练队列
slug: /zh/api/fastgpt-openapi-push-training-data
page_type: API与文档
source: https://doc.fastgpt.cn/openapi/dataset
source_type: 官方文档小节
---

# 使用FastGPT OpenAPI推送训练数据至训练队列

## 接口概述
该接口用于将自定义训练数据提交至FastGPT的训练队列，用于后续模型训练。单次请求最多可推送200组数据，需通过POST方式发起请求，请求地址为`http://localhost:3000/api/core/dataset/data/pushData`，请求头需包含`Authorization: Bearer {apikey}`和`Content-Type: application/json`。

## 调用与配置步骤
1.  准备API密钥，将其作为`Authorization`请求头的Bearer令牌。
2.  构造符合格式的请求体，必填参数包括`collectionId`（目标数据集集合的ID）和`trainingType`（训练模式，当前仅支持`chunk`模式）。
3.  可选参数可按需配置：`prompt`为自定义QA拆分提示词，需严格遵循模板，建议不传入；`billId`用于将本次数据聚合到同一训练订单，可重复使用，可参考创建训练订单相关文档获取该值；`data`数组为训练数据，每个元素包含必填的`q`（问题文本）、可选的`a`（辅助回答文本）和`indexes`（自定义索引数组，默认使用`q`和`a`组合生成索引）。
4.  执行以下curl命令提交请求，替换其中的`{apikey}`、`{collectionId}`和`data`数组内容：
```curl
curl --location --request POST 'http://localhost:3000/api/core/dataset/data/pushData' \
--header 'Authorization: Bearer {apikey}' \
--header 'Content-Type: application/json' \
--data-raw '{
"collectionId": "64663f451ba1676dbdef0499",
"trainingType": "chunk",
"data": [
{"q": "你是谁？", "a": "我是FastGPT助手"},
{"q": "你会什么？", "a": "我什么都会", "indexes": [{"text":"自定义索引1"}, {"text":"自定义索引2"}]}]
}'
```
注意单次请求的`data`数组元素数量不得超过200。

## 响应结果说明
当请求成功时，将返回状态码200的响应，响应体的`data`字段包含`insertLen`参数，代表最终成功插入的训练数据数量。示例响应格式如下：
```json
{
"code": 200,
"statusText": "",
"data": {
"insertLen": 1
}
}
```
若请求参数缺失或格式错误，将返回对应错误码及提示文本。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/dataset)
