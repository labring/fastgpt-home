---
title: 在FastGPT中完成ChatGLM2-6B私有化模型的详细接入配置
slug: /zh/deploy/fastgpt-chatglm2-custom-model
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/chatglm2
source_type: 官方文档
---

# 在FastGPT中完成ChatGLM2-6B私有化模型的详细接入配置

## 前置说明与推荐配置
FastGPT支持通过自定义接口接入私有化大模型，适用于有数据安全需求、不使用云端大模型的场景。本文以ChatGLM2-6B为例，该模型是开源中英双语对话模型，其权重对学术研究完全开放，商业使用需获得官方书面许可。根据官方数据，不同量化等级的资源占用不同：FP16模式需16GB显存、16GB内存，占用25GB硬盘空间；int8模式需9GB显存；int4模式需6GB显存，量化后会轻微影响性能。

## 部署与接入流程
### 源码部署
1. 配置Python 3.8.10、CUDA 11.8环境；
2. 执行`pip install -r requirements.txt`安装依赖；
3. 修改`openai_api.py`的`verify_token`方法配置安全token，防止接口被盗用；
4. 执行`python openai_api.py --model_name [4/8/16]`启动，其中数字对应量化等级，启动成功后访问地址为`http://0.0.0.0:6006`。

### Docker部署
使用官方镜像`stawky/chatglm2:latest`（国内镜像为`registry.cn-hangzhou.aliyuncs.com/fastgpt_docker/chatglm2:latest`），映射端口6006。默认安全凭证为`sk-aaabbbcccdddeeefffggghhhiiijjjkkk`，也可通过环境变量`sk-key`自定义。

### 接入与配置
1. 在One API中添加渠道，模型名称填写`chatglm2`；
2. 使用curl测试接口，示例命令：
```bash
curl --location --request POST https://domain/v1/chat/completions \
--header Authorization: Bearer sk-aaabbbcccdddeeefffggghhhiiijjjkkk \
--header Content-Type: application/json \
--data-raw '{"model": "chatglm2", "messages": [{"role": "user", "content": "Hello!"}]}'
```
3. 修改FastGPT的`config.json`，在`llmModels`数组中添加配置：
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
4. 在FastGPT中选择`chatglm2`模型即可使用。

## 使用注意事项
部署时需确保机器资源满足对应量化等级的要求，否则会出现模型加载失败的报错；接口访问需携带正确的`Authorization`头和模型名称，否则会返回验证错误或模型不存在的错误；该模型仅支持中英双语，商业使用需遵守官方授权要求。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/custom-models/chatglm2
