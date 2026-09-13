---
title: 解决FastGPT 4.8.1版本AI对话终止后全局变量被清空的问题
slug: /zh/troubleshoot/fastgpt-terminate-global-vars-clear
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1582
source_type: GitHub issue
---

# 解决FastGPT 4.8.1版本AI对话终止后全局变量被清空的问题

## 现象
该问题出现在私有部署的FastGPT 4.8.1版本中，进行AI对话并点击终止操作后，全局变量会被清空，需重新设置，不符合预期的不被清空的效果。

## 可能原因
当前FastGPT的实现逻辑直接从对话流中获取内容，未正确保留全局变量的最新状态，导致对话终止时全局变量被清空，无法维持对话过程中配置的全局变量内容。

## 排查步骤
1. 进入FastGPT的AI对话页面，根据业务需求配置所需的全局变量。
2. 发起一次AI对话并点击终止按钮。
3. 刷新当前页面或重新进入对话配置页，检查全局变量是否仍保留初始配置内容。

## 解决与验证
需修改现有实现逻辑，不再直接从对话流中获取内容，新增独立的请求以获取最新的全局变量内容。验证步骤：
1. 完成代码修改并完成FastGPT服务的部署重启操作。
2. 进入AI对话页面，根据业务需求配置所需的全局变量。
3. 发起一次AI对话并点击终止按钮。
4. 刷新页面或重新进入对话配置页，检查全局变量是否未被清空，保留原有配置内容。

> 来源: [FastGPT GitHub issue #1582](https://github.com/labring/FastGPT/issues/1582)
