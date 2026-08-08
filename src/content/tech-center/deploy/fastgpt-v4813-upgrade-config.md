---
title: FastGPT V4.8.13版本升级与环境变量配置说明
slug: /zh/deploy/fastgpt-v4813-upgrade-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4813
source_type: 官方文档
---

# FastGPT V4.8.13版本升级与环境变量配置说明

# 版本更新核心变更
V4.8.13版本存在环境变量变更，本次更新包含多项新增功能、优化项与修复内容。新增功能包括数组变量多选支持、文件上传方案调整（AI对话与工具调用节点支持直接接收文件链接、插件自定义变量支持文件上传类型）、对话记录时间显示、工作流校验错误跳转至错误节点、循环节点下标值、对话错误提醒翻译、对话输入框拖拽上传、对话日志来源显示分享链接/API具体名称、分享链接可配置是否展示实时运行状态。优化项涵盖合并多个system提示词以适配不支持多system提示词的模型、知识库上传文件报错提示优化、全文检索语句简化减少子查询、将findLast修改为`[...array].reverse().find`适配旧版浏览器、Markdown组件自动空格避免分割URL中的中文、工作流上下文拆分优化性能、语音播报兼容处理（不支持mediaSource的浏览器等待语音完全生成后输出）、csv读取自动识别编码。修复内容包括Dockerfile pnpm安装支持代理、BI图表生成无法写入文件问题及解析优化支持数字类型数组、分享链接首次加载时标题显示不正确问题。

# 升级与配置操作步骤
1. 提前做好数据备份，避免升级过程中出现数据丢失。
2. 更新镜像：将FastGPT官方镜像的tag设置为`v4.8.13-fix`，商业版fastgpt-pro镜像同样使用该tag，Sandbox镜像可选择不进行更新。
3. 添加环境变量：为fastgpt和fastgpt-pro镜像添加`FE_DOMAIN=http://xx.com`，其中`xx.com`替换为实际的FastGPT前端访问地址，注意地址末尾不要添加`/`，该环境变量可自动补齐相对文件地址的前缀。
4. 调整文件上传编排：当前版本仍兼容旧版文件上传编排，但未来两个版本将移除兼容代码，需尽快完成调整。尤其需要注意嵌套应用的文件传递，未来将不再自动传递，必须手动指定传递的文件，具体调整细节可参考官方文件上传变更文档。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4813
