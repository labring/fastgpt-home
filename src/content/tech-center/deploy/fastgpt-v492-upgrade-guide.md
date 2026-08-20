---
title: FastGPT V4.9.2版本升级操作步骤与配置变更说明
slug: /zh/deploy/fastgpt-v492-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/492
source_type: 官方文档
---

# FastGPT V4.9.2版本升级操作步骤与配置变更说明

### 版本核心说明
FastGPT V4.9.2版本包含环境变量与配置参数变更，且该版本存在工作流数据类型转化错误，官方建议直接升级至V4.9.3版本。本次升级覆盖知识库功能、团队管理、向量数据库支持等多个模块的更新与优化。

### 标准化升级步骤
1.  **数据库备份**：执行完整的数据库备份操作，避免升级过程中出现数据丢失风险。
2.  **SSO配置迁移（商业版特定）**：仅针对使用钉钉、企微SSO或成员同步功能的商业版用户，先备份原商业版后台的SSO配置项（如企微的AppId、Secret等），参考官方《SSO外部成员同步》文档部署`sso-service`并配置相关环境变量；完成镜像升级后，在商业版后台将团队模式切换为“同步模式”。
3.  **配置参数修改**：编辑`config.json`文件，将`systemEnv.pgHNSWEfSearch`参数名修改为`hnswEfSearch`；商业版用户可直接在后台"系统配置-基础配置"页面完成该参数变更。
4.  **镜像更新**：将FastGPT官方镜像的tag更新为`v4.9.2`，商业版镜像同步更新为`v4.9.2`；Sandbox镜像可选择不更新，AIProxy镜像需修改为`registry.cn-hangzhou.aliyuncs.com/labring/aiproxy:v0.1.4`。

### 功能变更与修复说明
本次版本新增知识库分块优化功能，支持单独配置分块大小与索引大小，可通过自定义分隔符实现分块；知识库导入数据API新增`chunkSettingMode`、`chunkSplitMode`、`indexSize`等可选参数。外部变量改名为“自定义变量”，支持测试时调试，且在分享链接中自动隐藏。团队成员管理模块完成重构，抽离主流IM SSO接入能力并支持自定义SSO，同时完善外部系统成员同步功能；新增OceanBase向量数据库支持，仅需配置`OCEANBASE_URL`环境变量即可启用。
优化内容包括导出对话日志时显示成员名、修复无SSL证书时的复制提示逻辑、升级Next.js版本至14.2.25、优化工作流节点数组类型适配逻辑等；修复了飞书、语雀知识库无法同步，渠道测试自定义请求地址异常，语音识别模型测试异常等问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/492)
