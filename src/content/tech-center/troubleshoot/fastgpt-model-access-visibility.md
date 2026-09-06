---
title: 配置FastGPT模型的公有私有及访问可见范围
slug: /zh/troubleshoot/fastgpt-model-access-visibility
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4615
source_type: GitHub issue
---

# 配置FastGPT模型的公有私有及访问可见范围

## 现象

用户需要为FastGPT中的模型配置可见范围，包括设置模型为公有、私有，或指定特定账号可访问，但不清楚具体的配置方式。

## 可能原因

未在FastGPT的现有配置或操作界面中找到与模型可见范围、权限相关的设置入口，无法直接完成相关配置。

## 排查步骤

1. 确认当前使用的FastGPT部署版本，本次场景涉及v4.9.1版本。
2. 查阅项目官方README及文档，查找与模型权限、可见范围相关的说明内容。
3. 检查部署环境的配置文件，搜索与模型访问权限相关的配置项。
4. 核对已配置的密钥与账号信息，确认是否存在关联的权限控制设置。

## 解决与验证

当前线程未提供该场景的具体配置方法。若需实现模型可见范围的配置，可重新打开对应issue并补充相关信息，或查阅对应版本的官方文档。需按实际环境确认具体的配置逻辑。

> 来源: [FastGPT GitHub issue #4615](https://github.com/labring/FastGPT/issues/4615)
