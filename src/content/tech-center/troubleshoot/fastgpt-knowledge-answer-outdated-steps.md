---
title: 解决FastGPT知识库问答返回过时Windows自动登录设置的问题
slug: /zh/troubleshoot/fastgpt-knowledge-answer-outdated-steps
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/120
source_type: GitHub issue
---

# 解决FastGPT知识库问答返回过时Windows自动登录设置的问题

## 现象
用户在FastGPT中配置了包含Windows11最新自动登录完整步骤的知识库，当提问"Windows11 目前最新自动登录设置"时，系统返回的是未包含注册表修改步骤的失效旧配置方法，且多次测试结果未发生变化。

## 可能原因
FastGPT在执行知识库问答匹配时，未能完整拉取匹配知识点对应的补充知识内容，仅调用了部分公开的旧配置步骤，未整合知识库中完整的正确配置逻辑。

## 排查步骤
1. 登录FastGPT后台，进入对应知识库的管理页面，查看该问题匹配的知识点条目是否关联了完整的补充知识内容。
2. 检查FastGPT的问答匹配规则配置，确认补充知识是否被纳入匹配调用范围。
3. 重新发起测试提问，对比返回结果与知识库原始配置内容是否一致。
4. 若未发现配置层面的问题，需按实际环境确认FastGPT的知识库加载与调用逻辑是否正常。

## 解决与验证
若排查发现未关联补充知识或匹配规则未覆盖补充内容，需将匹配知识点与对应的补充知识条目正确绑定，并调整问答匹配优先级，确保补充知识被完整调用。验证时，重新提问"Windows11 目前最新自动登录设置"，确认返回结果包含以下完整步骤：1. 同时按下Win+R打开运行窗口，输入regedit并以管理员身份运行；2. 定位到注册表路径HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\PasswordLess\\Device，将DevicePasswordLessBuildVersion的数值从2改为0；3. 再次按Win+R打开运行窗口，输入netplwiz并回车；4. 取消勾选"要使用本计算机，用户必须输入用户名和密码"选项；5. 重启计算机。同时确保返回内容无遗漏的正确配置步骤。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/120)
