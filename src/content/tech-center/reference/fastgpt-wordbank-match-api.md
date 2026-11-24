---
title: 调用FastGPT自定义词库接口获取匹配问题的方法
slug: /zh/reference/fastgpt-wordbank-match-api
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/build/general/chat_input_guide
source_type: 官方文档小节
---

# 调用FastGPT自定义词库接口获取匹配问题的方法

## 结论
FastGPT自定义词库接口用于获取与搜索关键词匹配的自定义问题。调用该接口将返回最多5个匹配结果。

## 具体怎么做
1. 构造GET请求，请求地址为`http://localhost:3000/api/core/chat/inputGuide/query`，需携带两个查询参数：
   - `appId`：应用ID
   - `searchKey`：搜索关键字，最长50个字符
2. 示例请求命令：
   ```bash
   curl --location --request GET 'http://localhost:3000/api/core/chat/inputGuide/query?appId=663c75302caf8315b1c00194&searchKey=你'
   ```
3. 成功响应的JSON格式示例：
   ```json
   {
     "code": 200,
     "statusText": "",
     "message": "",
     "data": ["是你", "你是谁呀", "你好好呀", "你好呀", "你是谁！", "你好"]
   }
   ```
   其中`data`为匹配问题数组，最多返回5个结果。

## 注意事项
1. 需确保接口可被用户浏览器访问，并配置允许跨域请求。
2. `searchKey`参数长度不得超过50个字符。
3. 接口成功响应时，`data`数组最多包含5个匹配问题。
4. 仅支持GET请求方式。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/general/chat_input_guide)
