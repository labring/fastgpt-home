---
title: FastGPT新增自定义模型供应商目录的配置方法
slug: /zh/reference/add-custom-model-provider-directory
page_type: 技术速查
source: https://doc.fastgpt.cn/plugin/model-presets
source_type: 官方文档小节
---

# FastGPT新增自定义模型供应商目录的配置方法

## 结论
完成FastGPT自定义模型供应商的新增，需按规范创建目录与配置文件。系统初始化静态资源时会自动上传供应商头像，并通过指定接口暴露相关信息。

## 具体怎么做
1.  在`packages/infrastructure/src/static-data/models/provider/`目录下，新建以供应商标识为名的子目录，例如`NewProvider`。
2.  在该子目录中创建`index.ts`和`logo.svg`文件，其中`logo.svg`为模型供应商的头像文件。
3.  编写`index.ts`文件，基础结构如下：
```ts
import { ModelTypeEnum, type ProviderConfigType } from '../../type';
const models : ProviderConfigType = {
  provider: 'NewProvider',
  list: [
    {
      type: ModelTypeEnum.llm,
      model: 'new-provider-chat',
      maxContext: 128000,
      maxTokens: 8192,
      quoteMaxToken: 120000,
      maxTemperature: 1,
      responseFormatList: ['text'],
      vision: false,
      reasoning: false,
      reasoningEffort: false,
      toolChoice: true
    }
  ]
};
export default models;
```
其中`provider`字段需与目录名保持一致，模型参数可根据实际需求调整字段值。

## 注意事项
1.  目录名必须与`index.ts`中的`provider`字段值完全一致，否则系统无法正确识别供应商。
2.  `logo.svg`会被自动上传至`models/{Provider}/logo`路径，供`/models/get-providers`接口调用获取供应商头像。
3.  修改配置文件或资源后，需重启FastGPT插件服务才能加载新的配置。
4.  配置的字段名需严格遵循示例格式，不可随意新增未定义的参数。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/plugin/model-presets)
