---
title: FastGPT私有部署OSS配置异常导致的报错排查与解决
slug: /zh/troubleshoot/fastgpt-oss-reference-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6552
source_type: GitHub issue
---

# FastGPT私有部署OSS配置异常导致的报错排查与解决

## 现象
私有部署版本为4.14.8的FastGPT中，用户配置OSS存储后出现以下问题：
1.  对话框上传日志成功，且能正常生成OSS签名URL；
2.  发起对话请求时直接报错；
3.  应用日志显示`infra:s3 Failed to ensure private bucket exists`，具体错误为`ReferenceError: name is not defined`；
4.  按官方文档说明，`STORAGE_OSS_ENDPOINT`无需带协议，但配置不带协议时会启动报错，添加协议前缀后才能正常启动服务。

## 可能原因
结合报错信息与配置情况，问题可能来自两方面：
1.  `STORAGE_OSS_ENDPOINT`的配置与实际启动要求不符：官方文档说明该参数无需带协议，但实际部署中不带协议会触发启动失败；
2.  应用内部代码存在未定义变量引用：在创建OSS请求时，代码尝试使用未声明的`name`变量，抛出`ReferenceError`，导致无法确认私有存储桶是否存在。

## 排查步骤
1.  确认当前FastGPT私有部署版本为4.14.8，核对所有OSS相关环境变量的配置内容；
2.  调整`STORAGE_OSS_ENDPOINT`参数：先移除协议前缀尝试启动，若启动失败则恢复添加`https://`或`http://`协议前缀；
3.  查看应用运行日志，确认是否存在`Failed to ensure private bucket exists`和`ReferenceError: name is not defined`相关报错；
4.  校验其他OSS配置参数：包括`STORAGE_REGION`、`STORAGE_ACCESS_KEY_ID`、`STORAGE_SECRET_ACCESS_KEY`、`STORAGE_PRIVATE_BUCKET`等是否与实际OSS服务信息一致。

## 解决与验证
1.  针对`STORAGE_OSS_ENDPOINT`配置问题：根据实际启动情况调整参数，若不带协议启动失败，则添加对应协议前缀（如`https://oss-cn-shanghai.aliyuncs.com`）；
2.  针对`ReferenceError: name is not defined`报错：目前暂无临时修复方案，需等待官方代码更新修复该变量未定义的问题，同时可提前确认OSS私有存储桶是否已创建；
3.  验证方法：重新发起对话请求，确认不再触发报错，且能正常生成OSS签名URL，上传日志与对话流程恢复正常。

> 来源：[FastGPT GitHub Issue #6552](https://github.com/labring/FastGPT/issues/6552)
