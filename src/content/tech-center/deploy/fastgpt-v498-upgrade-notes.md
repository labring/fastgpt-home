---
title: FastGPT V4.9.8版本升级操作与功能变更说明
slug: /zh/deploy/fastgpt-v498-upgrade-notes
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/498
source_type: 官方文档
---

# FastGPT V4.9.8版本升级操作与功能变更说明

## 版本升级操作步骤
执行升级前需先完成数据备份，避免数据丢失。随后更新镜像标签：将FastGPT官方镜像的tag设置为v4.9.8，商业版镜像同样使用v4.9.8作为tag。本次升级无需更新mcp_server、Sandbox以及AIProxy的镜像版本。

## 版本新增功能
本次更新新增多项实用能力：支持Toolcalls并行执行；将所有内置任务从非stream模式调整为stream模式，若需覆盖该默认行为，可在模型额外Body参数中强制指定stream=false；新增qwen3模型预设；语雀知识库支持设置根目录；可配置密码过期时间，过期后下次登录将强制要求修改密码；密码登录流程新增preLogin临时密钥校验；管理员后台支持配置发布渠道和第三方知识库的显示隐藏状态。

## 功能优化与问题修复
优化内容包括：优化Chat log列表展示逻辑，避免大数据场景下出现内存超限问题；预加载token计算worker，防止主任务并发创建时出现线程阻塞；优化工作流节点版本控制的交互体验；优化网络获取与html2md转换功能，新增支持视频和音频标签的转换。
本次修复的问题包括：应用列表、知识库列表的删除行权限展示异常问题；开启知识库搜索参数后，重排选项自动被打开的异常；修复LLM json_schema模式下的API请求格式错误；解决重新训练时图片过期索引未清除导致图片丢失的问题；修复重新训练的权限问题；修正文档链接地址；修复Claude工具调用因index为空导致调用失败的问题；修复嵌套工作流中包含交互节点时工具调用流程异常的问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/498)
