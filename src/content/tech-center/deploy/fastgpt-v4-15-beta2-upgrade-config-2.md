---
title: FastGPT V4.15.0-beta2版本升级与配置变更说明
slug: /zh/deploy/fastgpt-v4-15-beta2-upgrade-config-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41502
source_type: 官方文档
---

# FastGPT V4.15.0-beta2版本升级与配置变更说明

## 版本核心变更项
本次版本主要包含镜像更新与环境变量调整两类核心变更。镜像方面，需将fastgpt-app（主服务）、fastgpt-pro（商业版）的镜像tag更新为v4.15.0-beta2；若使用Opensandbox，还需同步更新fastgpt-agent-sandbox和fastgpt-agent-volume-manager的镜像tag至v0.2.0。环境变量方面，若使用opensandbox，原环境变量`AGENT_SANDBOX_VOLUME_MANAGER_MOUNT_PATH`不再生效，需移除该配置，且opensandbox将固定将持久化数据挂载至`/workspace`，旧沙盒的持久化数据会受到影响。

## 可执行升级步骤
1. 拉取对应版本的镜像：执行镜像拉取命令，分别获取`fastgpt-app:v4.15.0-beta2`、`fastgpt-pro:v4.15.0-beta2`；若使用Opensandbox，额外拉取`fastgpt-agent-sandbox:v0.2.0`与`fastgpt-agent-volume-manager:v0.2.0`。
2. 编辑部署配置文件，移除`AGENT_SANDBOX_VOLUME_MANAGER_MOUNT_PATH`环境变量，避免配置冲突。
3. 重启FastGPT相关服务，完成版本升级。

## 功能优化与注意事项
本次版本新增支持Skill编辑功能，Agent可使用静态Skill，但暂不支持反向调用系统工具；重写了agentV2的循环逻辑；知识库搜索支持原生多模态embedding模型与图搜图功能；Chat API的`/v1/chat/completions`、`/v2/chat/completions`及chatTest接口会在工作流执行前校验dataId，若与请求或会话已有记录重复，将直接返回业务错误，避免脏数据进入后续流程。
优化内容包括OTEL日志采集格式调整、工作流无效连接模式禁用、节点名称超长适配等。修复了工作流单节点调试的异常默认值、模型配置defaultConfig覆盖异常、切换团队时本地chat缓存未清除等问题，同时优化了对话流恢复逻辑，刷新或断线续传后表单输入值可正确回填，避免出现空表单或文件丢失的情况。
需要注意，异常中断会话的恢复逻辑已优化，结合Redis stream活动检测可在约2分钟内将卡住的「生成中」会话纠正为已完成，同时保留30分钟MongoDB兜底策略，Redis短暂异常时不会误修改正在生成的会话；切换应用时会记住最近会话，同一浏览器内切换应用将恢复对应应用的上次chatId，不再共用全局会话ID。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41502)
