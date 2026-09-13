---
title: 解决Docker部署FastGPT后修改静态图片不生效的问题
slug: /zh/troubleshoot/fastgpt-docker-static-image-updated
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4514
source_type: GitHub issue
---

# 解决Docker部署FastGPT后修改静态图片不生效的问题

## 现象
在Docker部署的FastGPT容器中，修改/_next/static/chunks/20409.d181bfa29b1ce90e.js文件内的SVG图片代码，将原有美国国旗图片替换为中国国旗图片后，FastGPT界面对应位置的图片未发生变化。

## 可能原因
Next.js构建的静态资源会生成带哈希值的打包文件，直接修改容器内已打包的静态文件无法触发资源更新；同时容器重启后，修改内容会被镜像重置，无法持久生效。

## 排查步骤
1. 进入运行中的FastGPT Docker容器，定位到目标文件路径/_next/static/chunks/20409.d181bfa29b1ce90e.js。
2. 确认已完成该文件内SVG图片代码的替换操作，且修改内容已保存。
3. 清除本地浏览器缓存，重新加载FastGPT页面。
4. 检查容器重启后，目标文件的修改内容是否仍存在，需按实际环境确认持久化修改的方式。

## 解决与验证
直接修改容器内打包后的静态文件为临时生效方案。临时生效需先进入容器修改目标文件，再清除浏览器缓存并重新加载页面。验证方式为：重新访问FastGPT界面，确认对应位置的图片已替换为目标SVG图片。如需持久生效，需修改源码后重新构建镜像部署。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4514)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
