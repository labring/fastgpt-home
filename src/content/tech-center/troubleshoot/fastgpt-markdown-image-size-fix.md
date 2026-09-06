---
title: 解决FastGPT中Markdown图片尺寸调整失败问题
slug: /zh/troubleshoot/fastgpt-markdown-image-size-fix
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1899
source_type: GitHub issue
---

# 解决FastGPT中Markdown图片尺寸调整失败问题

## 现象
用户尝试通过多种语法调整FastGPT中互联网图片的显示尺寸，均失败。已尝试的语法包括：`![图片](http://www.xxx.com/1.png =100*100)`，以及两种英文尖括号包裹的HTML标签写法：`<img src="图片地址" width="50%" height="50%" />`、`<div align=center><img src="图片地址" width = 80%/></div>`。原始图片尺寸过大，无法通过上述语法调整。

## 可能原因
所使用的图片尺寸调整语法未被FastGPT支持，或HTML标签的书写格式存在错误。具体原因需按实际环境确认。

## 排查步骤
1.  核对已尝试的图片尺寸调整语法，确认是否符合FastGPT支持的格式规范。
2.  检查HTML标签的书写格式，确保所有符号为英文半角，属性赋值格式正确。
3.  确认目标图片URL可正常访问，无访问限制。

## 解决与验证
若使用Markdown语法调整图片尺寸，需使用FastGPT支持的对应格式；若使用HTML标签，需确保标签与属性书写符合语法规则。调整语法后重新提交内容，验证图片尺寸是否符合预期。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1899)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
