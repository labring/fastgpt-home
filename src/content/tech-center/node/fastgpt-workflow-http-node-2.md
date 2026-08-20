---
title: 配置FastGPT工作流HTTP请求节点的操作与注意事项
slug: /zh/node/fastgpt-workflow-http-node-2
page_type: 工作流节点
source: https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/http
source_type: 官方文档
---

# 配置FastGPT工作流HTTP请求节点的操作与注意事项

HTTP请求节点是FastGPT工作流中的核中核模块，可向指定地址发送HTTP请求，操作逻辑与同类HTTP调试工具一致。该节点支持配置路径请求参数Params、请求体Body、请求头Headers，且URL、Params、Headers、Body均支持通过`{{}}`引用变量，变量来源包括全局变量、系统变量、前方节点输出。系统变量可通过鼠标悬停在请求参数旁的问号查看，可用变量包括appId（应用ID）、chatId（当前对话ID，测试模式下不存在）、responseChatItemId（当前对话响应消息ID，测试模式下不存在）、variables（当前对话全局变量）、cTime（当前时间）、histories（历史记录，默认最多取10条，无法修改长度）。

### 节点配置与返回值提取步骤
1.  新增HTTP请求节点后，依次配置核心参数：
    - 配置URL、Params、Headers、Body，任意位置均可通过`{{变量名}}`引用系统变量或前方节点输出变量，例如URL可填写`{{appId}}/api/path`，Headers可配置`Authorization: Bearer {{token}}`。
    - Body仅在POST、PUT等请求类型下生效，需编写自定义JSON格式内容，引用字符串类型变量时必须添加双引号，例如`"stringKey": "{{stringVar}}"`，否则会导致变量解析失败。
2.  配置返回值提取规则：使用JSONPath语法提取接口响应内容，支持配置多个提取键。例如提取顶层`message`字段填写`$.message`，提取嵌套字段`data.user.name`填写`$.data.user.name`，提取数组第二个元素填写`$.data.list[1]`。若选择输出类型为字符串，v4.6.8及以上版本会自动将提取的JSON值转为字符串格式，方便后续节点直接使用。

该节点适用于对接公开API或业务服务以扩展工作流功能，但存在使用边界：测试模式下无法使用chatId和responseChatItemId变量；Body中的变量引用格式错误会直接导致请求失败；JSONPath语法需严格遵循规范，否则无法正确提取返回值。若需要执行自定义代码逻辑，建议使用代码运行节点而非HTTP请求节点。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/http)
