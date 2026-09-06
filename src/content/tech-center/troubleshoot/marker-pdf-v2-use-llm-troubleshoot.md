---
title: 解决marker-pdf V2启用use-llm参数失败的问题
slug: /zh/troubleshoot/marker-pdf-v2-use-llm-troubleshoot
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4382
source_type: GitHub issue
---

# 解决marker-pdf V2启用use-llm参数失败的问题

## 现象
用户在部署marker-pdf V2版本时，希望启用use-llm功能，通过自定义docker命令传递相关参数启动容器。执行命令后容器启动失败，无法正常使用LLM相关的PDF处理能力。用户查看容器内代码发现存在llm.service加载逻辑，且已将marker-pdf版本升级至1.6.2。

## 可能原因
docker命令中参数传递顺序错误，镜像名称后的参数未被正确识别为marker-pdf的启动参数；未正确添加启用use-llm功能的必要参数，或LLM服务相关参数存在拼写错误；环境变量与命令行参数的配置存在冲突，导致LLM服务无法正常加载。具体报错信息需按实际容器日志确认。

## 排查步骤
1. 核对docker命令的参数顺序，确认镜像名称后的所有参数均为marker-pdf的启动参数，避免参数被错误识别为docker自身的参数。
2. 检查LLM相关参数的拼写，确保使用正确的参数名，如--use-llm、--llm_service、--openai_api_key等，修正拼写错误（如将ues-llm修正为use-llm）。
3. 确认已添加启用use-llm功能的必要参数，需按实际版本要求确认具体参数格式。
4. 启动容器后查看容器日志，提取LLM服务加载失败的具体报错文本，辅助定位问题。

## 解决与验证
1. 调整docker命令的参数顺序，将所有LLM相关参数放在镜像名称之后，确保参数被正确传递。
2. 补充启用use-llm功能的必要参数，如添加--use-llm到命令中。
3. 重新执行docker run命令启动容器，等待容器启动完成后，查看容器日志确认llm.service是否正常加载。
4. 测试使用LLM相关的PDF处理功能，确认功能正常生效。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4382)
