---
title: FastGPT调用视觉模型发送图片返回503的排错方案
slug: /zh/troubleshoot/fastgpt-visual-image-503-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1658
source_type: GitHub issue
---

# FastGPT调用视觉模型发送图片返回503的排错方案

## 现象
使用视觉模型时，发送文字请求可正常执行，发送图片请求返回503错误。端口未被屏蔽，同业务场景下其他工具可正常处理图片请求。

## 可能原因
存在两种可能的触发原因。其一，内部自身请求不被允许，导致图片转base64失败。其二，旧版本使用localhost docker部署时无法正常使用视觉模型的图片功能，需使用IP或域名模式。

## 排查步骤
1. 确认FastGPT版本与部署模式，若为旧版本且使用localhost docker部署，需调整为IP或域名模式。
2. 确认视觉模型的调用配置与实际使用的模型匹配。
3. 排查是否存在内部请求拦截导致图片转码失败的情况。

## 解决与验证
可通过两种方案解决问题。方案一：升级FastGPT到最新版本，旧版本使用localhost docker部署的场景，需改用IP或域名模式。方案二：若升级或调整部署模式后仍存在问题，可修改packages/service/core/chat/utils.ts文件，移除其中的图片转base64代码。验证方式为重新发送图片请求，确认503错误消失，图片处理功能正常执行。

> 来源: [FastGPT GitHub issue #1658](https://github.com/labring/FastGPT/issues/1658)
