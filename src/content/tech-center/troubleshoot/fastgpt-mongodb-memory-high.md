---
title: FastGPT中MongoDB内存持续升高的排查解决方法
slug: /zh/troubleshoot/fastgpt-mongodb-memory-high
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5353
source_type: GitHub issue
---

# FastGPT中MongoDB内存持续升高的排查解决方法

## 现象
FastGPT私有部署版本4.11.0，在无智能体提问、无知识库导入、无多客户端连接MongoDB的场景下，MongoDB占用运行内存持续升高至20GB，线程数约150。

## 可能原因
需按实际环境确认，常见关联方向包括MongoDB连接配置、后台任务执行状态等。

## 排查步骤
1. 确认FastGPT整体运行状态，检查是否存在未正常结束的后台任务或异常连接。
2. 查看MongoDB的运行日志，获取与内存占用、线程数相关的提示信息。
3. 统计当前MongoDB的连接数与线程数，与历史正常运行数据进行对比。
4. 检查FastGPT配置文件中与MongoDB相关的连接参数设置。

## 解决与验证
需按实际环境确认。若排查发现异常连接或未结束的后台任务，可终止对应进程。调整MongoDB相关配置需参考官方文档。验证方式为持续观察MongoDB内存占用与线程数是否恢复至正常范围。

> 来源: [FastGPT GitHub issue #5353](https://github.com/labring/FastGPT/issues/5353)
