---
title: 通过API调用FastGPT应用的凭证获取与配置方法
slug: /zh/integration/fastgpt-app-api-access-config
page_type: 集成与发布渠道
source: https://doc.fastgpt.cn/zh-CN/guide/build/publish/openapi
source_type: 官方文档
---

# 通过API调用FastGPT应用的凭证获取与配置方法

在FastGPT中，通过API访问应用的凭证与配置需遵循官方规范。API入口位于应用的「发布渠道」板块，当前登录成员可在此获取专属的APIKey，该密钥为团队成员的开放接口调用凭证，不再为单个应用创建专属密钥。调用应用的`chat/completions`接口时，推荐在请求体中传入`appId`参数；若第三方应用仅支持配置OpenAI SDK风格的密钥，也可使用`apiKey-appId`的兼容格式，完整规范可查看OpenAPI介绍文档。

## 获取APIKey的具体步骤
1.  进入目标应用页面，依次点击「发布渠道」>「API」标签页；
2.  点击页面中的「新建」按钮，创建新的APIKey；
3.  密钥创建后可点击复制按钮保存，如需再次查看或复制可回到API列表操作。
安全提示：为避免密钥被滥用，可在创建时设置调用额度或过期时间。

## 三方应用变量替换与配置
需要替换的变量包含两项：
1.  `OPENAI_API_BASE_URL`：默认值为`http://localhost:3000/api`，需替换为自己部署的FastGPT服务域名；
2.  `OPENAI_API_KEY`：填写上一步获取到的APIKey，推荐在请求体中传入`appId`；若第三方应用仅支持配置单一密钥，可使用`apiKey-appId`的兼容格式完成配置。
部分第三方应用可直接沿用上述变量完成对接，具体调用逻辑需参考对应应用的官方文档。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/guide/build/publish/openapi)
