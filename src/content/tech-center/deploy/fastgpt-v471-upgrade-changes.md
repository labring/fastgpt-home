---
title: FastGPT V4.7.1版本升级步骤与配置变更说明
slug: /zh/deploy/fastgpt-v471-upgrade-changes
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/471
source_type: 官方文档
---

# FastGPT V4.7.1版本升级步骤与配置变更说明

## 升级前置说明
FastGPT V4.7.1版本包含环境变量变更与升级脚本执行要求，该版本新增了Laf环境配置项，旧版config.json配置文档已不再维护，需参考官方环境变量说明文档完成新的配置调整。升级前需确认当前服务处于可运行状态，避免配置变更导致功能异常。

## 升级初始化脚本执行步骤
需在任意终端发起指定的HTTP POST请求，完成脏数据清理操作。请替换以下参数：将`{{rootkey}}`替换为环境变量中配置的rootkey值，`{{host}}`替换为FastGPT部署的域名。完整请求命令如下：
```bash
curl --location --request POST https://{{host}}/api/admin/clearInvalidData \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该请求会自动清理无效文件、无效图片、无效知识库集合以及无效向量数据。注意需确保FastGPT服务正常运行后再执行该脚本，若服务长期未运行，可手动调用该接口完成全量清理。

## 版本变更与注意事项
### 核心新增功能
1.  语音输入完整配置：支持开关语音输入功能（含分享页面）、设置语音输入后自动发送、开启语音输入后自动流式语音播放；
2.  新增pptx和xlsx文件读取支持，但所有文件读取均转移至服务端，会消耗更多服务器资源，资源紧张的场景下需谨慎使用；
3.  集成Laf云函数能力，可读取Laf账号中的云函数作为HTTP模块使用；
4.  新增定时器自动清理最近n小时内的垃圾数据，若服务长期未运行，可手动调用上述clearInvalidData接口执行全量清理；
5.  商业版新增后台系统通知配置功能。
### 优化与修复内容
优化支持IP模式导出知识库；修改CSV导入模板逻辑，取消header校验，自动获取前两列数据；修复工具调用模块连线数据类型校验错误、自定义索引输入解构失败、rerank模型数据格式异常、问题补全历史记录BUG以及分享页面特殊场景加载缓慢问题（原因为SSR场景下数据库未触发连接）。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/471
