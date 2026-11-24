---
title: 在FastGPT中为AIProxy协议新增模型渠道的配置方法
slug: /zh/reference/add-aiproxy-channel-fastgpt
page_type: 技术速查
source: https://doc.fastgpt.cn/plugin/model-presets
source_type: 官方文档小节
---

# 在FastGPT中为AIProxy协议新增模型渠道的配置方法

## 结论
完成AIProxy协议的模型渠道新增，需先确认协议已在AIProxy中支持，再在FastGPT代码中完成渠道声明与头像配置。FastGPT插件侧仅负责渠道展示信息的声明，不实现协议适配逻辑。

## 具体怎么做
1. 确认目标AIProxy协议已被支持。
2. 在`packages/infrastructure/src/static-data/models/model.ts`的`aiproxyChannels`数组中添加渠道声明，示例代码如下：
```ts
export const aiproxyChannels : AIProxyChannelsType = [
{
channelId: 54,
name: {
en: "Ant Ling",
"zh-CN": "蚂蚁百灵",
"zh-Hant": "螞蟻百靈"
},
avatar: "antling"
}
];
```
3. 配置字段说明：
| 字段 | 说明 |
| --- | --- |
| channelId | AIProxy ChannelType对应的数字ID，需与`core/model/chtype.go`一致 |
| name | FastGPT渠道列表的多语言显示名，支持en、zh-CN、zh-Hant三种语言 |
| avatar | 渠道头像文件名，不包含扩展名 |
4. 在`packages/infrastructure/src/static-data/models/channel-avatar/`目录下添加对应头像文件，文件名需与`avatar`字段一致，支持的扩展名包括svg、png、jpeg、webp、jpg。

## 注意事项
1. 若AIProxy仓库未支持目标协议，需先在AIProxy中新增ChannelType和adaptor，并确认adaptor已在`core/relay/adaptors/register.go`中被引入。
2. channelId必须与`core/model/chtype.go`中的定义完全一致，否则会导致渠道无法正常识别。
3. 头像文件名必须与`avatar`字段匹配，且不能包含扩展名。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/plugin/model-presets)
