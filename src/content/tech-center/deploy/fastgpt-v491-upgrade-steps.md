---
title: FastGPT V4.9.1版本自部署升级操作说明
slug: /zh/deploy/fastgpt-v491-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/491
source_type: 官方文档
---

# FastGPT V4.9.1版本自部署升级操作说明

## 升级前置准备
本次升级针对FastGPT V4.9.1版本，需提前完成数据库备份以保障数据安全。更新镜像时，FastGPT官方镜像与商业版镜像的tag均为`v4.9.1-fix2`；Sandbox镜像可选择不更新，AIProxy镜像需修改为`registry.cn-hangzhou.aliyuncs.com/labring/aiproxy:v0.1.3`。

## 升级执行步骤
1. 打开任意终端，执行以下HTTP请求命令，将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT部署域名：
```bash
curl --location --request POST https://{{host}}/api/admin/initv491 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该升级脚本会重新使用最新的jieba分词库进行分词处理，执行耗时较长，可通过系统日志查看进度。

## 升级变更与修复内容
### 新增功能
商业版支持单团队模式，可更高效管理内部成员；新增知识库分块阅读器；API知识库支持PDF增强解析；团队成员邀请改为邀请链接模式；支持混合检索权重设置；支持重排模型选择与权重设置，同时调整知识库搜索权重计算方式，改为搜索权重+重排权重，而非原有的向量检索权重+全文检索权重+重排权重，调整后可能影响检索结果，可通过调整相关权重适配数据。
### 优化内容
优化知识库数据输入框交互逻辑；将应用拉取绑定知识库数据的处理交由后端完成；增加依赖包安全版本检测并升级部分依赖包；优化模型测试代码；优化思考过程解析逻辑，只要配置模型支持思考，均会解析think标签，不会因对话时关闭思考而不解析；载入最新jieba分词库，增强全文检索分词效果。
### 修复问题
修复了最大响应tokens提示显示错误、HTTP Node中字符串含换行符时解析失败、知识库问题优化未传递历史记录、错误提示翻译缺失、内容提取节点array类型schema错误、模型渠道测试未实际指定渠道测试、新增自定义模型时默认模型字段被误存导致判断错误、promp模式工具调用未判空思考链导致UI错误、编辑应用信息导致头像丢失、分享链接标题被刷新、计算parentPath时鉴权失败清空等问题。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/491
