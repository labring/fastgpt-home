---
title: 解决FastGPT谷歌搜索编排工具文本提取乱码问题
slug: /zh/troubleshoot/fastgpt-google-search-text-garbled
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/540
source_type: GitHub issue
---

# 解决FastGPT谷歌搜索编排工具文本提取乱码问题

## 现象
在v4.6.2私有部署版本中，通过sealos一键部署FastGPT后，参考官方谷歌联网搜索编排示例导入配置并测试对话，发现文本提取的内容为乱码。其中searchKey字段的预期内容为「呼和浩特天气」，结合issue提供的相关截图，可见实际返回的乱码内容与预期清晰文本不符。

## 可能原因
暂未明确具体触发原因，需结合实际部署与配置环节逐一排查，相关参数配置需按实际环境确认。

## 排查步骤
1. 确认当前FastGPT版本为v4.6.2，部署方式为sealos一键部署。
2. 按照官方谷歌联网搜索示例流程，重新导入编排配置，确认配置文件未被篡改或缺失必要参数。
3. 发起测试对话，查看完整响应内容，记录乱码出现的字段与具体内容，对比issue中展示的截图确认乱码表现。
4. 核对已配置的密钥与联网相关参数，确认其有效性与正确性，排查是否存在配置错误。

## 解决与验证
根据排查结果调整对应配置项，重新导入编排配置并发起测试对话，若searchKey字段显示为「呼和浩特天气」且无乱码，则问题解决。验证时可使用与issue中一致的测试场景，确认文本提取内容符合预期。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/540)
