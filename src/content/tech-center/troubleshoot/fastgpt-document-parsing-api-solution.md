---
title: FastGPT文档解析功能的API调用与自定义实现方案
slug: /zh/troubleshoot/fastgpt-document-parsing-api-solution
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1272
source_type: GitHub issue
---

# FastGPT文档解析功能的API调用与自定义实现方案

## 现象
用户需要在FastGPT中实现聊天时上传文档，将文档作为上下文进行问答，因此需要文档解析功能支持传入文档并直接返回解析后的数据，或获取可行的实现方案。

## 可能原因
官方镜像未提供直接可用的文档解析API，需通过源码改动后打包实现。现有第三方解析库存在性能或功能局限，部分库解析速度较慢，部分快速模式无法解析图片与表格内容，实时解析需较高部署设备性能。

## 排查步骤
1.  确认官方镜像是否包含可直接调用的文档解析API，若未提供，则需考虑自定义集成解析方案。
2.  评估解析需求，包括需支持的文档类型、解析速度、输出格式等参数。
3.  对比可选的第三方解析库，测试其适配性与性能表现。

## 解决与验证
若需直接调用API，需修改FastGPT源码后打包部署。可引入unstructured库进行PDF解析，该库可增强解析效果，但解析速度较慢，fast模式无法解析图片与表格内容，适合异步离线任务，实时解析需较高设备性能。若需更快的解析速度，可尝试符合100页PDF解析耗时≤5s、支持表格与图片解析并输出MD格式的解析库，具体库名称与集成方式需按实际环境确认。

> 来源: [FastGPT GitHub issue #1272](https://github.com/labring/FastGPT/issues/1272)
