---
title: 解决FastGPT系统插件、通知及模板页未支持英文国际化问题
slug: /zh/troubleshoot/fastgpt-english-localization-support
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3616
source_type: GitHub issue
---

# 解决FastGPT系统插件、通知及模板页未支持英文国际化问题

## 现象
使用FastGPT时，系统插件界面、告警与错误通知文本，以及模板页无法切换为英文显示，相关内容未完成英文翻译适配，无法满足英文使用需求。

## 可能原因
当前FastGPT的系统插件正在重构阶段，尚未完成i18n国际化支持，同时告警、错误通知及模板页的文本也未进行英文翻译适配，导致无法正常切换显示语言。

## 排查步骤
1.  登录FastGPT平台，查看系统插件界面、各类告警与错误通知的显示文本，以及模板页的界面文字，确认是否仅支持中文显示。
2.  查阅FastGPT官方更新日志或社区公告，确认系统插件是否处于重构阶段。
3.  检查平台内是否存在可配置的国际化相关设置项，相关配置需按实际环境确认。

## 解决与验证
系统插件重构完成后将支持i18n国际化功能。需将系统插件、告警与错误通知、模板页的文本统一翻译为英文。验证方式为：等待系统插件重构完成后，在平台内启用i18n功能，切换显示语言为英文，确认系统插件界面、告警通知及模板页的文本已正确显示为英文。

> 来源: [FastGPT GitHub issue #3616](https://github.com/labring/FastGPT/issues/3616)
