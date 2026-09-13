---
title: FastGPT高级编排全局变量API传递失败的排查与解决方法
slug: /zh/troubleshoot/fastgpt-global-variable-api-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/913
source_type: GitHub issue
---

# FastGPT高级编排全局变量API传递失败的排查与解决方法

## 现象
用户在FastGPT私有部署版本的高级编排中添加了全局变量，变量名为testv、变量key为input。用户尝试通过API传递该全局变量，分别使用了uid:testv和uid:input两种参数格式，均未成功。同时用户发现官方文档仅提及uid和name两个参数，无法明确这两个参数的具体传递方式。

## 可能原因
结合用户的操作与问题描述，可能的原因包括：未正确匹配全局变量的key与API参数的对应关系，混淆了官方文档中uid和name参数的使用场景，参数传递格式不符合文档要求。

## 排查步骤
1. 确认高级编排中已创建的全局变量的key值，本次案例中为input，明确需传递的参数需与变量key或变量名对应。
2. 查阅官方文档中关于uid和name参数的说明，明确两个参数的作用与使用规则。
3. 核对API请求中的参数格式，检查是否按照文档要求的格式传入参数。
4. 确认全局变量已正确保存并启用，无配置遗漏。

## 解决与验证
根据官方文档提及的uid和name参数，结合本次案例的全局变量配置，正确的传递方式应为匹配变量的对应标识。本次案例中变量名为testv、key为input，需按照文档要求的参数格式传入对应参数。验证时可通过发起API请求，确认是否成功获取全局变量的对应值，若请求成功则说明参数传递正确。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/913)
