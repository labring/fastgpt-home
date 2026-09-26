---
title: 模型分配一体化 AI 平台的对话日志与审计
slug: /zh/industry/finance-d002-c081-f006
page_type: 行业问题页
article_section: 金融 / 保险 / 理财
is_part_of: FastGPT 技术中心
meta_title: 模型分配一体化 AI 平台的对话日志与审计
meta_description: 模型分配品类的日志数据来源于平台内的模型调度请求、下游模型返回结果及权限校验记录。更新节奏为实时生成，每条调度请求完成后即刻生成对应日志条目。文档结构为结构
keywords: 模型分配、一体化 AI 平台与多应用编排、对话日志与审计
source_type: 行业选题矩阵（细分方向 × 细分品类 × 功能 × 社区真实问题）
date_published: 2026-09-15
date_modified: 2026-09-15
---

# 模型分配一体化 AI 平台的对话日志与审计

## 这个品类的数据长什么样
模型分配品类的日志数据来源于平台内的模型调度请求、下游模型返回结果及权限校验记录。更新节奏为实时生成，每条调度请求完成后即刻生成对应日志条目。文档结构为结构化JSON格式，核心字段包含`model_allocation_id`（全局唯一调度标识）、`request_id`（绑定对话上下文的请求ID）、`assigned_model`（实际分配的模型名称）、`input_tokens`、`output_tokens`（调用token统计值）、`status_code`（调度状态码），其中token数以整数为单位，状态码采用标准HTTP状态码或自定义调度异常码。

## 这些特征在「对话日志与审计」这一环带来什么约束
由于日志实时生成且绑定`request_id`与`assigned_model`字段，审计环节需实现单请求溯源，无法通过批量离线扫描替代实时校验。需针对`status_code`字段做异常标记，对`403`（权限不足）、`500`（调度失败）等异常码触发告警。同时，因字段与对话上下文绑定，审计日志需与对应应用、会话ID关联，避免出现日志与对话割裂的情况。此外，token统计字段需与对话日志的token消耗做交叉校验，确保调度成本与实际消耗一致。

## 配置怎么定
| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `audit_log_retention_days` | `30–90 天` | 符合金融行业合规审计的日志留存周期要求 |
| `model_allocation_audit_trigger` | `on_every_call` | 确保覆盖所有模型调度请求，无遗漏纳入审计范围 |
| `403_error_alert_threshold` | `≥1 次/小时` | 及时感知权限校验失败的异常调度请求 |
| `log_field_mapping` | `{"request_id": "req_id", "assigned_model": "model", "input_tokens": "tokens"}` | 统一跨系统审计的字段命名规则，便于关联对话上下文 |
| `audit_detail_level` | `full` | 记录完整的调度耗时、token消耗与权限校验信息，满足合规审计的详细要求 |

> 本页给出的参数取值均为常规建议，用于确定配置的起点。实际取值受材料形态、数据量与业务规则影响，具体问题需具体分析，建议在自有样本上实测后再定。

## 容易做错的三处
- 现象：容器日志中出现`common:code_error.error_message.403`报错，且对应请求未被纳入审计日志。原因：未配置`model_allocation_audit_trigger`为`on_every_call`，导致权限校验失败的调度请求未被完整记录。
- 现象：工作流全局变量的对话历史中，未显示指定模型分配组件的输出字段。原因：未在`log_field_mapping`中配置`assigned_model_output`字段，导致组件输出未同步至审计日志。
- 现象：调试预览生成的对话历史无法按指定应用维度清理。原因：未开启`audit_log_bind_app_id`配置，导致审计日志与应用ID未绑定，无法按应用维度检索清理。

## 怎么确认配好了
- 发起一次标准模型调度请求，进入审计日志面板，确认生成包含`model_allocation_id`、`assigned_model`的完整日志条目。
- 触发一次权限不足的模型调用，确认在设定的`403_error_alert_threshold`阈值内收到异常告警通知。
- 查看审计日志的字段映射，确认日志中的字段名与`log_field_mapping`配置的映射规则一致。
- 尝试按应用ID检索审计日志，确认可过滤出对应应用的所有模型调度日志。

> 问题素材取自公开社区提问（2026-09-11 去重 4,834 条）。文中的配置项名称与取值区间需以所用版本的实际界面与文档为准；本页核验日 2026-09-14，当时的最新发布版本为 FastGPT v4.17.0。
