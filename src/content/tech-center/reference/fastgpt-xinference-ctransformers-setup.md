---
title: 为FastGPT在个人设备部署Xinference并使用CTransformers作为推理后端
slug: /zh/reference/fastgpt-xinference-ctransformers-setup
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/custom-models/xinference
source_type: 官方文档小节
---

# 为FastGPT在个人设备部署Xinference并使用CTransformers作为推理后端

## 结论
在个人设备部署Xinference时，推荐使用CTransformers作为推理后端，可借助GGML库在消费级硬件运行大模型。完成安装配置后，运行`xinference-local`即可启动服务供FastGPT调用。

## 具体怎么做
1. 安装基础依赖：执行以下命令
   ```bash
   pip install xinference
   pip install ctransformers
   ```
2. 根据硬件平台安装llama-cpp-python，需指定对应编译参数：
   - Apple Metal（MPS）：`CMAKE_ARGS="-DLLAMA_METAL=on" pip install llama-cpp-python`
   - Nvidia GPU：`CMAKE_ARGS="-DLLAMA_CUBLAS=on" pip install llama-cpp-python`
   - AMD GPU：`CMAKE_ARGS="-DLLAMA_HIPBLAS=on" pip install llama-cpp-python`
3. 启动Xinference服务：执行`xinference-local`

## 注意事项
1. GGML为C++库，Xinference通过llama-cpp-python实现语言绑定，需根据硬件选择对应编译参数，否则可能无法正常加载模型。
2. 模型量化通过降低权重精度减少资源占用，GGML支持多种量化策略，不同策略在效率和性能间存在不同权衡。
3. 部署需确保硬盘有足够存储、RAM足够加载量化后的模型，仅支持Mac、个人电脑类消费级硬件。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/custom-models/xinference)
