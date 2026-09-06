---
title: 为FastGPT配置并添加ASR语音识别功能的操作指引
slug: /zh/troubleshoot/fastgpt-asr-function-integration
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/492
source_type: GitHub issue
---

# 为FastGPT配置并添加ASR语音识别功能的操作指引

## 现象
FastGPT当前版本未内置ASR语音识别功能，无法直接处理语音输入或实现语音转文字的需求。用户完成例行检查后，确认当前无类似内置功能，已升级至最新版本并完整查阅官方README文档，验证现有版本无法满足ASR相关的使用场景。

## 可能原因
FastGPT官方当前版本未集成ASR语音识别模块，未提供内置的语音转文字功能，因此无法直接实现相关需求。该情况未在官方公开的功能列表中提及，需通过外部集成方式实现相关能力。

## 排查步骤
1. 确认已将FastGPT升级至最新正式版本，排除因版本过低导致的功能缺失问题。
2. 完整查阅项目官方README文档，核对现有功能列表，确认未包含ASR语音识别相关的内置功能。
3. 需按实际环境确认是否存在官方推荐的ASR服务集成方式或相关插件，或查阅社区公开的集成方案。

## 解决与验证
目前官方未提供内置ASR功能的直接配置或启用方法。如需使用ASR能力，需按实际需求自行集成第三方ASR服务接口。完成集成后，可通过测试语音输入转文字的流程，验证功能是否正常运行。若需官方原生支持，可关注项目后续的功能更新公告或提交功能需求申请。

> 来源: [FastGPT GitHub issue #492](https://github.com/labring/FastGPT/issues/492)
