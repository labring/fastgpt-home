---
title: FastGPT V4.8.15版本官方更新内容速查
slug: /zh/reference/fastgpt-v4815-update-reference
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/4814
source_type: 官方文档小节
---

# FastGPT V4.8.15版本官方更新内容速查

## 结论
本文整理了FastGPT V4.8.15的官方更新内容，涵盖新增功能、体验优化与问题修复三类更新项。同时附带该版本的升级相关说明信息。

## 具体怎么做
1. 新增功能
   - 工作流支持进入聊天框/点击开始对话后自动触发一轮对话
   - 重写chatContext，对话测试带日志且刷新后不丢失对话
   - 分享链接支持配置是否允许查看原文
   - 新增doc2x插件
   - 新增繁体中文支持
   - 分析链接和chat api支持传入自定义uid
   - 商业版新增微软oauth登录
2. 体验优化
   - 优化工作流UI细节
   - 应用编辑记录采用diff存储，避免浏览器溢出
   - 代码入口增加register入口，无需等待首次访问执行
   - 工作流检查增加更多缺失值检查
   - 增加知识库训练最大重试次数限制
   - 修复图片路径问题和示意图任务
   - 优化Milvus description
3. 问题修复
   - 修复四级标题丢失问题，新增五级标题支持
   - 修复MongoDB知识库集合唯一索引问题
   - 修复反选知识库引用后可能报错的问题
   - 修复简易模式转工作流未使用最新编辑记录的问题
   - 修复表单输入的说明文字不显示的问题
   - 修复API无法使用base64图片的问题
4. 升级说明
   - 包含V4.8.15升级脚本与V4.8.13环境变量变更说明

## 注意事项
- 微软oauth登录为商业版专属功能
- 升级操作需参考V4.8.13的环境变量变更说明执行
- 知识库训练最大重试次数限制为新增配置项
- API无法使用base64图片的问题已完成修复

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/4814)
