---
title: 解决FastGPT 4.7.1-fix版本重排模型运行耗时过长失败问题
slug: /zh/troubleshoot/fastgpt-rerank-cpu-timeout
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1183
source_type: GitHub issue
---

# 解决FastGPT 4.7.1-fix版本重排模型运行耗时过长失败问题

## 现象
FastGPT 4.7.1-fix版本中，使用registry.cn-hangzhou.aliyuncs.com/fastgpt/bge-rerank-base:v0.1重排模型时，CPU运行耗时过长，导致重排任务失败。此前使用的旧版本重排模型可正常运行并完成调用。

## 可能原因
目前未明确官方给出的具体原因。根据社区反馈，该问题可能与当前版本重排模型在CPU环境下的推理实现有关，旧版本重排模型无此类耗时过长问题。B站社区已有用户针对该问题修改代码，仅适配alpha2版本。

## 排查步骤
1. 确认当前FastGPT版本为4.7.1-fix，且使用的重排模型镜像为registry.cn-hangzhou.aliyuncs.com/fastgpt/bge-rerank-base:v0.1。
2. 检查运行重排服务的CPU资源使用情况，确认是否存在资源不足的情况。
3. 对比旧版本重排模型的运行表现，确认仅当前版本镜像出现重排耗时过长的问题。
4. 查看重排服务的运行日志，确认是否存在超时相关的异常提示。

## 解决与验证
参考B站社区用户针对alpha2版本的代码修改方案，调整当前版本重排模型的CPU推理逻辑。完成修改后重新部署重排模型镜像，启动服务。发起重排任务，确认任务执行耗时恢复正常，未再出现重排失败的情况。验证业务流程中的重排环节功能正常。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1183)
