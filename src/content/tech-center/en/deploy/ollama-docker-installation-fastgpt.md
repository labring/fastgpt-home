---
title: Install Ollama for FastGPT Self-Hosted Deployments
slug: /en/deploy/ollama-docker-installation-fastgpt
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/ollama
source_type: Official documentation
---

# Install Ollama for FastGPT Self-Hosted Deployments

## Prerequisites
Before deploying Ollama with FastGPT via Docker, ensure Docker is installed on your host machine. This Docker-based installation method is the officially recommended approach for integrating custom Ollama models with FastGPT.

## Standalone Ollama Docker Deployment
For environments where FastGPT is not running in a Docker container, use the official Ollama Docker image with these sequential commands:
First, pull the latest official Ollama Docker image:
```bash
docker pull ollama/ollama
```
Then start the Ollama container in detached background mode, with the default API port exposed and a consistent container name:
```bash
docker run --rm -d --name ollama -p 11434:11434 ollama/ollama
```
This command uses the `--rm` flag to automatically delete the container when it stops, `-d` to run the container in the background, `--name ollama` to assign a predictable container identifier, and `-p 11434:11434` to map host port 11434 to the container’s internal Ollama API port.

## Containerized FastGPT Compatible Deployment
If your FastGPT instance is deployed using Docker, the Ollama container must be connected to the same Docker network as FastGPT to prevent connectivity failures. Use this adjusted command, replacing `(your FastGPT container network)` with the actual name of the Docker network used by your FastGPT deployment:
```bash
docker run --rm -d --name ollama --network (your FastGPT container network) -p 11434:11434 ollama/ollama
```
Attaching the Ollama container to the specified network ensures that FastGPT can directly resolve and communicate with the Ollama API without requiring external network routing.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/ollama)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
