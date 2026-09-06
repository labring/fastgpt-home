---
title: 解决FastGPT谷歌搜索插件配置后400字段缺失报错问题
slug: /zh/troubleshoot/fastgpt-google-plugin-400-field-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3683
source_type: GitHub issue
---

# 解决FastGPT谷歌搜索插件配置后400字段缺失报错问题

## 现象
用户在FastGPT中创建谷歌搜索插件，填入cx ID与API key后，调用插件时返回400错误，报错信息为`400 Field required (request id: 202502011841467645382101434264)`，状态码为400。用户已将聊天记录数量设置为6。

## 可能原因
结合报错信息与用户配置情况，可能的原因包括：插件的必填配置项未完整填写，或填写的参数存在格式错误；传入插件的请求参数缺少必填字段；关联的插件依赖配置未正确设置。

## 排查步骤
1. 核对谷歌搜索插件的cx ID与API key的填写内容，确认无输入错误或多余空格。
2. 检查插件配置页面的所有必填字段，确认未遗漏任何需要填写的配置项。
3. 再次确认聊天记录设置的数量是否正确保存生效。
4. 查看插件调用的完整请求日志，核对实际发送的请求参数是否包含所有必填字段。

## 解决与验证
1. 修正配置项中的错误，重新填写正确的cx ID与API key，确保无多余字符。
2. 补全所有遗漏的必填配置项，保存插件配置。
3. 重新发起插件调用，验证报错是否消失。
4. 确认插件返回正常的搜索结果，完成验证。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3683)
