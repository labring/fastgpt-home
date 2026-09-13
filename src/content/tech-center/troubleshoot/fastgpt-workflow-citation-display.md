---
title: 解决FastGPT工作流调用外部应用时免登录聊天无引用显示问题
slug: /zh/troubleshoot/fastgpt-workflow-citation-display
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3643
source_type: GitHub issue
---

# 解决FastGPT工作流调用外部应用时免登录聊天无引用显示问题

## 现象
在FastGPT工作流应用中添加其他自定义应用，在免登录分享窗口设置返回引用和文档来源。当知识库搜索操作在该其他自定义应用中执行时，聊天交互不会返回对应的引用和文档来源，免登录聊天界面无法显示相关内容。

## 可能原因
需按实际环境确认。

## 排查步骤
1. 创建FastGPT工作流应用，并配置该应用返回引用和文档来源。
2. 在该工作流应用中调用其他自定义应用。
3. 在调用的自定义应用中执行知识库检索并发起聊天。
4. 查看免登录聊天界面，确认是否显示引用和文档来源。

## 解决与验证
当前该问题未获得有效解决。若仍需解决该问题，可重新打开对应issue并补充相关信息。

> 来源: [FastGPT GitHub issue #3643](https://github.com/labring/FastGPT/issues/3643)
