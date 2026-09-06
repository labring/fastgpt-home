---
title: FastGPT V4.9.8版本升级内容与操作验证说明
slug: /zh/deploy/upgrade-v4-9-8
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/498
source_type: 官方文档
---

# FastGPT V4.9.8版本升级内容与操作验证说明

## 这个版本改了什么
本版本新增多项功能与优化修复。新增功能包括支持Toolcalls并行执行，将所有内置任务从非stream模式调整为stream模式，可在模型额外Body参数中强制指定stream=false覆盖设置；新增qwen3模型预设；语雀知识库支持设置根目录；可配置密码过期时间，过期后下次登录强制要求修改密码；密码登录增加preLogin临时密钥校验；支持Admin后台配置发布渠道和第三方知识库的显示隐藏。优化内容包括Chat log list优化以避免大数据时超出内存限制，预加载token计算worker以避免主任务中并发创建导致线程阻塞，工作流节点版本控制交互优化，网络获取以及html2md优化以支持视频和音频标签的转换。修复的问题包括应用列表/知识库列表删除行权限展示问题，打开知识库搜索参数后重排选项自动被打开的问题，LLM json_schema模式API请求格式错误，重新训练时图片过期索引未成功清除导致图片丢失，重新训练权限问题，文档链接地址问题，Claude工具调用因index为空导致的失败，嵌套工作流在工具调用下包含交互节点时的流程异常。

## 升级前要确认的事
升级前需完成数据备份，同时确认mcp_server、Sandbox、AIProxy无需执行更新操作。

## 升级步骤（照做）
1. 完成数据备份。
2. 更新FastGPT镜像tag为v4.9.8，更新FastGPT商业版镜像tag为v4.9.8；mcp_server、Sandbox、AIProxy无需更新。

## 升级后怎么验证
可通过以下方式验证升级效果：查看模型预设列表确认qwen3模型已添加；配置密码过期时间并验证过期后登录强制修改密码的逻辑；在Admin后台查看发布渠道和第三方知识库的显示隐藏配置项；测试Toolcalls并行执行功能；验证Claude工具调用、嵌套工作流等修复项的功能正常；测试大数据量下Chat log列表加载是否正常；测试网络获取视频和音频标签转换功能是否正常。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/498)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
