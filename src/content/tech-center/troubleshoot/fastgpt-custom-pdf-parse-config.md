---
title: FastGPT 配置自定义接口实现PDF自动解析的方法
slug: /zh/troubleshoot/fastgpt-custom-pdf-parse-config
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3943
source_type: GitHub issue
---

# FastGPT 配置自定义接口实现PDF自动解析的方法

## 现象
使用FastGPT处理PDF文件时，无法自动完成内容解析，需通过手动导入导出的方式操作，无法满足知识库向量化、附件PDF内容提取等自动化场景需求。

## 可能原因
FastGPT默认未集成PDF文件自动解析能力，需通过自定义接口接入外部解析服务，未配置对应参数导致无法自动调用解析服务。

## 排查步骤
1. 确认FastGPT版本已升级至最新版，确保支持自定义读取文件接口配置。
2. 检查FastGPT的环境配置项，确认是否存在CUSTOM_READ_FILE_URL相关参数，需按实际环境确认参数位置与配置格式。
3. 确认已准备好可对外提供PDF文件内容解析的自定义API接口。

## 解决与验证
通过配置CUSTOM_READ_FILE_URL参数，接入自定义API接口即可完成PDF解析服务的接入。具体步骤为：编写符合需求的API接口，实现PDF文件内容解析逻辑；在FastGPT的环境配置中设置CUSTOM_READ_FILE_URL参数，指向该自定义API接口的访问地址；重启FastGPT服务后，上传PDF文件即可自动触发解析流程，完成内容提取。

> 来源: [FastGPT GitHub issue #3943](https://github.com/labring/FastGPT/issues/3943)
