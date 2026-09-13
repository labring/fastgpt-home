---
title: Troubleshoot FastGPT Model Availability Errors
slug: /en/deploy/fastgpt-model-troubleshooting
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/troubleshooting/model-errors
source_type: Official documentation
---

# Troubleshoot FastGPT Model Availability Errors

## Model Availability Troubleshooting for FastGPT
When model-related errors occur in self-hosted FastGPT deployments, follow this structured validation workflow to isolate root causes without external assumptions.

### Step-by-Step Troubleshooting Flow
Follow these four sequential checks to narrow down issues:
1. **Validate Private Model Deployment**: For privately hosted models, first confirm the local service is operational before integrating with FastGPT.
2. **Direct Upstream Model Test**: Bypass FastGPT entirely to test the model endpoint directly using CURL requests. This test applies to both cloud-hosted and private model APIs.
3. **OneAPI Connectivity Test**: If using OneAPI as a middleware layer, run CURL requests to verify the OneAPI endpoint can successfully communicate with the target model.
4. **FastGPT Platform Test**: After completing the above checks, test the configured model directly within the FastGPT application to confirm end-to-end functionality.

### Standardized CURL Test Commands
Use the exact CURL commands below to validate each model type:

#### LLM Model Test
```bash
curl https://api.openai.com/v1/chat/completions \
  -H \"Content-Type: application/json\" \
  -H \"Authorization: Bearer $OPENAI_API_KEY\" \
  -d '{
    \"model\": \"gpt-4o\",
    \"messages\": [
      {
        \"role\": \"system\",
        \"content\": \"You are a helpful assistant.\"
      },
      {
        \"role\": \"user\",
        \"content\": \"Hello!\"
      }
    ]
  }'
```

#### Embedding Model Test
```bash
curl https://api.openai.com/v1/embeddings \
  -H \"Authorization: Bearer $OPENAI_API_KEY\" \
  -H \"Content-Type: application/json\" \
  -d '{
    \"input\": \"The food was delicious and the waiter...\",
    \"model\": \"text-embedding-ada-002\",
    \"encoding_format\": \"float\"
  }'
```

#### Rerank Model Test
```bash
curl --location --request POST 'https://xxxx.com/api/v1/rerank' \
--header \"Authorization: Bearer {{ACCESS_TOKEN}}\" \
--header \"Content-Type: application/json\" \
--data-raw '{
  \"model\": \"bge-rerank-m3\",
  \"query\": \"Who is the director\",
  \"documents\": [
    \"Who are you?\nI am the assistant of the movie 'Suzume'\"
  ]
}'
```

#### TTS Model Test
```bash
curl https://api.openai.com/v1/audio/speech \
  -H \"Authorization: Bearer $OPENAI_API_KEY\" \
  -H \"Content-Type: application/json\" \
  -d '{
    \"model\": \"tts-1\",
    \"input\": \"The quick brown fox jumped over the lazy dog.\",
    \"voice\": \"alloy\"
  }' \
  --output speech.mp3
```

#### Whisper Model Test
```bash
curl https://api.openai.com/v1/audio/transcriptions \
  -H \"Authorization: Bearer $OPENAI_API_KEY\" \
  -H \"Content-Type: multipart/form-data\" \
  -F file=\"@/path/to/file/audio.mp3\" \
  -F model=\"whisper-1\"
```

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/troubleshooting/model-errors)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
