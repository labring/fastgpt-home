---
title: FastGPT中ECharts图表dataView等功能缺失的排错指南
slug: /zh/troubleshoot/fastgpt-echarts-toolbox-missing
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6269
source_type: GitHub issue
---

# FastGPT中ECharts图表dataView等功能缺失的排错指南

## 现象
在FastGPT平台中通过echarts的JSON代码渲染图表时，saveAsImage导出图片功能可正常使用，但dataView数据视图、magicType类型切换和restore还原功能无法正常启用或使用。用户提供的示例中，实际渲染效果未包含期待的这三类功能按钮。

## 可能原因
结合issue反馈信息，可能的原因分为两类：一是用户的ECharts配置中未添加toolbox配置项以启用对应的功能；二是FastGPT平台当前对ECharts的toolbox功能支持存在限制，仅开放了saveAsImage导出功能，未启用dataView、magicType与restore相关工具组件。

## 排查步骤
1. 检查当前使用的ECharts JSON配置中是否包含toolbox配置项，确认是否已声明dataView、magicType、restore相关功能。
2. 对照标准ECharts配置规范，核对toolbox.feature下各功能参数的书写是否正确。
3. 若配置无误，需按实际环境确认FastGPT平台对ECharts toolbox功能的支持范围。

## 解决与验证
若为配置缺失问题，可在ECharts配置中补充toolbox配置项，示例代码如下：
```json
"toolbox": {
  "feature": {
    "saveAsImage": {},
    "dataView": {},
    "magicType": {"type": ["line", "bar"]},
    "restore": {}
  }
}
```
补充配置后重新加载图表，验证是否出现dataView、magicType与restore对应的功能按钮，点击各功能确认可正常使用。若配置无误但功能仍不可用，需按实际环境联系相关人员确认平台功能支持情况。

> 来源：[FastGPT GitHub Issue #6269](https://github.com/labring/FastGPT/issues/6269)
