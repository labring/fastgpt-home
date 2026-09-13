---
title: FastGPT开源版本暂不支持知识图谱类复杂关系查询
slug: /zh/troubleshoot/fastgpt-open-source-lacks-knowledge-graph
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/788
source_type: GitHub issue
---

# FastGPT开源版本暂不支持知识图谱类复杂关系查询

## 现象
用户确认已升级到FastGPT最新开源版本并查看过项目README，未找到类似功能。期望实现基于条件的复杂文档查询，例如提取合同金额大于100000的文档。现有向量检索功能无法满足该场景需求，计划通过引入知识图谱完成复杂关系查询，但使用现有功能无法达成目标。

## 可能原因
该知识图谱类复杂关系查询功能未被纳入FastGPT开源版本的开发规划，当前开源版本未提供该功能的实现入口与相关配置。

## 排查步骤
1. 确认当前使用的FastGPT版本为开源版本，且已升级到最新版本。
2. 检查系统后台与前端界面，确认是否存在知识图谱相关的功能入口或配置项。
3. 尝试通过现有向量检索功能执行目标查询，确认无法满足该场景的需求。

## 解决与验证
FastGPT开源版本暂未规划该知识图谱类复杂关系查询功能，无法直接通过现有功能实现该类查询。若需使用该功能，需按实际环境确认后续开发或适配方案。

> 来源: [FastGPT GitHub issue #788](https://github.com/labring/FastGPT/issues/788)
