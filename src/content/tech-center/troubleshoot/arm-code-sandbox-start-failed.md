---
title: 解决FastGPT私有部署ARM架构环境下code-sandbox启动失败问题
slug: /zh/troubleshoot/arm-code-sandbox-start-failed
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6625
source_type: GitHub issue
---

# 解决FastGPT私有部署ARM架构环境下code-sandbox启动失败问题

## 现象
升级到V4.14.9后code-sandbox无法启动，从V4.14.8起该问题就已出现。在ARM架构的麒麟V10SP3操作系统环境中，sandbox无日志输出并持续重启；同操作系统的x86架构服务器可正常使用该组件。使用docker直接运行sandbox镜像时，无日志即退出；通过compose启动时，提示`code-sandbox exited with code 139 (restarting)`。即使使用官方新装部署流程，仍存在该启动失败问题。

## 可能原因
目前暂无官方明确的根因说明，结合报错代码139（通常与指令集不兼容、非法内存访问相关），以及仅ARM架构环境出现异常的表现，推测该问题与sandbox镜像的ARM版本适配性有关，具体根因需按实际环境进一步确认。

## 排查步骤
1.  确认当前部署环境的CPU架构为ARM架构，操作系统为麒麟V10SP3，核对FastGPT版本为V4.14.8及以上。
2.  单独执行docker run命令启动code-sandbox镜像，观察容器退出状态与日志，确认是否出现`exited with code 139`报错。
3.  对比同操作系统的x86架构服务器上的运行情况，确认仅ARM环境出现启动失败问题。
4.  检查docker compose配置文件中code-sandbox的相关配置，确认无配置错误（需按实际环境确认）。

## 解决与验证
目前暂未找到官方发布的针对性修复方案，可尝试以下方向验证：一是等待官方发布适配ARM架构的新版sandbox镜像；二是回退至V4.14.7及更早版本，确认ARM环境下sandbox是否可正常启动。验证方式为：启动docker compose服务后，查看code-sandbox容器的运行状态，确认不再持续重启，且无`exited with code 139`相关报错。

> 来源：[FastGPT GitHub Issue #6625](https://github.com/labring/FastGPT/issues/6625)
