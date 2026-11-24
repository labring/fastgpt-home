---
title: FastGPT V4.8版本更新功能、优化与修复速查
slug: /zh/reference/fastgpt-v4-8-update-reference
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/48
source_type: 官方文档小节
---

# FastGPT V4.8版本更新功能、优化与修复速查

## 结论
FastGPT V4.8版本包含多项工作流功能新增、性能优化与问题修复。本次更新覆盖工作流、定时任务、插件配置、对话处理等多个模块，可提升应用搭建效率与运行稳定性。

## 具体怎么做
1. 新增功能操作：
   - 工作流中添加判断器节点支持if/elseIf/else逻辑，preview版本的if else节点需删除重建。
   - 添加变量更新节点，支持更新运行中工作流输出变量或全局变量。
   - 启用工作流自动保存与版本管理，开启Debug模式可调试单个节点或逐步执行。
   - 配置定时执行应用实现定时任务，优化插件自定义输入的组件渲染。
   - 为分享链接配置发送对话前hook。
2. 优化项适配：
   - 工作流连线支持四向连接，可构建循环工作流。
   - 对话记录截取最大至50轮，保持偶数长度适配部分模型要求。
   - 使用ctrl或alt+enter换行，修复原换行符位置错误问题。
   - 简易模式更新配置后自动更新调试框内容，无需手动保存。
   - worker进程负责分配计算Token任务，优化工作流上下文传递性能。
   - 优化completions接口size限制与Node API中间件代码。
3. 修复与升级：
   - 修复工具调用name不能以数字开头、分享链接query全局变量缓存等问题。
   - 可通过V4.8.1升级脚本更新版本，V4.7.1版本需注意环境变量变更与升级脚本配置。

## 注意事项
- 工具调用需指定字段数据类型为"string, boolean, number"。
- HTTP节点出错后会终止进程，需做好异常处理配置。
- chat中存储变量配置已优化，修改变量后不会影响旧对话。
- 部分优化与修复关联GitHub官方issue，可参考对应链接排查问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/48)
