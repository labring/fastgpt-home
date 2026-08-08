---
title: 处理FastGPT的Loaditout安全评级与徽章添加操作指南
slug: /zh/troubleshoot/fastgpt-loaditout-badge
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6724
source_type: GitHub issue
---

# 处理FastGPT的Loaditout安全评级与徽章添加操作指南

## 现象
FastGPT项目收到Loaditout平台发送的安全评级通知，显示项目通过全部7项安全标准，获得A级评级，同时附带可添加到README文件的安全徽章代码与评级详情页面链接。本次评级仅20.5%的扫描项目获得A级，属于较高安全等级的评级结果。

## 可能原因
项目满足Loaditout平台的7项安全评级要求，因此通过自动化安全检测并获得A级评级，符合添加官方安全徽章的条件。7项具体要求为：1. 零提示注入标记；2. 无敏感能力标记（无shell、exec、sudo、filesystem、process.env相关配置）；3. 存在README文件；4. 存在项目描述；5. 近12个月内有代码提交；6. 至少拥有5个GitHub星标；7. 无需机密环境变量。

## 排查步骤
1. 核对通知中的7项评级标准，逐一确认项目是否符合对应要求，若存在不符合项需先完成修复；
2. 复制通知中提供的徽章Markdown代码：`[![Loaditout Security Grade](https://loaditout.ai/badge/labring/FastGPT)](https://loaditout.ai/skills/labring/FastGPT)`；
3. 将复制的代码插入到项目的README.md文件的合适位置，需按实际README排版需求调整插入位置；
4. 本地预览README文件或提交代码至仓库后，查看徽章的显示效果是否正常。

## 解决与验证
解决方法为将官方提供的徽章Markdown代码添加到项目的README.md文件中。验证方式分为两步：一是查看README页面是否正常显示安全徽章，无加载失败或格式错误；二是点击徽章链接，确认可跳转至Loaditout平台的FastGPT评级详情页，且页面显示的评级信息与通知内容一致。

> 来源：https://github.com/labring/FastGPT/issues/6724
