---
title: 配置FastGPT工作流HTTP请求节点的参数与使用方法
slug: /zh/node/fastgpt-workflow-http-node-pitfalls
page_type: 工作流节点
source: https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/http
source_type: 官方文档
---

# 配置FastGPT工作流HTTP请求节点的参数与使用方法

FastGPT工作流中的HTTP请求节点是核心功能模块，可向指定地址发送HTTP请求，操作方式与专业API调试工具类似。该节点支持配置路径请求参数Params、请求体Body、请求头Headers，所有配置项均可通过{{}}语法引用全局变量、系统变量或前方节点输出的变量，URL地址同样支持变量引用。可用的系统变量可通过鼠标悬停在请求参数旁的问号查看，包括应用ID appId、当前对话ID chatId、当前对话响应消息ID responseChatItemId、全局变量variables、当前时间cTime、历史对话记录histories等，测试模式下chatId与responseChatItemId不存在。

### 配置步骤
1.  将HTTP请求节点添加至工作流，填写目标URL，可通过{{变量名}}的格式引用所需变量。
2.  配置请求参数：GET请求填写Params，POST或PUT请求填写Body。Body需编写为自定义JSON格式，引用字符串变量时需遵循示例格式处理。
3.  设置请求头Headers，可用于传递认证等特殊信息。
4.  配置返回值解析：使用JSONPath语法提取接口响应内容，为每个提取项配置key，遵循JS对象取值规则。例如获取message内容可配置key为message，获取用户姓名可配置key为data.user.name。FastGPT v4.6.8及以上版本支持出参格式化，选择字符串输出类型时，会将提取的对应值转为JSON字符串。

使用该节点时需注意边界场景：测试模式下无法使用chatId与responseChatItemId变量；Body仅在POST、PUT等特定请求类型下生效；JSONPath语法需参考指定文档规则。若需对接外部业务服务，需确保接口格式与配置参数匹配，避免因参数不匹配导致请求失败。该节点适用于需要调用外部API扩展工作流功能的场景，无需外部接口调用时不宜使用。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/http)
