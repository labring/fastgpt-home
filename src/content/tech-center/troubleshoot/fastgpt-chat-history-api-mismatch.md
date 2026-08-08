---
title: 解决FastGPT历史记录API路径与文档不符导致404的问题
slug: /zh/troubleshoot/fastgpt-chat-history-api-mismatch
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6341
source_type: GitHub issue
---

# 解决FastGPT历史记录API路径与文档不符导致404的问题

## 现象
使用FastGPT 4.9.2版本，通过Docker私有化部署时，按照官方文档调用历史记录相关API，会返回HTTP 404错误。涉及的接口包括获取历史记录、删除历史记录、更新历史标题、清空历史记录四类，文档中给出的接口路径均包含/history层级，但实际可用的接口路径无此层级。

## 可能原因
官方文档中的历史记录API路径多了/history路由层级，与实际部署的API路由规则不一致，导致请求路径无法匹配到正确的接口，最终返回404错误。

## 排查步骤
1. 确认当前使用的FastGPT版本为4.9.2；
2. 对比官方文档中给出的API路径与实际调用时返回404的请求路径，例如文档中`/api/core/chat/history/getHistories`与实际可用的`/api/core/chat/getHistories`的差异；
3. 测试移除/history层级后的路径，验证是否可以正常返回200状态码。

## 解决与验证
1. 找到FastGPT项目中的`docs/openapi/chat.mdx`文件；
2. 移除该文件中四个历史记录API路径的/history部分，具体修改如下：
   - 将`http://localhost:3000/api/core/chat/history/getHistories`修改为`http://localhost:3000/api/core/chat/getHistories`
   - 将`http://localhost:3000/api/core/chat/history/delHistory`修改为`http://localhost:3000/api/core/chat/delHistory`
   - 将`http://localhost:3000/api/core/chat/history/updateHistory`修改为`http://localhost:3000/api/core/chat/updateHistory`
   - 将`http://localhost:3000/api/core/chat/history/clearHistories`修改为`http://localhost:3000/api/core/chat/clearHistories`
3. 修改完成后，重新调用修改后的API路径，验证返回状态码为200即可。

> 来源：https://github.com/labring/FastGPT/issues/6341
