---
title: FastGPT OSS部署版插件上传失败问题排查与修复
slug: /zh/troubleshoot/fastgpt-oss-plugin-upload-failed
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6787
source_type: GitHub issue
---

# FastGPT OSS部署版插件上传失败问题排查与修复

## 现象
在FastGPT私有部署v4.14.5版本、使用OSS作为存储且插件版本为0.4.0的环境中，上传插件时点击“确定”会触发plugin项目报错，无法将.js文件从临时路径复制到正式路径。该问题在@fastgpt-sdk/storage 0.6.6版本被发现，且在0.6.15版本仍存在。

## 可能原因
问题出在@fastgpt-sdk/storage库的copyObjectInSelfBucket方法中：一是方法内的targetKey和sourceKey参数顺序写反，导致尝试复制不存在的源路径；二是调用OSS客户端的copy接口时，额外对sourceKey进行了编码，不符合接口使用要求。原错误代码逻辑为：对sourceKey进行编码后作为第一个参数传入copy接口，同时传入targetKey作为第二个参数，与正确的参数顺序和使用规则不符。

## 排查步骤
1. 确认当前FastGPT为私有部署v4.14.5版本，且使用OSS存储，插件版本为0.4.0。
2. 查看上传插件时的报错日志，定位到文件复制失败的相关错误信息。
3. 找到@fastgpt-sdk/storage库中的copyObjectInSelfBucket方法，核对参数处理与接口调用逻辑。
4. 参考阿里云OSS官方文档的copy对象接口规则，验证参数顺序与编码要求是否符合规范。

## 解决与验证
解决该问题需要修改copyObjectInSelfBucket方法的代码：调整targetKey与sourceKey的传入顺序，移除对sourceKey的编码步骤。正确的代码逻辑应为：直接使用原始的sourceKey，将targetKey和sourceKey按正确顺序传入OSS客户端的copy接口。修改完成后，重新上传插件即可正常完成文件复制，插件可正常部署使用。需注意该问题在@fastgpt-sdk/storage的0.6.6与0.6.15版本均存在。

> 来源：[FastGPT GitHub Issue #6787](https://github.com/labring/FastGPT/issues/6787)
