---
title: FastGPT API接口的鉴权、调用范围与基础配置说明
slug: /zh/tutorial/fastgpt-openapi-auth-config
page_type: 教程/部署
source: https://doc.fastgpt.cn/zh-CN/openapi
source_type: 官方文档
---

# FastGPT API接口的鉴权、调用范围与基础配置说明

## API文档分类与查看方式
从4.15.0版本开始，FastGPT API文档采用zod-openapi自动生成，部分旧接口未完成改造暂不显示在文档中。FastGPT API共分为两套：Dev API包含所有开发的API，不一定支持ApiKey调用；System OpenAPI为系统全量开放的接口，可通过系统ApiKey调用。可通过拼接FastGPT访问地址（endpoint）与对应路径查看文档：Dev API文档地址为`{{endpoint}}/apidoc/devapi`，System OpenAPI文档地址为`{{endpoint}}/apidoc/systemopenapi`。针对云服务版本，分别提供了中国大陆版和国际版的专属API文档链接。

## API密钥获取与使用范围
可通过两个途径获取API密钥：一是登录系统后进入「账号 - Api 密钥」页面获取，二是进入目标应用的「发布渠道 - API 访问」页面查看。API密钥相当于当前账号在所属团队下的访问凭证，仅可操作该团队下有权限的资源与服务，例如调用应用对话接口、上传知识库数据、搜索测试等。需要注意的是，出于兼容性和安全考虑，并非所有接口都支持通过API Key访问。

## 基础配置与调用示例
首先需明确BaseURL为所有接口的根地址，直接请求BaseURL不会产生实际效果。OpenAPI接口统一通过请求头的Authorization字段进行鉴权，鉴权格式为`Bearer {{apikey}}`，其中`{{apikey}}`为你获取到的API密钥。最小可用配置示例如下：
```
baseUrl: http://localhost:3000/api
headers: {
  Authorization: Bearer 你的API密钥
}
```
需要严格按照该格式配置，确保鉴权字段正确无误，即可发起对应接口的调用请求。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/openapi)
