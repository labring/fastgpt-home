---
title: FastGPT v4.14.9版本官方修复问题速查
slug: /zh/reference/fastgpt-v4149-fix-quickcheck
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-14/4149
source_type: 官方文档小节
---

# FastGPT v4.14.9版本官方修复问题速查

## 结论
本页汇总FastGPT v4.14.9版本的官方修复内容，覆盖工作流、API知识库、接口调用、模型配置等多个场景的已知异常。升级至该版本可解决上述列出的所有技术问题。

## 具体怎么做
1. 确认当前FastGPT版本低于v4.14.9
2. 按照官方升级流程完成版本升级
3. 可对照以下修复场景验证问题是否解决：
   - 工作流嵌套插件运行详情保留与tool类型前缀整理
   - MCP toolset调用异常（toolId获取错误）
   - API知识库文件列表搜索框丢失
   - 工作流变量含特殊值($.)时的替换异常
   - 工作流引用agent工具的版本获取异常
   - 模型参数切换后残留导致调用失败
   - 分享链接关闭后AI历史回复无法展示
   - 工作流预览弹窗重新打开时表单输入内容丢失
   - 订阅套餐自定义字段不生效
   - login接口异步session报错日志
   - 判断器arrayAny类型无判断条件可选
   - 视频音频自定义文件流程开始无文件链接变量
   - 用户输入框消息未转义为Markdown格式
   - AgentV2上下文拼接错误
   - login接口安全风险
   - 嵌套工作流工具未按预期连接结束节点时父工作流无法停止

## 注意事项
本次修复仅针对FastGPT v4.14.9版本发布的已知问题，未覆盖其他版本的异常。修复内容包含工具调用、变量处理、界面组件、接口安全等多类技术问题。需严格遵循官方升级流程完成版本更新。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-14/4149)
