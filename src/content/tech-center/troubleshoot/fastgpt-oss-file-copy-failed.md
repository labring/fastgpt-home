---
title: 解决FastGPT私有部署中OSS复制文件导致自定义插件上传失败问题
slug: /zh/troubleshoot/fastgpt-oss-file-copy-failed
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6648
source_type: GitHub issue
---

# 解决FastGPT私有部署中OSS复制文件导致自定义插件上传失败问题

## 现象
在FastGPT私有部署4.14.8.3版本中，上传自定义.js插件时会出现保存失败的问题：
1. 插件文件先通过预签名URL上传至OSS的`system/plugin/tools/temp/`临时目录
2. 点击「保存/确认」后，前端调用`POST /api/core/plugin/admin/pkg/confirm`接口
3. 接口返回500错误，后台报错日志显示`Failed to move file from system/plugin/tools/temp/saveFileToOSS.js to system/plugin/tools/saveFileToOSS.js: The specified key does not exist.`，报错参数中`x-oss-copy-source`的路径出现源与目标文件互换，且路径中的`/`被编码为`%2F`。

## 可能原因
该问题由OSS存储适配器的`copyObjectInSelfBucket`方法逻辑错误引发。调用阿里云OSS的copyObject接口时，源文件与目标文件路径被错误互换，同时路径分隔符被错误编码，导致OSS无法找到指定源文件，返回`NoSuchKey`的404错误。

## 排查步骤
1. 确认当前FastGPT为私有部署版本，且版本号为4.14.8.3，使用阿里云OSS作为存储服务。
2. 查看FastGPT后台的错误日志，确认是否存在`Failed to move file from ... to ...: The specified key does not exist.`的报错，以及报错参数中`x-oss-copy-source`的路径是否存在源目标互换、路径分隔符被编码的情况。
3. 检查存储配置，确认`STORAGE_VENDOR`设置为`oss`，且`STORAGE_REGION`、`STORAGE_PUBLIC_BUCKET`、`STORAGE_PRIVATE_BUCKET`等相关配置正确。
4. 手动在OSS控制台执行相同的文件复制操作，验证是否能正常完成，排除OSS本身的权限或配置问题。

## 解决与验证
该问题需通过修复`copyObjectInSelfBucket`方法的逻辑来彻底解决。临时可按以下步骤验证：
1. 确认OSS桶的权限配置正确，确保FastGPT服务拥有该桶的读写权限。
2. 等待官方发布对应修复补丁，或自行修改`OssStorageAdapter.copyObjectInSelfBucket`方法的代码，修正源与目标文件路径的互换错误，以及路径编码问题。
3. 修复完成后，重新上传自定义插件，确认文件能正常从临时目录复制到目标目录，且接口返回正常，插件保存成功。
4. 检查后台日志，确认不再出现`NoSuchKey`相关的报错。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/6648)
