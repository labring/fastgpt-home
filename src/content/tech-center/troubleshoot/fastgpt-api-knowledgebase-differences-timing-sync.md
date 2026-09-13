---
title: FastGPT API知识库与直接调用接口的差异及定时同步配置方法
slug: /zh/troubleshoot/fastgpt-api-knowledgebase-differences-timing-sync
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3664
source_type: GitHub issue
---

# FastGPT API知识库与直接调用接口的差异及定时同步配置方法

## 现象
用户在使用FastGPT时，发现平台同时提供两种知识库接入方式。一种是直接调用FastGPT的知识库接口，将第三方文件系统的内容写入FastGPT知识库；另一种是API知识库方式。用户认为后者会额外增加第三方系统的开发接口工作量，且实现效果与前者一致，因此疑惑API知识库存在的必要性，同时询问API知识库的定时同步配置方式，提及目前仅在代码中看到默认24小时的同步设置。

## 可能原因
用户未清晰区分两种接入方式的核心逻辑差异，同时不了解API知识库的设计目标与同步配置的相关规则，导致对两种方式的价值产生疑问。

## 排查步骤
1. 梳理直接调用知识库接口与API知识库的各自运行逻辑；
2. 结合业务场景，判断是否需要无需复制原有文件库内容的同步方案；
3. 检索API知识库相关的配置文档或代码中的同步设置。

## 解决与验证
直接调用FastGPT知识库接口属于被动推送模式，需要将第三方文件库的内容完整复制到FastGPT知识库中。API知识库属于主动拉取模式，无需复制原有文件库的内容，仅通过API接口即可拉取目标数据并完成同步，同时支持定时更新操作。API知识库的默认同步周期为24小时，具体的配置入口需按实际环境确认。

> 来源: [FastGPT GitHub issue #3664](https://github.com/labring/FastGPT/issues/3664)
