---
title: 解决FastGPT高级编排中提取URL自定义参数的问题
slug: /zh/troubleshoot/fastgpt-url-params-extraction
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/887
source_type: GitHub issue
---

# 解决FastGPT高级编排中提取URL自定义参数的问题

## 现象
用户在FastGPT免登录分享链接（如http://test.com/chat/share?shareId=aaa&chatId=bbb&userId=10086&key=[REDACTED_CREDENTIAL]

## 可能原因
现有FastGPT版本的高级编排模块未支持从分享链接的URL查询参数中自动提取自定义参数，且全局变量配置未提供URL参数类型的配置选项，无法直接读取URL参数。

## 排查步骤
1. 确认目标分享链接中携带的自定义查询参数名称，如示例中的userId、key。
2. 进入高级编排编辑界面，查看HTTP模块的变量引用配置，确认是否可直接引用URL参数。
3. 打开全局变量设置页面，检查是否存在URL参数类型的配置选项。
4. 确认当前使用的FastGPT版本是否为最新正式版本。

## 解决与验证
目前暂未内置该功能，需按实际环境确认FastGPT是否已更新支持URL参数提取功能。若已支持，可在高级编排HTTP模块中直接引用{{userId}}、{{key}}等URL查询参数；在全局变量设置中新增URL参数类型的全局变量，自动读取对应URL参数。验证方式为：访问携带自定义参数的分享链接，进入高级编排流程，查看HTTP模块是否成功获取到对应参数值，或全局变量是否自动加载对应参数。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/887)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
