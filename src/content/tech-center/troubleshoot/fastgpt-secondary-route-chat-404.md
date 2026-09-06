---
title: 解决FastGPT二级路由配置后聊天页面跳转404问题
slug: /zh/troubleshoot/fastgpt-secondary-route-chat-404
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/5503
source_type: GitHub issue
---

# 解决FastGPT二级路由配置后聊天页面跳转404问题

## 现象
在FastGPT 4.11.1私有部署版本中，构建镜像时通过--build-arg base_url=/dev配置二级路由后，登录系统点击侧边栏聊天按钮，打开的新页面返回404错误。预期跳转路径应为包含配置的二级路由的聊天页面地址，如xxx/dev/chat?appId=xxx。

## 可能原因
该问题与二级路由配置直接相关，由于前端路由规则与构建时配置的base_url参数未正确匹配，导致跳转请求无法找到对应页面，具体根因需结合实际部署环境的路由配置与访问路径确认。

## 排查步骤
1. 查看构建FastGPT镜像时使用的--build-arg base_url参数的具体值，记录该参数内容。
2. 核对实际访问FastGPT系统的二级路由路径，确认与配置的base_url参数完全一致。
3. 打开浏览器开发者工具的网络面板，查看404报错的具体请求路径，对比预期跳转路径与实际请求路径的差异，定位不匹配的节点。

## 解决与验证
解决方法为确保构建镜像时配置的base_url参数与实际部署的二级路由路径完全匹配。重新构建并部署FastGPT镜像后，登录系统点击侧边栏聊天按钮，验证跳转页面可正常加载，无404错误。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/5503)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
