---
title: FastGPT V4.14.13版本升级操作与更新内容说明
slug: /zh/deploy/fastgpt-v4-14-13-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41413
source_type: 官方文档
---

# FastGPT V4.14.13版本升级操作与更新内容说明

本文档针对FastGPT V4.14.13版本的升级操作与更新内容进行说明。该版本共包含两项修复与一项优化：其一，修复了分享链接获取单条引用接口的鉴权失败问题，解决了通过分享链接访问对话内容时无法正确获取引用资源的异常；其二，修复了opensandbox鉴权绕过风险，提升了系统的访问安全性；其三，优化了completions接口，使其chatId参数支持null类型，适配更多的接口调用场景。

### 升级操作步骤
该版本的升级仅需完成镜像标签更新即可，具体步骤如下：
1. 更新fastgpt-app（FastGPT主服务）的镜像tag为`v4.14.13`，按照原有部署流程完成服务重启即可。

该升级仅适用于已部署4.14.x系列版本的FastGPT实例，请勿直接从非4.14.x版本执行此升级操作。在升级前，需确认当前部署的镜像拉取权限正常，避免出现镜像无法拉取的问题。对于自定义集成了completions接口的业务代码，需注意该接口现在支持chatId为null的传参，需提前适配相关逻辑，避免出现接口调用异常。另外，该版本未提及环境变量变更，无需额外调整原有配置项。
> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41413)
