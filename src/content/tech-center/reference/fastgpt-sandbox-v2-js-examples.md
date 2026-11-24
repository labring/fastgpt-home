---
title: FastGPT沙盒v2节点的JavaScript代码示例使用指南
slug: /zh/reference/fastgpt-sandbox-v2-js-examples
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/build/workflow/nodes/sandbox-v2
source_type: 官方文档小节
---

# FastGPT沙盒v2节点的JavaScript代码示例使用指南

## 结论
本页整理了FastGPT沙盒v2节点的4类JavaScript常用代码示例，覆盖数据格式转换、日期计算、HTTP请求、数据加密四类常见需求。示例可直接复制到沙盒节点中使用，部分依赖官方内置模块或可通过require引入第三方库。

## 具体怎么做
1. 进入FastGPT沙盒v2节点的编辑界面，清空默认代码。
2. 选择对应场景的代码粘贴使用：
   - 数据格式转换：将逗号分隔的输入字符串转为数组，返回处理后的数组与元素数量，参数为`input`。
     ```javascript
     function main ({ input }){
     const items = input.split(',').map(s => s.trim()).filter(Boolean)
     return { items, count: items.length }
     }
     ```
   - 日期计算：通过dayjs库获取当前日期、下周日期和时间戳，无需传入参数。
     ```javascript
     const dayjs = require('dayjs')
     function main(){
     const now = dayjs()
     return {
     today: now.format('YYYY-MM-DD'),
     nextWeek: now.add(7, 'day').format('YYYY-MM-DD'),
     timestamp: now.valueOf()
     }
     }
     ```
   - HTTP请求：调用内置`SystemHelper.httpRequest`获取天气数据，需传入`city`参数，超时时间为10秒。
     ```javascript
     async function main ({ city }){
     const res = await SystemHelper.httpRequest(
     `https://api.example.com/weather?city=${city}`,
     { method: 'GET', timeout: 10 }
     )
     return {
     temperature: res.data.temp,
     weather: res.data.condition
     }
     }
     ```
   - 数据加密：使用CryptoJS的AES算法加密文本，需传入`text`和`key`参数。
     ```javascript
     const CryptoJS = require('crypto-js')
     function main ({ text, key }){
     const encrypted = CryptoJS.AES.encrypt(text, key).toString()
     return { encrypted }
     }
     ```

## 注意事项
1. `SystemHelper.httpRequest`为FastGPT沙盒v2的内置方法，无需额外引入。
2. 第三方库需通过`require`语句引入，如`dayjs`、`CryptoJS`。
3. 输入参数需与main函数定义的参数名完全一致，否则无法正确获取传入值。
4. 异步函数需使用`async`关键字声明，确保异步请求正常执行。
5. 示例中的API地址为占位符，实际使用时需替换为真实可用的接口地址。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/workflow/nodes/sandbox-v2)
