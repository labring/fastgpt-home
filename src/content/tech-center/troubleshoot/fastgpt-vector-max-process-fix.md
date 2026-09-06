---
title: 解决FastGPT中vectorMaxProcess配置参数不生效的排查与修复
slug: /zh/troubleshoot/fastgpt-vector-max-process-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1001
source_type: GitHub issue
---

# 解决FastGPT中vectorMaxProcess配置参数不生效的排查与修复

## 现象
用户修改配置文件中的`"vectorMaxProcess": 15`为`"vectorMaxProcess": 16`后，部署运行时出现配置不生效的问题。运行日志中同时出现两种队列上限的日志：部分日志显示队列上限为16，例如`=== queue: 2910: 2/16`；另一部分日志显示队列上限仍为10，例如`=== queue: 3021: 1/10`，且队列最多堆积到10个任务后不再增长，未达到配置的16上限。

## 可能原因
从运行日志的不同进程PID来看，存在多个FastGPT运行进程，部分进程未正确加载更新后的`vectorMaxProcess`配置，导致不同进程使用了不同的队列上限参数。

## 排查步骤
1.  修改项目配置文件中的`vectorMaxProcess`参数值，例如设置为`16`。
2.  在`projects/app/src/service/events/generateVector.ts`的`generateVector()`函数中，`// get training data`注释前添加以下日志代码：
```ts
import * as process from 'process';
const pid = process.pid;
console.log(`=== queue: ${pid}: ${global.vectorQueueLen}/${max}`)
```
3.  使用`pnpm dev`启动项目，查看控制台输出的运行日志。
4.  对比日志中显示的队列上限（日志中的分母数值）与配置的`vectorMaxProcess`值是否一致。

## 解决与验证
解决方法为重启所有运行中的FastGPT服务进程，确保每个进程都读取并加载了更新后的配置文件。验证方式为查看运行日志，确认所有队列日志中的分母均与配置的`vectorMaxProcess`值一致，且队列可堆积到配置的上限数量。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1001)
