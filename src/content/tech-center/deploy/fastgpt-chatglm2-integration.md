---
title: 在FastGPT中完成ChatGLM2-6B私有化模型的完整接入配置
slug: /zh/deploy/fastgpt-chatglm2-integration
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/chatglm2
source_type: 官方文档
---

# 在FastGPT中完成ChatGLM2-6B私有化模型的完整接入配置

### 接入背景与模型说明
FastGPT支持自定义接入私有化大模型，避免数据上传至云端的安全风险。本文以ChatGLM2-6B为例，该模型是开源中英双语对话模型，权重对学术研究完全开放，获得官方书面许可后可商用。根据官方数据，不同量化等级的资源占用不同：FP16需12.8GB显存、int8需8.1GB显存、int4需5.1GB显存，对应推荐配置分别为16GB内存/16GB显存/25GB硬盘、16GB内存/9GB显存/25GB硬盘、16GB内存/6GB显存/25GB硬盘。

### 标准配置步骤
1.  **部署模型**：可选择源码或Docker两种方式。源码部署需提前配置Python 3.8.10、CUDA 11.8环境，执行`pip install -r requirements.txt`安装依赖，修改`openai_api.py`中的`verify_token`方法配置验证token防止接口盗用，执行`python openai_api.py --model_name 16`启动（数字对应量化等级，可按需调整）。Docker部署使用镜像`stawky/chatglm2:latest`或国内镜像`registry.cn-hangzhou.aliyuncs.com/fastgpt_docker/chatglm2:latest`，暴露端口6006，可通过环境变量`sk-key`设置安全凭证，默认凭证为`sk-aaabbbcccdddeeefffggghhhiiijjjkkk`。
2.  **接入FastGPT**：修改项目的`config.json`配置文件，在`llmModels`数组中添加如下配置：
```json
{
  "model": "chatglm2",
  "name": "chatglm2",
  "maxContext": 4000,
  "maxResponse": 4000,
  "quoteMaxToken": 2000,
  "maxTemperature": 1,
  "vision": false,
  "defaultSystemChatPrompt": ""
}
```

### 测试与使用
完成配置后，在FastGPT的模型选择界面选中`chatglm2`即可使用该模型。可通过以下curl命令测试模型接口可用性：
```bash
curl --location --request POST https://your-domain/v1/chat/completions \
--header "Authorization: Bearer sk-aaabbbcccdddeeefffggghhhiiijjjkkk" \
--header "Content-Type: application/json" \
--data-raw '{"model": "chatglm2", "messages": [{"role": "user", "content": "Hello!"}]}'
```
其中`your-domain`为模型部署的实际地址。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/custom-models/chatglm2
