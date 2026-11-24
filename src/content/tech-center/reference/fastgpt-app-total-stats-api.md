---
title: 获取FastGPT应用总体数据统计的日志接口使用参考
slug: /zh/reference/fastgpt-app-total-stats-api
page_type: 技术速查
source: https://doc.fastgpt.cn/openapi/app
source_type: 官方文档小节
---

# 获取FastGPT应用总体数据统计的日志接口使用参考

## 结论
该日志接口用于获取FastGPT应用的累积使用用户、对话及积分消耗的总体统计数据。调用该接口可直接获取目标应用的三项核心统计指标。

## 具体怎么做
1. 构造GET请求，请求地址为`https://cloud.fastgpt.cn/api/proApi/core/app/logs/getTotalData`
2. 携带必填查询参数`appId`，值为目标应用的唯一ID
3. 在请求头中添加`Authorization: Bearer apikey`，将`apikey`替换为实际的接口密钥
参数说明：
- `appId`：应用的唯一标识ID

响应示例：
```json
{
  "code": 200,
  "statusText": "",
  "message": "",
  "data": {
    "totalUsers": 0,
    "totalChats": 0,
    "totalPoints": 0
  }
}
```
出参说明：
- `totalUsers`：累积使用该应用的用户总数
- `totalChats`：该应用的累积对话总数量
- `totalPoints`：该应用的累积积分消耗总量

## 注意事项
1. 仅支持GET请求方式，使用其他请求类型将无法正常获取数据
2. 需确保传入的`appId`和`apikey`参数正确有效，否则无法获取统计数据
3. 成功响应的`code`字段值为200，若`code`非200则表示请求失败
4. 未产生业务数据时，响应的`data`字段三项统计值均为0

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/app)
