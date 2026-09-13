---
title: FastGPT V4.9.1版本升级内容与操作指引
slug: /zh/deploy/upgrade-v4-9-1
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/491
source_type: 官方文档
---

# FastGPT V4.9.1版本升级内容与操作指引

## 这个版本改了什么
新增内容包括商业版支持单团队模式，知识库分块阅读器，API知识库支持PDF增强解析，邀请团队成员改为邀请链接模式，支持混合检索权重设置，支持重排模型选择和权重设置，调整知识库搜索权重计算方式为搜索权重 + 重排权重。
优化内容包括知识库数据输入框交互，应用拉取绑定知识库数据交由后端处理，增加依赖包安全版本检测并升级部分依赖包，模型测试代码，优化思考过程解析逻辑，载入最新jieba分词库增强全文检索分词效果。
修复内容包括最大响应tokens提示显示错误，HTTP Node.js中字符串包含换行符时解析失败，知识库问题优化中未传递历史记录，错误提示翻译缺失，内容提取节点array类型schema错误，模型渠道测试时未指定渠道，新增自定义模型时默认模型字段误保存，promp模式工具调用未判空思考链导致UI错误，编辑应用信息导致头像丢失，分享链接标题被刷新，计算parentPath时鉴权失败清空。

## 升级前要确认的事
需提前做好数据库备份，准备好环境变量中的rootkey以及FastGPT域名，用于后续升级脚本执行。

## 升级步骤（照做）
1. 更新镜像：将FastGPT镜像tag更新为v4.9.1-fix2，商业版镜像tag同步更新为v4.9.1-fix2；Sandbox镜像可不更新；AIProxy镜像修改为registry.cn-hangzhou.aliyuncs.com/labring/aiproxy:v0.1.3。
2. 执行升级脚本：从任意终端发起HTTP POST请求，替换{{rootkey}}为环境变量中的rootkey，{{host}}为FastGPT域名，请求命令为：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv491' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
该脚本将重新使用最新jieba分词库进行分词处理，执行时间较长，可通过系统日志查看进度。

## 升级后怎么验证
可通过系统日志确认分词处理任务完成。可测试知识库检索、模型调用、团队成员管理、分享链接等功能，验证新增功能与修复项正常生效。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/491)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
