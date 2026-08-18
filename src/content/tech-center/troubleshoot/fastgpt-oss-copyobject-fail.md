---
title: 解决FastGPT私有部署中OSS复制文件导致自定义插件上传失败问题
slug: /zh/troubleshoot/fastgpt-oss-copyobject-fail
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6648
source_type: GitHub issue
---

# 解决FastGPT私有部署中OSS复制文件导致自定义插件上传失败问题

## 现象
在FastGPT私有部署4.14.8.3版本中，搭配fastgpt-plugin:v0.5.4、@fastgpt-sdk/storage:0.6.15及ali-oss SDK:6.23.0时，上传自定义.js插件并点击保存确认后，接口返回500错误，插件保存失败。错误日志显示：`Failed to move file from system/plugin/tools/temp/<filename> to system/plugin/tools/<filename>: The specified key does not exist.`，状态码为404，错误码为`NoSuchKey`。同时请求参数中，`object`字段为临时文件路径，而`x-oss-copy-source`字段指向了正式存储的目标文件路径，且路径中的斜杠被编码为`%2F`，与预期的源路径不符。

## 可能原因
根据错误链路分析，问题出在`OssStorageAdapter.copyObjectInSelfBucket()`方法的参数处理逻辑上：该方法错误地交换了源文件和目标文件的路径，导致OSS尝试复制的源文件是实际的目标文件（尚未生成，不存在），而非已上传至临时目录的源文件；同时未正确处理路径中的斜杠编码，引发路径匹配错误，最终触发`NoSuchKey`报错。

## 排查步骤
1. 查看FastGPT插件服务的运行日志，确认是否存在`Failed to move file from system/plugin/tools/temp/xxx to system/plugin/tools/xxx: The specified key does not exist.`相关报错，以及状态码404、错误码`NoSuchKey`的记录。
2. 核对调用`copyObjectInSelfBucket`方法时传入的源路径和目标路径参数，确认是否将临时目录路径作为源、正式目录路径作为目标。
3. 登录OSS控制台，检查临时目录`system/plugin/tools/temp/`下是否存在已上传的插件文件，确认文件上传流程正常。
4. 查看SDK发起的OSS复制请求参数，确认`x-oss-copy-source`和`object`字段是否与预期的源、目标路径一致。

## 解决与验证
### 解决方法
修正`OssStorageAdapter.copyObjectInSelfBucket()`方法中的路径参数逻辑，确保`x-oss-copy-source`指向已上传至临时目录的源文件路径，`object`字段指向正式存储的目标文件路径，并正确处理路径中的斜杠编码，避免路径匹配错误。
### 验证步骤
1. 重新上传自定义.js插件，点击保存确认按钮。
2. 确认接口返回200成功状态，插件保存完成。
3. 登录OSS控制台，检查`system/plugin/tools/`目录下是否生成了对应的插件文件，临时目录中的临时文件已被正确处理。

> 来源：[FastGPT GitHub Issue #6648](https://github.com/labring/FastGPT/issues/6648)
