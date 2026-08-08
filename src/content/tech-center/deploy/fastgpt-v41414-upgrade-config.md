---
title: FastGPT V4.14.14版本升级与配置操作说明
slug: /zh/deploy/fastgpt-v41414-upgrade-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41414
source_type: 官方文档
---

# FastGPT V4.14.14版本升级与配置操作说明

## 版本更新概述
本页针对FastGPT V4.14.14版本的更新内容与配置要点进行说明。该版本主要优化了个人微信发布渠道的轮询策略，将拉取与回复解耦，避免数据量超大时出现阻塞；新增环境变量`WECHAT_CHANNEL_CONCURRENCY`，默认值为1000，用于控制微信渠道poll worker并发数，建议配置值大于等于在线渠道峰值。同时完善了内网地址检测功能，兼容deepseek工具调用+思考模式，避免接口返回400错误。

## 版本升级操作步骤
1. 更新镜像tag：更新fastgpt-app（FastGPT主服务）的镜像tag为`v4.14.14`；更新fastgpt-pro（FastGPT商业版）的镜像tag为`v4.14.14`。按照原有部署方式完成镜像拉取与服务重启即可完成版本升级。

## 配置注意事项
使用微信发布渠道时，需根据实际在线渠道峰值调整`WECHAT_CHANNEL_CONCURRENCY`的取值，默认值1000仅为通用参考值，若出现微信消息处理延迟或阻塞，可适当调高该参数。针对deepseek模型的工具调用场景，升级至该版本后无需额外配置即可自动兼容相关模式，若此前存在接口400报错，升级后可自动解决。内网地址检测功能会自动识别部署环境的内网地址，无需手动配置，若出现检测异常可检查部署网络环境。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41414
