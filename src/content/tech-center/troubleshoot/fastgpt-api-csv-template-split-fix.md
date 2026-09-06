---
title: 解决FastGPT中API上传CSV模板无法按问答格式拆分的问题
slug: /zh/troubleshoot/fastgpt-api-csv-template-split-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2884
source_type: GitHub issue
---

# 解决FastGPT中API上传CSV模板无法按问答格式拆分的问题

## 现象
使用相同的CSV模板文件，通过后台UI上传可按指定的问答格式准确完成拆分。通过API上传同一文件时，即使调用时指定了问答拆分的格式参数，仍无法按要求完成拆分，拆分结果不符合预期。

## 可能原因
1. 官方开放的文件上传API仅适配UI上传的基础文本类型数据，未针对表格类问答拆分格式提供完整的开放能力；
2. 默认的文件上传接口仅支持基础的拆分逻辑，无法触发问答格式拆分的专属处理流程。

## 排查步骤
1. 确认待上传的CSV模板文件与UI上传使用的文件完全一致，且格式符合平台要求；
2. 检查API调用的参数配置，确认是否正确指定了问答拆分的格式参数（需按实际环境确认参数名称与取值）；
3. 对比UI上传与API上传的完整请求链路，排查是否遗漏了必要的接口调用步骤或参数。

## 解决与验证
可通过抓包获取UI上传时的完整请求流程，调用指定的两个接口实现与UI一致的拆分效果：首先调用`/api/common/file/upload`接口完成文件上传，再调用`/api/core/dataset/collection/create/csvTable`接口创建CSV表格集合。对于QA表格数据，可通过`pushData`参数传递数据完成拆分。
验证时，使用与UI上传完全相同的CSV模板文件，按上述步骤调用接口，确认拆分结果与UI上传的效果完全一致。

> 来源: [FastGPT GitHub issue #2884](https://github.com/labring/FastGPT/issues/2884)
