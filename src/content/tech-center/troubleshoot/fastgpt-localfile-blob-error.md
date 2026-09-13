---
title: 解决FastGPT调用localFile接口时的doc文件读取报错问题
slug: /zh/troubleshoot/fastgpt-localfile-blob-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5147
source_type: GitHub issue
---

# 解决FastGPT调用localFile接口时的doc文件读取报错问题

## 现象
用户在FastGPT私有部署V4.9.6版本中，通过Node.js的axios获取文件的Blob对象，将其传入FormData后调用`/api/core/dataset/collection/create/localFile`接口，接口返回报错`Can not read doc file, please convert to PDF`。但使用Apifox调用相同接口、上传相同文件时，可以正常创建知识库条目。

## 可能原因
结合报错信息和调用差异，核心可能原因是代码中创建Blob对象时指定的MIME类型为通用的`application/octet-stream`，未匹配上传文件的实际文档类型，导致FastGPT接口无法正确识别文件格式，触发读取失败报错。其他需按实际环境确认的因素包括请求头配置、FormData参数格式等。

## 排查步骤
1.  查看代码中创建Blob对象的配置，确认`type`参数的取值。
2.  对比代码调用和Apifox调用的请求参数，重点检查FormData中`file`字段的Blob类型、文件名参数。
3.  查看FastGPT服务端的报错日志，确认文件格式识别失败的具体细节。
4.  测试使用上传文件实际的MIME类型替换当前的`application/octet-stream`，重新发起接口请求。

## 解决与验证
将代码中创建Blob对象的MIME类型修改为上传文件的实际类型，即可解决该问题。例如对于doc格式文件，可将Blob创建语句修改为`new Blob([blob], {type: 'application/msword'})`。验证步骤如下：
1.  修改Node.js代码中的Blob创建配置，替换为文件实际的MIME类型。
2.  重新运行代码，调用`/api/core/dataset/collection/create/localFile`接口上传文件。
3.  确认接口返回成功，知识库条目正常创建。若无法直接确定文件的MIME类型，可通过专业的文件类型识别工具或相关npm包自动获取正确类型。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5147)
