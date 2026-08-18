---
title: FastGPT V4.8.2版本环境变量变更升级配置说明
slug: /zh/deploy/fastgpt-v482-env-variable-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/482
source_type: 官方文档
---

# FastGPT V4.8.2版本环境变量变更升级配置说明

## 版本变更核心说明
FastGPT V4.8.2版本核心变更为环境变量配置调整，同时新增了部分功能并修复已知问题。该版本新增了JS代码运行节点，支持更完整的类型提示；内容提取节点新增数据类型选择功能。同时修复了站点同步无法使用、定时任务无法输入内容的两类问题。

## 部署配置操作步骤
该版本需配置SANDBOX_URL环境变量，根据部署方式不同，操作步骤如下：
### Sealos部署流程
1. 进入应用管理页面，新建一个应用，指定镜像为`registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-sandbox:v4.8.1`。
2. 无需为该应用配置外网访问地址，设置容器端口为3000。
3. 应用部署完成后，复制该应用的内网访问地址。
4. 进入FastGPT应用的环境变量修改页面，新增环境变量`SANDBOX_URL=复制的内网地址`并保存。

### Docker部署流程
1. 拉取最新的docker-compose.yml文件作为配置参考。
2. 在配置文件中新增sandbox容器，同时为fastgpt和fastgpt-pro（商业版）容器新增SANDBOX_URL环境变量。
3. 注意：sandbox容器请勿开启外网访问，该容器未做凭证校验，直接暴露外网存在安全风险。

## 配置验证要点
完成配置后，可通过查看FastGPT应用的环境变量是否正确加载SANDBOX_URL参数，测试新增的JS代码运行节点、内容提取节点功能是否正常生效，同时确认站点同步、定时任务功能恢复正常。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/482)
