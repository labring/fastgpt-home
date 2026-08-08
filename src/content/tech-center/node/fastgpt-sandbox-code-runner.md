---
title: FastGPT代码运行节点的功能、参数配置与使用说明
slug: /zh/node/fastgpt-sandbox-code-runner
page_type: 工作流节点
source: https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/sandbox-v2
source_type: 官方文档
---

# FastGPT代码运行节点的功能、参数配置与使用说明

## 功能与基础说明
代码运行节点适用于FastGPT 4.14.8及以上版本，支持在安全沙盒中执行JavaScript（基于Bun运行时）和Python 3代码，可用于数据处理、格式转换、逻辑计算等场景。私有化部署用户需部署`fastgpt-sandbox`镜像，并配置`CODE_SANDBOX_URL`环境变量。沙盒默认最大运行时长为60秒，支持通过配置调整超时时间；代码运行在隔离进程池中，无法访问本地文件系统和内网资源。

## 变量与输出规则
使用前需在自定义输入中添加代码运行所需的变量。JavaScript代码通过main函数参数解构获取变量，示例为`async function main ({ data1 , data2 }){ return { result: data1 + data2 } }`；Python代码则按变量名接收参数，需保证节点输入的变量名与main函数参数完全一致，示例为`def main (data1, data2): return { result : data1 + data2}`。代码执行完成后必须返回Object对象（JavaScript）或Dict字典（Python），可在自定义输出中添加对应key的变量名获取返回值，例如当返回`{ result: 'hello', count: 42 }`时，添加`result`和`count`两个变量即可获取对应的值。

## 内置函数与使用示例
沙盒内置`SystemHelper.httpRequest`函数用于发起外部HTTP请求，自动拦截内网地址以防护SSRF攻击。该函数单次请求超时最大为60秒，响应体最大2MB，仅支持http/https协议，每次执行最多可发起30个请求。JavaScript和Python均有对应的使用示例，同时支持使用白名单内的模块：JavaScript可通过`require()`使用`lodash`、`moment`、`dayjs`等npm模块，禁止使用`fs`、`child_process`等模块；Python可导入`math`、`numpy`、`pandas`等标准库和第三方库，禁止使用`os`、`sys`、`subprocess`等涉及系统调用、网络访问或文件操作的模块。以下为最小配置示例：JavaScript代码将逗号分隔的字符串转为数组，输入变量为`input`，代码为`function main ({ input }){ const items = input.split(',').map(s => s.trim()).filter(Boolean); return { items }; }`，在自定义输出中添加`items`即可获取转换后的数组。

> 来源：https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/sandbox-v2
