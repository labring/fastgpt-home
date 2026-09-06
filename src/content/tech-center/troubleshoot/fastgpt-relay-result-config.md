---
title: 配置FastGPT实现AI处理结果仅作为中继调用
slug: /zh/troubleshoot/fastgpt-relay-result-config
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/725
source_type: GitHub issue
---

# 配置FastGPT实现AI处理结果仅作为中继调用

## 现象
在使用FastGPT的AI对话或知识库查询功能时，AI处理后的结果会直接输出给客户端。部分业务场景需要AI仅根据知识库和提示词整理内容，仅将处理结果推送至其他逻辑进行二次加工，不直接反馈给客户端，当前版本无法满足该需求。

## 可能原因
现有FastGPT的默认配置中，AI对话及知识库查询后的处理结果会直接返回至客户端，未提供用于控制结果是否直接输出的配置项，无法适配仅作为中继调用的业务场景。

## 排查步骤
1. 明确业务场景是否需要将AI或知识库处理后的结果仅作为中继调用，不直接输出给客户端。
2. 检查当前FastGPT应用的配置项，确认是否存在控制结果输出方式的相关参数，需按实际环境确认。
3. 梳理现有应用的逻辑流程，定位直接输出AI处理结果的环节，明确需要调整的位置。

## 解决与验证
根据线程中的指引，若需实现该功能，需确认符合相关条件后，将AI处理结果返回并关闭直接输出流程。验证时，触发AI对话或知识库查询流程，确认结果不直接输出给客户端，可被正常推送至其他逻辑进行二次加工，以生成最终答复结果。

> 来源: [FastGPT GitHub issue #725](https://github.com/labring/FastGPT/issues/725)
