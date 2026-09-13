---
title: 解决FastGPT中PC端登录后图片无法显示的问题
slug: /zh/troubleshoot/fix-fastgpt-pc-image-display
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/3072
source_type: GitHub issue
---

# 解决FastGPT中PC端登录后图片无法显示的问题

## 现象
手机拍摄的图片可被FastGPT正常识别，PC端登录系统后，上传或已上传的图片无法正常显示。

## 可能原因
当前未获取到明确报错文本，需按实际环境确认，可能涉及PC端浏览器缓存异常、网络加载限制、浏览器兼容问题或FastGPT相关配置异常。

## 排查步骤
1.  检查PC端网络连接状态，确认可正常访问外部网页资源，排除网络故障。
2.  清除当前PC端浏览器的缓存数据与Cookie信息，重启浏览器后重新登录FastGPT，查看图片是否恢复显示。
3.  更换PC端其他浏览器，或开启浏览器无痕模式后重新登录FastGPT，测试图片显示功能。
4.  核对FastGPT部署或使用的相关配置项，需按实际环境确认配置参数是否符合要求。

## 解决与验证
若为浏览器缓存异常导致的问题，清除缓存后即可恢复图片显示。若为浏览器兼容问题，更换浏览器或使用无痕模式后可正常展示图片。若上述步骤未解决问题，需结合实际环境进一步排查网络配置或FastGPT相关配置项。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3072)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
