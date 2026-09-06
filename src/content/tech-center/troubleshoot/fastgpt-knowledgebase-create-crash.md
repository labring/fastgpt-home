---
title: FastGPT新建知识库页面崩溃问题的排查与解决
slug: /zh/troubleshoot/fastgpt-knowledgebase-create-crash
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/902
source_type: GitHub issue
---

# FastGPT新建知识库页面崩溃问题的排查与解决

## 现象
点击知识库页面新建知识库时，出现部分系统不兼容导致的页面崩溃问题。该问题多数出现在苹果Safari浏览器，也可能因开启中文翻译功能引发。

## 可能原因
1. MongoDB服务启动失败
2. 浏览器兼容性问题（多见于Safari浏览器）
3. 浏览器中文翻译功能开启

## 排查步骤
1. 更换浏览器，尝试使用非Safari浏览器重新执行新建知识库操作，观察是否仍出现崩溃。
2. 检查浏览器是否开启中文翻译功能，关闭该功能后再次尝试新建知识库。
3. 查看系统运行日志，确认MongoDB服务的运行状态。

## 解决与验证
若为浏览器兼容性问题，更换浏览器后即可正常新建知识库。若为中文翻译功能导致，关闭该功能后可恢复正常操作。若为MongoDB启动失败，需排查并修复MongoDB服务启动问题，重启相关服务后，验证新建知识库功能是否恢复正常。

> 来源: [FastGPT GitHub issue #902](https://github.com/labring/FastGPT/issues/902)
