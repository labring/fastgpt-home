---
title: FastGPT数据集单条更新繁琐的批量更新解决方案
slug: /zh/troubleshoot/fastgpt-dataset-batch-update
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2388
source_type: GitHub issue
---

# FastGPT数据集单条更新繁琐的批量更新解决方案

## 现象
更新FastGPT数据集内的条目时，仅支持单条逐一修改，每次修改后单独提交更新，操作繁琐，效率较低。

## 可能原因
系统未内置数据集批量更新功能，且多数知识库场景无高频修改内容的需求，导致该功能暂未被开发。

## 排查步骤
1. 访问FastGPT目标数据集的管理页面。
2. 浏览条目操作区域，确认是否存在批量更新相关功能入口。
3. 若未找到对应入口，需通过其他途径实现批量更新操作。

## 解决与验证
通过调用FastGPT提供的API，编写Python脚本实现批量更新。具体操作如下：
1. 编写Python脚本，调用FastGPT数据集更新相关API。
2. 在脚本中配置需要更新的条目内容与需按实际环境确认的对应参数。
3. 运行脚本，系统将根据脚本内容批量更新数据集条目。
验证方式为：运行脚本后确认返回成功响应，查看数据集页面，对应条目已按脚本要求完成更新。

> 来源: [FastGPT GitHub issue #2388](https://github.com/labring/FastGPT/issues/2388)
