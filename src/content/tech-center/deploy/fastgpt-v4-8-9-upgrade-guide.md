---
title: FastGPT V4.8.9版本升级操作与更新内容说明
slug: /zh/deploy/fastgpt-v4-8-9-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/489
source_type: 官方文档
---

# FastGPT V4.8.9版本升级操作与更新内容说明

## 版本更新详情
V4.8.9版本包含多项新增功能、优化与修复。新增功能包括：文件上传配置由系统配置决定，不再依赖视觉模型；AI对话节点与工具调用支持开启图片识别，可自动获取对话框上传图片及用户问题中的图片链接；新增文档解析节点。
商业版新增功能包括：团队通知账号绑定，用于接收重要信息；知识库集合标签管理功能；知识库搜索节点支持标签过滤与创建时间过滤；转移App owner权限；支持删除所有对话引导内容；QA拆分支持自定义chunk大小，优化了gpt4o-mini拆分时chunk过大导致生成内容较少的问题。
优化项包括：实现对话框信息懒加载，减少网络传输；清除选文件缓存，支持重复选择同一文件。
修复的问题包括：知识库上传文件时，网络不稳定或文件较多情况下进度无法到100%的问题；删除应用后跳转至已删除应用提示无该应用的问题；插件动态变量配置默认值无法正常显示的问题；工具调用温度和最大回复值未生效的问题；函数调用模式下assistant role需传入content参数的问题（FC模式已弃用）；知识库文件上传进度更新异常的问题；知识库rebuilding时页面刷新到第一页的问题；知识库list openapi鉴权问题；分享链接新对话无法反馈的问题。

## 升级操作步骤
请按照以下步骤完成升级：
1. 做好数据库备份。
2. 修改镜像：将FastGPT官方镜像tag更新为v4.8.9，商业版镜像tag同样更新为v4.8.9，Sandbox镜像可选择不更新。
3. 商业版执行初始化：在任意终端执行以下命令：
curl --location --request POST https://{{host}}/api/admin/init/489 --header rootkey: {{rootkey}} --header Content-Type: application/json
其中{{rootkey}}需替换为环境变量中的rootkey，{{host}}需替换为FastGPT域名。该请求用于初始化多租户的通知方式，仅内部使用的场景无需执行。

## 升级注意事项
本次升级无需额外复杂配置，仅需按上述步骤操作即可。需注意，初始化请求仅针对多租户通知方式的初始化，非内部使用的场景请务必执行该步骤以确保功能完整。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/489)
