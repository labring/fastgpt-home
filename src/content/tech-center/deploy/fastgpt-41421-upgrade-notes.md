---
title: FastGPT V4.14.21版本升级操作与变更说明
slug: /zh/deploy/fastgpt-41421-upgrade-notes
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41421
source_type: 官方文档
---

# FastGPT V4.14.21版本升级操作与变更说明

## 版本升级概述
本页面面向自部署FastGPT的技术人员，针对V4.14.21版本提供升级操作与变更说明，属于FastGPT 4.14.x版本升级分支的专属内容。

## 版本变更详情
本次V4.14.21版本包含两项核心优化与修复：其一，针对completions API的文件类型相关配置，原版本中name字段为必填参数，本次更新后name变为可选参数，可适配更多自定义的文件处理场景；其二，修复了对象存储初始化时出现的异常问题，提升了存储相关功能的运行稳定性，降低了服务启动异常的概率。

## 升级操作步骤
按照官方提供的升级流程，本次升级仅需更新对应服务的镜像标签即可完成，具体操作步骤如下：
1. 定位到FastGPT的部署配置文件（如Docker Compose配置文件），找到fastgpt-app（FastGPT主服务）的镜像配置项，将其镜像tag修改为v4.14.21；
2. 找到fastgpt-pro（FastGPT商业版服务）的镜像配置项，将其镜像tag修改为v4.14.21；
3. 重新加载部署配置并重启相关服务，即可完成本次版本升级。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41421)
