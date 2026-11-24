---
title: 在Linux或Windows服务器部署Xinference以支持FastGPT自定义模型调用
slug: /zh/reference/deploy-xinference-server-fastgpt
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/custom-models/xinference
source_type: 官方文档小节
---

# 在Linux或Windows服务器部署Xinference以支持FastGPT自定义模型调用

## 结论
可通过Docker或本地直接部署两种方式在Linux/Windows服务器搭建Xinference服务。部署完成后可通过服务器IP的9997端口对外提供服务，适配FastGPT自定义模型调用。

## 具体怎么做
1.  前置配置：若服务器配备NVIDIA显卡，需先安装CUDA以启用显卡加速。
2.  选择部署方式：
    - Docker部署：确认已安装Docker，执行启动命令：
      ```
      docker run -p 9997:9997 --gpus all xprobe/xinference:latest xinference-local -H 0.0.0.0
      ```
    - 直接部署：
      1.  安装conda，创建并激活Python 3.11环境：
          ```
          conda create --name py311 python=3.11
          conda activate py311
          ```
      2.  安装推理后端，按需选择：
          - 仅安装Transformers：`pip install "xinference[transformers]"`
          - 仅安装vLLM：`pip install "xinference[vllm]"`
          - 同时安装两者：`pip install "xinference[transformers,vllm]"`
      3.  启动Xinference服务：`xinference-local -H 0.0.0.0`

## 注意事项
1.  PyPi自动安装的PyTorch对应的CUDA版本可能与当前环境不匹配，需参考PyTorch官网安装指南手动调整。
2.  Xinference默认启动端口为9997，添加`-H 0.0.0.0`参数后，非本地客户端可通过服务器IP访问服务。
3.  推理后端可选Transformers或vLLM，vLLM适合高并发生产场景。
4.  直接部署需准备3.9以上Python环境，建议用conda创建3.11版本环境。
5.  Docker部署需提前安装Docker环境。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/custom-models/xinference)
