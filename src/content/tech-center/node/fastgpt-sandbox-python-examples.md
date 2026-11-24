---
title: FastGPT沙盒v2节点的Python代码使用配置与示例
slug: /zh/node/fastgpt-sandbox-python-examples
page_type: 工作流节点
source: https://doc.fastgpt.cn/guide/build/workflow/nodes/sandbox-v2
source_type: 官方文档小节
---

# FastGPT沙盒v2节点的Python代码使用配置与示例

## 支持的业务场景
FastGPT沙盒v2节点允许编写自定义Python代码处理业务数据，官方提供了五类常用场景的参考实现。包括数据统计类，可计算输入数字列表的均值、方差、标准差与最值；日期处理类，可解析YYYY-MM-DD格式的日期字符串，计算一周后的日期与原日期的星期信息；HTTP请求类，可调用外部接口获取数据；JSON数据处理类，可解析JSON字符串并提取指定字段；正则匹配类，可从文本中提取符合规则的邮箱地址。

## 配置与使用步骤
1. 在沙盒v2节点的代码编辑区域编写Python代码，必须定义名为`main`的入口函数，函数参数需与节点接收的输入变量一一对应。
2. 代码可使用Python标准库，如`math`、`datetime`、`re`、`json`等，也可调用内置的`SystemHelper.httpRequest`方法发起HTTP请求。该方法支持指定请求方式、请求头与超时时间，官方示例中使用`GET`请求，请求头格式为`Authorization: Bearer {api_key}`，超时时间设置为10秒。
3. 函数需返回字典格式的处理结果，若处理失败可返回包含`error`字段的字典，例如当输入空数字列表时，可返回`{"error": "no data"}`。

## 标准返回格式
不同业务场景的返回格式固定：数据统计场景返回包含`mean`、`max`、`min`、`std`的字典；日期处理场景返回包含`input`、`next_week`、`weekday`的字典；HTTP请求场景返回包含`status`、`data`的字典；JSON数据处理场景返回包含`names`、`count`的字典；正则匹配场景返回包含`emails`、`count`的字典。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/workflow/nodes/sandbox-v2)
