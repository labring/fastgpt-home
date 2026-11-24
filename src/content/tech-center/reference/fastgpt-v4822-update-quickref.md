---
title: FastGPT V4.8.22版本更新内容速查
slug: /zh/reference/fastgpt-v4822-update-quickref
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/4821
source_type: 官方文档小节
---

# FastGPT V4.8.22版本更新内容速查

## 结论
本文整理了FastGPT V4.8.22版本的官方更新内容，涵盖新增功能、体验优化、问题修复三类项，同时包含该版本的升级脚本与V4.8.20环境变量变更说明，供部署与使用人员参考。

## 具体怎么做
1.  版本升级：可使用官方提供的V4.8.22升级脚本完成部署更新，如需适配环境变量变更，可参考V4.8.20版本的说明文档。
2.  新增功能配置：
    - 全局变量支持拖拽排序，可在变量管理页面调整顺序
    - LLM模型调用时支持配置top_p、response_format、json_schema参数
    - 向量模型可开启归一化配置，适配Doubao embedding等未归一化向量模型
    - AI对话节点可配置输出思考过程结果，供其他节点引用
    - 可使用新增的Doubao1.5模型预设、阿里embedding3预设
    - 对话日志新增按来源分类、标题检索、导出功能
    - 新增弃用/已删除插件提示
3.  其余优化项与问题修复无需额外配置，升级后自动生效。

## 注意事项
1.  Markdown链接解析改为严格匹配模式，可能无法兼容部分非标准格式链接。
2.  简易模式切换至非视觉模型时，图片识别会被强制关闭。
3.  o1、o3模型测试时，若字段映射未生效会触发报错，需确认配置正确性。
4.  未配置TTS voice时，系统会触发空指针保护，需提前完成对应资源配置。
5.  未登录用户的数据获取范围已缩减，需注意系统隐私性相关变化。
> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/4821)
