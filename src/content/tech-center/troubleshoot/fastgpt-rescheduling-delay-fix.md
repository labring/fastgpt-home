---
title: 解决FastGPT勾选重排选项后响应时间过长的问题
slug: /zh/troubleshoot/fastgpt-rescheduling-delay-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/829
source_type: GitHub issue
---

# 解决FastGPT勾选重排选项后响应时间过长的问题

## 现象
在FastGPT私有部署环境中，勾选重排选项后，接口响应时间超过35秒；不勾选重排选项时，运行时间约为5秒。该响应延迟仅在启用重排功能时出现，未启用该功能时系统运行正常，属于典型的功能触发式性能异常。

## 可能原因
结合重排功能的运行逻辑与问题表现，未启用GPU资源是该问题的可能原因。重排功能通常需要调用计算资源完成处理，未启用GPU时会导致计算效率大幅下降，进而引发较长的响应延迟。

## 排查步骤
1. 检查当前FastGPT服务的GPU启用配置是否正确加载，确认配置项未被误关闭或未生效
2. 确认部署环境的GPU硬件是否正常运行，且可用资源满足FastGPT服务的运行需求
3. 验证GPU资源是否可被FastGPT服务正常调用，排除硬件或驱动层面的异常情况

## 解决与验证
启用GPU资源后，该响应时间过长的问题可得到解决。验证方式为：勾选重排选项后，测试接口响应时间是否恢复至不勾选重排选项时的约5秒水平，即可确认问题已修复。

> 来源: [FastGPT GitHub issue #829](https://github.com/labring/FastGPT/issues/829)
