---
title: 解决FastGPT配置完成后仍提示资源不存在的问题
slug: /zh/troubleshoot/fastgpt-fix-config-exist
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/451
source_type: GitHub issue
---

# 解决FastGPT配置完成后仍提示资源不存在的问题

## 现象
用户在完成FastGPT的对应配置操作后，系统仍然弹出提示信息，显示配置项或资源不存在，该提示会直接阻断对应功能的正常调用，影响业务使用流程。

## 可能原因
该问题可能与ubaserl配置异常存在关联，异常的ubaserl配置会导致系统无法正确识别已完成的配置内容，无法正常加载对应的配置项，进而触发资源不存在的提示，具体的异常细节需按实际部署环境确认。

## 排查步骤
1. 查看ubaserl的配置详情，确认当前配置的具体内容
2. 检查FastGPT所依赖的容器运行状态，确认是否已加载最新的配置内容

## 解决与验证
修改ubaserl的配置内容，完成后重启对应的FastGPT容器。容器重启完成后，再次执行验证操作，确认配置项或资源是否仍提示不存在，若提示信息消失则说明问题已成功解决，可正常使用对应功能。

> 来源: [FastGPT GitHub issue #451](https://github.com/labring/FastGPT/issues/451)
