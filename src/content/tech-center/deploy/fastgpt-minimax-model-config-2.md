---
title: 为FastGPT自部署环境配置MiniMax大语言模型的接入方法
slug: /zh/deploy/fastgpt-minimax-model-config-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/config/model/minimax
source_type: 官方文档
---

# 为FastGPT自部署环境配置MiniMax大语言模型的接入方法

MiniMax 是一家通用人工智能科技公司，其提供的大语言模型 API 服务兼容 OpenAI 格式，可便捷接入 FastGPT 平台。在完成接入前，请确保已阅读 FastGPT 的模型配置说明文档，了解基础配置逻辑。

## 完整配置步骤
1. 获取 API Key：访问 MiniMax 开放平台，注册并登录账号，进入控制台创建 API Key。
2. 新增内置模型：在 FastGPT 的模型配置页面搜索 MiniMax 并启用，系统内置的 MiniMax 模型包含以下选项：
   - MiniMax-M3：上下文长度 512K，最大输出 128K，为最新一代旗舰模型，默认支持图片输入
   - MiniMax-M2.7：上下文长度 128K，最大输出 8K，为上一代基础模型
   - MiniMax-M2.7-highspeed：上下文长度 128K，最大输出 8K，为上一代低延迟版本
   如需其他未内置的 MiniMax 模型，可手动添加。
3. 新增模型渠道：进入 FastGPT 的模型渠道页面，新增一个 MiniMax 渠道：
   - 协议类型选择 MiniMax
   - 代理地址填写 `https://api.minimax.io/v1`
   - 填写已创建的 MiniMax API Key
   - 选择此前启用的 MiniMax 模型
4. 测试模型：配置完成后，在渠道列表中点击测试按钮，验证模型是否正常工作。

## 注意事项
使用该接入方式时，需严格按照上述步骤配置参数，若测试未通过需核对代理地址、API Key 与所选模型的匹配性。仅支持语料中提及的内置模型或手动添加的兼容模型，避免因参数配置错误导致连接失败。如需使用非内置模型，需遵循 FastGPT 的手动添加流程进行配置。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/config/model/minimax
