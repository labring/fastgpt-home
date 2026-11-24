---
title: FastGPT工作流节点中HTTP请求模块的使用方法速查
slug: /zh/reference/fastgpt-workflow-http-node
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/build/workflow/nodes/http
source_type: 官方文档小节
---

# FastGPT工作流节点中HTTP请求模块的使用方法速查

## 结论
HTTP请求节点是FastGPT工作流的内置通用工具节点，用于发起外部HTTP接口调用。该节点可帮助工作流对接外部系统，实现数据的获取与提交操作。

## 具体怎么做
1. 导航至FastGPT的应用构建 > 工作流 > 节点页面
2. 从节点列表中选择HTTP请求节点，添加至目标工作流的画布中
3. 根据目标外部接口的要求，配置节点的HTTP请求相关参数，完成对接

## 注意事项
该节点仅支持HTTP协议的接口调用，需确保目标外部接口处于可正常访问的状态。配置节点时需遵循工作流的权限配置规则，避免出现调用失败的情况。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/workflow/nodes/http)
