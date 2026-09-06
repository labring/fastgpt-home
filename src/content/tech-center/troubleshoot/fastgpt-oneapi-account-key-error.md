---
title: 解决FastGPT配置ONEAPI后账户页填写密钥报错的相关问题
slug: /zh/troubleshoot/fastgpt-oneapi-account-key-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/113
source_type: GitHub issue
---

# 解决FastGPT配置ONEAPI后账户页填写密钥报错的相关问题

## 现象
配置ONEAPI_URL与ONEAPI_KEY后系统运行正常，但账户信息页面无法填写ONEAPI_URL，页面返回报错：`Incorrect API key provided: sk- ***************************************D75e. You can find your API key at https://platform.openai.com/account/api-keys.`

## 可能原因
系统级ONEAPI配置与账户页的用户密钥配置逻辑独立，账户页的用户密钥不经过系统配置的ONEAPI转发。

## 排查步骤
1. 检查账户信息页面填写的内容，确认是否误将系统级ONEAPI相关参数填入用户密钥区域。
2. 核对页面返回的报错文本，确认密钥格式是否符合平台规范。
3. 确认系统级ONEAPI的配置是否正常生效，不影响用户密钥的单独使用。

## 解决与验证
账户信息页面的密钥需使用用户个人的对应密钥，无需使用系统配置的ONEAPI密钥。重新填写正确的用户个人密钥后，确认不再出现指定报错，且功能正常运行。

> 来源: [FastGPT GitHub issue #113](https://github.com/labring/FastGPT/issues/113)
