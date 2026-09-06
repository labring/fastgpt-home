---
title: 解决FastGPT PDF maker v2 Docker部署的GPU与知识库显示异常问题
slug: /zh/troubleshoot/fastgpt-pdf-maker-kb-gpu-issue
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4082
source_type: GitHub issue
---

# 解决FastGPT PDF maker v2 Docker部署的GPU与知识库显示异常问题

## 现象
Docker部署的PDF maker v2运行于配备4*24GB显卡的服务器，服务器整体资源空闲时，导入知识库仅占用1张GPU卡，利用率不足40%。知识库页面显示"图片标注"和"自动生成补充索引"为no，且未按文档描述显示图片和公式内容，附带多张异常截图。

## 可能原因
当前无明确可直接定位的根原因，相关异常可能与Docker容器的GPU资源分配配置、知识库功能启用参数或PDF文件解析设置相关，需按实际部署环境确认具体诱因。

## 排查步骤
1.  检查Docker容器的GPU资源映射配置，确认是否仅分配了单张GPU卡。
2.  进入知识库配置界面，查看"图片标注"和"自动生成补充索引"的当前启用状态。
3.  核对待导入知识库的PDF文件，确认其中包含可被解析的图片、公式格式内容。
4.  查看FastGPT容器的运行日志，提取与GPU调用、知识库解析相关的异常提示信息。

## 解决与验证
根据排查结果调整对应配置项。验证方式为重新导入目标知识库，确认GPU占用数量与利用率符合预期，且知识库页面正常显示"图片标注"和"自动生成补充索引"的状态，同时正确展示图片与公式内容。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4082)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
