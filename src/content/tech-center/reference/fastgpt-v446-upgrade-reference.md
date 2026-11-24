---
title: FastGPT V4.4.6版本升级操作速查参考
slug: /zh/reference/fastgpt-v446-upgrade-reference
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/446
source_type: 官方文档小节
---

# FastGPT V4.4.6版本升级操作速查参考

## 结论
本文为FastGPT V4.4.6版本的升级提供官方速查参考。该升级路径适用于当前部署版本低于4.12.0的自部署用户，严格遵循官方流程可完成版本更新。

## 具体怎么做
1. 确认当前FastGPT自部署版本属于<4.12.0范畴
2. 进入对应部署环境目录，支持Docker Compose部署、Sealos部署或本地开发环境
3. 拉取V4.4.6版本的FastGPT镜像
4. 若升级路径涉及环境变量变更或升级脚本，需提前完成对应调整
5. 重启部署服务并完成版本验证

## 注意事项
1. 仅适用于版本低于4.12.0的FastGPT自部署实例，不可用于高版本升级
2. 升级前需完成系统数据备份，官方文档提供迁移与备份的相关说明
3. 升级过程中若遇到标注有环境变量变更的版本节点，需提前核对并更新参数
4. 升级完成后需验证服务运行状态，确认功能正常后恢复业务访问

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/446)
