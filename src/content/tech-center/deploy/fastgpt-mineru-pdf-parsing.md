---
title: 为FastGPT部署并配置MinerU服务实现PDF文档增强解析
slug: /zh/deploy/fastgpt-mineru-pdf-parsing
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/mineru
source_type: 官方文档
---

# 为FastGPT部署并配置MinerU服务实现PDF文档增强解析

PDF是相对复杂的文件格式，FastGPT内置的pdf解析器依赖pdfjs库，基于逻辑解析，无法有效处理图片、表格、公式等非简单文本内容，解析效果不佳。MinerU集成YOLO、PaddleOCR及表格识别等模型，基于视觉解析，可有效提取图片、表格、公式等复杂内容，适合作为FastGPT的PDF增强解析方案。部署该服务需满足16GB以上GPU显存，推荐32GB以上内存。社区版用户可通过配置文件启用该服务，商业版用户可在Admin后台直接配置。

### 部署与配置步骤
1. 安装MinerU服务：使用Docker快速部署，执行以下命令拉取镜像并启动容器：
```bash
docker pull crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/fastgpt_ck/mineru:v1
docker run --gpus all -itd -p 7231:8001 --name mode_pdf_minerU crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/fastgpt_ck/mineru:v1
```
该容器采用pipeline模式，会根据GPU数量创建并行进程处理PDF解析任务。
2. 配置FastGPT：社区版用户修改`config.json`文件，添加`systemEnv.customPdfParse`配置项，示例如下：
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
商业版用户可直接在Admin后台按表单指引填写配置。配置完成后需重启FastGPT服务生效。

### 测试与使用说明
上传PDF文件并勾选「PDF增强解析」选项，可通过日志验证解析是否生效，有效日志包含`[Info] 2024-12-05 15:04:42 Parsing files from an external service`和`[Info] 2024-12-05 15:07:08 Custom file parsing is complete, time: 1316ms`，需确保`LOG_LEVEL`设置为`info`或`debug`。此外，MinerU采用GPL-3.0协议，需在遵守协议的前提下使用。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/custom-models/mineru
