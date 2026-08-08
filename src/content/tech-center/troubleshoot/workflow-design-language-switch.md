---
title: 解决FastGPT Workflow设计页面语言异常切换问题
slug: /zh/troubleshoot/workflow-design-language-switch
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6603
source_type: GitHub issue
---

# 解决FastGPT Workflow设计页面语言异常切换问题

## 现象
在FastGPT 4.14.8私有部署版本的Workflow设计页面，使用过程中页面语言会突然发生变化，尽管用户已在系统设置中将语言设置为中文，该问题从较早版本就一直存在。

## 可能原因
暂未明确官方归因，需结合实际部署环境确认。已知该问题在较早版本就已出现，推测可能与前端语言配置的持久化逻辑异常、页面缓存异常相关。

## 排查步骤
1.  检查浏览器的默认语言设置，确认是否与FastGPT的语言设置产生冲突。
2.  进入FastGPT系统设置页面，重新选择中文语言并保存配置。
3.  清除当前浏览器的缓存与Cookie，重新登录FastGPT后查看页面语言状态。
4.  若问题仍未解决，需按实际环境确认部署配置中的语言相关参数是否正常。

## 解决与验证
若为浏览器语言冲突导致，可调整浏览器语言设置或强制指定FastGPT页面使用中文；若为语言配置未持久化，重新保存语言设置后即可恢复正常。验证方式为：重新进入Workflow设计页面，确认页面语言保持为设置的中文，且长期使用后不再出现异常切换。

> 来源：https://github.com/labring/FastGPT/issues/6603
