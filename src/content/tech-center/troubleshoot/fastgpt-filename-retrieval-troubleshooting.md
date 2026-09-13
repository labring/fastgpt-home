---
title: FastGPT无法检索指定文件名文件的排错方法
slug: /zh/troubleshoot/fastgpt-filename-retrieval-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2447
source_type: GitHub issue
---

# FastGPT无法检索指定文件名文件的排错方法

## 现象
在使用FastGPT时，尝试基于文件名检索对应文件以开展问答，无法获取目标文件。该问题出现在4.8.9版本的私有部署及公有云FastGPT环境中，用户的具体查询场景为询问特定文件内的测试项及测试目的，核心诉求为通过文件名检索到对应文件。
## 可能原因
无法通过文件名检索文件的直接原因为FastGPT未对文件名建立索引，导致系统无法识别并匹配文件名关键词。
## 排查步骤
1. 确认当前使用的FastGPT版本为4.8.9私有部署版本或公有云版本。
2. 检查检索请求的关键词是否为目标文件名，且格式符合系统要求，格式要求需按实际环境确认。
3. 尝试使用非文件名的其他检索条件发起检索，验证基础检索功能是否正常运行。
## 解决与验证
当前无法主动添加文件名索引，无法通过配置或操作实现基于文件名的检索功能。验证方式为：使用非文件名的检索条件发起检索，确认基础检索功能可正常执行，以此排除系统整体检索故障。
> 来源: [FastGPT GitHub issue #2447](https://github.com/labring/FastGPT/issues/2447)
