---
title: FastGPT OpenAPI的使用方法与配置说明
slug: /zh/tutorial/fastgpt-openapi-usage-config
page_type: 教程/部署
source: https://doc.fastgpt.cn/zh-CN/openapi
source_type: 官方文档
---

# FastGPT OpenAPI的使用方法与配置说明

## API文档分类与访问方式
从4.15.0版本开始，FastGPT API文档采用zod-openapi自动生成（部分旧接口未改造，不会显示在文档中）。官方文档左侧手动编辑的接口说明不再更新，如需查看最新接口情况，请访问自动生成的文档地址。FastGPT的API文档分为两套：Dev API与System OpenAPI。其中Dev API包含所有开发的API，不一定支持通过ApiKey调用；System OpenAPI为系统全部开放接口，可通过系统ApiKey调用。
文档的访问地址为FastGPT访问地址拼接对应路径：Dev API地址为`{{endpoint}}/apidoc/devapi`，System OpenAPI地址为`{{endpoint}}/apidoc/systemopenapi`。云服务版本的文档可访问对应区域的官方链接。

## 快速配置与使用步骤
1.  **获取API密钥**：登录系统后，可通过两个固定渠道获取密钥：一是进入「账号 - Api 密钥」页面查看，二是打开目标应用的「发布渠道 - API 访问」页面获取。
2.  **确认BaseURL**：BaseURL为所有接口的根地址，并非直接可用的接口地址，直接请求BaseURL不会返回有效内容。例如本地部署的FastGPT，BaseURL通常为`http://localhost:3000/api`。
3.  **配置鉴权头**：所有OpenAPI请求需在请求头中添加鉴权信息，格式为`Authorization: Bearer {{apikey}}`，其中`{{apikey}}`替换为实际获取的API密钥。

## 使用边界与注意事项
FastGPT OpenAPI接口通过API Key鉴权，可用于调用应用对话接口、上传知识库数据、搜索测试等操作，但出于兼容性和安全考虑，并非所有接口都支持通过API Key访问。API密钥相当于当前账号在当前团队下的访问凭证，仅可操作该团队下有权限的资源。此外，Dev API包含的部分接口可能不支持通过API Key调用，仅System OpenAPI下的接口均可通过系统ApiKey访问。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/openapi)
