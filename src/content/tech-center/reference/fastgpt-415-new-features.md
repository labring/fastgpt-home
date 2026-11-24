---
title: FastGPT 4.15版本新增功能技术速查
slug: /zh/reference/fastgpt-415-new-features
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-15/41500
source_type: 官方文档小节
---

# FastGPT 4.15版本新增功能技术速查

## 结论
本页整理FastGPT 4.15版本的全部新增技术功能，覆盖Agent、沙盒、插件、UI、知识库等多个核心模块。开发者可通过本页快速查阅更新细节，完成对应功能的配置与使用。

## 具体怎么做
1.  为Agent V2绑定静态Skill，使用重写后的loop逻辑运行工具调用与流程编排
2.  配置沙盒自定义npm/pip源，通过环境变量`MAX_FOLDER_DEPTH`限制目录深度
3.  为Rerank模型配置`defaultConfig`参数，为S3存储配置CDN加速
4.  在HTTP节点开启忽略TLS证书校验，支持返回完整错误对象
5.  使用新增循环节点替代旧批量执行功能，统一管理API密钥并显式传入应用上下文
6.  接入钉钉第三方知识库，启用多模态embedding、图搜图与Agent权限过滤
7.  配置模型思考参数，启用多模态音视频输入能力
8.  生成DevAPI和System OpenAPI两套API文档，启用快速回复的输出语法
9.  优化chatbox UI，支持快速滚动、流式输出动效与LLM生成对话标题
10. 导出工作流模板时同步导出名称与介绍，在全局变量输入框支持object类型数据

## 注意事项
1.  旧批量执行功能已弃用，需切换至新增循环节点
2.  API密钥需在请求中显式传入应用上下文，不可省略
3.  开启虚拟机功能时，用户上传文件会直接注入虚拟机，需注意文件安全
4.  新增worker pool可缓解并发资源耗尽问题，需合理配置
5.  分享链接/门户页支持手动切换语言，不再自动识别浏览器语言
6.  Chat API新增dataId重复校验，避免脏数据进入工作流合并逻辑
7.  商业版支持本地直连FastGPT调试插件，需确认已开通商业版权限

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-15/41500)
