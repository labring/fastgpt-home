---
title: 解决FastGPT中Api响应出现Image not found报错
slug: /zh/troubleshoot/fastgpt-api-image-found-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3673
source_type: GitHub issue
---

# 解决FastGPT中Api响应出现Image not found报错

## 现象
FastGPT 4.8.19版本中，调用`/api/v1/chat/completions`接口时，出现报错日志：`[Warn] 2025-01-27 16:53:41 Request finish /api/v1/chat/completions, time: 5399ms`，随后抛出错误：`[Error] 2025-01-27 16:53:52 Api response error: undefined, Image not found`，附带错误信息`{ message: 'Image not found', stack: undefined }`。该报错出现在查知识库的问答场景，未使用图片相关功能。

## 可能原因
AI应用创建副本时，原AI头像图标未成功复制，导致系统尝试加载不存在的图片资源，触发报错。

## 排查步骤
1.  确认当前FastGPT版本为4.8.19。
2.  查看接口调用日志，确认报错信息包含`Image not found`。
3.  检查对应AI应用的头像图标配置，尤其是应用副本的图标状态。
4.  确认当前业务场景未涉及图片生成或图片展示相关功能。

## 解决与验证
重新配置AI应用的头像图标即可解决该报错。验证方式为：重新设置应用头像后，再次调用`/api/v1/chat/completions`接口，确认无`Image not found`报错，接口请求正常完成。

> 来源: [FastGPT GitHub issue #3673](https://github.com/labring/FastGPT/issues/3673)
