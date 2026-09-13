---
title: 解决FastGPT配置二级路由后分享页重定向登录的问题
slug: /zh/troubleshoot/fastgpt-secondary-route-share-redirect
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4531
source_type: GitHub issue
---

# 解决FastGPT配置二级路由后分享页重定向登录的问题

## 现象
在私有部署版本4.9.3中，配置NEXT_PUBLIC_BASE_URL二级路由参数后，/chat/share页面首次打开时会提示重定向到登录页面。

## 可能原因
该问题源于request文件中的responseError判断逻辑存在异常，导致二级路由配置下的请求处理不符合预期。

## 排查步骤
1. 确认已配置NEXT_PUBLIC_BASE_URL参数，并设置为对应二级路由地址。
2. 访问/chat/share页面，观察首次加载是否触发重定向到登录页的情况。
3. 检查前端request模块中的responseError相关判断逻辑。

## 解决与验证
通过使用getWebReqUrl方法修复request文件中的responseError判断逻辑。验证时，重新部署修复后的代码，访问/chat/share页面，确认首次加载不再重定向到登录页，功能恢复正常。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4531)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
