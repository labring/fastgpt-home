---
title: 解决FastGPT私有部署后部分浏览器页面崩溃的问题
slug: /zh/troubleshoot/fastgpt-safari-compatibility-issue
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/815
source_type: GitHub issue
---

# 解决FastGPT私有部署后部分浏览器页面崩溃的问题

## 现象
使用docker-compose部署FastGPT私有版本时，执行添加知识库的操作，点击添加按钮后会触发页面崩溃。该问题多数由苹果Safari浏览器引发，更换其他浏览器可临时恢复访问，相关报错截图可辅助后续的问题定位与分析。

## 可能原因
该问题的核心原因为FastGPT与部分浏览器存在兼容性不匹配，触发场景集中于苹果Safari浏览器，具体的不兼容细节与触发条件需按实际环境确认。

## 排查步骤
1. 确认当前FastGPT的部署方式为docker-compose私有部署版本，核对部署流程与记录的部署方式是否一致。
2. 记录触发页面崩溃时的具体操作，如添加知识库并点击添加按钮，同时记录所用浏览器的类型与相关版本信息。
3. 更换其他浏览器访问FastGPT系统，观察页面崩溃问题是否不再出现。
4. 留存页面崩溃时的报错截图，用于后续向项目维护者提交反馈。

## 解决与验证
临时解决方式为更换非Safari浏览器访问FastGPT系统，可快速恢复正常的系统操作。若需进一步解决浏览器兼容性问题，需向项目维护者提交详细的反馈信息，包括部署方式、触发页面崩溃的具体操作、所用浏览器的信息以及留存的报错截图。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/815)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
