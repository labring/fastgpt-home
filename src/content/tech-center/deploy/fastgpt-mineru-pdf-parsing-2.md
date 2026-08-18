---
title: 在FastGPT中配置MinerU以实现PDF文档复杂内容的增强解析
slug: /zh/deploy/fastgpt-mineru-pdf-parsing-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/mineru
source_type: 官方文档
---

# 在FastGPT中配置MinerU以实现PDF文档复杂内容的增强解析

## 功能背景与边界
FastGPT内置的PDF解析依赖pdfjs库，基于逻辑解析逻辑，无法有效处理包含图片、表格、公式的复杂PDF文件，解析效果不佳。MinerU通过视觉解析结合YOLO、PaddleOCR等模型，可实现图片提取、布局识别、表格识别和公式识别。使用时需遵守MinerU的GPL-3.0开源协议。社区版用户需通过配置文件修改，商业版可直接在Admin后台配置。

## 快速配置与部署步骤
1.  **安装MinerU服务**
    硬件要求：至少16GB以上GPU显存，推荐32GB以上内存。使用Docker快速部署：
    ```bash
    docker pull crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/fastgpt_ck/mineru:v1
    docker run --gpus all -itd -p 7231:8001 --name mode_pdf_minerU crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/fastgpt_ck/mineru:v1
    ```
    该镜像采用pipeline模式，会根据GPU数量创建并行进程处理PDF解析。
2.  **配置FastGPT参数**
    社区版用户需在`config.json`中添加如下配置：
    ```json
    {
      "systemEnv": {
        "customPdfParse": {
          "url": "http://xxxx.com/v2/parse/file",
          "MinerU key": "",
          "doc2xKey": "",
          "price": 0
        }
      }
    }
    ```
    配置完成后需重启FastGPT服务。商业版用户直接在Admin后台按表单指引填写即可。
3.  **验证解析效果**
    上传PDF文件并勾选「PDF增强解析」，可在日志中查看如下信息确认生效：
    ```
    [Info] 2024-12-05 15:04:42 Parsing files from an external service
    [Info] 2024-12-05 15:07:08 Custom file parsing is complete, time: 1316ms
    ```
    也可在应用的文件上传配置中勾选「PDF增强解析」启用该功能。

## 注意事项与边界
需注意，该功能仅支持通过指定的MinerU服务解析PDF，无法处理其他格式文件。配置完成后必须重启FastGPT服务才能生效。若未勾选「PDF增强解析」，将使用内置的默认解析器。同时需确保MinerU服务正常运行，否则PDF上传可能会出现解析失败的情况。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/mineru)
