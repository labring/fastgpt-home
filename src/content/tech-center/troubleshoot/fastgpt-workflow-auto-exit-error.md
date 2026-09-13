---
title: 解决FastGPT新建工作流进入页面后自动退出的报错问题
slug: /zh/troubleshoot/fastgpt-workflow-auto-exit-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3397
source_type: GitHub issue
---

# 解决FastGPT新建工作流进入页面后自动退出的报错问题

## 现象
仅修改docker-compose.yml中fastgpt和mysql的端口后，在Windows系统使用Chrome浏览器（已关闭浏览器翻译功能）完成FastGPT部署。新建工作流并点击进入对应页面后，隔一段时间自动退出，页面弹出未捕获异常提示。打开浏览器控制台后，可见重复的`TypeError: Cannot read properties of undefined (reading 'includes')`报错，同时伴随客户端异常提示。

## 可能原因
根据页面提示与报错信息，可能的原因分为两类：1. 私有部署场景下docker-compose.yml配置文件存在错误，该情况占私有部署用户异常的90%；2. 系统环境与FastGPT相关API存在兼容性问题。

## 排查步骤
1.  确认已关闭浏览器翻译功能，重新访问工作流页面，验证是否仍出现自动退出问题。
2.  打开浏览器开发者工具的Console面板，查看是否存在`TypeError: Cannot read properties of undefined (reading 'includes')`的报错信息。
3.  检查docker-compose.yml文件，确认fastgpt与mysql的端口配置无语法错误，且两个服务的端口映射、内部连接端口匹配。
4.  重启FastGPT与mysql的容器，重新启动服务后验证页面状态。
5.  若问题仍存在，需按实际环境确认系统API兼容性相关配置。

## 解决与验证
若为配置文件错误，修正docker-compose.yml中的端口配置，确保fastgpt连接mysql的端口与mysql容器暴露的端口一致，保存配置后重新启动容器。若为API兼容性问题，需按实际环境确认适配方案。验证方式：重新新建工作流并进入对应页面，确认不会自动退出，控制台无报错信息。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3397)
