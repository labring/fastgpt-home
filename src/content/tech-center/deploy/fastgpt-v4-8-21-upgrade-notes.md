---
title: FastGPT V4.8.21版本升级操作与更新内容说明
slug: /zh/deploy/fastgpt-v4-8-21-upgrade-notes
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4821
source_type: 官方文档
---

# FastGPT V4.8.21版本升级操作与更新内容说明

### 适用场景与说明
本页面面向FastGPT自部署的技术人员，整理了V4.8.21版本的升级操作流程与官方更新内容，所有信息均来自官方发布的升级文档。

### 升级操作步骤
1. 务必先完成数据库备份，防止升级过程中出现数据丢失问题；
2. 更新对应镜像：将普通版的`fastgpt`镜像tag更新为`v4.8.21-fix`，商业版使用`fastgpt-pro`镜像，tag同样为`v4.8.21-fix`；Sandbox镜像无需执行更新操作。

### 本次版本更新详情
#### 新增功能
包含弃用/已删除插件提示；对话日志支持按来源分类、标题检索与导出；全局变量支持拖拽排序；LLM模型新增`top_p`、`response_format`、`json_schema`参数配置；新增Doubao1.5模型与阿里embedding3模型预设；向量模型支持归一化配置，适配未归一化的向量模型；AI对话节点支持输出思考过程结果，供其他节点引用。
#### 优化项
优化网站嵌入式聊天窗口的位置适配；优化模型未配置时的错误提示；适配非Stream模式的思考输出；增加TTS voice未配置时的空指针保护；调整Markdown链接解析为严格匹配模式，减少误解析；缩小未登录用户的数据获取范围，提升系统隐私性。
#### 修复项
修复简易模式切换至非视觉模型时强制关闭图片识别的问题；修复o1、o3模型测试时字段映射未生效导致的报错；修复公众号对话的空指针异常；修复多个音频/视频文件展示异常的问题；修复分享链接鉴权报错后无限循环的问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4821)
