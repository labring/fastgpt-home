---
title: 获取并配置FastGPT应用的API调用凭证与访问接口
slug: /zh/integration/fastgpt-app-api-key-config
page_type: 集成与发布渠道
source: https://doc.fastgpt.cn/zh-CN/guide/build/publish/openapi
source_type: 官方文档
---

# 获取并配置FastGPT应用的API调用凭证与访问接口

通过API访问FastGPT应用时，需使用团队成员的APIKey作为调用凭证，该凭证不再按应用创建专属密钥。调用应用的`chat/completions`接口时，推荐在请求体中传入`appId`参数；若第三方应用仅支持配置OpenAI SDK风格的密钥，可使用`apiKey-appId`的兼容格式。完整的接口说明可查看OpenAPI介绍文档。

## 获取APIKey的具体步骤
依次选择应用菜单下的「发布渠道」-「API」页面，点击「新建」按钮即可创建新的APIKey。APIKey仅代表当前登录成员的开放接口调用权限，请勿随意共享。如需再次复制密钥，可在API列表中点击对应复制按钮。为防止密钥被滥用，安全起见可在创建时设置额度或过期时间限制。

## 三方应用变量配置与注意事项
使用API访问第三方集成应用时，需替换两个核心变量：其一为`OPENAI_API_BASE_URL`，需将默认值`http://localhost:3000/api`修改为自己部署的FastGPT域名；其二为`OPENAI_API_KEY`，使用上一步获取的APIKey即可。需要注意的是，推荐在请求体中传入`appId`参数以明确调用的应用；若第三方应用仅支持配置单一密钥参数，可使用`apiKey-appId`的兼容格式。此外，APIKey的权限由当前登录成员的团队权限决定，不同成员的凭证权限可能存在差异，需确保使用的凭证拥有对应应用的访问权限。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/guide/build/publish/openapi)
