---
title: Update FastGPT Commercial Edition Email SMTP Settings
slug: /en/deploy/fastgpt-commercial-edition-email-smtp-update
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/48
source_type: 官方文档
---

# Update FastGPT Commercial Edition Email SMTP Settings

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Overview
This configuration update applies only to FastGPT Commercial Edition users who have enabled email verification code authentication. Prior to this update, the FastGPT admin panel only supported predefined service aliases for SMTP server configuration. The current release expands available functionality to permit direct entry of custom SMTP server addresses, alongside the existing supported alias options. This change removes prior restrictions on SMTP server configuration for commercial deployments.

## Step-by-Step Administrative Update Procedure
To update your SMTP server settings, follow this exact navigation path within the FastGPT Commercial Edition Admin Panel:
1. Log in to the FastGPT Commercial Edition Admin Panel.
2. Navigate to **Project Settings** via the main administrative sidebar menu.
3. Select **Login Settings** from the Project Settings menu options.
4. Open the **Email Login Settings** submenu to access email authentication configurations.
5. Locate and edit the **Email SMTP Server Address** field.
6. Update the field’s value: you may either use a supported service alias’s mapped address, or input a fully custom SMTP server address as needed for your email service provider.

## Supported Service Alias Mappings
For users relying on predefined email service aliases, the following official SMTP server address mappings are available:
| Email Service Provider | SMTP Server Address |
|------------------------|---------------------|
| QQ Mail                | smtp.qq.com         |
| Gmail                  | smtp.gmail.com      |
Users who utilize a service not listed in this table may now enter their custom SMTP server address directly in the designated field, rather than being restricted to the preconfigured aliases.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/48)
