---
title: Update FastGPT Database Connection Variables for V4.1
slug: /en/deploy/fastgpt-v41-db-env-update
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/41
source_type: 官方文档
---

# Update FastGPT Database Connection Variables for V4.1

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Overview of V4.1 Database Configuration Update
FastGPT version 4.1 simplified database connection configuration by replacing fragmented individual host, port, and credential variables for both MongoDB and PostgreSQL with unified connection URI strings. This update reduces configuration complexity while preserving compatibility with existing database deployments, provided the configured database names match your prior setup.

## Mandatory Configuration Notes
Two fixed database path segments are required in the new URI formats to align with your existing database setup:
- `/fastgpt`: The target MongoDB database name, which must exactly match the value used in your previous configuration
- `/postgres`: The target PostgreSQL database name, which must exactly match the value used in your previous configuration

## Standard Connection URI Parameters
Below are the exact required environment variables and their example values for the updated configuration:
| Variable Name       | Example URI Value                                                                 |
|---------------------|-----------------------------------------------------------------------------------|
| `MONGODB_URI`       | `mongodb://username:password@mongo:27017/fastgpt?authSource=admin`                |
| `PG_URL`            | `postgresql://username:password@pg:5432/postgres`                                 |

A supported troubleshooting action: If your MongoDB connection fails after applying the new URI, remove the `?authSource=admin` query string from the `MONGODB_URI` value.

## Step-by-Step Migration Workflow
1. Locate your FastGPT deployment’s active environment variable storage: this may be a root `.env` file, `docker-compose.yml` environment block, or managed environment variable service.
2. Remove all legacy separate MongoDB connection variables and replace them with the single `MONGODB_URI` variable, using the provided example format.
3. Remove all legacy separate PostgreSQL connection variables and replace them with the single `PG_URL` variable, using the provided example format.
4. Verify that the database path segments in both URIs match your existing database names.
5. If you encounter MongoDB connection errors, edit the `MONGODB_URI` to remove the `?authSource=admin` query string.
6. Restart your FastGPT deployment to activate the updated environment variables.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/41)
