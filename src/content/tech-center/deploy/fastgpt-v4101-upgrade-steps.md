---
title: FastGPT V4.10.1版本升级操作与变更说明
slug: /zh/deploy/fastgpt-v4101-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4101
source_type: 官方文档
---

# FastGPT V4.10.1版本升级操作与变更说明

## 升级前置说明
本次为FastGPT V4.10.1版本的升级操作说明，仅需更新指定镜像，其余组件无需升级。需要更新的镜像包括：FastGPT官方镜像tag设为`v4.10.1-fix3`，商业版镜像tag设为`v4.10.1`，`fastgpt-plugin`镜像tag设为`v0.1.3`；`mcp_server`、Sandbox、AIProxy组件无需执行更新操作。

## 升级执行步骤
1.  完成对应镜像的更新拉取与部署配置。
2.  商业版用户需执行升级脚本：在任意终端发起HTTP POST请求，将`{{rootkey}}`替换为环境变量中的rootkey值，`{{host}}`替换为FastGPT的域名，执行以下命令：
    ```bash
    curl --location --request POST https://{{host}}/api/admin/initv4101 \
    --header rootkey: {{rootkey}} \
    --header Content-Type: application/json
    ```
3.  完成升级后，需为自动同步的知识库添加新的定时任务配置。

## 本次升级的变更内容
### 新增功能
- 系统工具支持流输出能力
- 商业版第三方知识库定时同步支持全量同步，可同步整个目录
### 优化项
- 定时任务的报错日志将记录到对话日志中
- 封装应用动态form渲染组件
- 目录面包屑导航溢出时将显示省略号
### 修复问题
- 修复搜索类型系统工具无法正常显示的问题
- 修复部分系统工具的向下兼容问题
- 修复AI节点手动选择历史记录时导致system记录重复的问题
- 修复知识库tag无法滚动到底的问题
- 修复API知识库通过API导入文件时，自定义API解析参数未生效的问题
### 工具更新
- 新增Flux官方绘图工具
- 新增JinaAI工具集
- 新增阿里百炼Flux和通义万相绘图工具
- 纠正硅基流动画图工具的输出值类型

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4101)
