---
title: FastGPT V4.7.1版本升级与配置调整说明
slug: /zh/deploy/fastgpt-471-upgrade-notes
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/471
source_type: 官方文档
---

# FastGPT V4.7.1版本升级与配置调整说明

## 版本变更概览
FastGPT V4.7.1版本包含环境变量配置变更与升级脚本相关调整，不再维护旧版config.json配置文件，需通过环境变量完成全部配置。本次更新新增多项功能与优化，包括语音输入完整配置、pptx和xlsx文件读取、Laf云函数集成、定时垃圾数据清理，商业版新增后台系统通知配置；同时优化了知识库导出的IP模式支持，调整了CSV导入模板的校验规则，修复了多个功能模块的BUG。

## 升级执行步骤
首先执行脏数据清理初始化脚本，在任意终端发起以下HTTP请求，将{{rootkey}}替换为环境变量中的rootkey，{{host}}替换为FastGPT部署的域名：
```bash
curl --location --request POST https://{{host}}/api/admin/clearInvalidData \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该请求会清理无效文件、无效图片、无效知识库集合与无效向量数据。随后需修改配置方式，不再使用旧版config.json，需参考官方环境变量说明完成配置，并新增Laf环境相关的配置项。

## 功能与修复细节
本次更新的语音输入配置支持控制是否开启语音输入（含分享页面）、语音输入后自动发送与自动流式语音播放；文件读取新增对pptx和xlsx格式的支持，但所有文件读取将转移至服务端执行，会增加服务器资源消耗且上传时无法预览更多内容；新增定时器进行小范围垃圾数据清理，若长时间未运行服务可手动调用上述初始化接口完成全量清理；修复了工具调用模块连线数据类型校验错误、自定义索引输入解构失败、rerank模型数据格式异常、问题补全历史记录BUG以及分享页面特殊场景加载缓慢的问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/471)
