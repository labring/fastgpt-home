---
title: 解决FastGPT部署中数据库存储时间少8小时的问题
slug: /zh/troubleshoot/fastgpt-db-time-adjustment
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/667
source_type: GitHub issue
---

# 解决FastGPT部署中数据库存储时间少8小时的问题

## 现象
在使用FastGPT的过程中，数据库存储的时间存在统一少8小时的情况。

## 可能原因
该问题通常由系统时区与北京时区不一致导致，Linux系统默认时区与北京时间存在8小时时差。

## 排查步骤
1. 确认当前系统时区与北京时间的时差，具体查看命令需按实际环境确认。
2. 检查FastGPT部署环境的时区配置，确认是否存在时区不匹配的情况。

## 解决与验证
可通过修改FastGPT部署镜像的时区配置来调整时间偏差。修改时区配置时需注意，可能会对定时任务的执行造成影响，需结合实际业务场景评估。验证方式可通过向数据库写入带时间戳的数据，查看存储的时间是否与北京时间一致。

> 来源: [FastGPT GitHub issue #667](https://github.com/labring/FastGPT/issues/667)
