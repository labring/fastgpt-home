---
title: Install Marker for FastGPT Custom PDF Parsing
slug: /en/deploy/fastgpt-marker-installation-guide
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/marker
source_type: Official documentation
---

# Install Marker for FastGPT Custom PDF Parsing

## Overview
This page details the installation of the Marker model for FastGPT’s custom PDF parsing service. The Marker model enables structured, high-fidelity extraction of text and metadata from PDF documents, and the pre-built container image provided here is validated for compatibility with FastGPT’s custom parsing framework. For complete official installation documentation, reference the Marker installation guide hosted in the FastGPT GitHub repository at https://github.com/labring/FastGPT/tree/main/plugins/model/pdf-marker.

## Quick Docker Installation Steps
Use the following verified Docker commands to deploy the Marker model with pre-configured settings:
1.  Pull the official pre-built Marker container image from the Alibaba Cloud Container Registry:
    ```docker
    docker pull crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/marker11/marker_images:v0.2
    ```
2.  Launch the container with the required runtime configuration:
    ```docker
    docker run --gpus all -itd -p 7231:7232 --name model_pdf_v2 -e PROCESSES_PER_GPU="2" crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/marker11/marker_images:v0.2
    ```
The command enables GPU acceleration with `--gpus all`, maps host port 7231 to the container’s internal port 7232, assigns the fixed container name `model_pdf_v2`, and sets the number of parallel processing processes per GPU to 2 via the `PROCESSES_PER_GPU` environment variable.

## Compatibility Notes
The bundled API included in the deployed Marker container is pre-configured to work seamlessly with FastGPT’s custom parsing service. No additional API adaptation is required to connect the running Marker instance to your self-hosted FastGPT environment. For integration, configure your FastGPT custom parsing service to target the host IP and port 7231 for PDF processing workflows.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/marker)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
