---
title: 修复FastGPT Collection搜索仅支持当前目录直接子文件的问题
slug: /zh/troubleshoot/fastgpt-collection-recursive-search
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4904
source_type: GitHub issue
---

# 修复FastGPT Collection搜索仅支持当前目录直接子文件的问题

## 现象
FastGPT的Collection搜索功能仅支持搜索当前目录下的直接子文件，无法遍历深层嵌套的子文件夹。该问题的应用场景为需要快速查找深层嵌套文件夹中的特定文件，在数据集根目录执行全局搜索时，无法覆盖深层文件，需多次手动切换目录才能完成查找。

## 可能原因
当前FastGPT的Collection搜索模块默认仅遍历当前目录的直接子文件，未启用全层级递归搜索逻辑，与App、Dataset模块的搜索行为存在差异。

## 排查步骤
1. 登录FastGPT平台，进入目标Collection模块。
2. 在Collection的搜索输入框中输入关键词，执行搜索操作。
3. 查看搜索结果列表，确认结果是否仅包含当前目录下的直接子文件，未包含深层子文件夹内的文件。

## 解决与验证
该问题已处理。验证方法为：进入Collection模块的任意目录，执行搜索操作，确认搜索结果包含当前目录下所有层级子文件夹内的文件，并展示完整层级路径。

> 来源: [FastGPT GitHub issue #4904](https://github.com/labring/FastGPT/issues/4904)
