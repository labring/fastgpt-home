---
title: FastGPT V4.14.27版本升级操作与变更说明
slug: /zh/deploy/fastgpt-v41427-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41427
source_type: 官方文档
---

# FastGPT V4.14.27版本升级操作与变更说明

## 版本修复说明
FastGPT V4.14.27版本主要针对历史升级脚本的异常问题进行修复，解决了近期系统变更导致旧升级脚本无法正常运行的情况。本次修复涵盖三个核心升级脚本问题：
1. 修复V4.13.2升级脚本中S3 lifecycle清理可能被跳过的问题，调整了MinIO客户端的判断逻辑，不再依赖`instanceof MinioStorageAdapter`进行判断，避免在Next.js开发（dev）或打包（bundle）场景下，workspace package被加载为不同模块实例而导致的误判问题。
2. 修复V4.14.3升级脚本中图片迁移日志的资源类型错误，将原有的`data_image`修正为`dataset_image`，解决了已完成的图片迁移记录无法被系统正确识别的问题。
3. 修复V4.14.4升级脚本中图片迁移已完成记录的过滤条件，统一将过滤条件调整为`dataset_image`，避免在重复执行升级脚本时，再次迁移已经完成的图片数据。

## 升级操作步骤
完成该版本升级的核心操作是更新对应服务的镜像tag，具体步骤如下：
1. 更新fastgpt-app（FastGPT主服务）的镜像tag为`v4.14.27`。
2. 更新fastgpt-pro（FastGPT商业版）的镜像tag为`v4.14.27`。
请确保所有相关服务的镜像都同步更新至指定tag，避免出现版本不一致导致的异常。

## 注意事项与边界说明
该版本升级仅适用于V4.14.x系列版本的用户，其他大版本（如4.13.x、4.12.x）的升级需参考对应版本的官方升级文档。在执行升级脚本前，建议提前完成数据备份，防止因脚本异常导致数据丢失。在Next.js开发或打包场景下部署系统时，需注意本次修复的模块实例判断逻辑变更，避免出现升级脚本误判的问题。如果在升级过程中遇到图片迁移相关的异常，可对照本次修复的资源类型变更进行排查，检查迁移日志中的资源类型字段是否符合要求。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41427)
