---
title: FastGPT V4.14.8.1版本升级内容与操作说明
slug: /zh/deploy/upgrade-v4-14-8-1
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41481
source_type: 官方文档
---

# FastGPT V4.14.8.1版本升级内容与操作说明

## 这个版本改了什么
该版本无新增功能内容。优化内容为API文件库接口返回title值时，fallback为URL。修复内容为修复工作流编排中获取不到agent工具的版本列表的问题。本次升级涉及的镜像更新要求为：FastGPT镜像tag更新为v4.14.8.1，FastGPT商业版镜像tag更新为v4.14.8.1，sandbox镜像tag更新为v4.14.8；fastgpt-plugin、mcp_server、AIProxy、mongo无需更新。

## 升级前要确认的事
确认本次升级的镜像更新范围，明确需要更新的镜像为FastGPT、FastGPT商业版、sandbox，其余镜像无需执行更新操作。

## 升级步骤（照做）
按照以下要求更新对应镜像tag：
- 更新FastGPT镜像tag为v4.14.8.1
- 更新FastGPT商业版镜像tag为v4.14.8.1
- 更新sandbox镜像tag为v4.14.8
- 保持fastgpt-plugin、mcp_server、AIProxy、mongo镜像不变，无需更新

## 升级后怎么验证
升级完成后，可通过以下方式验证功能与配置：
1. 调用API文件库接口，验证返回的title值在无对应内容时fallback为URL
2. 进入工作流编排页面，验证可以正常获取agent工具的版本列表

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41481)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
