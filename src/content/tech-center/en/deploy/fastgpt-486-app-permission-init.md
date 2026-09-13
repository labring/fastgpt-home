---
title: Execute FastGPT 4.8.6 Application Permission Initialization
slug: /en/deploy/fastgpt-486-app-permission-init
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/486
source_type: 官方文档
---

# Execute FastGPT 4.8.6 Application Permission Initialization

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

### Overview
This procedure is a mandatory administrative step within the FastGPT 4.8.6 self-hosted upgrade workflow. Its sole purpose is to initialize inherited permissions for all FastGPT applications deployed on your instance. The request must be initiated from a terminal with outbound network access capable of reaching your deployed FastGPT domain. This step ensures that application permission inheritance is properly configured following the upgrade, aligning with the updated 4.8.6 permission framework.

### Required Configuration Parameters
Two dynamic placeholders must be replaced with your environment-specific values before executing the request. The table explains where to obtain each value.
| Placeholder | Required Source |
| --- | --- |
| `{{rootkey}}` | The secure administrative `rootkey` value defined in your FastGPT environment variables. This header authenticates the request to the protected administrative initialization endpoint. |
| `{{host}}` | Your fully qualified FastGPT domain name, used to route the HTTPS request to your active FastGPT deployment. |

### Run the Initialization Command
From any terminal with the curl utility installed, run the following POST request. Substitute the placeholders with your actual parameter values exactly as they appear in your deployment configuration:
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv486' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
This command sends a validated HTTPS POST request to the `/api/admin/initv486` endpoint on your FastGPT instance. The `--location` flag ensures that any necessary HTTP redirects are automatically followed to reach the correct endpoint. The two custom headers provide authentication via the rootkey and specify the request content type as JSON, which is required for the endpoint to process the request correctly. Upon successful execution, the endpoint will initialize and configure inherited permissions across all FastGPT applications in your deployment.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/486)
