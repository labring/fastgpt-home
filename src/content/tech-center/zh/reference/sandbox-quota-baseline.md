---
slug: /zh/reference/sandbox-quota-baseline
meta_title: "FastGPT 4.17.3 沙盒额度与资源基准"
meta_description: "依据 FastGPT v4.17.3 官方更新说明，整理沙盒活跃实例上限、单团队额度、单实例资源规格与生命周期、超卖倍率及已停用变量，便于按实例数与资源量核对部署配置。"
schema_type: Article
page_type: 技术速查
date_published: 2026-11-09
date_modified: 2026-11-09
keywords: ""
---

# FastGPT 4.17.3 沙盒额度与资源基准

沙盒的并发上限、单实例资源与生命周期分别由不同参数控制。v4.17.3 把额度收口到两个环境变量，并调整了超卖方式。以下基准的单位分别是实例数、核、MiB、Gi、分钟与天。

## 活跃实例的两个上限

`AGENT_SANDBOX_MAX` 控制活跃实例总上限，默认 100；`AGENT_SANDBOX_MAX_PER_TEAM` 控制单团队上限，默认不限；商业版以管理台配置优先。核对动作是按团队实际并发峰值估算预留量，两个变量分别设置，再看实例创建失败时的返回信息是否指向额度。边界：应用会话与技能编辑共用同一份实例额度，把一部分留给技能编辑，否则搭建时容易撞上限。

商业版的取值以管理台优先于环境变量。改环境变量之前先确认管理台里没有同一项的改动，核对管理台当前值及它与环境变量的优先级。

## 单实例资源与生命周期

默认配置下，单实例存储为 1 GiB，运行实例空闲 60 分钟后暂停，暂停实例连续 7 天不活跃后归档。分别查看 AGENT_SANDBOX_STORAGE_SIZE_GI、AGENT_SANDBOX_SUSPEND_MINUTES 和 AGENT_SANDBOX_ARCHIVE_INACTIVE_DAYS 的部署取值。规划长任务前，用试验实例检查恢复后哪些产物可读，将需要长期保留的输出写入约定存储。

## 超卖倍率与生效范围

CPU 与内存的超卖倍率默认为 1，取值不低于 1；该设置限 Kubernetes 运行态与 OpenSandbox Server 0.2.1 及以上版本，只影响新建或重建的实例，已运行实例的资源上限不变。核对动作是改完倍率后重建一个实例验证，再用监控比对实际 CPU 与内存占用。超卖倍率调低调度预留量，实例的资源上限保持不变。

## 已停用与已移除的配置项

`AGENT_SANDBOX_MAX_EDIT_DEBUG` 已停用；`DEFAULT_ROOT_PSW` 已移除，root 初次使用需激活并设置密码。核对动作是从部署脚本与环境变量清单中删除这两项，改用管理台完成对应设置。核对部署模板是否仍引用已弃用项。旧部署脚本里通常还留着这两项的注释，清理时连同注释一起删，下一个人照旧脚本部署时才不会把它们写回去。

## 数据来源

| Source | Version | Document |
| --- | --- | --- |
| FastGPT | v4.17.3 | [self-host/upgrading/4-17/4173](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-17/4173) |
| FastGPT | v4.16.0 | [self-host/upgrading/4-16/4160](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-16/4160) |
| FastGPT | 环境变量 | [Agent 沙盒配置](https://doc.fastgpt.io/zh-CN/self-host/config/env) |
