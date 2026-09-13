---
title: FastGPT v4.14.7.2版本升级说明与操作指引
slug: /zh/deploy/release-notes-4-14-7-2
page_type: 版本解读
source: https://github.com/labring/FastGPT/releases/tag/v4.14.7.2
source_type: 官方文档
---

# FastGPT v4.14.7.2版本升级说明与操作指引

## 这个版本改了什么
本版本核心修复为v1/completions接口的flowNodeResponse event数据类型错误。本次版本迭代覆盖接口修复、依赖更新、框架升级与多语言优化等多个方面，具体优化与修复项包括：更新FastGPT镜像tag至v4.14.7.2；升级/plugins/webcrawler/SPIDER目录下的bn.js依赖包；将Next框架升级至15版本；修复移动端侧边栏样式与用户交互体验；优化英文翻译适配产品使用场景；修复导航栏语言丢失问题并新增语言选择器；修复sse响应类型异常问题。

## 升级前要确认的事
确认当前部署的FastGPT版本为v4.14.7.1，且未对核心代码进行未同步的自定义修改。

## 升级步骤（照做）
将部署配置中的FastGPT镜像tag修改为v4.14.7.2，重新启动FastGPT服务。

## 升级后怎么验证
调用v1/completions接口，检查flowNodeResponse event的数据类型是否符合预期标准。验证sse接口的响应类型是否正常返回。访问移动端页面，确认侧边栏样式与交互逻辑符合设计要求。切换语言选择器，确认导航栏语言显示正常且无丢失问题。检查英文界面的翻译是否适配产品使用场景，确认所有接口调用与界面展示均恢复正常。

> 来源: [FastGPT release notes](https://github.com/labring/FastGPT/releases/tag/v4.14.7.2)
