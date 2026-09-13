---
title: FastGPT应用和知识库数据丢失后的排查与恢复方法
slug: /zh/troubleshoot/fastgpt-data-loss-recovery
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1469
source_type: GitHub issue
---

# FastGPT应用和知识库数据丢失后的排查与恢复方法

## 现象
重启Docker容器后，FastGPT登录正常，但原有的应用和知识库数据全部丢失，MongoDB数据库中仅显示新创建的数据，无原有记录。

## 可能原因
数据丢失的可能原因包含三类：1. 数据库数据被手动或异常删除；2. FastGPT的数据库连接配置指向了其他MongoDB实例；3. MongoDB数据库持久化配置不正确，导致数据未正常持久化存储。

## 排查步骤
1. 检查MongoDB的数据卷挂载配置，确认本地挂载目录与容器内`/data/db`路径的映射关系正确，查看本地挂载目录是否存在有效数据文件。
2. 核对FastGPT的数据库连接参数，确认连接的MongoDB地址、账号、密码及数据库名称与目标实例一致，避免指向其他数据库。
3. 使用MongoDB可视化工具（如Mongo Compass）连接目标MongoDB实例，查询应用和知识库相关的集合，确认数据是否存在。
4. 查看MongoDB操作日志，排查是否存在数据删除或异常变更的操作记录。

## 解决与验证
若经排查确认数据未被删除且持久化配置正确，需通过原有备份文件恢复数据库数据。若发现持久化配置错误或指向了其他数据库，修正配置后重启Docker容器即可恢复数据。验证方式为重新登录FastGPT平台，查看应用和知识库数据是否正常显示。

> 来源: [FastGPT GitHub issue #1469](https://github.com/labring/FastGPT/issues/1469)
