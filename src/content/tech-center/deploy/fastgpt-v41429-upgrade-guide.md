---
title: FastGPT V4.14.29版本升级步骤与变更说明
slug: /zh/deploy/fastgpt-v41429-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41429
source_type: 官方文档
---

# FastGPT V4.14.29版本升级步骤与变更说明

### 版本概述
本文档面向FastGPT自部署用户，提供V4.14.29版本的升级操作指引与变更说明，属于V4.14.x系列版本更新的官方内容。

### 升级操作步骤
仅需更新对应服务的镜像标签：将fastgpt-app（FastGPT主服务）的镜像tag更新为v4.14.29；将fastgpt-pro（FastGPT商业版）的镜像tag更新为v4.14.29。

### 版本变更说明
本次更新包含两项核心变更：一是修复微信发布渠道的登录、登出及二维码状态接口的权限校验逻辑，改为使用发布渠道ID进行鉴权，并校验渠道类型，可避免非微信发布渠道被误操作；二是适配了最新的微信发布渠道SDK。该权限修复仅覆盖微信发布渠道的上述三类接口，不影响其他发布渠道或系统其他核心功能的运行。若升级后出现相关接口的权限校验失败问题，需确认对应发布渠道的ID与类型配置是否正确，避免出现鉴权异常。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41429
