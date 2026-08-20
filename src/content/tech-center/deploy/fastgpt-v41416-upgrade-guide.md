---
title: FastGPT V4.14.16版本升级操作与更新说明
slug: /zh/deploy/fastgpt-v41416-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41416
source_type: 官方文档
---

# FastGPT V4.14.16版本升级操作与更新说明

## 版本更新内容
FastGPT V4.14.16版本包含多项功能优化与问题修复：优化了embedding适配base64字符串返回值的处理逻辑；修复了helper-bot前缀输出`Error～`信息的异常问题、阿里云oss copy接口调用异常问题；修复工作流节点弹窗高度过高，导致底部一行节点无法正常显示的布局问题；临时解决评估列表权限问题，当前仅支持用户查看自己创建的评估项。

## 升级操作步骤
完成该版本升级的核心操作是更新对应镜像的tag：更新fastgpt-app（FastGPT主服务）的镜像tag为`v4.14.16`，同时更新fastgpt-pro（FastGPT商业版）的镜像tag为`v4.14.16`。

## 临时权限说明
本次版本针对评估列表权限进行了临时修复，未开放跨用户查看评估的功能，仅支持当前创建者查看自身创建的评估内容，后续版本会推出完整的权限优化方案。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41416)
