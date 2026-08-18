---
title: FastGPT V4.14.8.1版本升级操作及更新说明
slug: /zh/deploy/fastgpt-v4-14-8-1-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41481
source_type: 官方文档
---

# FastGPT V4.14.8.1版本升级操作及更新说明

## 版本更新详情
本次FastGPT V4.14.8.1版本更新包含优化与修复两类内容。优化项为调整API文件库接口的返回逻辑：当接口无法获取title值时，将返回值的fallback设置为url；修复项为解决工作流编排场景中，无法正常获取agent工具版本列表的问题。本次更新未涉及环境变量变更，无需额外调整已配置的环境项。

## 镜像更新操作步骤
1. 打开当前部署使用的Docker Compose配置文件，定位到各服务的镜像配置字段；
2. 将FastGPT主服务、FastGPT商业版服务的镜像标签（tag）替换为`v4.14.8.1`；
3. 将sandbox服务的镜像标签替换为`v4.14.8`；
4. 其余组件包括fastgpt-plugin、mcp_server、AIProxy、mongo无需更新，保留原有镜像配置即可；
5. 执行`docker-compose up -d`命令重启相关服务，完成本次版本升级。

## 升级前置说明
若当前部署的FastGPT版本属于V4.14.x系列，可直接按照上述步骤完成升级，无需执行额外的升级脚本。此前部分V4.14.x版本需执行升级脚本，但本次V4.14.8.1更新本身无额外配置要求。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41481)
