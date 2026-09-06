---
title: 解决FastGPT中重复模型ID导致配置被覆盖的问题
slug: /zh/troubleshoot/fastgpt-model-id-duplicate-override
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4107
source_type: GitHub issue
---

# 解决FastGPT中重复模型ID导致配置被覆盖的问题

## 现象
新建FastGPT模型配置时，若待新建配置的ID与已存在的模型配置ID重复，即使二者URL不同，已存在的模型配置会被新配置覆盖。

## 可能原因
当前FastGPT模型配置逻辑以模型ID作为唯一主键，当存在重复ID时，会触发覆盖原有配置的逻辑。

## 排查步骤
1. 查看当前已配置的模型ID列表，确认所有已存在的模型ID。
2. 核对待新建模型配置的ID，确认其是否与已有配置的ID重复。
3. 检查待新建配置的其他参数，如URL等，确认配置信息的完整性。

## 解决与验证
解决方法为确保新建模型配置的ID不与已有配置的ID重复。验证步骤为：完成配置新建后，查看模型配置列表，确认原有配置未被覆盖，新建配置正常显示。

> 来源: [FastGPT GitHub issue #4107](https://github.com/labring/FastGPT/issues/4107)
