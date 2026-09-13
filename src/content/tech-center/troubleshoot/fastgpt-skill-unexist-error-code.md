---
title: FastGPT skill模块unExist错误码的排查与处理说明
slug: /zh/troubleshoot/fastgpt-skill-unexist-error-code
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/skill.ts
source_type: 官方文档
---

# FastGPT skill模块unExist错误码的排查与处理说明

## 这个错误是什么
该错误属于FastGPT skill模块的错误枚举，枚举名为unExist，对应statusText为skillUnExist，关联的国际化文案键为common:code_error.skill_error.not_exist，该模块的错误码前缀标识为agentSkill:509000。

## 什么情况下会触发
当系统无法检索到请求指定的技能资源时，将触发该错误。常见场景包括传入未创建、已删除的技能标识，或调用了不存在的技能相关接口。

## 怎么定位
1.  通过报错信息中的statusText为skillUnExist，确认该错误属于skill模块的unExist类型错误；
2.  提取请求中携带的skillId参数，核对参数的拼写与有效性；
3.  检查目标技能是否已被删除或未在当前环境中创建；
4.  查看接口请求日志，确认请求参数与预期配置一致。

## 处理与验证
1.  修正请求中的skillId参数，替换为已存在的有效技能标识；
2.  重新发起对应接口请求，确认报错提示消失；
3.  若参数无误，确认目标技能的状态，确保其处于可用状态；
4.  验证接口返回结果符合业务预期，无其他关联错误。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/skill.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
