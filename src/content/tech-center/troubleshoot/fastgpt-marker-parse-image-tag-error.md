---
title: 解决FastGPT 4.9.0版本Marker解析后图片异常与标签残留问题
slug: /zh/troubleshoot/fastgpt-marker-parse-image-tag-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4341
source_type: GitHub issue
---

# 解决FastGPT 4.9.0版本Marker解析后图片异常与标签残留问题

## 现象
部署FastGPT 4.9.0私有部署版本并配置Marker服务后，使用知识库增强解析功能时出现两个问题：一是图片无法正常展示，解析出的图片地址与正常格式不符；二是解析后的文档残留span标签。正常图片地址以`/api/system`开头，异常地址不符合该格式。

## 可能原因
该异常触发场景为将customPdfParse配置项的url字段替换为Marker服务地址并重启FastGPT服务后，目前未明确标注具体根因，需结合实际部署环境与配置细节进一步确认。

## 排查步骤
1. 确认FastGPT版本为4.9.0私有部署版本，Marker服务为v0.2版本镜像，且已按照官方文档完成部署。
2. 检查customPdfParse配置项的url字段是否正确指向Marker服务地址，确认配置无误后重启FastGPT服务。
3. 对比正常图片地址与异常图片地址的格式差异，确认异常地址是否符合`/api/system`开头的预期格式。
4. 查看解析后的文档内容，确认是否存在残留的span标签。

## 解决与验证
目前暂无公开的官方修复方案，可尝试以下验证与调整步骤：1. 重新核对Marker服务的部署配置，确保与FastGPT的集成逻辑匹配。2. 检查FastGPT的图片地址拼接逻辑，确认是否与解析服务返回的图片地址格式兼容。3. 若问题持续存在，可临时回退至原PDF解析配置，或等待后续官方更新。验证标准为：解析后的文档图片可正常展示，且文档中无span标签残留。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4341)
