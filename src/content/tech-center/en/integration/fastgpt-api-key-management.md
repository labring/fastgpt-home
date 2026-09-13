---
title: Create and Secure FastGPT API Keys
slug: /en/integration/fastgpt-api-key-management
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/build/publish/openapi
source_type: Official documentation
---

# Create and Secure FastGPT API Keys

## What Is a FastGPT API Key
A FastGPT API key is an OpenAPI credential tied directly to the currently signed-in team member. This credential grants programmatic access to the platform’s OpenAPI endpoints for integrating FastGPT workflows with external applications or automation tools.

## Step-by-Step API Key Creation
Follow these structured steps to generate a new API key:
1. Navigate to the **App** section of the FastGPT dashboard.
2. Select the **Publish Channels** menu option.
3. Navigate to the **API** tab within the Publish Channels page.
4. Click the **New** button to create a new API key.

After generating your key, copy it immediately using the provided copy button, as the full key value will not be redisplayed after navigating away from the creation screen.
<Alert context="warning">
  An API Key represents the current signed-in member's OpenAPI credential. Keep your key safe. To copy it again later, use the copy button in the API list.
</Alert>

<Alert icon="🍅" context="success">
  Tip: For security, you can set a quota or expiration time to prevent key abuse.
</Alert>

## Security Best Practices
Store your API key securely, avoiding exposure in public code repositories, client-side scripts, or unencrypted storage. If you need to retrieve a previously created key that was not saved locally, use the copy button available in the API list page. Configuring quota limits or an expiration date for your API key adds an additional layer of security by restricting unauthorized or excessive use of the credential.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/publish/openapi)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
