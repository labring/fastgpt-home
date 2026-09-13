---
title: 解决FastGPT社区版与商业版功能差异及选型问题
slug: /zh/troubleshoot/fastgpt-edition-difference-selection
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2028
source_type: GitHub issue
---

# 解决FastGPT社区版与商业版功能差异及选型问题

## 现象
用户在使用FastGPT社区版过程中，对社区版与商业版的功能边界存在疑问，或在技术选型时无法明确两者的适配场景。

## 可能原因
社区版与商业版的功能差异仅集中在少数模块，且相关差异说明未清晰呈现，导致用户难以快速区分两者的适配场景。

## 排查步骤
1. 确认当前使用的FastGPT版本类型，明确为社区版或商业版。
2. 核对官方披露的功能差异信息，重点查看多租户、权限相关模块的支持情况。
3. 对比自身业务需求，确认是否需要社区版未覆盖的额外功能。

## 解决与验证
若业务无需多租户、权限管控之外的额外功能，可选择社区版，其已覆盖90%的核心功能。若需要多租户或权限管控相关功能，可选择商业版。商业版仅通过云服务方式提供，早期用户可按每年99元的标准付费。完成选型后，可通过匹配业务需求验证功能覆盖情况是否符合预期。

> 来源: [FastGPT GitHub issue #2028](https://github.com/labring/FastGPT/issues/2028)
