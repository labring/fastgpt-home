---
title: FastGPT V4.8.22版本升级操作与功能说明
slug: /zh/deploy/upgrade-v4-8-22
page_type: 版本解读
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4822
source_type: 官方文档
---

# FastGPT V4.8.22版本升级操作与功能说明

本文记录历史版本的配置与变更，适用于定位该版本的升级背景。部署与升级时，请结合当前安装版本的官方发布说明核对依赖、配置格式和迁移步骤。

## 这个版本改了什么
新增功能包括三项：一是AI对话节点解析`<think></think>`标签内容作为思考链，需主动开启模型输出思考；二是对话API优化，无论是否传递chatId，都会保存对话日志，未传递chatId则随机生成一个chatId进行存储；三是新增ppio模型提供商。
优化内容包括五项：一是模型未配置时增加提示，减少冲突提示；二是新增使用记录代码；三是内容提取节点支持字段描述过长时换行，同时将输出名设置为key，不使用description；四是优化团队管理交互；五是对话接口非流响应增加报错字段。
修复问题共十二项：包括思考内容未计入输出Tokens、思考链流输出时与正文顺序偏差、API调用工作流中不支持的Head检测图片被错误过滤、模板市场部分模板错误、免登录窗口无法正常判断语言识别是否开启、对话日志导出未兼容sub path、切换团队时未刷新成员列表、list接口联查member时存在空指针可能性、工作流基础节点无法升级、向量检索结果未去重、用户选择节点无法正常连线、对话记录保存时source未正常记录。

## 升级前要确认的事
升级前需完成数据库备份。Sandbox镜像无需更新。仅商业版且提供SaaS服务的用户，需执行后续升级脚本操作。

## 升级步骤（照做）
1. 更新镜像：将fastgpt镜像tag更新为v4.8.22，将fastgpt-pro商业版镜像tag更新为v4.8.22。
2. 仅商业版并提供SaaS服务的用户，从任意终端发起以下HTTP POST请求：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4822' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
其中`{{rootkey}}`替换为环境变量中的`rootkey`，`{{host}}`替换为FastGPT域名。该请求会迁移联系方式到对应用户表中。

## 升级后怎么验证
可通过以下方式验证升级效果：一是配置模型后，检查是否正常显示未配置提示；二是测试对话节点，确认`<think>`标签内容被解析为思考链；三是调用对话API，验证无论是否传递chatId均能保存对话日志；四是测试内容提取节点，确认字段描述过长时自动换行且输出名为key；五是验证团队管理、对话日志导出、向量检索去重等功能是否正常运行。

> 来源: [FastGPT 官方文档与源码](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4822)
