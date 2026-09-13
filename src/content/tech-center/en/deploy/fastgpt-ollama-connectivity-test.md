---
title: Validate Ollama Connectivity for FastGPT Deployments
slug: /en/deploy/fastgpt-ollama-connectivity-test
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/ollama
source_type: Official documentation
---

# Validate Ollama Connectivity for FastGPT Deployments

# Connectivity Validation Purpose
Before integrating Ollama models with FastGPT, you must confirm that the FastGPT container can establish network communication with the Ollama service. This step eliminates basic network misconfiguration as a root cause for failed model integration, ensuring both services can exchange API requests and responses correctly.

# Step-by-Step Connectivity Test
Follow these exact commands to test communication:
1.  Open an interactive shell inside your FastGPT Docker container:
    ```bash
    docker exec -it [FastGPT container name] /bin/sh
    ```
    Replace `[FastGPT container name]` with the actual name of your deployed FastGPT Docker container.
2.  Run the curl test command, using the correct endpoint based on your network context:
    - For testing from within the FastGPT container to the host machine: use `http://[host IP]:11434`
    - For testing between Docker containers (if Ollama runs in its own container): use `http://[container name]:[port]`
    A critical note applies to host IP usage: never use `localhost` for the host IP address, as this will reference the FastGPT container's local loopback interface instead of the physical host machine running the Ollama service.
    The full test command will resemble:
    ```bash
    curl http://XXX.XXX.XXX.XXX:11434
    ```
    Replace `XXX.XXX.XXX.XXX` with your valid host IP or target container address.

# Interpret Test Outcomes
A successful test will return the default Ollama service welcome page content, confirming bidirectional network communication between the FastGPT container and Ollama is functional. If the command returns a `connection refused` error, timeout, or unrecognized host message, verify that the Ollama service is running on the target machine, that firewall rules allow traffic on port 11434, and that the correct network address is used. No additional pre-integration steps are required if the test returns valid Ollama service output.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/ollama)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
