---
title: FastGPT v4.14.4-cve版本升级说明与操作验证指南
slug: /zh/deploy/release-notes-4-14-4-cve
page_type: 版本解读
source: https://github.com/labring/FastGPT/releases/tag/v4.14.4-cve
source_type: 官方文档
---

# FastGPT v4.14.4-cve版本升级说明与操作验证指南

## 这个版本改了什么
本版本为FastGPT v4.14.4-cve，核心变更包含两项漏洞与功能修复：修复CVE-2025-55184对应的DOS攻击漏洞，该漏洞可能导致系统遭受拒绝服务攻击；修复创建MCP时使用自定义请求头报错的问题，解决此前创建MCP配置时的功能异常。此外，本次更新还包含四项优化与代码调整：deploy doc（PR #6100）、fix mcp header（PR #6105）、support add pay form url env（PR #6086）、perf log（PR #6107），覆盖部署文档、MCP请求头、支付表单URL环境变量支持以及日志性能优化等方面。

## 升级前要确认的事
升级前需确认当前部署的FastGPT存在以下问题：创建MCP时使用自定义请求头报错，或存在CVE-2025-55184对应的DOS攻击风险。同时需确认当前运行环境符合FastGPT原有版本的部署要求，确保硬件、软件依赖版本匹配，避免因环境不兼容导致升级过程中出现异常。此外，需确认当前FastGPT的运行版本为v4.14.4，确保升级路径正确。

## 升级步骤（照做）
遵循官方更新后的部署文档完成版本升级，拉取v4.14.4-cve版本的部署资源，替换原有部署内容，重启FastGPT相关服务。具体操作需严格按照官方提供的部署流程执行，确保升级过程中数据与配置的完整性。

## 升级后怎么验证
升级完成后，可通过以下方式验证升级效果：首先，执行创建MCP的操作，添加自定义请求头，确认无报错，验证修复功能生效；其次，查看系统运行日志，确认日志功能符合优化后的表现，验证日志性能优化效果；最后，通过安全检查确认系统无CVE-2025-55184对应的DOS攻击漏洞风险，验证漏洞修复效果。

> 来源: [FastGPT release notes](https://github.com/labring/FastGPT/releases/tag/v4.14.4-cve)
