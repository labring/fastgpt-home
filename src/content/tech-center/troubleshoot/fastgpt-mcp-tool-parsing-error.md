---
title: 解决FastGPT接入MCP后工具名称描述及枚举类型解析异常问题
slug: /zh/troubleshoot/fastgpt-mcp-tool-parsing-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6542
source_type: GitHub issue
---

# 解决FastGPT接入MCP后工具名称描述及枚举类型解析异常问题

## 现象
私有部署版本4.14.8的FastGPT接入MCP后，存在两个异常问题：一是工具列表可正确显示名称和描述，但交互调用工具时，传给第三方模型的工具名称、描述信息错误，导致大模型无法正确理解工具描述，仅能通过工具名判断是否调用；二是MCP工具中的枚举类型无法被FastGPT解析，被直接识别为string类型，而其他MCP调试工具可正常解析该枚举类型。

## 可能原因
暂未明确官方根因，结合问题表现推测，可能与FastGPT处理MCP工具元数据的解析逻辑有关，未正确传递工具名称描述字段，且未实现枚举类型的识别转换逻辑，具体需结合代码实现进一步确认。

## 排查步骤
1. 确认当前FastGPT为私有部署4.14.8版本；
2. 核对MCP服务的元数据返回格式，对比其他可正常解析的MCP调试工具的识别结果；
3. 触发工具调用，查看传给第三方模型的工具参数详情，与工具列表显示的信息进行对比；
4. 验证MCP工具中的枚举类型字段在FastGPT中的类型识别结果。

## 解决与验证
目前暂无官方明确的修复方案，可按以下方式处理：
1. 临时调整：若需保证大模型正确识别工具，可在FastGPT的工具配置页面手动补充工具的正确描述信息；
2. 推进修复：等待官方发布对应版本的更新以修复该问题，或基于MCP官方元数据规范自行修改FastGPT的解析逻辑；
3. 验证修复效果：在更新后确认传给第三方模型的工具名称、描述与MCP注册时一致，且枚举类型被正确识别，未被转换为string类型。

> 来源：[FastGPT GitHub Issue #6542](https://github.com/labring/FastGPT/issues/6542)
