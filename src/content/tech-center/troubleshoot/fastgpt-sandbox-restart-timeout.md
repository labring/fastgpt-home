---
title: FastGPT sandbox容器重启与工作流超时问题的排查与解决
slug: /zh/troubleshoot/fastgpt-sandbox-restart-timeout
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6646
source_type: GitHub issue
---

# FastGPT sandbox容器重启与工作流超时问题的排查与解决

## 现象
使用FastGPT私有部署4.14.9.4版本，通过新架构sandbox运行工作流时出现以下问题：
1. sandbox容器频繁重启，尤其在“批量执行”组件中搭配“AI对话”+“代码执行”时；
2. 页面运行该类工作流时显示stream timeout报错；
3. 页面调试该类工作流时出现504error。
该问题在回退至4.14.7版本后不会发生。

## 可能原因
根据问题现象与版本变化，推测可能与4.14.9.4版本新增的sandbox引擎JS代码运行层面的限制有关，或该版本sandbox引擎的资源、超时逻辑存在异常，导致特定工作流组合触发容器重启与超时错误。

## 排查步骤
1. 确认当前FastGPT私有部署版本为4.14.9.4，且回退至4.14.7版本后问题消失；
2. 检查触发问题的工作流配置，确认异常场景为“批量执行”组件搭配“AI对话”+“代码执行”；
3. 查看sandbox容器的运行日志，获取容器重启的具体报错信息（需按实际环境确认）；
4. 核对当前SANDBOX_MAX_MEMORY_MB、SANDBOX_MAX_TIMEOUT、WORKFLOW_MAX_LOOP_TIMES等配置参数的设置值。

## 解决与验证
### 临时解决方式
回退FastGPT私有部署版本至4.14.7，重新运行目标工作流，验证是否不再出现容器重启、stream timeout及504error问题。
### 版本适配解决
针对4.14.9.4版本，可先确认已调整SANDBOX_MAX_MEMORY_MB至2048及以上、SANDBOX_MAX_TIMEOUT至600000及以上，同时检查WORKFLOW_MAX_LOOP_TIMES的配置是否合理。若问题仍存在，需进一步排查sandbox引擎的运行日志以定位具体异常（需按实际环境确认）。

> 来源：[FastGPT GitHub Issue #6646](https://github.com/labring/FastGPT/issues/6646)
