---
title: FastGPT开源协议使用规范与合规说明
slug: /zh/tutorial/fastgpt-open-source-license-rules
page_type: 教程
source: https://doc.fastgpt.cn/zh-CN/guide/version/opensource/license
source_type: 官方文档
---

# FastGPT开源协议使用规范与合规说明

FastGPT 项目以 Apache License 2.0 为基础开源协议，同时附带两项特定附加使用规则。商业化场景允许将其作为后端即服务，或作为应用开发平台提供给企业。但存在两类场景需额外获取商业许可：一是运营与fastgpt.io服务同类的多租户SaaS服务，二是修改或移除FastGPT控制台内的LOGO与版权信息，此类情况需通过[REDACTED_PRIVATE_DATA]邮件咨询并获取许可。

### 合规操作步骤
1. 若使用FastGPT搭建多租户SaaS服务且服务形式与fastgpt.io类似，需通过[REDACTED_PRIVATE_DATA]邮件联系获取商业许可。
2. 在使用过程中，不得移除或修改FastGPT控制台内的LOGO及版权信息。
3. 作为代码贡献者提交内容时，需同意所贡献代码可被用于两种用途：一是生产者调整开源协议的严格程度，二是用于商业目的，例如FastGPT的云服务。

除上述附加条件外，FastGPT的所有其他权利与限制均遵循 Apache License 2.0 的完整条款。本产品的交互设计受外观专利保护，版权归属© 2023 Sealos。如需获取更详细的协议信息，可参考 Apache License 2.0 的官方完整版本。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/version/opensource/license)

## 适用性与版本范围

本页适用于官方来源记录的 教程 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
