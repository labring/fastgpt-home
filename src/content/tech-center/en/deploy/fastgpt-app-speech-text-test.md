---
title: Configure and Test Speech-to-Text in FastGPT Apps
slug: /en/deploy/fastgpt-app-speech-text-test
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/model/siliconCloud
source_type: Official documentation
---

# Configure and Test Speech-to-Text in FastGPT Apps

## Enable Voice Input in FastGPT Apps
To test speech-to-text functionality, access your target FastGPT application and locate the "Voice Input" option in the left sidebar configuration menu. Select the option to open a setup popup, then toggle the voice input feature to enabled. A reference screenshot of the configuration popup is shown below:
![alt text](../../../../public/imgs/image-80.png)

## Activate Voice Input for Chat
After enabling the feature, a dedicated microphone icon will appear in the application’s main chat input box. Follow these steps to initiate speech-to-text capture:
1.  Click the microphone icon within the chat input field
2.  Speak your intended query into your device’s integrated or connected microphone
3.  Wait for the automatic speech-to-text transcription process to complete

Two screenshots illustrate the active voice input state and post-capture interface:
|                                                   |                                                   |
| ------------------------------------------------- | ------------------------------------------------- |
| ![alt text](../../../../public/imgs/image-81.png) | ![alt text](../../../../public/imgs/image-82.png) |

## Validate Transcription Output
Once the speech capture process finishes, the fully transcribed text will automatically populate the chat input box. Users may review the transcribed text, make minor adjustments if needed, then send the message to the FastGPT chatbot using standard input workflows. This integrated voice input feature provides a hands-free alternative to typed text interactions within the FastGPT app.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/model/siliconCloud)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
