---
title: 解决FastGPT免登录窗口iframe界面始终显示英文的问题
slug: /zh/troubleshoot/fastgpt-iframe-english-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4144
source_type: GitHub issue
---

# 解决FastGPT免登录窗口iframe界面始终显示英文的问题

## 现象

使用FastGPT 4.9.0版本的免登录窗口发布渠道，通过iframe嵌入访问后，界面始终显示为英文。

## 可能原因

浏览器默认语言为英文，且未使用无痕浏览模式时，同域名下的所有资源语言设置会被统一修改为英文。

## 排查步骤

1. 确认当前使用的FastGPT版本为4.9.0。
2. 检查访问免登录窗口时是否使用了无痕浏览模式。
3. 通过浏览器设置页面查看当前默认语言配置。

## 解决与验证

使用无痕浏览模式访问免登录窗口，即可恢复预期的界面语言。若需在非无痕模式下使用，需调整浏览器默认语言设置。验证方式为：使用调整后的环境访问免登录窗口，确认界面语言符合预期。

> 来源: [FastGPT GitHub issue #4144](https://github.com/labring/FastGPT/issues/4144)
