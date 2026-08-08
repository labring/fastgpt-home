---
title: FastGPT V4.14.17版本升级步骤与更新说明
slug: /zh/deploy/fastgpt-v41417-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41417
source_type: 官方文档
---

# FastGPT V4.14.17版本升级步骤与更新说明

## 版本更新内容
本页针对FastGPT V4.14.17版本的升级操作与更新内容进行说明，该版本修复了三处核心运行问题。具体修复内容包括：修复API知识库中parentId字段的类型校验错误，该问题可能导致知识库关联配置出现异常；修复门户页对话场景下无法上传文件的问题，优化了文件上传的相关逻辑；此外商业版存在内部文件解析接口未内置的情况，若未配置S3 External Endpoint，会直接导致文件解析失败，影响对话中的文件处理流程。
## 升级操作步骤
完成该版本升级仅需更新对应服务的镜像tag：
1.  更新fastgpt-app（FastGPT主服务）的镜像tag为`v4.14.17`；
2.  更新fastgpt-pro（FastGPT商业版）的镜像tag为`v4.14.17`。
## 注意事项与使用边界
该版本的升级仅需更新对应镜像tag，无需执行额外的升级脚本。商业版用户需要特别注意S3 External Endpoint的配置，若未配置该参数，会触发文件解析失败的问题，无法正常处理对话中的文件上传请求。此外，该版本修复的问题仅覆盖API知识库类型校验、门户上传文件异常以及商业版文件解析依赖三个场景，若遇到其他类型的运行异常，需参考官方文档的通用排查流程进行处理。
> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41417
