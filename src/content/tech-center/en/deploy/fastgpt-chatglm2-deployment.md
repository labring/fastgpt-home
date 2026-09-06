---
title: Deploy ChatGLM2 Models via FastGPT Source Code
slug: /en/deploy/fastgpt-chatglm2-deployment
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/chatglm2
source_type: Official documentation
---

# Deploy ChatGLM2 Models via FastGPT Source Code

This page covers source code-based deployment of ChatGLM2 custom models for self-hosted FastGPT instances, using the official adapter script.

## Deployment Steps
1.  Configure the host environment using the instructions provided in the preceding FastGPT self-host documentation.
2.  Download the official ChatGLM2 adapter Python file from the FastGPT GitHub repository: https://github.com/labring/FastGPT/blob/main/plugins/model/llm-ChatGLM2/openai_api.py.
3.  Install required runtime dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Edit the downloaded `openai_api.py` file to configure the `verify_token` method, which adds an authentication layer to restrict unauthorized access to the deployed model service.
5.  Launch the model service with the appropriate model variant, using the command below. Replace `16` with the correct model identifier from the official configuration table:
    ```bash
    python openai_api.py --model_name 16
    ```

## Configuration Details
The only required command-line parameter for the adapter script is `--model_name`, which specifies the target ChatGLM2 model size. The service defaults to listening on the network address `http://0.0.0.0:6006` once fully initialized. The `verify_token` configuration in the adapter script is mandatory for securing the model API endpoint against unauthorized access.

## Startup Verification
After executing the launch command, wait for the model to download and load into memory. If you encounter errors, try asking GPT for help. Upon successful startup, the terminal will display a connection address matching the reference screenshot provided in the official documentation. The valid base connection address for the deployed service is `http://0.0.0.0:6006`.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/chatglm2)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
