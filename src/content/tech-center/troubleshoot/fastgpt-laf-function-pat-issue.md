---
title: 解决FastGPT中Laf函数调用节点无法识别绑定PAT的问题
slug: /zh/troubleshoot/fastgpt-laf-function-pat-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3810
source_type: GitHub issue
---

# 解决FastGPT中Laf函数调用节点无法识别绑定PAT的问题

## 现象
公有云和私有部署的FastGPT均存在该问题，其中私有部署版本为v4.8.21。用户完成Laf账号PAT信息配置并验证通过后，新建工作流并添加"Laf函数调用"节点，该节点无法识别已绑定的PAT信息。即使重新执行Laf PAT绑定配置步骤，问题仍然存在。工作流节点应展示具体的应用名与函数名，但实际未加载相关内容。

## 可能原因
暂未明确具体根因，已知触发场景为完成Laf PAT绑定并验证通过后，工作流的Laf函数调用节点无法同步读取已配置的PAT信息，导致无法加载应用与函数列表。

## 排查步骤
1.  登录FastGPT平台，进入账号菜单的第三方账号页面，确认Laf账号的PAT信息已配置且验证通过。
2.  进入工作流编辑页面，新建工作流并添加"Laf函数调用"节点，查看节点是否可加载应用名与函数名。
3.  若节点未加载配置，重新进入第三方账号页面，重新提交Laf PAT配置并完成验证，再次回到工作流节点查看状态。
4.  确认私有部署版本是否为v4.8.21，匹配问题触发的版本范围。

## 解决与验证
解决方式：重新提交Laf PAT配置并完成验证，刷新工作流页面后查看节点配置。验证方式：在工作流的"Laf函数调用"节点中，确认可正常加载并选择具体的应用名与函数名，完成节点配置。若问题仍未解决，需结合实际部署环境进一步排查。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3810)
