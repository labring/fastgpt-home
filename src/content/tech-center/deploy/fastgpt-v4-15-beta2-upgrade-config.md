---
title: FastGPT V4.15.0-beta2版本升级与配置变更说明
slug: /zh/deploy/fastgpt-v4-15-beta2-upgrade-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41502
source_type: 官方文档
---

# FastGPT V4.15.0-beta2版本升级与配置变更说明

## 镜像更新步骤
该版本需更新对应服务的镜像标签，具体操作如下：将fastgpt-app（主服务）、fastgpt-pro（商业版）的镜像tag更新为v4.15.0-beta2；若部署时使用了Opensandbox，需额外更新fastgpt-agent-sandbox和fastgpt-agent-volume-manager的镜像tag为v0.2.0。

## 环境变量调整
若使用Opensandbox，原环境变量`AGENT_SANDBOX_VOLUME_MANAGER_MOUNT_PATH`不再生效，可直接移除该配置项。当前opensandbox已固定将持久化数据挂载至`/workspace`，旧版本的沙盒持久化配置将受到影响，需提前做好适配。

## 核心功能与修复变更
该版本新增Skill编辑功能，Agent支持静态Skill使用（暂不支持反向调用系统工具）；重写了agentV2 loop逻辑，知识库搜索支持原生多模态embedding模型及图搜图；Chat API新增dataId校验机制，`/v1/chat/completions`、`/v2/chat/completions`与chatTest在工作流执行前会校验本轮dataId是否与请求内或当前会话已有记录重复，重复时将直接返回业务错误，避免脏数据进入工作流。
优化内容包括OTEL日志采集格式调整、禁用工作流无效连接模式、工作流节点名称超长适配、知识库搜索测试交互优化、响应详情展示优化等；修复了工作流单节点调试异常默认值、模型配置defaultConfig覆盖异常、切换团队时本地chat缓存未清除、对话流恢复时表单输入值丢失等多个问题，同时优化了流恢复暂停体验（暂停后等待后端真实生成态，工作流未收尾时输入区禁发并提示「停止中」）、异常中断会话恢复速度（结合Redis stream活动检测约2分钟无心跳即可纠正卡住的「生成中」会话，保留30分钟Mongo兜底避免Redis异常误操作）等交互逻辑。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41502)
