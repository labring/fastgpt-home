---
title: FastGPT V4.8.3版本升级操作步骤速查
slug: /zh/reference/fastgpt-v483-upgrade-quickref
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/483
source_type: 官方文档小节
---

# FastGPT V4.8.3版本升级操作步骤速查

## 结论
V4.8.3是FastGPT的历史正式版本，属于<4.12.0版本升级范畴。该版本未标注专属环境变量变更或升级脚本要求，升级流程可依托官方现有部署规范执行。

## 具体怎么做
1. 确认当前FastGPT运行版本低于V4.8.3
2. 停止当前正在运行的FastGPT服务
3. 拉取标签为4.8.3的FastGPT部署镜像
4. 若使用Docker Compose部署，更新配置文件中的镜像标签至4.8.3
5. 若使用其他部署方式，可参考官方对应部署文档调整镜像版本
6. 执行启动命令，完成服务重启

## 注意事项
1. 升级前需完成数据备份，可参考官方迁移&备份流程执行
2. 若当前版本为V4.8.2，该版本存在环境变量变更，升级前需核对原有环境变量配置
3. 升级过程中若出现异常，可参考官方故障排查、通用问题排查流程处理
4. 请勿直接升级至非相邻版本，需按官方版本升级说明逐步执行

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/483)
