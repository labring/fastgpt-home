---
title: FastGPT V4.8.11版本升级操作与更新内容说明
slug: /zh/deploy/fastgpt-v4-8-11-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4811
source_type: 官方文档
---

# FastGPT V4.8.11版本升级操作与更新内容说明

## 版本更新内容
本版本新增多项功能与优化：包括工作流中的表单输入节点、循环运行节点（支持传入数组批量调用，最多支持50长度数组串行执行）、节点折叠功能；简易模式新增本地变更记录的历史记录模式，聊天记录支持滚动加载不再仅加载30条；工作流新增触摸板优先模式，可通过右下角按键切换；沙盒新增strToBase64全局字符串转base64方法；支持OpenAI o1系列模型，需配置对应模型参数；AI对话节点知识库引用支持配置role=system和role=user，已配置自定义提示词的节点保持user模式，其余自动转为system模式；插件支持上传系统文件，插件输出可指定字段作为工具响应；工作流嵌套子应用时可设置非流模式，简易模式调用子应用强制使用非流模式；调试模式下子应用调用支持返回详细运行数据，保留所有模式下子应用嵌套调用的日志；对话日志新增成员显示；商业版支持后台配置AI生成文案提示；新增Jest单测相关支持。

## 升级操作步骤
请按照以下步骤完成升级：
1. 做好数据备份。
2. 修改配置文件：如需新增OpenAI o1模型，需添加如下配置：
```json
{ model : o1-mini , name : o1-mini , avatar : /imgs/model/openai.svg , maxContext : 125000 , maxResponse : 65000 , quoteMaxToken : 120000 , maxTemperature : 1.2 , charsPointsPrice : 0 , censor : false , vision : false , datasetProcess : true , usedInClassify : true , usedInExtractFields : true , usedInToolCall : true , toolChoice : false , functionCall : false , customCQPrompt : , customExtractPrompt : , defaultSystemChatPrompt : , defaultConfig : { temperature : 1 } },
{ model : o1-preview , name : o1-preview , avatar : /imgs/model/openai.svg , maxContext : 125000 , maxResponse : 32000 , quoteMaxToken : 120000 , maxTemperature : 1.2 , charsPointsPrice : 0 , censor : false , vision : false , datasetProcess : true , usedInClassify : true , usedInExtractFields : true , usedInToolCall : true , toolChoice : false , functionCall : false , customCQPrompt : , customExtractPrompt : , defaultSystemChatPrompt : , defaultConfig : { temperature : 1 } }
```
3. 修改镜像tag并重启：FastGPT镜像更新为`v4.8.11-fix`，商业版镜像更新为`v4.8.11`，Sandbox镜像更新为`v4.8.11`，随后重启服务。
4. 商业版初始化：从任意终端发起HTTP请求，将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT域名：
```bash
curl --location --request POST https://{{host}}/api/admin/init/4811 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该请求将初始化团队成员组。

## 升级注意事项
执行升级时需注意以下边界与易错点：OpenAI o1系列模型不支持stream模式，配置时需覆盖对应参数；循环运行节点仅支持最多50长度的数组串行执行，超出长度将无法正常运行；工作流嵌套子应用时，简易模式调用将强制使用非流模式，无需额外设置；初始化请求需确保rootkey与host参数正确，否则将无法完成团队成员组初始化；已配置自定义提示词的AI对话节点，知识库引用将保持user模式，其余节点自动转为system模式。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4811)
