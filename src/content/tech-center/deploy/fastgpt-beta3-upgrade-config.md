---
title: FastGPT V4.15.0-beta3版本升级与环境变量配置说明
slug: /zh/deploy/fastgpt-beta3-upgrade-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41503
source_type: 官方文档
---

# FastGPT V4.15.0-beta3版本升级与环境变量配置说明

## 版本升级镜像变更
本次V4.15.0-beta3版本升级需更新三个核心服务的镜像标签：fastgpt-app（主服务）、fastgpt-pro（商业版服务）、fastgpt-code-sandbox（代码沙箱服务），均需设置为`v4.15.0-beta3`。用户需在部署配置文件中替换原有镜像tag，完成镜像拉取与服务重启。

## 环境变量调整说明
本次版本新增多项沙箱相关环境变量，默认值与功能说明如下：
- `SANDBOX_API_MAX_BODY_MB`：默认值8MB，限制`/sandbox` API JSON请求体总大小（含variables）
- `SANDBOX_MAX_OUTPUT_MB`：默认值10MB，限制单次代码执行输出JSON大小（含返回值和日志）
- `CHECK_INTERNAL_IP`：默认值`true`，开启沙箱网络请求的内网IP检查，降低SSRF风险
- `SANDBOX_MAX_TIMEOUT`：默认60000毫秒，设置单次代码执行超时时间
- `SANDBOX_MAX_MEMORY_MB`：默认256MB，单个沙箱内存上限，运行时额外预留50MB开销
- `SANDBOX_POOL_SIZE`：默认20，JS/Python预热worker数量
- `SANDBOX_REQUEST_MAX_COUNT`：默认30，单次代码执行允许的最大网络请求数
- `SANDBOX_REQUEST_TIMEOUT`：默认60000毫秒，沙箱内单次网络请求超时时间
- `SANDBOX_REQUEST_MAX_RESPONSE_MB`：默认10MB，沙箱内单次网络响应体最大大小
- `SANDBOX_REQUEST_MAX_BODY_MB`：默认5MB，沙箱内单次网络请求体最大大小
- `SANDBOX_QUEUE_ID_CONCURRENCY`：默认空值，启用后可按queueId对运行接口做分组排队，限制同一queueId的并发请求数

此外本次版本还新增多模态模型音视频输入支持，分享链接与门户页支持手动语言切换；优化了Skill模块弹窗样式、Skill list接口性能，新增工作流节点名称与介绍输入功能，工作流编辑页登录失效后可自动保存草稿用于恢复；修复了TTS语音播放适配最新OpenAI SDK的报错问题，解决了知识库数据分块时遇到代码块可能出现超大分块的问题。

## 快速升级与配置步骤
1.  拉取指定版本镜像：执行`docker pull fastgpt-app:v4.15.0-beta3`、`docker pull fastgpt-pro:v4.15.0-beta3`、`docker pull fastgpt-code-sandbox:v4.15.0-beta3`
2.  修改docker-compose.yml配置文件，将三个服务的`image`字段替换为对应带tag的镜像
3.  在`fastgpt-code-sandbox`服务的`environment`配置块中添加所需环境变量，示例如下：
    ```yaml
    fastgpt-code-sandbox:
      image: fastgpt-code-sandbox:v4.15.0-beta3
      environment:
        - SANDBOX_API_MAX_BODY_MB=8
        - CHECK_INTERNAL_IP=true
        - SANDBOX_QUEUE_ID_CONCURRENCY=5
    ```
4.  重启服务完成版本升级与配置生效。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41503
