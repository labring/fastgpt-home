---
title: 在FastGPT自部署环境中配置接入硅基流动模型服务
slug: /zh/deploy/fastgpt-siliconcloud-model-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/config/model/siliconCloud
source_type: 官方文档
---

# 在FastGPT自部署环境中配置接入硅基流动模型服务

SiliconCloud（硅基流动）是提供开源模型调用的平台，拥有自主加速引擎，可帮助用户低成本、快速测试和使用开源模型。其覆盖语言、向量、重排、TTS、STT、绘图、视频生成等多类模型，可满足FastGPT中所有模型需求。使用本方案前，请先阅读模型配置说明文档。

## 配置与测试步骤
1. 注册账号并获取API key：点击注册链接进入控制台，获取API key，地址为https://cloud.siliconflow.cn/account/ak。
2. 新增所需模型：系统内置少量硅基流动模型供体验，如需其他模型需手动添加。示例可配置Qwen2.5 72b纯语言/视觉模型、bge-m3向量模型、bge-reranker-v2-m3重排模型、fish-speech-1.5语音模型、SenseVoiceSmall语音输入模型。
3. 新增模型渠道：在模型渠道页新增硅基流动渠道，选择已添加的对应模型。
4. 测试模型可用性：验证所有配置的硅基流动模型能否正常运行。
5. 在应用中完成全流程测试：
   - 测试对话与图片识别：新建简易应用，选择对应模型并开启图片上传功能进行测试。
   - 测试知识库导入与问答：新建知识库（若仅配置一个向量模型，页面不会展示向量模型选择），导入本地文件完成索引，示例中79个索引约耗时20秒；回到应用配置知识库后即可进行问答，点击引用可查看检索与重排得分。
   - 测试语音播放：在应用左侧配置中找到语音播放，选择语音模型试听。
   - 测试语音输入：在应用左侧配置中开启语音输入，对话输入框将出现话筒图标用于语音输入。

## 使用边界与注意事项
本方案适合快速体验开源模型或前期POC测试，可帮助减少私有化部署前的验证时间与成本。若计划长期使用私有化部署模型，需提前规划对应硬件资源。配置过程中需注意API key的保密，若模型无法正常调用，需检查API key有效性与模型渠道的配置匹配情况。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/config/model/siliconCloud)
