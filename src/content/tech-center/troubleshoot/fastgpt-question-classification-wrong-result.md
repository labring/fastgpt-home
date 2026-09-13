---
title: 解决FastGPT问题分类结果始终为最后一个选项的问题
slug: /zh/troubleshoot/fastgpt-question-classification-wrong-result
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/613
source_type: GitHub issue
---

# 解决FastGPT问题分类结果始终为最后一个选项的问题

## 现象
FastGPT v4.6.4 私有部署版本中，使用问题分类功能时，所有输入内容的分类结果均为最后一个选项。具体表现包括：
1.  当分类选项设为「中文」「英文」时，无论输入中文或英文文本，均被判定为英文分类；
2.  使用内置问题分类模板测试时，输入"你好"被判定为「其它问题」，未匹配到对应分类项。
用户部署时使用本地模型，通过text-generation-webui载入yentinglin/Taiwan-LLaMa-v1.0模型。

## 可能原因
当前无明确官方根因，结合复现场景，问题可能与本地部署的模型配置、问题分类的逻辑处理或模型调用参数相关，需按实际部署环境确认。

## 排查步骤
1.  确认FastGPT版本为v4.6.4，且为私有部署版本。
2.  查看问题分类的配置页面，记录所有分类选项的顺序与具体内容。
3.  执行复现测试：分别输入对应分类项的典型内容，如输入"你好"测试内置分类模板、输入中文/英文文本测试中英文分类场景。
4.  确认所使用的本地模型为text-generation-webui载入yentinglin/Taiwan-LLaMa-v1.0模型，检查模型调用的相关配置。

## 解决与验证
目前暂无公开的官方解决方法，可按以下方式尝试与验证：
1.  调整模型类型或修改模型调用参数后，重新测试问题分类功能；
2.  核对问题分类的配置项与输入文本的匹配逻辑，确认配置无误。
验证方式为输入对应分类的典型内容，确认分类结果符合预期，如输入"中文字"应被归类为中文分类，输入"英文字"应被归类为英文分类。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/613)
