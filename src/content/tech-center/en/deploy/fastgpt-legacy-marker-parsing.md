---
title: Configure Legacy Marker Parsing for FastGPT
slug: /en/deploy/fastgpt-legacy-marker-parsing
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/marker
source_type: Official documentation
---

# Configure Legacy Marker Parsing for FastGPT

## Overview of Legacy Marker Parsing
This workflow enables custom document parsing for FastGPT versions released prior to V4.9.0, using the standalone Marker parsing service. It diverts supported document processing to a dedicated Marker container, rather than using FastGPT’s built-in parsing pipeline.

## Deploy Marker Container Service
First, retrieve the official Marker container image with the following command:
```dockerfile
docker pull crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/marker11/marker_images:v0.1
```
After the image is downloaded, launch the container with required GPU acceleration and configuration:
```dockerfile
docker run --gpus all -itd -p 7231:7231 --name model_pdf_v1 -e PROCESSES_PER_GPU="2" crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/marker11/marker_images:v0.1
```
This command enables GPU acceleration via the `--gpus all` flag, maps host port 7231 to the container’s internal parsing port, names the running container `model_pdf_v1`, and sets `PROCESSES_PER_GPU` to 2 to limit concurrent parsing processes per attached GPU.

## Configure FastGPT Environment Variables
Two mandatory environment variables must be adjusted in your FastGPT deployment to integrate with the Marker service:
- `CUSTOM_READ_FILE_URL`: The full endpoint for the custom parsing service. Replace the host portion (e.g., `xxxx.com`) with your deployed Marker service address; the path `/v1/parse/file` must remain unmodified. A sample valid value is `http://xxxx.com/v1/parse/file`.
- `CUSTOM_READ_FILE_EXTENSION`: A comma-separated list of file extensions that will be routed to the Marker parsing service. Multiple supported types must be separated by commas.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/marker)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
