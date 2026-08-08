---
title: 解决FastGPT私有部署上传MD文档预览报错与后缀异常问题
slug: /zh/troubleshoot/fastgpt-md-doc-upload-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6876
source_type: GitHub issue
---

# 解决FastGPT私有部署上传MD文档预览报错与后缀异常问题

## 现象
使用官方提供的sh安装脚本部署私有部署版本FastGPT后，上传MD格式文档至知识库，在`3-Data preview`阶段点击文件预览时，会报错"Can not read doc file, please convert to PDF"。继续完成上传流程后，知识库文件列表中的该文档后缀会自动变为docx。尝试将FastGPT版本回退至v4.14.15，问题仍然存在；回退至v4.14.10则可正常解析MD文档。

## 可能原因
从该issue的反馈信息来看，该问题与FastGPT版本存在关联，仅在私有部署环境中通过官方安装脚本部署的场景下出现。目前未明确具体根因，推测与文件解析模块的逻辑变更有关。

## 排查步骤
1. 执行`docker images`命令，查看当前运行的FastGPT镜像标签，确认当前版本。
2. 确认FastGPT的部署方式是否为使用官方提供的sh安装脚本。
3. 复现上传MD文档的操作，记录报错文本"Can not read doc file, please convert to PDF"以及文件后缀变化情况。
4. 修改`docker-compose.yml`配置文件，将`fastgpt-app`的镜像版本调整为v4.14.10，重新部署服务后验证问题是否解决。

## 解决与验证
当前可通过临时回退版本的方式解决该问题：修改`docker-compose.yml`中的`fastgpt-app`镜像配置，将镜像标签改为`registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt:v4.14.10`，重启FastGPT服务后，重新上传MD文档即可正常预览，且文件后缀不会发生异常变化。若需使用更高版本的FastGPT，需等待官方修复该问题，具体进度可关注项目仓库的更新动态。

> 来源：https://github.com/labring/FastGPT/issues/6876
