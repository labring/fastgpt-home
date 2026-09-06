---
title: FastGPT V4.8.8版本升级操作与更新内容说明
slug: /zh/deploy/upgrade-v4-8-8
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/488
source_type: 官方文档
---

# FastGPT V4.8.8版本升级操作与更新内容说明

## 这个版本改了什么
重构系统插件结构，支持向开源社区提交PR系统插件；新增DuckDuckGo、飞书webhook两款系统插件。修改变量填写方式，提示词输入框及工作流中所有Textarea输入框支持输入/唤起变量选择，可直接选择上游输出值。商业版新增知识库权限继承功能。优化移动端应用切换交互、节点图标、对话框引用复制功能与折叠展示。升级OpenAI SDK并自定义whisper模型接口。修复Permission表声明、并行执行节点运行时间记录、嵌套节点运行详情展示、简易模式首次进入知识库配置、Log debug level配置、插件独立运行变量替换异常等问题。

## 升级前要确认的事
完成FastGPT数据库的完整备份；准备好环境变量中的rootkey值，以及FastGPT的访问域名。

## 升级步骤（照做）
1. 修改镜像：将fastgpt镜像tag修改为v4.8.8-fix2，商业版镜像tag修改为v4.8.8。
2. 执行初始化：从任意终端发起以下HTTP POST请求，将{{rootkey}}替换为环境变量中的rootkey，{{host}}替换为FastGPT域名：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv488' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
该请求用于初始化知识库的继承权限。

## 升级后怎么验证
验证知识库权限继承功能是否正常生效；确认新增的DuckDuckGo、飞书webhook系统插件可正常加载与使用；检查提示词及工作流Textarea输入框是否支持输入/唤起变量选择功能；验证修复的各类问题，如并行执行节点运行时间记录、嵌套节点运行详情展示等是否恢复正常。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/488)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
