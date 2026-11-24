---
title: FastGPT V4.8.8版本更新内容技术速查
slug: /zh/reference/fastgpt-v488-update-quickcheck
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/488
source_type: 官方文档小节
---

# FastGPT V4.8.8版本更新内容技术速查

## 结论
本页整理FastGPT V4.8.8版本的官方更新内容，涵盖新增功能、体验优化与问题修复三类。用户可根据自身需求对应启用新功能或调整配置。

## 具体怎么做
1.  系统插件结构重构，支持向社区提交PR，具体参考官方指引《如何向FastGPT社区提交系统插件》。
2.  新增DuckDuckGo、飞书webhook两款系统插件，可直接在平台配置启用。
3.  提示词输入框与工作流内所有Textarea输入框，输入`/`即可唤起变量选择菜单，直接选取上游输出值，无需动态引入。
4.  商业版用户可启用知识库权限继承功能。
5.  体验优化包含移动端快速切换应用交互、节点图标更新、对话框引用增加额外复制案件便于复制、新增引用内容折叠功能、OpenAI SDK升级及自定义whisper模型接口适配调整。
6.  已修复Permission表声明、并行节点运行时间记录、嵌套节点运行详情展示、简易模式首次进入知识库配置获取、Log debug level配置无效、插件独立运行变量替换异常等6项问题。

## 注意事项
1.  OpenAI SDK升级后，自定义whisper模型接口无法直接适配一般FastAPI接口，需按官方指引调整。
2.  插件独立运行时，输入值会被执行变量替换，可能导致后续节点变量异常，需提前校验输入内容。
3.  简易模式首次进入时，需确保系统可正常获取知识库配置，避免出现配置失效问题。
4.  Log debug level配置需按官方要求设置，避免配置无效。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/488)
