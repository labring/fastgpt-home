---
title: 修改FastGPT连接MongoDB数据库名的操作方法
slug: /zh/troubleshoot/fastgpt-modify-mongodb-dbname
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2205
source_type: GitHub issue
---

# 修改FastGPT连接MongoDB数据库名的操作方法

## 现象
使用4.8.8-fix私有部署版本的FastGPT，尝试复用同一个MongoDB集群部署两个不同版本的FastGPT，当前默认数据库名为fastgpt，需要更换数据库名称。此前尝试修改数据库连接串未生效。

## 可能原因
需按实际部署环境确认，未正确在FastGPT的数据库连接串中配置目标数据库名。

## 排查步骤
1. 定位FastGPT部署配置中的MongoDB数据库连接串。
2. 查看连接串中当前使用的数据库名，确认是否为fastgpt。
3. 将连接串中的数据库名替换为自定义的目标名称。
4. 重新启动FastGPT服务，检查服务运行状态。

## 解决与验证
修改FastGPT的MongoDB数据库连接串中的数据库名即可完成更换。该操作需注意，不建议使用该方式复用MongoDB集群，后续可能引入多库支持功能，部署两个独立的MongoDB数据库更为稳妥。验证方式为启动FastGPT后，确认服务正常运行，且MongoDB中生成了对应自定义名称的数据库。

> 来源: [FastGPT GitHub issue #2205](https://github.com/labring/FastGPT/issues/2205)
