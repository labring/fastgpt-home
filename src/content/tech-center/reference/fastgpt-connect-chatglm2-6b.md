---
title: FastGPT接入ChatGLM2-6B私有化模型的操作指南
slug: /zh/reference/fastgpt-connect-chatglm2-6b
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/custom-models/chatglm2
source_type: 官方文档小节
---

# FastGPT接入ChatGLM2-6B私有化模型的操作指南

## 结论
FastGPT支持接入私有化部署的ChatGLM2-6B模型。该接入方式属于本地模型使用的范畴，完成配置后可正常使用该模型开展对话任务。

## 具体怎么做
1. 进入FastGPT后台的配置说明菜单，找到模型配置方案页面
2. 在本地模型使用分类下，定位到ChatGLM2-6B的接入入口
3. 按照页面给出的指引完成私有化模型的配置绑定流程
4. 配置保存生效后，即可在FastGPT的应用中选择该模型进行使用

## 注意事项
1. 该接入方式仅适用于私有化部署的ChatGLM2-6B模型，无法接入公有云版本的该模型
2. 若在配置或使用过程中出现模型相关问题，可参考模型问题排查文档进行处理
3. 配置过程需严格遵循FastGPT的模型配置规范完成，避免出现配置错误
4. 需确保私有化部署的ChatGLM2-6B模型服务正常运行，否则无法正常调用

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/custom-models/chatglm2)
