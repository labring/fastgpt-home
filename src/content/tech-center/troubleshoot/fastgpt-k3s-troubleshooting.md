---
title: FastGPT基于K3s一键部署后服务异常排查与解决
slug: /zh/troubleshoot/fastgpt-k3s-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/612
source_type: GitHub issue
---

# FastGPT基于K3s一键部署后服务异常排查与解决

## 现象
使用提供的一键部署方案部署FastGPT后，基于K3s的部署环境出现服务异常。该部署方案基于K3s服务器环境，由微擎交付系统作为K3s的可视化管理控制面板，具体异常表现需按实际环境确认。

## 可能原因
K3s集群的节点运行状态出现异常，微擎交付系统中FastGPT应用的管理配置存在偏差，部署流程中出现未明确的异常环节。

## 排查步骤（有序列表，每步可照做）
1. 登录微擎交付系统，查看K3s集群的节点列表与运行状态，确认所有节点均正常在线。
2. 进入FastGPT应用的部署详情页面，核对应用的配置参数是否与部署方案的默认要求匹配。
3. 执行K3s集群相关的管理命令，查看FastGPT相关Pod的运行状态，具体命令需按实际环境确认。
4. 导出并查看FastGPT应用的日志输出，定位异常的具体原因。

## 解决与验证
解决方法需根据排查出的具体异常进行调整，比如修复K3s集群的异常节点、更正微擎控制面板中的应用配置参数等。验证方法为：在微擎控制面板中重启FastGPT应用，等待应用状态更新为正常后，访问FastGPT的服务地址确认核心功能可正常使用。

> 来源: [FastGPT GitHub issue #612](https://github.com/labring/FastGPT/issues/612)
