---
title: FastGPT V4.9.1版本升级操作与更新说明
slug: /zh/deploy/fastgpt-v491-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/491
source_type: 官方文档
---

# FastGPT V4.9.1版本升级操作与更新说明

## 版本升级前置准备
在进行FastGPT V4.9.1版本升级前，需先完成数据库备份，同时更新对应组件镜像：FastGPT官方与商业版镜像的tag需设置为v4.9.1-fix2，AIProxy镜像需修改为registry.cn-hangzhou.aliyuncs.com/labring/aiproxy:v0.1.3，Sandbox镜像可选择不进行更新。

## 升级执行步骤
1. 打开任意终端，发起POST HTTP请求完成升级初始化。需将命令中的`{{rootkey}}`替换为环境变量内的rootkey，`{{host}}`替换为FastGPT的访问域名。完整命令如下：
```bash
curl --location --request POST https://{{host}}/api/admin/initv491 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该升级脚本会重新使用最新的jieba分词库进行分词处理，执行耗时较长，可通过系统日志查看执行进度。

## 版本核心变更
### 新增功能
商业版支持单团队模式以更好管理内部成员，新增知识库分块阅读器，API知识库支持PDF增强解析；邀请团队成员改为邀请链接模式，支持混合检索权重设置，支持重排模型选择与权重设置，同时调整知识库搜索权重计算方式为搜索权重+重排权重。
### 优化项
优化知识库数据输入框交互逻辑，将应用拉取绑定知识库数据的处理交由后端完成，增加依赖包安全版本检测并升级部分依赖包，优化思考过程解析逻辑，载入最新jieba分词库以增强全文检索分词效果。
### 修复问题
修复了最大响应tokens提示显示错误、HTTP Node中字符串含换行符时解析失败、知识库问题优化未传递历史记录、错误提示翻译缺失、内容提取节点array类型schema错误、模型渠道测试未指定渠道、新增自定义模型时默认模型字段误判保存、promp模式工具调用未判空思考链导致UI错误、编辑应用信息导致头像丢失、分享链接标题被刷新丢失、计算parentPath时鉴权失败清空等问题。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/491
