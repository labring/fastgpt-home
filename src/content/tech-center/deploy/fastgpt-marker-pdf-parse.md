---
title: 在FastGPT中配置Marker以实现PDF文档的解析与提取功能
slug: /zh/deploy/fastgpt-marker-pdf-parse
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/marker
source_type: 官方文档
---

# 在FastGPT中配置Marker以实现PDF文档的解析与提取功能

FastGPT内置的PDF解析依赖pdfjs库，基于逻辑解析，无法有效处理包含图片、表格、公式的复杂PDF文件，解析效果不佳。Marker基于视觉解析，可有效提取图片、表格、公式等复杂内容，其封装的API已适配FastGPT自定义解析服务。在FastGPT v4.9.0及以上版本中，社区版用户可通过配置文件启用该服务，商业版用户可直接在Admin后台按表单指引配置。

## 配置与测试步骤
1.  **安装Marker服务**
    使用官方提供的镜像快速部署：
    ```bash
docker pull crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/marker11/marker_images:v0.2
docker run --gpus all -itd -p 7231:7232 --name model_pdf_v2 -e PROCESSES_PER_GPU=2 crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/marker11/marker_images:v0.2
```
    该命令将容器端口7232映射至宿主机7231，设置每个GPU的进程数为2。

2.  **配置FastGPT**
    社区版用户需在`config.json`中添加如下配置：
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
    其中`url`为Marker服务的访问地址，`key`与`doc2xKey`留空，`price`设置为0。配置完成后需重启FastGPT服务。商业版用户无需修改配置文件，直接在Admin后台按表单填写对应参数即可。

3.  **验证解析效果**
    上传PDF文件时勾选「PDF增强解析」选项，可在FastGPT日志（需将`LOG_LEVEL`设置为info或debug）中看到如下提示：
    ```
[Info] 2024-12-05 15:04:42 Parsing files from an external service
[Info] 2024-12-05 15:07:08 Custom file parsing is complete, time: 1316ms
```
    解析完成后，生成的文档将携带提取的图片链接。

## 使用须知
Marker采用GPL-3.0 license协议，需在遵守协议的前提下使用。对于FastGPT v4.9.0之前的版本，需通过环境变量配置旧版解析服务，使用`marker_images:v0.1`镜像，映射端口为7231:7231，并设置`CUSTOM_READ_FILE_URL`、`CUSTOM_READ_FILE_EXTENSION`等环境变量。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/marker)
