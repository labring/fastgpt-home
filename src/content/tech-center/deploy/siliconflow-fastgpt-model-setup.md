---
title: FastGPT接入硅基流动平台的模型配置与测试方法
slug: /zh/deploy/siliconflow-fastgpt-model-setup
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/config/model/siliconCloud
source_type: 官方文档
---

# FastGPT接入硅基流动平台的模型配置与测试方法

## 平台简介与前置要求
SiliconCloud（硅基流动）是专注开源模型调用的平台，自带加速引擎，可提供语言、向量、重排、语音等多类型模型，能够覆盖FastGPT的所有模型需求。使用该平台前，需先阅读FastGPT官方的模型配置说明文档，确保掌握基础配置逻辑。

## 完整配置与测试步骤
1.  **获取API密钥**：访问https://cloud.siliconflow.cn/account/ak注册账号，进入控制台获取专属API key。
2.  **新增所需模型**：系统内置了部分硅基流动的体验模型，如需更多模型可手动添加，可选择Qwen2.5 72b纯语言与视觉模型、bge-m3作为向量模型、bge-reranker-v2-m3作为重排模型、fish-speech-1.5作为语音模型、SenseVoiceSmall作为语音输入模型。
3.  **新增模型渠道**：在FastGPT的模型渠道页面，新增硅基流动的模型渠道，并选择此前添加的对应模型。
4.  **基础模型测试**：先验证所有配置的硅基流动模型能否正常运行。
5.  **应用场景测试**：
    - 对话与图片识别：新建简易应用，选择对应模型并开启图片上传功能进行测试。
    - 知识库导入与问答：新建知识库，导入本地文件，79个索引约20秒即可完成导入；回到应用配置知识库后即可进行问答，对话完成后可查看引用详情与检索、重排得分。
    - 语音相关测试：在应用配置中开启语音播放，选择语音模型即可试听；开启语音输入后，对话输入框会出现话筒图标，可进行语音输入。

## 使用建议
若需快速体验开源模型或快速搭建FastGPT应用，无需申请多服务商API密钥时，可优先选择该平台的模型。若计划后续私有化部署模型与FastGPT，可先通过该平台进行测试验证，减少前期POC的时间与成本。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/config/model/siliconCloud
