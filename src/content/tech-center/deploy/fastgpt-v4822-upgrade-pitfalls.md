---
title: FastGPT V4.8.22版本升级操作与更新内容说明
slug: /zh/deploy/fastgpt-v4822-upgrade-pitfalls
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4822
source_type: 官方文档
---

# FastGPT V4.8.22版本升级操作与更新内容说明

本页为FastGPT V4.8.22版本的升级指引，升级前需完成数据库备份，Sandbox镜像无需更新。仅商业版且提供SaaS服务的用户，需要运行专属升级脚本完成数据迁移。

## 升级操作步骤
1. 更新镜像：将fastgpt镜像的tag设置为v4.8.22，fastgpt-pro商业版镜像的tag同样设置为v4.8.22。
2. 执行升级脚本（仅商业版且提供SaaS服务用户）：通过任意终端发起HTTP POST请求，命令为：
```
curl --location --request POST https://{{host}}/api/admin/initv4822 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
其中{{rootkey}}需替换为环境变量中的rootkey，{{host}}替换为FastGPT域名。该脚本会将联系方式迁移至对应用户表中。

## 更新内容详情
### 新增内容
AI对话节点可解析think/think标签内容作为思考链，需主动开启模型输出思考功能；对话API优化，无论是否传递chatId，都会保存对话日志，未传递chatId时将随机生成一个chatId进行存储；新增ppio模型提供商。
### 优化内容
模型未配置时增加提示，减少冲突提示；使用记录代码；内容提取节点字段描述过长时自动换行，输出名调整为key，不使用description；优化团队管理交互；对话接口非流响应时增加报错字段。
### 修复内容
修复思考内容未计入输出Tokens的问题；修复思考链流输出时偶现与正文顺序偏差的问题；修复API调用工作流中，不支持Head检测的图片被错误过滤的问题，新增该类错误检测；修复模板市场部分模板错误；修复免登录窗口无法正常判断语言识别是否开启的问题；修复对话日志导出未兼容sub path的问题；修复切换团队时未刷新成员列表的联查member空指针问题；修复工作流基础节点无法升级的问题；修复向量检索结果未去重的问题；修复用户选择节点无法正常连线的问题；修复对话记录保存时source未正常记录的问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4822)
