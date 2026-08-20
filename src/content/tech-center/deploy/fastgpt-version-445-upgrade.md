---
title: FastGPT V4.4.5版本升级操作与功能说明
slug: /zh/deploy/fastgpt-version-445-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/445
source_type: 官方文档
---

# FastGPT V4.4.5版本升级操作与功能说明

### 版本功能说明
FastGPT V4.4.5版本包含多项功能更新与优化。其中新增下一步指引选项，支持通过模型生成3个预测问题；商业版新增两项能力：一是分享链接限制及hook身份校验，可对接现有用户系统，二是Api Key使用功能，支持配置别名、额度限制与过期时间，且自带appId无需额外连接；优化项为将全局变量与开场白合并为同一模块。此外该版本需执行初始化API完成variable模块的初始化，并将其合并到用户引导模块中。

### 升级操作步骤
完成版本镜像更新后，需执行指定的HTTP请求完成初始化配置。请求需携带`headers.rootkey`，该值来自部署时配置的环境变量`rootkey`。具体请求示例如下：
```bash
curl --location --request POST https://{{host}}/api/admin/initv445 \\
--header rootkey: {{rootkey}} \\
--header Content-Type: application/json
```
该请求执行后，会完成variable模块的初始化与合并操作，确保版本升级后的模块配置正常。

### 升级注意事项
该版本属于需要执行升级脚本类的更新，需严格按照上述步骤完成初始化操作，不可跳过。若未执行该初始化请求，可能出现模块配置异常、功能无法正常启用等问题。同时需确保部署环境的网络可以正常访问该API接口，避免请求失败。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/445)
