---
title: 解决FastGPT知识库机器人回答未优先使用top1匹配文本的问题
slug: /zh/troubleshoot/fastgpt-top1-answer-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1197
source_type: GitHub issue
---

# 解决FastGPT知识库机器人回答未优先使用top1匹配文本的问题

## 现象
该问题出现在使用FastGPT公有云或私有部署最新版本的场景中，用户使用自身可正常使用的API Key时出现该问题，知识库机器人返回的回答内容未使用所引用文件列表中的top1文本，选择了top2的文本，二者内容存在差异。

## 可能原因
知识库的内容排序基于向量匹配度，AI会自主判断知识与答案的相关性，匹配排序仅作为参考依据之一。若未添加明确引导，AI可能不会优先使用top匹配结果。

## 排查步骤
1. 查看知识库返回的匹配文件列表，确认top1与top2文本的内容差异。
2. 检查当前配置的引用提示词内容。
3. 确认是否未针对回答的知识选择逻辑添加明确引导，需按实际环境确认提示词的具体配置。

## 解决与验证
1. 在引用提示词中添加index变量，该变量为排序变量。
2. 在提示词中对模型明确要求优先使用top匹配的文本内容。
3. 重新发起问答，验证回答是否优先使用top1匹配文本。

> 来源: [FastGPT GitHub issue #1197](https://github.com/labring/FastGPT/issues/1197)
