---
title: 解决Docker部署FastGPT后无操作时硬盘高频写入的排查修复问题
slug: /zh/troubleshoot/fastgpt-docker-disk-write-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5732
source_type: GitHub issue
---

# 解决Docker部署FastGPT后无操作时硬盘高频写入的排查修复问题

## 现象
在Docker环境中部署FastGPT并使用OB数据库时，无操作状态下硬盘出现高频写入，写入速度达40m/s，硬盘占用率达50%。该现象并非偶发，停止FastGPT项目后，硬盘写入量瞬间降至几十k每秒，占用率降至0-1%。另有排查结果显示，OB容器在无操作状态下会持续产生高频硬盘读写行为，部分部署在群晖环境的场景中，该行为与数据库空间回收操作相关。

## 可能原因
该问题大概率与所使用的OB数据库相关，无操作状态下数据库可能触发空间回收等后台任务，从而导致高频硬盘写入。

## 排查步骤
1.  停止FastGPT相关容器，观察硬盘写入速度与占用率变化，确认该异常是否与FastGPT部署直接相关。
2.  定位系统中产生高频写入的进程，确认读写行为是否来自OB数据库容器。
3.  查看OB数据库的后台日志，确认是否存在空间回收或其他后台任务触发高频写入。
4.  需按实际环境确认数据库的配置参数与运行状态。

## 解决与验证
个人部署场景建议更换为轻量型数据库。更换完成后，观察无操作状态下的硬盘写入速度与占用率，确认异常写入行为消失，硬盘占用率恢复至正常水平。

> 来源: [FastGPT GitHub issue #5732](https://github.com/labring/FastGPT/issues/5732)
