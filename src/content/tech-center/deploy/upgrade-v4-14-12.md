---
title: FastGPT V4.14.12版本升级内容、步骤与验证方法
slug: /zh/deploy/upgrade-v4-14-12
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41412
source_type: 官方文档
---

# FastGPT V4.14.12版本升级内容、步骤与验证方法

## 这个版本改了什么
本次版本修复三类问题：知识库三级目录path接口报zod校验出错；v1/completions接口dataId异常，导致API调用时对话日志无法获取运行详情；对话Agent应用敏感信息过滤勾选框无法取消。新增两项功能：响应值允许自定义HttpStatus状态码；Agent调度器支持PI Agent模式（beta功能）。同时优化skill接口错误处理逻辑。

## 升级前要确认的事
需确认当前部署的服务为fastgpt-app或fastpgt-pro，确认本地或镜像仓库已准备好v4.14.12版本的对应镜像。无需额外修改配置文件或数据库参数。

## 升级步骤（照做）
1. 更新fastgpt-app(fastgpt 主服务) 镜像tag: v4.14.12
2. 更新fastpgt-pro(商业版) 镜像tag: v4.14.12

## 升级后怎么验证
可通过以下方式验证升级效果：调用知识库三级目录相关接口，确认无zod校验报错；调用v1/completions接口并传入dataId参数，确认对话日志可正常获取运行详情；进入对话Agent应用，确认敏感信息过滤勾选框可正常取消勾选；测试响应值配置自定义HttpStatus状态码功能正常；测试Agent调度器的PI Agent模式（beta）功能可用；调用skill接口，确认错误处理逻辑符合预期。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41412)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
