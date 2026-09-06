---
title: 解决FastGPT私有部署嵌入数据库插入数据422报错问题
slug: /zh/troubleshoot/fastgpt-private-deploy-422-embedding-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/721
source_type: GitHub issue
---

# 解决FastGPT私有部署嵌入数据库插入数据422报错问题

## 现象
私有部署FastGPT时，调用embedding功能向数据库插入数据时返回422错误；对话场景中使用embedding功能无异常报错。

## 可能原因
该问题为未升级的FastGPT旧版本存在的已知程序缺陷，官方已发布对应修复版本。

## 排查步骤
1. 确认当前部署的FastGPT具体版本信息
2. 提取embedding插入数据库流程中的完整报错日志
3. 对照官方修复记录issue #693核对问题匹配性

## 解决与验证
该问题已在官方正式版本及最新main分支完成修复，对应修复记录为issue #693。升级至修复后的FastGPT版本后，执行数据库插入embedding数据的操作，验证是否不再返回422错误。

> 来源: [FastGPT GitHub issue #721](https://github.com/labring/FastGPT/issues/721)
