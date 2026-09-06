---
title: 解决FastGPT中经LibreOffice转换的PPT文件无法识别问题
slug: /zh/troubleshoot/fastgpt-ppt-parse-failure
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4744
source_type: GitHub issue
---

# 解决FastGPT中经LibreOffice转换的PPT文件无法识别问题

## 现象
FastGPT 4.9.7版本中，正常.pptx格式文件可被模型正常识别。将.ppt格式文件通过Python结合LibreOffice转换为.pptx格式后，该转换后的文件可正常打开，但模型无法识别该文件，未提供具体报错文本。

## 可能原因
暂未明确具体原因，需按实际环境确认。

## 排查步骤
1. 验证转换后的.pptx文件是否可正常打开，确认转换流程无异常
2. 确认FastGPT版本为4.9.7，检查模型相关基础配置是否正常
3. 对比正常可识别的.pptx文件与转换后无法识别的.pptx文件的格式、元数据差异
4. 完整记录报错信息（若有）

## 解决与验证
当前无公开的官方解决方案。若需推进该问题的解决，可重新发起相关issue并补充完整报错信息、转换前后的文件细节等相关内容。

> 来源: [FastGPT GitHub issue #4744](https://github.com/labring/FastGPT/issues/4744)
