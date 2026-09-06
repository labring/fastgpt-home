---
title: 解决FastGPT私有部署4.8版中echarts的markdown渲染空白问题
slug: /zh/troubleshoot/fastgpt-echarts-markdown-blank
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1506
source_type: GitHub issue
---

# 解决FastGPT私有部署4.8版中echarts的markdown渲染空白问题

## 现象
在FastGPT私有部署4.8版本中，按照指定方式在回复内容内写入包含echarts JSON的markdown内容时，最终输出结果为空白。对应页面无任何图表或相关内容展示，仅显示空白区域。

## 可能原因
当前无明确已知的关联原因，由于仅明确问题与FastGPT 4.8私有部署版本、echarts JSON格式的markdown嵌入相关，未收集到足够的异常细节，无法直接确定根本原因，需结合实际部署环境、组件配置等信息进行排查。

## 排查步骤
1. 确认当前使用的FastGPT版本为私有部署4.8版，核对绑定的密钥等基础配置是否正常可用，排除基础配置异常的可能。
2. 核对写入的markdown内容格式，确保遵循参考链接https://github.com/labring/FastGPT/issues/1220中说明的echarts JSON嵌入方式，检查JSON格式是否存在语法错误。
3. 检查回复模块的markdown渲染配置是否正常启用，确认未被禁用图表渲染相关的规则或组件。
4. 查看系统运行日志，定位与markdown渲染、echarts解析相关的异常信息，缩小排查范围。

## 解决与验证
暂无公开的明确解决方法，需根据排查得到的具体原因进行对应调整。若排查发现是markdown渲染规则未正确加载echarts相关解析逻辑，需按照官方文档或对应修复指南调整渲染配置；若为组件兼容问题，需更新对应依赖组件至适配版本。验证方式为重新生成包含echarts JSON的markdown回复，确认输出区域正常显示图表内容，不再出现空白情况。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1506)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
