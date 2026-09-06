---
title: 解决FastGPT中putAppById的/app/update请求问题
slug: /zh/troubleshoot/fastgpt-app-update-request-handler
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/253
source_type: GitHub issue
---

# 解决FastGPT中putAppById的/app/update请求问题

## 现象
调用putAppById方法时，会发起路径为/app/update?appId=xxx的PUT请求，无法明确该请求的处理者。此前曾混淆API接口与后台服务代码的关系，误以为相关后台服务未开源。

## 可能原因
混淆API接口与后台服务代码的定义，导致无法快速定位请求处理的位置；或未找到正确的API目录，无法查找对应请求的处理文件。

## 排查步骤
1. 明确API接口即为请求处理的入口，确认API目录下的接口文件对应具体请求逻辑。
2. 根据请求路径/app/update，定位到pages/api/app/update目录下的接口文件。
3. 核对请求路径与接口文件的对应关系，确认处理逻辑所在位置。

## 解决与验证
处理该PUT请求的接口为pages/api/app/update。若此前查找目录错误，可调整至正确的API目录排查，即可定位请求的处理逻辑。

> 来源: [FastGPT GitHub issue #253](https://github.com/labring/FastGPT/issues/253)
