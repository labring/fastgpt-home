---
title: 在FastGPT沙盒中使用httpRequest发起外部HTTP请求
slug: /zh/reference/fastgpt-sandbox-http-request
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/build/workflow/nodes/sandbox-v2
source_type: 官方文档小节
---

# 在FastGPT沙盒中使用httpRequest发起外部HTTP请求

## 结论
在FastGPT的沙盒节点中，可通过内置的httpRequest函数发起外部HTTP请求。该函数自带SSRF防护机制，会自动拦截内网地址的请求，支持JavaScript与Python两种代码编写形式。

## 具体怎么做
1. 在沙盒节点的代码编辑区，调用`SystemHelper.httpRequest`方法发起请求。
2. 必传参数为请求地址`url`，可按需配置以下可选参数：
   - `method`：请求方法，默认值为GET
   - `headers`：自定义请求头，默认空对象
   - `body`：请求体，传入对象会自动进行JSON序列化，默认值为null
   - `timeout`：超时秒数，最大支持60s

### 代码示例
#### JavaScript 示例
```javascript
async function main ({ url }){
const res = await SystemHelper.httpRequest(url, {
method: 'GET',
headers: {},
body: null,
timeout: 60
})
return {
status: res.status,
data: res.data
}
}
```
#### Python 示例
```python
def main (url):
res = SystemHelper.httpRequest(url, method = "GET", headers = {}, timeout = 10 )
return { "status": res["status"], "data": res["data"]}
```

## 注意事项
- 单次执行最多允许30个请求
- 单次请求超时时间最大为60秒
- 响应体大小上限为2MB
- 仅支持http/https协议
- 自动拦截内网IP请求，包含127.0.0.0/8、10.0.0.0/8、172.16.0.0/12、192.168.0.0/16等网段

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/workflow/nodes/sandbox-v2)
