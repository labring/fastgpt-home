---
title: FastGPT API接口鉴权与基础配置使用说明
slug: /zh/api/fastgpt-api-basic-config
page_type: API与文档
source: https://doc.fastgpt.cn/zh-CN/openapi/intro
source_type: 官方文档
---

# FastGPT API接口鉴权与基础配置使用说明

## API文档概述
从4.15.0版本开始，FastGPT API文档采用zod-openapi自动生成，部分旧接口未完成改造故不会在文档中显示。你可以通过访问对应文档地址查看最新的接口情况，文档左侧手动编辑的接口说明不再更新。FastGPT API文档分为两套：Dev API包含所有开发的API，不一定能通过ApiKey调用；System OpenAPI包含系统所有开放接口，可通过系统ApiKey调用。文档地址的endpoint为你的FastGPT访问地址，拼接对应路径即可打开文档：Dev API文档地址为`{{endpoint}}/apidoc/devapi`，System OpenAPI文档地址为`{{endpoint}}/apidoc/systemopenapi`。云服务版本分别提供中国大陆版和国际版的两类文档入口。

## API密钥相关说明
FastGPT OpenAPI接口允许使用API Key进行鉴权，从而操作FastGPT上的相关服务和资源，例如调用应用对话接口、上传知识库数据、搜索测试等。出于兼容性和安全考虑，并非所有接口都允许通过API Key访问。获取API密钥有两个固定位置：一是在账号页面的Api密钥模块中获取，二是在应用的发布渠道下的API访问页面中查看。API密钥相当于当前账号在当前团队下的访问凭证，在该团队下有权限的资源，都可以通过该API密钥进行操作。

## 基础配置与使用示例
首先需要明确BaseURL的定义：BaseURL是所有接口的根地址，直接请求BaseURL不会得到有效响应。OpenAPI接口的鉴权通过请求头的`Authorization`字段实现，格式为`Bearer {{apikey}}`，其中`{{apikey}}`需替换为你实际获取的API密钥。标准的基础配置格式为：
```
baseUrl: http://localhost:3000/api
headers: {
  "Authorization": "Bearer {{apikey}}"
}
```
你可以按照此配置完成基础的接口调用准备，在实际调用时，只需在配置好的baseUrl后拼接对应接口的具体路径，即可发起鉴权后的请求。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/openapi/intro)
