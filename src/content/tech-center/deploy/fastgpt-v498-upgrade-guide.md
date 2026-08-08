---
title: FastGPT V4.9.8版本升级步骤与更新说明
slug: /zh/deploy/fastgpt-v498-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/498
source_type: 官方文档
---

# FastGPT V4.9.8版本升级步骤与更新说明

## 版本更新内容
FastGPT V4.9.8版本包含新增功能、体验优化与问题修复。新增功能包括支持Toolcalls并行执行；将内置任务从非stream模式调整为stream模式，若需覆盖可在模型额外Body参数中强制指定`stream=false`；新增qwen3模型预设；语雀知识库支持设置根目录；可配置密码过期时间，过期后登录需强制修改密码；密码登录增加preLogin临时密钥校验；支持Admin后台配置发布渠道与第三方知识库的显示隐藏。
优化内容包括优化Chat log list展示，避免大数据场景下超出内存限制；预加载token计算worker，防止主任务并发创建导致线程阻塞；优化工作流节点版本控制交互体验；优化网络获取与html2md功能，支持视频和音频标签转换。
修复问题包括修复应用列表/知识库列表删除行权限展示异常、打开知识库搜索参数后重排选项自动开启、LLM json_schema模式API请求格式错误、重新训练时图片过期索引未清除导致图片丢失、重新训练权限异常、文档链接异常、Claude工具调用因index为空失败、嵌套工作流工具调用含交互节点时流程异常等问题。

## 升级操作步骤
本次升级需按以下流程操作：
1. 提前做好数据备份，避免升级过程中数据丢失。
2. 更新对应镜像的tag：FastGPT官方镜像更新为`v4.9.8`，商业版镜像同样更新为`v4.9.8`；mcp_server、Sandbox、AIProxy无需执行更新操作。

## 关键配置说明
部分新增功能需要额外配置才能生效：例如当内置任务的stream模式不符合需求时，可在模型的额外Body参数中添加`stream=false`强制使用非stream模式；可通过Admin后台配置密码过期时间，以及发布渠道、第三方知识库的显示隐藏状态；语雀知识库创建时可直接设置根目录路径。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/498
