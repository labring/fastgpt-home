---
title: 调整FastGPT对话历史记录保存数量的排错方法
slug: /zh/troubleshoot/fastgpt-adjust-history-count
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2224
source_type: GitHub issue
---

# 调整FastGPT对话历史记录保存数量的排错方法

## 现象
使用FastGPT过程中，对话历史记录的histories变量仅保存10条内容，无法获取超出该数量的历史对话数据。同时存在将输入、prompt、输出记录导出为文件的需求，现有内置功能无法满足该导出需求。

## 可能原因
FastGPT内置的histories变量默认设置了10条的保存上限，未提供直接的前端可视化配置项来调整该数量。同时官方未内置对话记录导出为文件的功能。

## 排查步骤
1. 查看当前对话的histories变量返回内容，确认返回的历史记录条数是否为10条。
2. 检查FastGPT的官方配置文件或管理后台，确认是否存在可直接修改历史记录保存数量的参数，需按实际环境确认是否存在内置配置项。
3. 若内置配置无法调整历史记录数量，可通过自定义代码实现对话历史的获取逻辑。

## 解决与验证
1. 调整对话历史记录保存数量：通过自定义代码获取对话历史数据，绕过内置的10条限制。可直接通过MongoDB获取原始对话记录，再基于业务需求处理和筛选数据。
2. 实现对话记录导出：将从MongoDB获取的完整对话记录，通过代码转换为目标文件格式输出，满足导出需求。
3. 参考相关实现：可查看GitHub Issue #2976的相关内容，匹配自身的功能实现需求。
4. 验证调整效果：运行自定义代码后，可返回超过10条的历史记录，且导出的文件包含完整的输入、prompt、输出内容，验证功能正常生效。

> 来源: [FastGPT GitHub issue #2224](https://github.com/labring/FastGPT/issues/2224)
