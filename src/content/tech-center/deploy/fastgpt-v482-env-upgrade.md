---
title: FastGPT V4.8.2版本环境变量变更与升级操作说明
slug: /zh/deploy/fastgpt-v482-env-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/482
source_type: 官方文档
---

# FastGPT V4.8.2版本环境变量变更与升级操作说明

## 版本变更说明
V4.8.2版本存在环境变量变更，同时附带多项功能更新与问题修复。本次更新新增了JS代码运行节点，该节点支持更完整的类型提醒，后续将持续完善功能；同时新增内容提取节点的数据类型选择功能，可更灵活地适配不同的内容处理需求。修复的问题包括新增的站点同步无法使用、定时任务无法输入内容的异常，进一步提升了系统的运行稳定性。

## 升级操作步骤
### Sealos部署升级
1. 在应用管理中新建一个应用，镜像为`registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-sandbox:v4.8.1`，无需外网访问地址，端口号为3000；
2. 部署完成后复制该应用的内网地址；
3. 点击变更FastGPT的环境变量，新增环境变量`SANDBOX_URL=内网地址`。

### Docker部署升级
1. 拉取最新docker-compose.yml文件参考；
2. 新增`sandbox`容器，并为`fastgpt`和`fastgpt-pro`（商业版）容器新增环境变量`SANDBOX_URL`；
3. 需注意sandbox容器请勿开启外网访问，该容器未做凭证校验，暴露外网会存在安全风险。

## 配置与使用注意事项
配置SANDBOX_URL时必须使用sandbox容器的内网地址，切勿使用公网地址，否则将无法正常建立连接。若使用商业版的fastgpt-pro容器，同样需要配置该环境变量，否则相关依赖沙盒的功能将无法正常运行。若出现站点同步失败、定时任务输入异常等问题，可优先检查SANDBOX_URL的配置是否正确。此外，sandbox容器未做安全校验，严禁对外网暴露，避免引发安全问题。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/482
