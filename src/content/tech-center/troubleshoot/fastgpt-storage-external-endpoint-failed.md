---
title: 解决FastGPT 4.14.11配置STORAGE_EXTERNAL_ENDPOINT启动失败问题
slug: /zh/troubleshoot/fastgpt-storage-external-endpoint-failed
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6770
source_type: GitHub issue
---

# 解决FastGPT 4.14.11配置STORAGE_EXTERNAL_ENDPOINT启动失败问题

## 现象
在私有部署的FastGPT 4.14.11版本中，使用Docker Compose部署且配置`STORAGE_VENDOR=minio`等相关存储环境变量时，若添加`STORAGE_EXTERNAL_ENDPOINT=https://minio.xxx.com`配置，fastgpt容器会启动失败并持续重启，外部站点返回502错误。删除该环境变量后，容器可正常启动，日志显示`System initialized successfully`，站点恢复正常。关键报错信息为`Failed to ensure external public bucket exists`和`System initialization failed [s3_error] public bucket: UnknownError`。

## 可能原因
该问题属于FastGPT 4.14.11版本的回归问题，当配置`STORAGE_EXTERNAL_ENDPOINT`后，系统会执行外部存储桶的健康校验逻辑，若校验失败会直接终止主服务启动流程，而非跳过校验继续运行。

## 排查步骤
1. 确认当前FastGPT版本为4.14.11，部署方式为Docker Compose，使用自建MinIO作为对象存储。
2. 检查fastgpt服务的环境变量配置，确认是否包含`STORAGE_EXTERNAL_ENDPOINT`参数。
3. 查看fastgpt容器的启动日志，搜索`Failed to ensure external public bucket exists`或`System initialization failed [s3_error] public bucket: UnknownError`报错信息。
4. 验证外部MinIO反代域名`https://minio.xxx.com`的可访问性，确认对应存储桶`fastgpt-public`和`fastgpt-private`是否已创建（需按实际环境确认）。

## 解决与验证
### 解决方式
1. 移除`STORAGE_EXTERNAL_ENDPOINT`环境变量：若无需使用外部端点签发文件上传URL，可直接删除该配置，容器即可正常启动。
2. 修复外部存储访问问题：若需要保留该配置，需排查外部端点的访问故障，确保MinIO的反代域名`https://minio.xxx.com`可正常对外提供服务，且对应存储桶已提前创建（需按实际环境确认）。
### 验证方式
配置完成后执行`docker compose up -d`，观察fastgpt容器状态，若容器无重启且正常运行，访问站点返回正常内容，且日志显示`System initialized successfully`则验证成功。

> 来源：https://github.com/labring/FastGPT/issues/6770
