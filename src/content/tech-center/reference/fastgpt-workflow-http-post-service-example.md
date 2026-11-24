---
title: FastGPT工作流HTTP节点对接业务服务的POST请求实现
slug: /zh/reference/fastgpt-workflow-http-post-service-example
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/build/workflow/nodes/http
source_type: 官方文档小节
---

# FastGPT工作流HTTP节点对接业务服务的POST请求实现

## 结论
这是FastGPT工作流HTTP节点对接外部业务服务的POST请求处理代码示例。该示例通过判断动作参数，调用对应的数据操作函数，实现标准化的业务数据交互逻辑。

## 具体怎么做
### 入参说明
请求体需符合`RequestType`类型约束，包含以下参数：
1.  `appId`：string类型，业务应用标识
2.  `appointment`：string类型，需通过`JSON.parse`解析的业务数据
3.  `action`：枚举值，仅支持`'post'`/`'delete'`/`'put'`/`'get'`，指定数据操作动作

### 实现步骤
1.  定义`RequestType`类型规范请求体格式
2.  编写`handleAppointmentRequest`异步处理函数，接收请求体`body`
3.  解构`body`获取核心参数，解析`appointment`为JSON对象
4.  根据`action`分支调用对应的数据操作函数
5.  捕获执行异常，返回标准响应格式

## 注意事项
1.  `appointment`必须为合法JSON字符串，解析失败会触发异常并返回`{response: '异常'}`
2.  `action`参数必须为指定的四个枚举值，其他取值会返回预设异常响应
3.  代码依赖`getRecord`/`createRecord`/`putRecord`/`removeRecord`业务函数，需提前实现对应逻辑
4.  所有异常场景均返回固定格式的响应对象

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/workflow/nodes/http)
