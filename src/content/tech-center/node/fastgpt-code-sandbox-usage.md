---
title: FastGPT代码运行节点的功能、配置与使用说明
slug: /zh/node/fastgpt-code-sandbox-usage
page_type: 工作流节点
source: https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/sandbox-v2
source_type: 官方文档
---

# FastGPT代码运行节点的功能、配置与使用说明

## 功能与基础说明
代码运行节点适用于FastGPT 4.14.8及以上版本，支持在安全沙盒中执行JavaScript（基于Bun运行时）和Python 3代码，可用于数据处理、格式转换、逻辑计算等场景。使用该节点需注意：私有化部署用户需提前部署fastgpt-sandbox镜像，并配置CODE_SANDBOX_URL环境变量；沙盒默认最大运行时长为60秒；代码运行在隔离进程池中，无法访问本地文件系统和内网资源。

## 变量与输出配置步骤
首先在节点的自定义输入中添加代码运行所需的变量。JavaScript代码需在main函数参数中解构变量，示例格式为`async function main ({ data1 , data2 }){ return { result: data1 + data2 } }`；Python代码需在main函数参数中按变量名接收参数，且节点输入的变量名必须与main函数中的变量名一致，顺序不限，示例格式为`def main (data1, data2): return { result : data1 + data2}`。代码运行结果必须返回object对象（JavaScript）或dict字典（Python），在自定义输出中添加对应key的变量名，即可获取该key下的取值，例如返回`{ result : hello , count : 42 }`时，添加result和count变量即可获取对应值。

## 安全限制与可用资源
沙盒提供多层安全防护：模块拦截方面，JavaScript和Python仅允许使用官方白名单模块；网络隔离方面，自动拦截内网IP请求（支持拦截127.0.0.0/8、10.0.0.0/8、172.16.0.0/12、192.168.0.0/16等网段）；文件隔离方面，无法读写容器文件系统；超时保护默认60秒，防止死循环；进程隔离方面，每次代码执行都在独立的沙盒进程中运行。内置可使用httpRequest发起外部HTTP请求，支持自定义请求方法、请求头、请求体与超时设置，单次请求超时最大60秒，响应体最大2MB，仅允许http/https协议，每次执行最多允许30个请求。JavaScript可使用lodash、moment、dayjs等白名单npm模块，禁止使用fs、child_process、net等模块；Python可导入math、json、numpy等白名单标准库与第三方库，禁止使用os、sys、subprocess、socket、urllib、http、requests等涉及系统调用、网络访问、文件系统的模块。

> 来源：https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/sandbox-v2
