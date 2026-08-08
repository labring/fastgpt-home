---
title: FastGPT V4.14.14版本升级操作与更新说明
slug: /zh/deploy/fastgpt-v41414-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41414
source_type: 官方文档
---

# FastGPT V4.14.14版本升级操作与更新说明

## 版本更新详情
FastGPT V4.14.14版本针对多项功能进行了优化与问题修复。其中，个人微信发布渠道的轮询策略得到优化，解耦拉取与回复流程，避免在数据量较大时出现服务阻塞的情况；同时完善了内网地址检测的逻辑，提升了内网环境下的适配性；此外，该版本新增了对deepseek工具调用+思考模式的兼容，防止调用接口时返回400错误。

## 升级操作步骤
本次升级的核心操作是更新对应服务的镜像tag，具体可按照以下步骤执行：
1.  更新fastgpt-app（FastGPT主服务）的镜像tag为`v4.14.14`；
2.  更新fastgpt-pro（FastGPT商业版）的镜像tag为`v4.14.14`。
完成镜像版本更新后，重启对应的服务即可使新版本生效。

## 新增环境变量说明
本次版本新增了`WECHAT_CHANNEL_CONCURRENCY`环境变量，用于控制微信渠道poll worker的并发数量，该变量的默认值为1000。用户可根据自身业务的在线渠道峰值调整该参数的取值，建议配置值不低于在线渠道的峰值，以保障微信发布渠道的运行稳定性。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41414
