---
title: 解决FastGPT公有云版HTTP请求工具调用API报错ECONNREFUSED问题
slug: /zh/troubleshoot/fastgpt-http-api-econnrefused-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3783
source_type: GitHub issue
---

# 解决FastGPT公有云版HTTP请求工具调用API报错ECONNREFUSED问题

## 现象
使用FastGPT公有云版的工作流【HTTP请求】工具时，尝试通过导入官方文档的curl代码调用知识库API，调试后返回报错：`{"error": {"message": "", "name": "AggregateError", "method": "post", "code": "ECONNREFUSED"}}`。用户已确认API密钥和parentId参数无异常，替换参数后仍无法正常获取知识库根目录列表。

## 可能原因
结合报错信息与使用场景，核心可能原因是请求地址配置错误。原curl代码使用本地地址`http://localhost:3000`，但公有云环境无法通过本地地址访问API。其他可能原因包括：工具内请求配置未匹配公有云API域名、网络访问限制导致无法连接目标地址。

## 排查步骤
1. 检查请求地址：将导入的curl代码中的`http://localhost:3000`替换为FastGPT公有云环境对应的API域名，需按实际使用的公有云环境确认具体地址。
2. 核对请求参数：确认请求方法为GET，请求路径为`/api/core/dataset/detail?id=知识库ID`，并将`id`参数替换为实际的目标知识库ID。
3. 验证Authorization头：确认请求头中`Authorization`的值格式为`Bearer [你的API密钥]`，密钥已从账号的API秘钥管理页面获取，无拼写或格式错误。
4. 调整parentId参数：若需获取根目录列表，将【请求参数】中的`parentId`设置为`null`。
5. 检查工具配置：确认【HTTP请求】工具未添加额外的限制访问的配置项，如代理、自定义请求限制等。

## 解决与验证
将请求地址替换为公有云环境对应的API域名后，重新配置【HTTP请求】工具的所有参数。再次点击调试按钮，若返回包含`code:200`的知识库列表数据，且格式与官方文档示例一致，则表示问题解决。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3783)
