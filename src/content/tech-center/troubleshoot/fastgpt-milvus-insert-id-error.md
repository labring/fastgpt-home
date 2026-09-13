---
title: 解决FastGPT对接Milvus时的初始化与数据插入异常问题
slug: /zh/troubleshoot/fastgpt-milvus-insert-id-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2895
source_type: GitHub issue
---

# 解决FastGPT对接Milvus时的初始化与数据插入异常问题

## 现象
用户在FastGPT中对接向量数据库时，初始化流程调用listDatabases接口在zilliz cloud环境下触发报错，且插入向量数据的代码逻辑未完整实现，无法正确提取生成的自增ID。从提供的代码片段可见，插入数据时未传入ID字段（依赖autoID配置），提取insertId的代码被截断，无法完成正常的ID获取流程。

## 可能原因
1. 初始化代码未适配zilliz cloud环境下的listDatabases接口调用，触发报错；
2. 插入数据后，未匹配代码中配置的Int64类型自增ID的返回结构，无法正确提取insertId；
3. 代码片段中插入逻辑未编写完成，导致insertId的提取流程缺失。

## 排查步骤
1. 检查初始化代码中listDatabases的异常捕获逻辑，补充适配zilliz cloud的接口处理；
2. 根据代码中配置的autoID: true与Int64类型ID，确认插入接口返回的IDs字段的正确获取路径；
3. 补全插入数据的代码中insertId的提取逻辑，将返回的ID转换为字符串格式；
4. 运行代码并查看控制台日志，确认数据库初始化和数据插入流程无报错。

## 解决与验证
1. 调整初始化代码的异常处理逻辑，适配zilliz cloud的listDatabases返回结果，确保数据库创建和切换流程正常；
2. 按照代码配置的ID类型，正确提取insertId，例如通过result.IDs.int_id获取数值后转为字符串；
3. 补全插入数据的代码逻辑，完成insertId的提取与返回；
4. 执行测试流程，确认向量数据成功插入数据库，且能正确获取到insertId，验证流程无异常。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2895)
