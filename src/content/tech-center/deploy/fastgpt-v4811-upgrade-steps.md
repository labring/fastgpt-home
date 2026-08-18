---
title: FastGPT V4.8.11版本升级操作及更新内容说明
slug: /zh/deploy/fastgpt-v4811-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4811
source_type: 官方文档
---

# FastGPT V4.8.11版本升级操作及更新内容说明

### 版本更新内容
本次V4.8.11版本新增多项功能：包括工作流中的表单输入节点、循环运行节点（支持最多50长度数组串行执行）、节点折叠功能；简易模式新增本地变更记录的历史记录模式，聊天记录支持滚动加载不再仅显示30条；工作流新增触摸板优先模式，可通过右下角按键切换；沙盒新增全局字符串转base64方法`strToBase64`；支持OpenAI o1系列模型，需额外配置模型参数；AI对话节点知识库引用支持配置`role=system`和`role=user`；插件支持上传系统文件，插件输出可指定字段作为工具响应；工作流嵌套子应用时支持非流模式，简易模式可选择工作流作为插件且调用子应用强制非流模式；调试模式下子应用调用支持返回详细运行数据，保留所有模式下子应用嵌套调用的日志，对话日志新增显示成员；商业版支持后台配置AI生成文案提示，新增Jest单测相关支持。

### 升级操作步骤
1. 提前做好全量数据备份，避免升级过程中数据丢失。
2. 修改配置文件，如需新增OpenAI o1模型，可添加如下配置：
```json
[
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
    "defaultConfig": { "temperature": 1 }
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
    "defaultConfig": { "temperature": 1 }
  }
]
```
3. 更新镜像标签并重启服务：FastGPT社区版镜像标签为`v4.8.11-fix`，商业版镜像标签为`v4.8.11`，Sandbox镜像标签为`v4.8.11`。
4. 商业版需执行初始化操作：在终端发起HTTP请求，将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT域名，命令如下：
```bash
curl --location --request POST "https://{{host}}/api/admin/init/4811" \
--header "rootkey: {{rootkey}}" \
--header "Content-Type: application/json"
```
该请求将初始化团队成员组。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4811)
