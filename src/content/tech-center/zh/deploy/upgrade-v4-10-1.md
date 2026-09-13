---
title: FastGPT V4.10.1 版本升级内容说明与操作指南
slug: /zh/deploy/upgrade-v4-10-1
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4101
source_type: 官方文档
---

# FastGPT V4.10.1 版本升级内容说明与操作指南

## 这个版本改了什么
本版本的更新涵盖新增功能、优化项、问题修复及工具更新。新增功能包括系统工具支持流输出，商业版第三方知识库定时同步支持全量同步并可同步整个目录。优化内容包含定时任务报错日志记录到对话日志、封装应用动态form渲染组件、目录面包屑导航溢出省略。修复的问题有搜索类型系统工具无法正常显示、部分系统工具向下兼容问题、AI节点手动选择历史记录时导致system记录重复、知识库tag无法滚动到底、API知识库通过API导入文件时自定义API解析参数未生效。工具更新包括新增Flux官方绘图工具、JinaAI工具集、阿里百炼Flux和通义万相绘图，以及纠正硅基流动画图工具输出值类型。

## 升级前要确认的事
需确认以下内容：一是需更新的镜像版本，FastGPT镜像tag为v4.10.1-fix3，商业版FastGPT镜像tag为v4.10.1，fastgpt-plugin镜像tag为v0.1.3；mcp_server、Sandbox、AIProxy无需更新。二是若为商业版用户，需提前准备环境变量中的rootkey以及FastGPT域名，用于执行升级脚本。

## 升级步骤（照做）
1. 更新对应镜像至指定tag版本。
2. 商业版用户从任意终端发起以下HTTP请求：将命令中的{{rootkey}}替换为环境变量中的rootkey，{{host}}替换为FastGPT域名。请求命令如下：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4101' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
执行该请求后，将自动为自动同步的知识库加入新的定时任务。非商业版用户无需执行该脚本。

## 升级后怎么验证
可通过以下方式验证升级效果：一是检查系统工具是否支持流输出，搜索类型系统工具是否正常显示；二是查看定时任务报错是否已记录到对话日志；三是检查知识库tag区域是否可正常滚动到底；四是测试API知识库通过API导入文件时，自定义API解析参数是否生效；五是确认新增的Flux官方绘图工具、JinaAI工具集、阿里百炼Flux和通义万相绘图是否可正常使用。商业版用户可验证第三方知识库定时同步是否支持全量同步整个目录。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4101)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
