---
title: Install and Deploy Xinference for FastGPT Custom Models
slug: /en/deploy/xinference-installation-fastgpt
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/xinference
source_type: Official documentation
---

# Install and Deploy Xinference for FastGPT Custom Models

## Supported Inference Backends
When deploying LLMs on a Linux or Windows server, two inference backends are available for Xinference:
- [Transformers](https://huggingface.co/docs/transformers/index): Integrates Hugging Face's Transformers library to support cutting-edge NLP and LLM models.
- [vLLM](https://vllm.ai/): An open-source library developed by UC Berkeley, featuring the PagedAttention algorithm for optimized memory management of attention keys and values. It is suited for high-concurrency production environments.

For servers with NVIDIA GPUs, follow the linked CUDA installation instructions to enable full GPU acceleration with Xinference.

## Docker Deployment
For quick one-click installation and startup, use Xinference's official Docker image. First ensure Docker is installed on the host machine, then run the following command:
```bash
docker run  -p 9997:9997 --gpus all xprobe/xinference:latest xinference-local -H 0.0.0.0
```
This command maps port 9997 on the host to the container's service port, enables all available GPUs, and starts the Xinference service bound to all network interfaces.

## Direct Manual Deployment
Follow these steps for a direct installation without Docker:
1.  Prepare a Python 3.9+ environment. Use Conda to create a dedicated Python 3.11 environment:
    ```bash
    conda create --name py311 python=3.11
    conda activate py311
    ```
2.  Install Xinference with your chosen inference backends. Use one of the following commands:
    - Install only Transformers backend: `pip install "xinference[transformers]"`
    - Install only vLLM backend: `pip install "xinference[vllm]"`
    - Install both backends: `pip install "xinference[transformers,vllm]"`
3.  Resolve PyTorch CUDA mismatches if needed: PyPI automatically installs PyTorch alongside the selected backends, but the auto-installed CUDA version may not match the host environment. Follow the official PyTorch installation guide to manually install the correct version.
4.  Start the Xinference service:
    ```bash
    xinference-local -H 0.0.0.0
    ```
The service runs locally on port 9997 by default. The `-H 0.0.0.0` parameter allows non-local clients to access the service using the host machine's IP address.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/xinference)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
