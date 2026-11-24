---
title: FastGPT多模态识别功能的配置与使用注意事项
slug: /zh/reference/fastgpt-multimodal-recognition-setup
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/build/general/ai_settings
source_type: 官方文档小节
---

# FastGPT多模态识别功能的配置与使用注意事项

## 结论
FastGPT的多模态识别功能可控制AI读取用户输入中的图片、音频或视频内容。可选择的识别类型取决于模型本身的能力，开启后AI对话节点会将用户上传的对应媒体文件或问题中的媒体链接转换为模型可识别的输入。

## 具体怎么做
1. 确认当前模型已配置多模态能力；
2. 在多模态识别配置项中，按需勾选支持的类型（图片、音频、视频）；
3. 若需解析用户问题中的媒体链接，需开启「提取链接中的多模态文件」功能。

## 注意事项
1. 即使开启某类识别，请求发送前会根据模型能力过滤，不支持的类型不会发送给模型；
2. 用户问题中的媒体链接仅在少于500字时尝试提取，一次最多处理4个媒体链接；
3. 普通文档文件不会作为多模态输入直接发送给LLM，文档内容需通过文件解析转成文本；
4. 若弹窗显示「该模型不支持多模态识别」，需更换支持对应多模态输入的模型。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/general/ai_settings)
