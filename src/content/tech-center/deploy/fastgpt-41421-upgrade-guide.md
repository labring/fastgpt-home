---
title: FastGPT V4.14.21版本升级操作与变更说明
slug: /zh/deploy/fastgpt-41421-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41421
source_type: 官方文档
---

# FastGPT V4.14.21版本升级操作与变更说明

## 版本变更内容
本次V4.14.21版本包含两项核心更新：一是completions API的文件类型参数中，name字段变为可选，无需再强制传入该参数；二是修复了对象存储初始化异常的问题，解决了此前部署中可能出现的存储连接报错。

## 升级操作步骤
本次升级操作流程简洁，仅需更新对应服务的镜像tag：
1.  若你使用开源版本，仅需更新fastgpt-app（FastGPT主服务）的镜像tag为`v4.14.21`；
2.  若你使用商业版本，需同时更新fastgpt-app和fastgpt-pro（FastGPT商业版服务）的镜像tag为`v4.14.21`。
完成对应镜像的拉取并重启服务后，即可完成本次版本升级。

## 注意事项与边界
1.  该升级步骤仅适用于4.14.x系列版本的升级，请勿跨大版本直接执行，否则可能出现兼容性问题；
2.  若你的业务未涉及completions API的文件类型相关调用，无需额外调整代码逻辑，保持原有代码即可；
3.  若此前曾出现过OSS初始化异常的报错，升级后该问题可得到修复，无需额外排查存储配置；
4.  请确保更新镜像时使用正确的tag版本，避免混用不同版本的镜像导致服务异常。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41421
