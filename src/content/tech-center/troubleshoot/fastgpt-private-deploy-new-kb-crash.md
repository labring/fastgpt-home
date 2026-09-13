---
title: 解决FastGPT私有部署新建知识库页面崩溃问题
slug: /zh/troubleshoot/fastgpt-private-deploy-new-kb-crash
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/981
source_type: GitHub issue
---

# 解决FastGPT私有部署新建知识库页面崩溃问题

## 现象
私有部署FastGPT时，新建知识库页面会弹出提示："部分系统不兼容，导致页面崩溃。如果可以，请联系作者，反馈下具体操作和页面。 大部分是 苹果 的 safari 浏览器导致，可以尝试更换 chrome 浏览器。或者是因为开了中文翻译导致，请检查并关闭中文翻译。" 该问题出现在CentOS7 3.10.0-1160.108.1.el7.x86_64系统，使用Docker 25.0.4、Docker Compose v2.24.7部署的环境中。

## 可能原因
根据提示信息，可能的触发因素有两个：一是使用苹果Safari浏览器导致的兼容性问题；二是浏览器开启了中文翻译功能，引发页面异常。

## 排查步骤
1. 记录当前使用的浏览器类型与版本信息。
2. 检查浏览器是否开启了中文翻译相关功能，确认功能的启用状态。
3. 核对部署环境的系统版本、Docker及Docker Compose版本，确认与当前部署环境的配置一致。

## 解决与验证
如果使用的是Safari浏览器，更换为其他浏览器后重新尝试新建知识库操作。如果浏览器开启了中文翻译功能，关闭该功能后再次进入新建知识库页面。验证标准为：重新打开新建知识库页面，不再弹出指定的崩溃提示，且页面流程可正常执行。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/981)
