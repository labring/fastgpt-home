---
title: 解决FastGPT场景下Oceanbase量化等级无法自定义配置的问题
slug: /zh/troubleshoot/fastgpt-oceanbase-quantization-config
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6202
source_type: GitHub issue
---

# 解决FastGPT场景下Oceanbase量化等级无法自定义配置的问题

## 现象
在FastGPT中使用Oceanbase向量存储功能时，量化等级被固定为全精度，无法调整为官方支持的8bit或1bit等级。

## 可能原因
当前FastGPT集成Oceanbase的配置中，量化等级参数被固定为全精度，未提供通过环境变量自定义配置的入口，未实现动态调整量化等级的逻辑。

## 排查步骤
1. 检查FastGPT中Oceanbase连接相关的环境变量配置，确认是否存在量化等级相关的配置参数；
2. 查阅Oceanbase官方文档，确认其HNSW索引支持的量化等级类型；
3. 对比官方推荐的半精度配置逻辑，确认FastGPT是否遗漏了对应的动态配置入口。

## 解决与验证
解决方法是参考官方半精度配置的实现逻辑，添加对应的环境变量以指定量化等级，具体的环境变量名称和参数值需按实际环境确认。验证方法为重启FastGPT服务后，查看Oceanbase向量存储的配置信息，确认量化等级已更改为指定值，且向量存储相关功能可正常运行。

> 来源：https://github.com/labring/FastGPT/issues/6202
