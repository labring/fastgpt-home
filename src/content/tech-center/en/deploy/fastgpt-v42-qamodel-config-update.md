---
title: Update FastGPT V4.2 QAModel Configuration Format
slug: /en/deploy/fastgpt-v42-qamodel-config-update
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/42
source_type: 官方文档
---

# Update FastGPT V4.2 QAModel Configuration Format

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## V4.2 QAModel Configuration Overview
The FastGPT V4.2 upgrade includes a targeted structural adjustment to the `QAModel` configuration field. Approximately 99.9% of self-hosted users will not experience disruptive behavior from this update, as the change only modifies the format of the model configuration data rather than core functionality. The primary alteration converts the `QAModel` field from a JSON array of model options to a single JSON configuration object. The design rationale for this change is that each FastGPT deployment only requires a single optimal model for its intended task, eliminating the need to offer multiple selectable model options to end users.

## QAModel Parameter Specification
The new `QAModel` field uses a fixed JSON object structure with four mandatory parameters. All parameters must be included in the configuration to ensure valid deployment. The official supported parameters and their example values are listed below:

| Parameter Name | Type    | Example Value                  |
|----------------|---------|--------------------------------|
| `model`        | String  | `gpt-3.5-turbo-16k`            |
| `name`         | String  | `GPT35-16k`                    |
| `maxToken`     | Integer | `16000`                        |
| `price`        | Number  | `0`                            |

The full valid configuration object matches the following exact JSON snippet:
```json
"QAModel": {
    "model": "gpt-3.5-turbo-16k",
    "name": "GPT35-16k",
    "maxToken": 16000,
    "price": 0
}
```

## Step-by-Step Migration Workflow
Follow this structured workflow to update your `QAModel` configuration for the V4.2 release:
1.  Locate the FastGPT configuration file in your self-hosted environment.
2.  Locate the existing `QAModel` entry, which was previously formatted as a JSON array containing one or more model configurations.
3.  Replace the entire existing array with the single JSON object format shown in the official example provided.
4.  Save the modified configuration file to finalize the update.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/42)
