---
title: FastGPT V4.11.0版本环境变量变更的升级处理方法
slug: /zh/reference/fastgpt-v4110-env-vars-upgrade
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/4110
source_type: 官方文档小节
---

# FastGPT V4.11.0版本环境变量变更的升级处理方法

## 结论
FastGPT V4.11.0版本存在环境变量配置变更，从低于V4.12.0的版本升级至该版本时，需完成环境变量的适配调整。该变更属于自部署FastGPT的核心配置调整，未正确更新配置可能导致服务无法正常启动，请严格按照官方指引完成配置修改后再部署。

## 具体怎么做
1. 停止当前运行的FastGPT服务实例
2. 备份当前使用的环境变量配置文件
3. 查阅官方文档中V4.11.0版本的环境变量变更说明，替换旧版环境变量为新格式参数
4. 拉取V4.11.0版本的FastGPT镜像
5. 使用更新后的配置重新启动服务。使用Docker Compose部署的用户，请直接修改对应配置文件中的环境变量字段。

## 注意事项
1. 该变更仅适用于从低于V4.12.0的版本升级到V4.11.0的场景
2. 未备份原有配置直接修改可能导致配置丢失，无法回滚
3. 升级后需检查服务日志，确认环境变量加载正常
4. 请勿跳过环境变量适配步骤直接升级，否则会触发启动错误

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/4110)
