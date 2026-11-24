---
title: FastGPT权限系统的存储结构与设计规则速查
slug: /zh/reference/fastgpt-permission-storage-design
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/workspace/team/team_roles_permissions
source_type: 官方文档小节
---

# FastGPT权限系统的存储结构与设计规则速查

## 结论
FastGPT权限系统参考Linux权限设计，采用二进制方式存储权限位，1表示拥有对应权限，0表示无权限，Owner权限特殊标记为全1。权限相关信息存储在MongoDB的resource_permissions集合中，通过指定数据结构实现灵活精确的权限控制。

## 具体怎么做
权限信息的核心字段及说明如下：
| 字段名               | 说明                                                                 |
|----------------------|----------------------------------------------------------------------|
| teamId               | 团队标识                                                             |
| tmbId/groupId/orgId  | 权限主体，三选一                                                     |
| resourceType         | 资源类型，可选值为team、app、dataset                                 |
| permission           | 权限值，数字类型，1表示拥有对应权限，0表示无权限，Owner权限为全1       |
| resourceId           | 资源ID，资源类型为team时为null                                       |
Schema定义文件路径为`packages/service/support/permission/schema.ts`。

## 注意事项
权限主体仅可选择tmbId、groupId、orgId其中之一，不可同时配置多个。resourceId字段在resourceType为team时必须设为null。权限位仅支持0和1的数值配置，Owner权限有特殊全1标记。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/workspace/team/team_roles_permissions)
