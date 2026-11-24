---
title: FastGPT V4.9.0前旧版Marker解析服务的部署与配置方法
slug: /zh/reference/fastgpt-pre-v490-marker-setup
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/custom-models/marker
source_type: 官方文档小节
---

# FastGPT V4.9.0前旧版Marker解析服务的部署与配置方法

## 结论
FastGPT V4.9.0版本之前，可通过部署Marker解析服务并配置对应环境变量，实现自定义文件解析功能。完成配置后即可调用该服务完成文件解析工作。

## 具体怎么做
1. 拉取Marker服务镜像：
```
docker pull crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/marker11/marker_images:v0.1
```
2. 运行Marker服务容器：
```
docker run --gpus all -itd -p 7231:7231 --name model_pdf_v1 -e PROCESSES_PER_GPU="2" crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/marker11/marker_images:v0.1
```
3. 修改FastGPT环境变量：
   - `CUSTOM_READ_FILE_URL=http://xxxx.com/v1/parse/file`：替换host为解析服务实际访问地址，path不可变动。
   - `CUSTOM_READ_FILE_EXTENSION`：配置支持的文件后缀，多个类型用逗号隔开。

## 注意事项
1. 该配置仅适用于FastGPT V4.9.0版本之前的环境。
2. 运行Marker服务容器需要启用GPU支持，需确保宿主机配置对应GPU运行环境。
3. `CUSTOM_READ_FILE_URL`的path部分必须保留为`/v1/parse/file`，不可修改。
4. 可通过`CUSTOM_READ_FILE_EXTENSION`配置需要支持的文件后缀类型。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/custom-models/marker)
