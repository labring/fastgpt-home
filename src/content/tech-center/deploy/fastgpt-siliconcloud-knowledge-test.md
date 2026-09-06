---
title: 配置siliconCloud模型后测试FastGPT知识库导入与问答
slug: /zh/deploy/fastgpt-siliconcloud-knowledge-test
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/config/model/siliconCloud
source_type: 官方文档
---

# 配置siliconCloud模型后测试FastGPT知识库导入与问答

当仅配置单个向量模型时，FastGPT应用创建知识库的页面不会展示向量模型选择项。该流程用于验证向量模型与知识库功能的兼容性，确保后续问答流程可正常运行。

## 知识库导入与测试步骤
1.  新建知识库，由于仅配置了单个向量模型，页面不会展示向量模型选择项。
2.  导入本地文件：直接选择目标本地文件，按页面引导完成后续步骤，即一路下一步即可。示例场景中，79个索引的导入流程耗时约20秒完成。
3.  进入刚创建的应用，选择知识库模块，调整相关参数后即可开始对话。配套截图展示了新建知识库界面、本地文件导入界面与多组对话配置界面。

## 对话结果与引用详情查看
对话完成后，点击对话界面底部的引用区域，可查看引用详情。同时可查看具体的检索得分与重排得分，用于评估知识库检索的匹配效果。配套截图展示了引用详情界面与得分展示界面，可直观查看检索与重排的具体数据。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/model/siliconCloud)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
