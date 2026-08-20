---
title: FastGPT V4.14.16版本升级操作与更新说明
slug: /zh/deploy/fastgpt-v41416-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41416
source_type: 官方文档
---

# FastGPT V4.14.16版本升级操作与更新说明

### 版本更新内容
本版本包含多项针对性优化与问题修复：优化了embedding适配base64字符串返回值的逻辑；修复了helper-bot前缀输出`Error～`信息的问题、阿里云OSS copy接口的相关问题、工作流节点弹窗高度过高导致底部一行节点无法显示的问题；临时解决了评估列表权限问题，当前仅支持用户查看自己创建的评估任务。
### 升级操作步骤
该版本的升级仅需更新对应服务的镜像tag即可完成：
1.  更新fastgpt-app（FastGPT主服务）的镜像tag为`v4.14.16`；
2.  更新fastgpt-pro（FastGPT商业版）的镜像tag为`v4.14.16`。
请确保部署环境中已正确配置镜像拉取权限，避免更新失败。
### 注意事项
该升级仅适用于已部署的4.14.x系列版本，请勿直接跨大版本执行升级。使用阿里云对象存储的用户需确认自身业务是否涉及OSS copy接口调用，本次修复已覆盖该场景的异常问题。涉及embedding服务的部署场景，需注意本次优化适配了base64格式的返回值，若此前存在自定义的结果解析逻辑，需同步调整适配。评估列表权限的临时修复为当前版本的过渡方案，后续版本可能会推出正式的权限优化方案。
> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41416)
