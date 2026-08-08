---
title: FastGPT私有部署Bind Mount转Named Volume的数据迁移说明
slug: /zh/troubleshoot/fastgpt-bind-mount-named-volume
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6765
source_type: GitHub issue
---

# FastGPT私有部署Bind Mount转Named Volume的数据迁移说明

## 现象
私有部署FastGPT v4.14.9及更早版本采用Bind Mount方式挂载服务数据，v4.14.10及更新版本的docker-compose配置改用Named Volume方式挂载。用户在尝试将旧版部署配置修改为新版挂载方式时，担心直接修改配置会导致原有数据丢失，且未找到官方迁移脚本与相关说明文档。

## 可能原因
Bind Mount是直接将主机指定目录映射到容器内部，服务数据存储在主机的对应目录中；Named Volume则由Docker统一管理存储路径，数据存储在Docker默认的卷存储目录中。新版FastGPT调整了默认挂载方式，但未提供官方数据迁移脚本，导致用户直接修改配置时无法确认原有数据能否被新容器识别，进而产生数据丢失的顾虑。

## 排查步骤
1. 查看现有FastGPT部署的docker-compose配置文件，确认服务的volumes字段配置类型，区分Bind Mount与Named Volume。
2. 核对当前部署使用的FastGPT版本，确认是否为v4.14.9及更早的旧版部署。
3. 查阅v4.14.10及更新版本的官方docker-compose配置，确认Named Volume的具体配置参数，需按实际环境确认。
4. 检查官方发布的更新包中是否包含数据迁移相关脚本，若未找到则需自行评估迁移方案。

## 解决与验证
若直接修改配置为Named Volume而不迁移数据，原有Bind Mount目录中的数据不会自动复制到新的Named Volume中，新容器将无法读取原有配置、知识库等业务数据，可能引发服务异常。若需要保留原有数据，需手动将Bind Mount对应目录下的所有数据复制到Docker Named Volume中，具体操作步骤需按实际环境确认。
验证方式为：启动更新后的FastGPT容器，检查服务能否正常加载原有配置、知识库等数据，确认业务功能恢复正常。操作前需备份原有Bind Mount目录的全部数据，避免迁移过程中出现数据丢失。

> 来源：https://github.com/labring/FastGPT/issues/6765
