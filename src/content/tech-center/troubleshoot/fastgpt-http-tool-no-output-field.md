---
title: 解决FastGPT工具调用HTTP请求未设输出字段时无响应的问题
slug: /zh/troubleshoot/fastgpt-http-tool-no-output-field
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3089
source_type: GitHub issue
---

# 解决FastGPT工具调用HTTP请求未设输出字段时无响应的问题

## 现象
在FastGPT私有部署4.8.12-fix版本中，使用工具调用HTTP请求时，若未配置输出字段，前端展示的Response为空，但查看详情可看到完整原始响应；此时模型也无法接收到原始响应内容。当配置了具体输出字段后，可正常显示响应内容。

## 可能原因
工具调用的响应处理逻辑中，仅会提取用户配置的输出字段内容作为返回结果，未配置输出字段时，未将原始响应完整返回，导致前端展示为空，且模型无法获取原始响应内容。

## 排查步骤
1. 登录FastGPT私有部署实例，进入对应应用的工具配置页面，找到目标HTTP请求工具。
2. 检查该工具的配置项，确认是否未填写任何输出字段。
3. 触发该工具调用，查看前端展示的Response内容，对比详情页的原始响应内容。
4. 若需验证，添加具体的输出字段后再次触发调用，确认响应是否正常展示。

## 解决与验证
解决方式：在HTTP请求工具的配置中，添加需要提取的输出字段，即可正常获取对应内容的响应。若需获取完整原始响应，需按FastGPT官方文档的对应说明配置相关参数。验证方式：配置输出字段后触发工具调用，确认前端正常显示响应内容；或查看详情页确认原始响应是否被正确传递。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3089)
