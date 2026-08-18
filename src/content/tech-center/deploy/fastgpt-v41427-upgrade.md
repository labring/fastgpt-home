---
title: FastGPT V4.14.27版本升级操作及变更说明
slug: /zh/deploy/fastgpt-v41427-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41427
source_type: 官方文档
---

# FastGPT V4.14.27版本升级操作及变更说明

## 版本核心修复内容
V4.14.27版本主要针对历史升级脚本的异常问题进行修复，解决因近期代码变更导致旧升级脚本无法正常运行的问题。具体修复细节包含三个方面：一是修复V4.13.2升级脚本中S3 lifecycle清理可能被跳过的问题，该脚本不再依赖`instanceof MinioStorageAdapter`判断MinIO客户端，避免在Next.js开发或打包场景下，workspace包被加载为不同模块实例而出现误判；二是修复V4.14.3升级脚本中图片迁移日志的资源类型错误，将原有的`data_image`修正为`dataset_image`，防止已完成的图片迁移记录无法被系统正确识别；三是修复V4.14.4升级脚本中图片迁移已完成记录的过滤条件，统一使用`dataset_image`作为过滤标识，避免重复执行脚本时再次迁移已经完成的图片资源。

## 标准化升级操作步骤
本次升级的操作流程较为简洁，仅需更新对应服务的镜像tag即可完成，具体步骤如下：
1. 更新FastGPT主服务镜像：将`fastgpt-app`的镜像tag更新为`v4.14.27`；
2. 更新FastGPT商业版服务镜像：将`fastgpt-pro`的镜像tag更新为`v4.14.27`。
完成镜像tag的更新后，按照原有部署流程重启相关服务，即可完成本次版本升级。

## 版本补充说明
本版本属于V4.14.x系列的迭代更新，仅针对升级脚本的异常问题进行修复，未新增额外功能或变更核心配置项，现有部署用户可根据自身实际使用情况选择是否进行升级。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41427)
