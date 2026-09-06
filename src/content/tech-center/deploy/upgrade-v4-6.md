---
title: FastGPT V4.6版本升级操作说明与功能解读
slug: /zh/deploy/upgrade-v4-6
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/46
source_type: 官方文档
---

# FastGPT V4.6版本升级操作说明与功能解读

## 这个版本改了什么
本版本新增团队空间功能，支持邀请其他用户管理资源。新增多路向量、tts语音功能，支持知识库配置文本预处理模型，线上环境新增ReRank向量召回以提高召回精度。优化知识库导出流程，可直接触发流下载，无需等待。此外修复旧版4.6版本因缺少字段导致的文件导入后知识库数据无法显示的问题。

## 升级前要确认的事
该版本升级后无法执行旧的升级脚本，且无法回退。旧版`config.json`配置说明不再维护，当前版本需参考[模型配置方案](../../config/model/intro.mdx)和[环境变量说明](../../config/env.mdx)，商业镜像配置文件需参考最新飞书文档。商业版镜像需更新至V0.2.1。升级前需准备环境变量中的`rootkey`以及部署的域名。

## 升级步骤（照做）
1. 更新镜像至latest或者v4.6版本，商业版镜像更新至V0.2.1。
2. 执行初始化API，需按顺序执行，先执行initv46，成功后再执行initv46-2。初始化接口可能速度很慢，返回超时无需关注，需查看日志确认执行结果。初始化内容包括创建默认团队、初始化Mongo所有资源的团队字段、初始化Pg的字段、初始化Mongo Data。
   - 第一个请求：
     ```bash
     curl --location --request POST 'https://{{host}}/api/admin/initv46' \
     --header 'rootkey: {{rootkey}}' \
     --header 'Content-Type: application/json'
     ```
   - 第二个请求：
     ```bash
     curl --location --request POST 'https://{{host}}/api/admin/initv46-2' \
     --header 'rootkey: {{rootkey}}' \
     --header 'Content-Type: application/json'
     ```
3. 若存在旧版4.6版本文件导入后知识库数据无法显示的问题，执行修复接口：
   ```bash
   curl --location --request POST 'https://{{host}}/api/admin/initv46-fix' \
   --header 'rootkey: {{rootkey}}' \
   --header 'Content-Type: application/json'
   ```

## 升级后怎么验证
可通过查看部署日志确认initv46和initv46-2执行成功。验证团队空间功能是否可用，测试知识库导出是否支持流下载，测试文件导入后知识库数据是否正常显示。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/46)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
