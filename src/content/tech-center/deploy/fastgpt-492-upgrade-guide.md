---
title: FastGPT V4.9.2版本升级步骤与配置变更说明
slug: /zh/deploy/fastgpt-492-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/492
source_type: 官方文档
---

# FastGPT V4.9.2版本升级步骤与配置变更说明

## 版本核心说明
FastGPT V4.9.2存在工作流数据类型转化错误，官方建议直接升级至v4.9.3。本次更新核心包含环境变量变更、知识库导入API调整、SSO配置迁移要求等内容，同时新增多项功能并修复了已知问题。

## 标准化升级步骤
请按照以下流程完成升级：
1. 提前做好数据库备份，避免数据丢失；
2. SSO迁移：使用钉钉、企微SSO或成员同步的商业版用户，先复制备份原商业版后台的AppId、Secret等配置项，参考SSO外部成员同步文档部署并配置sso-service，完成镜像升级后，在商业版后台将团队模式切换为“同步模式”；
3. 配置参数变更：修改config.json文件中`systemEnv.pgHNSWEfSearch`参数名为`hnswEfSearch`；商业版用户可直接在后台「系统配置-基础配置」中完成变更；
4. 更新镜像：将FastGPT及商业版镜像tag更新为`v4.9.2`；Sandbox镜像可无需更新；AIProxy镜像需修改为`registry.cn-hangzhou.aliyuncs.com/labring/aiproxy:v0.1.4`。

## 变更内容与注意事项
本次更新的新增功能包括：知识库分块优化，支持单独配置分块大小和索引大小、自定义分隔符预设及换行符分割；外部变量改名为自定义变量，支持测试时调试且分享链接中自动隐藏；集合同步时支持修改标题；团队成员管理重构，抽离主流IM SSO并支持自定义接入，完善外部成员同步；支持oceanbase向量数据库，仅需配置`OCEANBASE_URL`环境变量；新增基于mistral-ocr和miner-u的PDF解析示例。
优化内容包括导出对话日志支持导出成员名、邀请链接交互优化、无SSL证书时复制失败会弹出手动复制提示、升级nextjs版本至14.2.25等。修复问题包括飞书和语雀知识库无法同步、渠道测试时自定义请求地址逻辑错误、语音识别模型测试异常等。此外知识库导入数据API新增`chunkSettingMode`、`chunkSplitMode`、`indexSize`可选参数，需参考对应文档调整调用方式。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/492)
