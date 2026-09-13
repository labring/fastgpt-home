---
title: Install Ollama on Host Machine for FastGPT
slug: /en/deploy/ollama-host-installation-fastgpt
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/ollama
source_type: Official documentation
---

# Install Ollama on Host Machine for FastGPT

## Host-Based Ollama Installation for FastGPT
This guide covers direct host machine installation of Ollama for self-hosted FastGPT deployments, excluding Docker container workflows. This approach installs Ollama directly onto your operating system, with mandatory configuration to enable integration with FastGPT.

## Platform-Specific Installation Steps
Follow the commands matching your operating system to install Ollama without Docker:

### macOS
For systems with Homebrew pre-installed, execute these terminal commands:
```bash
brew install ollama
ollama serve
```

### Linux
For Ubuntu-based Linux distributions, run the official Ollama install script:
```bash
curl https://ollama.com/install.sh | sh
ollama serve
```

### Windows
Download the official Ollama installer from the project website, run the installation wizard to completion, then start the Ollama service via Command Prompt or PowerShell:
```bash
ollama serve
```
To confirm the service is running, visit `http://localhost:11434` in a web browser.

## Configure Ollama for FastGPT Integration
By default, Ollama restricts access to the local loopback interface. To allow FastGPT to connect to the Ollama host, set the `OLLAMA_HOST` environment variable to `0.0.0.0` using platform-specific steps:

### Linux (systemd Service)
1. Edit the Ollama systemd service configuration file:
```bash
sudo systemctl edit ollama.service
```
2. Insert the following line under the `[Service]` section of the file:
```
Environment="OLLAMA_HOST=0.0.0.0"
```
3. Save and exit the editor, then reload the systemd daemon and restart the Ollama service:
```bash
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

### macOS
1. Open a terminal window and run this command to set the environment variable:
```bash
launchctl setenv ollama_host "0.0.0.0"
```
2. Restart the Ollama application from your system's application directory.

### Windows
1. Use the Start menu search bar to open the "Edit system environment variables" tool.
2. In the "System Properties" window, select "Environment Variables".
3. Under System variables, click "New" to create a variable named `OLLAMA_HOST` with the value `0.0.0.0`.
4. Save all changes, then restart the Ollama service via the Start menu.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/ollama)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
