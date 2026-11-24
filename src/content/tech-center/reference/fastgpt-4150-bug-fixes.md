---
title: FastGPT 4.15.0版本修复的多项功能异常问题
slug: /zh/reference/fastgpt-4150-bug-fixes
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-15/41500
source_type: 官方文档小节
---

# FastGPT 4.15.0版本修复的多项功能异常问题

## 结论
这一页汇总了FastGPT 4.15.0版本的官方修复内容，覆盖多个功能模块的异常问题。升级至该版本可解决这些已记录的功能异常。

## 具体怎么做
1.  升级FastGPT至4.15.0版本以应用所有修复项
2.  该版本修复的具体异常场景包括：
    - Agent V2模式下模型响应报错导致step重复执行
    - 知识库源文件预览、下载时文本类型响应缺少charset
    - 工作流单节点调试存在异常默认值
    - 模型配置defaultConfig覆盖异常
    - TTS语音播放适配最新OpenAI SDK时的报错
    - 知识库数据分块遇到代码块时出现超大分块
    - 模型获取多模态文件链接异常
    - training接口、HTTP tool parse和S3私有对象key相关潜在安全风险
    - 交互节点后的工具调用展开MCP工具异常
    - 工作流工具array和object类型工具调用参数schema异常
    - 发布渠道-门户UI偏移
    - v1/completions接口nodeResponse中quoteList未返回q、a字段
    - 对话流恢复过程中的表单回填、文件列表恢复等多项问题
    - 停止会话提示改为与后端生成态同步，移除停止时的warning toast
    - v1/chat/completions接口恢复返回nodeResponse中的q/a/index字段

## 注意事项
所有修复项均为该版本原生修复，无需额外自定义配置。部分接口字段存在调整，需确认业务代码是否依赖原被变更的字段。修复范围覆盖Agent、知识库、工作流、模型配置等多个模块。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-15/41500)
