---
title: 解决FastGPT接收外网webhook触发工作流的配置问题
slug: /zh/troubleshoot/fastgpt-external-webhook-setup
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5051
source_type: GitHub issue
---

# 解决FastGPT接收外网webhook触发工作流的配置问题

## 现象
业务场景为将外部webhook接入FastGPT工作流以实现自动化代码审查，具体流程为接收gitlab的webhook请求，调用API获取代码差异内容，通过AI完成代码审查，最终通过HTTP API将审查结果写入gitlab，但无法正常实现该完整流程。

## 可能原因
暂无明确已知原因，需结合实际部署环境确认，可能涉及网络访问限制、配置项未正确设置等情况。

## 排查步骤
1. 确认FastGPT部署环境是否开放了接收webhook请求的端口权限。
2. 验证外网请求是否能够正常访问FastGPT的部署地址。
3. 检查webhook请求的目标地址是否与FastGPT配置的触发地址一致。

## 解决与验证
按照FastGPT官方配置要求完成webhook触发设置，确保部署地址可被外网访问，验证webhook请求发送后是否能触发对应工作流。

> 来源: [FastGPT GitHub issue #5051](https://github.com/labring/FastGPT/issues/5051)
