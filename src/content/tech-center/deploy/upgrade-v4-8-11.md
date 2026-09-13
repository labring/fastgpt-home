---
title: FastGPT V4.8.11版本升级操作与更新内容说明
slug: /zh/deploy/upgrade-v4-8-11
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4811
source_type: 官方文档
---

# FastGPT V4.8.11版本升级操作与更新内容说明

## 这个版本改了什么
本次更新包含多项功能新增、优化与修复。新增功能涵盖工作流表单输入节点、循环运行节点（支持50长度数组串行执行）、节点折叠、简易模式本地历史记录、聊天记录滚动加载、工作流触摸板优先模式、沙盒全局方法strToBase64、OpenAI o1模型支持、AI对话节点知识库角色配置、插件上传系统文件、插件输出指定响应字段、工作流嵌套子应用非流模式、调试模式子应用详细数据返回、子应用日志保留、对话日志成员显示、商业版后台AI文案配置等22项。优化内容包括工作流嵌套层级限制20层、handler性能优化、快捷键修复、流输出浏览器tab兼容、外部文件知识库API完善等14项。修复了知识库权限、空chatId会话异常、createDataset接口问题等49项异常。
## 升级前要确认的事
需提前完成业务数据备份，避免升级过程中出现数据丢失。如需新增OpenAI o1系列模型，需准备好对应的模型配置参数。需确认当前部署环境的rootkey值与FastGPT域名。
## 升级步骤（照做）
1. 修改配置文件：如需增加openai o1模型，添加以下JSON配置片段到配置文件中：
```json
{
    "model": "o1-mini",
    "name": "o1-mini",
    "avatar": "/imgs/model/openai.svg",
    "maxContext": 125000,
    "maxResponse": 65000,
    "quoteMaxToken": 120000,
    "maxTemperature": 1.2,
    "charsPointsPrice": 0,
    "censor": false,
    "vision": false,
    "datasetProcess": true,
    "usedInClassify": true,
    "usedInExtractFields": true,
    "usedInToolCall": true,
    "toolChoice": false,
    "functionCall": false,
    "customCQPrompt": "",
    "customExtractPrompt": "",
    "defaultSystemChatPrompt": "",
    "defaultConfig": {
        "temperature": 1
    }
},
{
    "model": "o1-preview",
    "name": "o1-preview",
    "avatar": "/imgs/model/openai.svg",
    "maxContext": 125000,
    "maxResponse": 32000,
    "quoteMaxToken": 120000,
    "maxTemperature": 1.2,
    "charsPointsPrice": 0,
    "censor": false,
    "vision": false,
    "datasetProcess": true,
    "usedInClassify": true,
    "usedInExtractFields": true,
    "usedInToolCall": true,
    "toolChoice": false,
    "functionCall": false,
    "customCQPrompt": "",
    "customExtractPrompt": "",
    "defaultSystemChatPrompt": "",
    "defaultConfig": {
        "temperature": 1
    }
}
```
2. 更新镜像tag并重启：FastGPT镜像tag设为v4.8.11-fix，商业版镜像tag设为v4.8.11，Sandbox镜像tag设为v4.8.11，随后重启服务。
3. 商业版初始化：从任意终端执行以下HTTP请求，替换{{rootkey}}为环境变量中的rootkey，{{host}}为FastGPT域名：
```bash
curl --location --request POST 'https://{{host}}/api/admin/init/4811' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
该请求将完成团队成员组初始化。
## 升级后怎么验证
检查FastGPT、商业版及Sandbox镜像tag是否正确更新为对应版本。执行商业版初始化请求，确认返回结果正常，团队成员组完成初始化。测试工作流新增功能，包括表单输入节点、循环运行节点，验证功能正常。测试OpenAI o1模型调用，确认配置生效且无异常。检查聊天记录滚动加载功能，确认可加载超过30条记录。验证工作流嵌套层级限制为20层，无异常死循环。测试调试模式下子应用调用，确认返回详细运行数据。
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4811)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
