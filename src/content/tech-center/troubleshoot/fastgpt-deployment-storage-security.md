---
title: FastGPT不同部署模式的知识库存储与数据安全说明
slug: /zh/troubleshoot/fastgpt-deployment-storage-security
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1548
source_type: GitHub issue
---

# FastGPT不同部署模式的知识库存储与数据安全说明

## 现象
用户对FastGPT不同部署模式下的知识库存储位置、数据安全风险，以及内网部署的可行性存在疑问。

## 可能原因
FastGPT分为公有云和本地部署两种模式，不同模式下知识库的存储逻辑与数据安全边界存在差异，且向量化处理环节存在数据泄露风险，导致用户产生相关疑问。

## 排查步骤
1. 确认FastGPT的部署模式，分为公有云或本地部署。
2. 核对知识库数据的存储位置相关说明。
3. 确认向量化处理的部署环境。

## 解决与验证
公有云部署时，知识库数据存储在FastGPT云服务器，存在一定隐私风险。本地部署时，知识库数据存储在自有服务器或数据中心，可自主实施防火墙、入侵检测系统和数据加密等安全策略。向量化处理环节存在数据泄露风险，本地部署环境建议部署本地向量模型，所有数据处理在内网进行，进一步降低泄露风险。本地部署可直接在内网环境开展，验证时，根据部署模式确认知识库存储位置符合预期，检查向量化模型的部署环境与FastGPT部署环境一致。

> 来源: [FastGPT GitHub issue #1548](https://github.com/labring/FastGPT/issues/1548)
