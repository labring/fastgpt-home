---
title: FastGPT工作流HTTP请求节点的配置与使用方法
slug: /zh/node/fastgpt-workflow-http-node
page_type: 工作流节点
source: https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/http
source_type: 官方文档
---

# FastGPT工作流HTTP请求节点的配置与使用方法

## 节点概述与核心参数
HTTP请求节点是FastGPT工作流的核心模块，可重复添加并手动配置，触发后向指定地址发送HTTP请求，操作遵循通用HTTP请求配置逻辑。该节点的核心配置项包括：URL（请求地址，支持通过{{}}引用变量）、Params（路径请求参数，多用于GET请求）、Body（请求体，多用于POST/PUT请求）、Headers（请求头，用于传递特殊信息）。所有配置项均可通过{{变量名}}引用变量，变量来源包含全局变量、系统变量及前方节点输出。系统变量可通过鼠标悬停在请求参数旁的问号查看，包含appId（应用ID）、chatId（当前对话ID，测试模式下不存在）、responseChatItemId（当前对话响应消息ID，测试模式下不存在）、variables（当前对话全局变量）、cTime（当前时间）、histories（历史记录，默认最多取10条且无法修改长度）。

## 可直接参照的配置步骤
1.  配置请求URL，可直接填入静态地址或通过{{变量名}}引用动态变量；
2.  按需配置Params、Headers、Body：Headers可直接写入键值对，例如`Authorization: Bearer {{token}}`；
3.  配置Body时，仅在POST/PUT等请求类型下生效，可编写自定义JSON格式内容，引用字符串变量时需包裹引号，例如`{"content": "{{textVar}}"}`，系统会自动将{{textVar}}替换为对应变量值；
4.  完成基础配置后，可通过节点预览验证变量替换效果。

## 返回值解析与格式化
该节点支持配置多个返回值提取规则，通过JSONPath语法解析接口响应内容，语法可参考https://github.com/JSONPath-Plus/JSONPath?tab=readme-ov-file。例如接口响应为`{"message": "测试", "data": {"user": {"name": "xxx"}}}`，可配置key为`message`提取`测试`，或配置key为`data.user.name`提取`xxx`。FastGPT v4.6.8及以上版本新增出参格式化功能，当输出类型选择字符串时，会将提取的JSON值转为字符串格式，方便后续文本加工、AI对话等节点直接使用。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/http)
