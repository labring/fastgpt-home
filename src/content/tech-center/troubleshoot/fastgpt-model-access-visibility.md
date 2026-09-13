---
title: FastGPT v4.9.1 模型账号可见范围：历史限制与诊断
slug: /zh/troubleshoot/fastgpt-model-access-visibility
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4615
source_type: GitHub issue
---

# FastGPT v4.9.1 模型账号可见范围：历史限制与诊断

FastGPT v4.9.1 曾有按账号配置模型公有、私有及可见范围的需求，维护者当时答复该能力受限。模型候选列表和应用访问授权应分别验证，并记录所用版本的实际行为。

## 历史范围与已知事实

[Issue #4615](https://github.com/labring/FastGPT/issues/4615) 明确报告私有部署 v4.9.1，维护者于 2025 年 4 月答复该版本不支持所询问的模型可见范围配置。这个结论的适用范围是该历史版本及该项需求；后续版本应以对应文档和测试结果为准。

## 诊断步骤

1. 记录版本、模型名称、账号所属团队，以及希望控制的是“模型选择列表”还是“应用使用权限”。
2. 参照[模型配置说明](https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro)，确认模型已正确接入，并用测试应用验证可正常调用。
3. 使用两个具有不同授权的测试账号，分别检查模型候选列表、应用编辑入口和实际调用结果，记录可见范围与访问结果。
4. 如目标是限制某个应用的使用者，按[团队与资源权限文档](https://doc.fastgpt.cn/zh-CN/guide/workspace/team/team_roles_permissions) 配置应用协作者，再用受限账号复测。

## 验证结果

输出账号、团队、模型可见性及应用调用权限的对照结果。需要模型级隔离时，应先确认目标版本提供的权限粒度，再决定配置或定制方案；前端可见性与服务端调用权限都应纳入验证。
