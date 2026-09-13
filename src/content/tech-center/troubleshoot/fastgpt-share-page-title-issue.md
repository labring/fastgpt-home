---
title: 解决FastGPT工作流共享页面首次加载标题不更新问题
slug: /zh/troubleshoot/fastgpt-share-page-title-issue
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/3094
source_type: GitHub issue
---

# 解决FastGPT工作流共享页面首次加载标题不更新问题

## 现象
私有部署版本4.8.11.fix中，使用免登录窗口打开工作流应用页面`/chat/share?shareId=xxx`时，网页title固定为`FastGPT`，应用名称未生效。在页面内执行新建对话或切换历史会话操作后，网页title可正常更新为应用名称。

## 可能原因
暂未明确具体根因，需结合部署环境与前端代码执行逻辑排查，具体需按实际环境确认。

## 排查步骤
1.  确认当前部署的FastGPT版本为4.8.11.fix私有部署版本。
2.  访问`/chat/share?shareId=xxx`免登录共享页面，观察浏览器标签页的标题内容。
3.  在页面内执行新建对话或切换历史会话操作，再次观察标题是否更新。
4.  检查前端页面初始化阶段的标题设置逻辑，确认是否存在延迟加载或未触发的场景。

## 解决与验证
针对该问题的修复需调整前端页面初始化阶段的标题更新逻辑，确保在页面加载完成后立即同步应用名称至网页title。验证方式为：首次打开`/chat/share?shareId=xxx`页面时，浏览器标签页标题可直接显示对应应用名称，无需通过后续操作触发更新。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3094)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
