---
title: 解决FastGPT iPhone真机访问对话页功能按钮样式异常问题
slug: /zh/troubleshoot/fastgpt-iphone-style-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1858
source_type: GitHub issue
---

# 解决FastGPT iPhone真机访问对话页功能按钮样式异常问题

## 现象
使用iPhone 12 Pro真机的Safari、Chrome浏览器访问FastGPT v4.8.4 docker-compose私有部署版本的对话页面时，聊天窗口内的功能按钮样式显示异常。通过Chrome浏览器模拟手机窗口访问同一页面时，功能按钮样式显示正常。

## 可能原因
暂未明确具体触发异常的原因，需结合前端页面的样式适配逻辑、浏览器渲染规则、移动端适配配置按实际部署环境确认。

## 排查步骤
1. 确认当前使用的FastGPT版本为v4.8.4，部署方式为docker-compose私有部署。
2. 使用iPhone 12 Pro真机的Safari、Chrome浏览器分别访问FastGPT对话页面，观察聊天窗口功能按钮的样式显示情况。
3. 在PC端Chrome浏览器中开启模拟手机窗口，访问同一FastGPT对话页面，对比功能按钮的样式显示结果。
4. 检查前端页面的移动端样式代码，确认是否存在针对iOS浏览器的适配遗漏。

## 解决与验证
若排查后确认异常由iOS浏览器的样式适配问题导致，可针对性调整前端页面中聊天窗口功能按钮的CSS适配规则。验证方法为：使用iPhone 12 Pro真机的Safari或Chrome浏览器重新访问FastGPT对话页面，确认功能按钮样式恢复为与PC端浏览器访问一致的正常效果。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1858)
