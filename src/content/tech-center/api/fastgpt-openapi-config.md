---
title: FastGPT OpenAPI接口调用配置与权限使用说明
slug: /zh/api/fastgpt-openapi-config
page_type: API与文档
source: https://doc.fastgpt.cn/zh-CN/openapi/intro
source_type: 官方文档
---

# FastGPT OpenAPI接口调用配置与权限使用说明

## API文档基本说明
从4.15.0版本开始，FastGPT API文档采用zod-openapi自动生成（部分旧接口未改造，暂不显示），左侧手动编辑的接口说明不再更新，需通过对应文档地址查看最新接口情况。FastGPT API分为两套体系：Dev API包含所有开发的API，不一定支持API密钥调用；System OpenAPI为系统全量开放接口，可通过系统API密钥调用。
文档地址格式为：Dev API访问`{{endpoint}}/apidoc/devapi`，System OpenAPI访问`{{endpoint}}/apidoc/systemopenapi`，其中`{{endpoint}}`为你的FastGPT访问地址。云服务版本的API文档则分中国大陆版和国际版，对应各自的专属文档地址。

## API调用配置步骤
1. 获取API密钥：可通过两个渠道获取，一是进入账号页面的「Api 密钥」板块，二是进入目标应用的「发布渠道 - API 访问」页面。
2. 配置调用参数：
   - BaseURL为`http://localhost:3000/api`，注意BaseURL并非接口地址，直接请求无效果，仅作为所有接口的根地址使用。
   - 请求头需携带`Authorization: Bearer {{apikey}}`，其中`{{apikey}}`替换为实际获取的API密钥。
3. 权限说明：API密钥相当于当前账号在当前团队的访问凭证，仅可操作该团队下有权限的资源。

## 使用边界与注意事项
并非所有接口都支持通过API密钥访问，仅System OpenAPI的开放接口可通过密钥调用。使用过程中需注意，不要直接请求BaseURL，需基于BaseURL拼接具体接口路径发起请求。同时，API密钥的权限范围与当前账号在团队内的权限一致，超出权限的资源无法通过该密钥操作。如果需要查看旧版未改造的接口，需确认对应文档是否仍在维护，否则以自动生成的最新文档为准。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/openapi/intro)
