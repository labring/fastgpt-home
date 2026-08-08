---
title: 配置FastGPT对话问题引导功能的详细说明
slug: /zh/tutorial/fastgpt-chat-input-guide
page_type: 教程/部署
source: https://doc.fastgpt.cn/zh-CN/guide/build/general/chat_input_guide
source_type: 官方文档
---

# 配置FastGPT对话问题引导功能的详细说明

## 功能概述
对话问题引导是FastGPT的辅助交互功能，可为应用提前预设问题库，当用户在对话框输入内容时，系统会动态匹配预设问题作为提示，引导用户更高效地完成提问。你可以选择两种配置方式：直接在FastGPT后台配置内置词库，或者通过自定义词库接口接入外部问题库。

## 自定义词库接口配置
若选择自定义词库接口，需确保接口可被用户浏览器访问，且已配置允许跨域请求。以下是标准的请求与响应规范：
1.  请求规范：使用GET请求，接口地址为`http://localhost:3000/api/core/chat/inputGuide/query`，需携带两个必填参数：
    - `appId`：应用的唯一ID，示例值为`663c75302caf8315b1c00194`
    - `searchKey`：用户输入的搜索关键字，最长支持50个字符。
    完整的curl请求示例为：`curl --location --request GET http://localhost:3000/api/core/chat/inputGuide/query?appId=663c75302caf8315b1c00194&searchKey=你`（注：原始示例中参数间未使用`&`分隔，实际使用时需补充该分隔符）
2.  响应规范：成功响应的状态码为`200`，标准响应体结构如下：
    ```json
    {
      "code": 200,
      "statusText": "",
      "message": "",
      "data": ["是你", "你是谁呀", "你好好呀", "你好呀", "你是谁！", "你好"]
    }
    ```
    其中`data`为匹配到的问题数组，最多返回5个问题，超出数量的内容将被自动截断。

## 配置注意事项
使用内置词库时，你仅需在FastGPT后台的对应配置页面直接录入预设问题即可。无论选择哪种配置方式，都需注意`searchKey`的长度不能超过50个字符，否则可能导致匹配失败。同时，自定义词库接口必须保证跨域权限正常，否则用户浏览器将无法正常调用接口，无法获取引导问题。

> 来源：https://doc.fastgpt.cn/zh-CN/guide/build/general/chat_input_guide
