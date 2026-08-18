---
title: 配置FastGPT对话问题引导功能的方法与注意事项
slug: /zh/tutorial/chat-input-guide-config
page_type: 教程/部署
source: https://doc.fastgpt.cn/zh-CN/guide/build/general/chat_input_guide
source_type: 官方文档
---

# 配置FastGPT对话问题引导功能的方法与注意事项

## 功能概述与边界说明
对话问题引导功能可帮助FastGPT应用预设引导问题，当用户输入内容时，系统会动态匹配预设问题并展示为提示，帮助用户更快完成提问。你可以选择在FastGPT内置配置词库，或接入自定义词库接口实现该功能。
使用自定义词库接口时有明确边界：接口必须可被用户浏览器直接访问，且需配置允许跨域请求；搜索关键字`searchKey`最长支持50个字符，接口返回的匹配问题数组`data`最多仅需返回5个问题。

## 自定义接口配置步骤
1.  提前准备符合要求的自定义接口，确保其可被浏览器访问且已配置跨域。
2.  构造GET请求，示例命令如下：
    ```bash
    curl --location --request GET http://localhost:3000/api/core/chat/inputGuide/query?appId=663c75302caf8315b1c00194&searchKey=你
    ```
    其中参数说明：
    - `appId`：目标应用的唯一标识ID
    - `searchKey`：用户输入的搜索关键字，长度不可超过50个字符
3.  合法响应格式示例如下：
    ```json
    {
      "code": 200,
      "statusText": "",
      "message": "",
      "data": ["是你", "你是谁呀", "你好好呀", "你好呀", "你是谁！", "你好"]
    }
    ```
    响应的`data`字段为匹配到的问题数组，实际返回数量最多不超过5个。

## 适用与禁用场景
该功能适用于需要统一用户提问方向、引导用户规范提问的场景，例如固定主题的客服咨询、特定业务的问答应用。当应用需要处理高度个性化、无明确预设可能的用户提问时，不建议使用该功能，避免限制用户的提问自由度。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/guide/build/general/chat_input_guide)
