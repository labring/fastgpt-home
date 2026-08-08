---
title: FastGPT OpenAPI 接口的鉴权与基础配置说明
slug: /zh/api/fastgpt-openapi-basic-config
page_type: API与文档
source: https://doc.fastgpt.cn/zh-CN/openapi/intro
source_type: 官方文档
---

# FastGPT OpenAPI 接口的鉴权与基础配置说明

从 4.15.0 版本起，FastGPT API 文档采用 zod-openapi 自动生成（部分旧接口未改造暂不显示），左侧手动编辑的接口说明不再更新。FastGPT API 文档分为 Dev API 和 System OpenAPI 两套体系：Dev API 包含所有开发的 API（部分可能无法通过 ApiKey 调用），System OpenAPI 为系统全量开放接口，可通过系统 ApiKey 调用。可通过访问对应 endpoint 拼接 path 的地址查看接口文档：Dev API 地址为 `{{endpoint}}/apidoc/devapi`，System OpenAPI 地址为 `{{endpoint}}/apidoc/systemopenapi`；云服务版本则分别提供中国大陆版与国际版的两类文档地址。

使用 FastGPT OpenAPI 需通过 API Key 完成鉴权。API Key 可从两个官方路径获取：一是在「账号 - Api 密钥」页面，二是在目标应用的「发布渠道 - API 访问」页面。API Key 相当于当前账号在所属团队的访问凭证，仅可操作该团队下有权限的资源，且出于兼容性与安全考虑，并非所有接口都支持通过 API Key 访问。

### 基础配置与调用示例
首先需明确：BaseURL 并非接口地址，而是所有接口的根地址，直接请求 BaseURL 无实际作用。标准的 OpenAPI 基础配置如下：
1.  配置 baseUrl：示例为 `http://localhost:3000/api`
2.  配置请求头：添加 `Authorization: Bearer {{apikey}}`，其中 `{{apikey}}` 需替换为实际获取的 API Key。
所有 FastGPT OpenAPI 接口均通过该请求头完成鉴权，完成配置后即可按照文档中的接口说明发起调用。

> 来源：https://doc.fastgpt.cn/zh-CN/openapi/intro
