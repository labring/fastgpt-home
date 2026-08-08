---
title: FastGPT V4.15.0-beta3版本升级及环境变量配置说明
slug: /zh/deploy/fastgpt-v4-15-beta3-upgrade-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41503
source_type: 官方文档
---

# FastGPT V4.15.0-beta3版本升级及环境变量配置说明

## 升级操作步骤
该版本需更新三个核心镜像的标签：fastgpt-app（主服务）、fastgpt-pro（商业版）、fastgpt-code-sandbox，将其镜像tag统一设置为`v4.15.0-beta3`，即可完成基础升级部署。

## 环境变量配置变更
该版本新增多个沙箱相关的安全与性能配置环境变量，默认值及说明如下：
- `SANDBOX_API_MAX_BODY_MB`：默认值8MB，限制`/sandbox` API的JSON请求体总大小，包含variables参数
- `SANDBOX_MAX_OUTPUT_MB`：默认值10MB，限制单次代码执行输出JSON的总大小，包含返回值和日志
- `CHECK_INTERNAL_IP`：默认值为`true`，开启沙箱网络请求的内网IP检查以降低SSRF风险
- `SANDBOX_MAX_TIMEOUT`：默认值60000毫秒，设置单次代码执行的超时时间
- `SANDBOX_MAX_MEMORY_MB`：默认值256MB，单个沙箱的内存上限，运行时额外预留50MB开销
- `SANDBOX_POOL_SIZE`：默认值20，配置JS/Python预热worker的数量
- `SANDBOX_REQUEST_MAX_COUNT`：默认值30，限制单次代码执行允许发起的最大网络请求数
- `SANDBOX_REQUEST_TIMEOUT`：默认值60000毫秒，设置沙箱内单次网络请求的超时时间
- `SANDBOX_REQUEST_MAX_RESPONSE_MB`：默认值10MB，限制沙箱内单次网络响应体的大小
- `SANDBOX_REQUEST_MAX_BODY_MB`：默认值5MB，限制沙箱内单次网络请求体的大小
- `SANDBOX_QUEUE_ID_CONCURRENCY`：默认值为空，配置后可按queueId对运行接口实现分组排队，为空则不启用排队功能

## 版本更新内容概要
该版本新增多模态模型支持音视频输入，分享链接与门户页支持手动语言切换，不再强制依赖浏览器语言自动识别；优化了Skill模块弹窗样式、Skill list接口性能，新增工作流节点名称与介绍输入功能，工作流编辑页登录失效时会自动保存草稿用于恢复，同时更新了登录页UI。修复了TTS语音播放适配最新SDK的报错问题，解决了知识库数据分块时遇到代码块可能出现超大分块的异常。代码优化方面调整了token计算依赖以提升性能，重写对话框代码实现模块化细分，优化单测性能，将全量测试从10分支耗时降至5分钟，升级至TS6并增强GitHub Action的安全性。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41503
