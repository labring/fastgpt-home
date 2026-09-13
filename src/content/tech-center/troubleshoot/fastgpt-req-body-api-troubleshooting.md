---
title: FastGPT API输入参数从req.body获取的排错方法
slug: /zh/troubleshoot/fastgpt-req-body-api-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/530
source_type: GitHub issue
---

# FastGPT API输入参数从req.body获取的排错方法

## 现象
使用FastGPT的API输入功能时，无法在官方文档中找到对应配置信息，仅在项目源码中发现从req.body处获取参数的逻辑。该问题可出现于公有云或私有部署版本的FastGPT中，使用者使用了可正常工作的密钥。

## 可能原因
结合问题现象，可能的原因包括：FastGPT官方文档未覆盖该API输入参数的获取方式说明；当前API调用的参数传递方式未匹配源码中基于req.body的参数获取逻辑。

## 排查步骤
1. 查阅FastGPT官方文档，确认是否存在与API输入参数获取相关的说明内容，覆盖目标功能的配置方式。
2. 查看FastGPT项目源码，定位API输入参数的处理逻辑，确认是否采用req.body方式获取请求参数。
3. 核对当前API调用的参数传递方式，确认是否与源码中定义的参数获取逻辑保持一致。

## 解决与验证
若官方文档中未找到对应配置说明，需结合源码中的req.body参数获取逻辑调整API调用方式，确保参数传递符合源码的处理规则。补充完善相关文档内容可帮助后续使用者快速定位配置方式，减少排查成本。验证时，可通过实际调用目标API，确认参数可被正确获取并执行对应业务逻辑，验证配置是否生效。

> 来源: [FastGPT GitHub issue #530](https://github.com/labring/FastGPT/issues/530)
