---
title: 在FastGPT自部署环境中配置MiniMax大语言模型API接入
slug: /zh/deploy/fastgpt-minimax-model-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/config/model/minimax
source_type: 官方文档
---

# 在FastGPT自部署环境中配置MiniMax大语言模型API接入

MiniMax是提供高性能大语言模型API服务的厂商，其API兼容OpenAI格式，可便捷接入FastGPT平台。使用该接入方案前，请务必先阅读FastGPT官方的模型配置说明文档，确保已掌握基础配置逻辑。

### 具体配置步骤
1. **获取API Key**：访问MiniMax开放平台，完成注册并登录账号后，进入控制台页面创建专属的API Key。
2. **启用内置模型**：FastGPT系统已内置MiniMax系列模型，可直接在模型配置页面搜索"MiniMax"并启用所需模型；若需使用未内置的模型，可通过手动添加的方式完成配置。内置模型的详细参数如下：
   - MiniMax-M3：上下文长度512K，最大输出128K，为最新一代旗舰模型，默认支持图片输入
   - MiniMax-M2.7：上下文长度128K，最大输出8K，为上一代基础模型
   - MiniMax-M2.7-highspeed：上下文长度128K，最大输出8K，为上一代低延迟版本
3. **新增模型渠道**：进入FastGPT的模型渠道管理页面，新增一个MiniMax类型的渠道：协议类型选择"MiniMax"，代理地址填写`https://api.minimax.io/v1`，填入之前获取的MiniMax API Key，最后选择此前已启用的MiniMax模型。
4. **测试模型可用性**：配置完成后，在模型渠道列表中点击测试按钮，即可验证该模型渠道是否可以正常工作。

完成上述配置后，该MiniMax模型渠道即可正式投入使用，可在FastGPT的各类应用流程中调用该模型完成相关任务。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/config/model/minimax)
