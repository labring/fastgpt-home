---
title: 在FastGPT中配置Marker以实现PDF文档的增强解析功能
slug: /zh/deploy/fastgpt-marker-pdf-parse-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/marker
source_type: 官方文档
---

# 在FastGPT中配置Marker以实现PDF文档的增强解析功能

FastGPT 内置的 PDF 解析依赖 pdfjs 库，基于纯逻辑解析逻辑，无法有效识别和还原包含图片、表格、公式的复杂 PDF 文件，常规场景下解析效果不佳。Marker 是一款基于视觉解析的 PDF 解析工具，可有效提取此类复杂内容，其封装的 API 已适配 FastGPT 的自定义解析服务。使用 Marker 需遵守其 GPL-3.0 开源协议，请勿在违反协议的场景下使用。

## 配置与部署步骤
1.  部署 Marker 服务：拉取对应镜像并运行，使用快速 Docker 安装方式：
```bash
docker pull crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/marker11/marker_images:v0.2
docker run --gpus all -itd -p 7231:7232 --name model_pdf_v2 -e PROCESSES_PER_GPU=2 crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/marker11/marker_images:v0.2
```
2.  修改 FastGPT 配置：社区版用户需在 `config.json` 中添加 `systemEnv.customPdfParse` 配置项，商业版用户可直接在 Admin 后台按表单指引填写。配置示例如下：
```json
{
  "systemEnv": {
    "customPdfParse": {
      "url": "http://xxxx.com/v2/parse/file",
      "key": "",
      "doc2xKey": "",
      "price": 0
    }
  }
}
```
3.  重启 FastGPT 服务后生效。测试时需在知识库或应用上传配置中勾选「PDF 增强解析」，可通过日志验证：当看到 `[Info] Parsing files from an external service` 和 `[Info] Custom file parsing is complete, time: 1316ms` 时，代表解析成功，解析结果将携带图片链接。

## 注意事项与边界
需注意当前适配的 Marker 镜像版本为 v0.2，FastGPT V4.9.0 之前的旧版本需使用 v0.1 镜像，且配置方式为修改环境变量 `CUSTOM_READ_FILE_URL`、`CUSTOM_READ_FILE_EXTENSION`，接口路径为 `/v1/parse/file`。此外，部署 Marker 需使用 GPU 资源，且需确保 FastGPT 的日志级别设置为 `info` 或 `debug` 才能查看解析相关日志。如果未勾选「PDF 增强解析」，FastGPT 将默认使用内置解析器，不会调用 Marker 服务。配置中的 `url` 需替换为实际部署的 Marker 服务访问地址，`key` 和 `doc2xKey` 为可选配置项，可留空。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/custom-models/marker
