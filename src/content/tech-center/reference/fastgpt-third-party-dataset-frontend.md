---
title: 为FastGPT添加第三方知识库的前端配置与展示
slug: /zh/reference/fastgpt-third-party-dataset-frontend
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/dataset/third-party/third_dataset
source_type: 官方文档小节
---

# 为FastGPT添加第三方知识库的前端配置与展示

## 结论
为FastGPT配置第三方知识库的前端功能，需完成多文件的翻译、图标、类型注册及页面配置，即可实现该知识库的创建、展示与多语言支持。完成全部配置后，用户可在知识库列表页创建并使用该第三方知识库。

## 具体怎么做
1.  **多语言配置**：在`FastGPT/packages/web/i18n/`下的`zh-CN/dataset.json`、`en/dataset.json`、`zh-Hant/dataset.json`及同目录下的`account_team.json`中添加翻译，字段格式为`dataset.XXX_dataset`，例如飞书知识库对应`dataset.feishu_knowledge_dataset`；同时在`FastGPT/packages/service/support/user/audit/util.ts`中添加代码以支持获取翻译内容。
2.  **图标配置**：在`FastGPT/packages/web/components/common/Icon/icons/core/dataset/`目录添加两种格式的图标：Outline（无色）和Color（带色）；在`FastGPT/packages/web/components/common/Icon/constants.ts`中导入并注册该图标。
3.  **知识库类型注册**：在`FastGPT/packages/global/core/dataset/constants.ts`文件中，向`DatasetTypeEnum`和`ApiDatasetTypeMap`两个配置项中添加对应第三方知识库的类型信息。
4.  **页面与文档配置**：在`FastGPT/document/content/guide/build/workflow/nodes/knowledge_base_search_merge.mdx`中添加文档说明，使用已配置的多语言标签、图标；在`FastGPT/projects/app/src/pages/dataset/list/index.tsx`中添加新建菜单配置，该文件负责知识库列表页的新建按钮菜单，添加后才可创建该知识库；在`FastGPT/projects/app/src/pageComponents/dataset/detail/Info/index.tsx`中配置详情页UI。

## 注意事项
1.  多语言字段必须遵循`dataset.XXX_dataset`格式，否则无法正确加载翻译内容。
2.  图标需同时提供Outline和Color两种格式，缺一不可。
3.  需完成全部配置项的修改，缺少任意一步可能导致无法创建或展示该第三方知识库。
4.  `courseUrl`字段为可选配置，用于添加对应知识库的文档说明链接。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/dataset/third-party/third_dataset)
