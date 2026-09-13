---
title: 解决FastGPT增强PDF解析中marker镜像CPU启动失败问题
slug: /zh/troubleshoot/fastgpt-marker-cpu-start-failure
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4136
source_type: GitHub issue
---

# 解决FastGPT增强PDF解析中marker镜像CPU启动失败问题

## 现象
使用FastGPT的增强PDF解析功能时，marker镜像未正确启动，无法正常完成PDF解析任务。该问题出现在集成显卡无法被系统正确识别的环境中。

## 可能原因
集成显卡未被系统正确识别，导致marker镜像无法正常加载或启动。由于marker镜像的运行依赖显卡相关资源，当集成显卡无法被系统识别时，镜像启动流程受阻。具体触发条件需结合实际环境确认。

## 排查步骤
1. 登录系统，查看集成显卡的设备识别状态，确认是否存在未识别或异常的显卡设备。
2. 进入FastGPT的配置页面，检查marker镜像的运行参数与依赖配置。
3. 尝试调整镜像的运行模式，切换至纯CPU运行模式，相关操作需按实际环境确认。

## 解决与验证
尝试将marker镜像切换至纯CPU运行模式，避免依赖集成显卡资源。调整相关配置后，启动marker镜像，验证镜像是否正常运行，再测试增强PDF解析功能是否可正常完成解析任务。具体的配置参数与操作步骤需结合实际部署环境确定。

> 来源: [FastGPT GitHub issue #4136](https://github.com/labring/FastGPT/issues/4136)
