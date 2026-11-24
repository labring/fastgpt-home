---
title: FastGPT V4.8.21版本更新内容速查
slug: /zh/reference/fastgpt-v4821-update-quick-reference
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/4820
source_type: 官方文档小节
---

# FastGPT V4.8.21版本更新内容速查

## 结论
本页整理FastGPT V4.8.21版本的官方更新内容。更新涵盖新增功能、体验优化与问题修复三类，覆盖模型配置、使用记录、语法扩展等多个场景。

## 具体怎么做
以下是本次更新的具体内容：
1. 新增功能
   - 可视化模型参数配置，取代原配置文件配置模型，预设超100个模型配置，支持所有类型模型一键测试（预计下个版本完全支持页面配置渠道），可点击查看模型配置方案
   - DeepSeek resoner模型支持输出思考过程
   - 新增使用记录导出和仪表盘功能
   - Markdown语法扩展，支持音视频（使用audio、video代码块）
   - 调整max_tokens计算逻辑：优先保证配置的max_tokens值，超出上下文则减少历史记录，例如申请8000的max_tokens时，上下文长度会减少8000
2. 体验优化
   - 问题优化增加上下文过滤，避免超出上下文限制
   - 页面组件抽离，减少页面组件路由数量
   - 全文检索忽略大小写
   - 问答生成和增强索引改为流输出，避免部分模型超时
   - 自动给assistant角色的空content补充null，合并连续的text类型assistant消息，避免部分模型抛错
   - 调整图片Host逻辑：取消上传时补充FE_DOMAIN，改为发送对话前补充，避免替换域名后原图片无法正常使用
3. 问题修复
   - 修复部分场景成员列表无法触底加载的问题
   - 修复工作流递归执行在部分条件下无法正常运行的问题

## 注意事项
1. 可视化模型配置功能预计下个版本才会完全支持页面配置渠道
2. max_tokens计算逻辑调整后，上下文长度会随配置值动态调整
3. 图片Host逻辑调整后，需注意发送对话前的域名替换规则，避免原图片失效
4. Markdown音视频需使用audio、video代码块格式
5. 修复项仅针对对应场景的已知问题，不覆盖所有同类异常

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/4820)
