---
title: FastGPT V4.14.27版本升级变更与操作指引
slug: /zh/deploy/upgrade-v4-14-27
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41427
source_type: 官方文档
---

# FastGPT V4.14.27版本升级变更与操作指引

## 这个版本改了什么
该版本修复一些历史升级脚本问题，由于近期变更导致旧的升级脚本无法正常使用。具体修复内容包括：
1. 修复V4.13.2升级脚本中S3 lifecycle清理可能被跳过的问题。该脚本不再依赖`instanceof MinioStorageAdapter`判断MinIO客户端，避免Next.js dev或bundle场景下workspace package被加载为不同模块实例导致误判。
2. 修复V4.14.3升级脚本中图片迁移日志的资源类型，将`data_image`修正为`dataset_image`，避免已完成的图片迁移记录无法被正确识别。
3. 修复V4.14.4升级脚本中图片迁移已完成记录的过滤条件，同样使用`dataset_image`，避免重复执行脚本时再次迁移已完成的图片。

## 升级前要确认的事
确认需升级的服务为fastgpt-app或fastgpt-pro，确认当前部署的服务处于可升级状态。

## 升级步骤（照做）
按照官方指引更新对应服务的镜像tag：
- 更新fastgpt-app(fastgpt 主服务) 镜像tag: v4.14.27
- 更新fastgpt-pro(fastgpt 商业版) 镜像tag: v4.14.27

## 升级后怎么验证
验证服务正常启动，检查升级脚本执行日志无异常，确认图片迁移记录的资源类型为`dataset_image`，确认S3 lifecycle清理流程可正常执行。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41427)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
