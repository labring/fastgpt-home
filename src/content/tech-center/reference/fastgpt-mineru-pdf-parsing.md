---
title: 为FastGPT自部署环境接入MinerU以实现PDF文档解析功能
slug: /zh/reference/fastgpt-mineru-pdf-parsing
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/custom-models/mineru
source_type: 官方文档小节
---

# 为FastGPT自部署环境接入MinerU以实现PDF文档解析功能

## 结论
在FastGPT自部署环境中接入MinerU后，可实现PDF文档的图片提取、布局识别、表格识别与公式识别功能。该功能属于FastGPT本地模型使用的扩展能力，能够满足复杂PDF文件的内容解析需求。
## 具体怎么做
1. 进入FastGPT自部署环境的模型配置方案模块；
2. 进入本地模型使用的配置页面；
3. 选择MinerU作为PDF文档解析工具完成接入；
4. 保存配置后即可使用MinerU解析PDF文档。
## 注意事项
1. 该功能仅支持FastGPT自部署场景，不适用于其他部署模式；
2. 接入需在FastGPT的本地模型使用模块中完成；
3. 若出现配置异常，可参考官方文档的模型问题排查流程。
> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/custom-models/mineru)
