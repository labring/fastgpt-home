---
title: FastGPT V4.8.21版本升级操作及更新内容说明
slug: /zh/deploy/fastgpt-v4821-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4821
source_type: 官方文档
---

# FastGPT V4.8.21版本升级操作及更新内容说明

## 版本更新概述
FastGPT V4.8.21版本包含多项新增功能、体验优化与问题修复。新增功能包括：弃用/已删除插件提示、对话日志按来源分类与标题检索导出、全局变量拖拽排序、LLM模型支持top_p、response_format、json_schema参数、Doubao1.5与阿里embedding3模型预设、向量模型归一化配置、AI对话节点支持输出思考过程供其他节点引用。
优化内容涵盖：网站嵌入式聊天窗口位置适配、模型未配置时的错误提示优化、适配非Stream模式思考输出、增加TTS voice未配置时的空指针保护、调整Markdown链接解析为严格匹配模式、减少未登录用户的数据获取范围以提升隐私性。
修复问题包括：简易模式切换非视觉模型时强制关闭图片识别的问题、o1/o3模型测试时字段映射未生效导致的报错、公众号对话空指针异常、多个音频/视频文件展示异常、分享链接鉴权报错后无限循环的问题。

## 升级操作步骤
本次升级需严格遵循以下流程：
1.  提前完成数据库备份，避免升级过程中出现数据丢失。
2.  更新对应镜像：将fastgpt镜像的tag更新为`v4.8.21-fix`，商业版fastgpt-pro镜像的tag更新为`v4.8.21-fix`；Sandbox镜像无需执行更新操作。

## 升级注意事项
本次版本升级未涉及额外环境变量或配置文件变更，若已完成基础部署，仅需按上述步骤更新镜像即可。若从早于V4.8.21的版本升级，需确保已完成过往版本的必要升级流程，避免出现兼容性异常。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4821
