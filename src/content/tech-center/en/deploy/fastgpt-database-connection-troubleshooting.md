---
title: Troubleshoot FastGPT Local and Remote Database Failures
slug: /en/deploy/fastgpt-database-connection-troubleshooting
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/dev
source_type: Official documentation
---

# Troubleshoot FastGPT Local and Remote Database Failures

This page covers targeted troubleshooting steps for resolving FastGPT database connection failures, including both local and remote database deployments.

## Remote Database Port Access Check
For remote database deployments, confirm the database port is open to the FastGPT host machine. Unrestricted port access is required to allow network traffic between the FastGPT service and the remote database instance, eliminating a common cause of connection failure.

## Local Database Host Configuration
When connecting to a locally hosted database, update the `host` field in your FastGPT configuration file to either `localhost` or `127.0.0.1`. This adjustment resolves typical loopback address resolution errors that prevent local database connections from being established.

## Replica Set Connection Parameter
For local connections to remote MongoDB replica sets, add the `directConnection=true` parameter to your database connection string. This parameter enables direct connection mode, fixing replica set discovery and connection issues that arise with default connection settings.

## Connection Testing Utilities
Use supported tools to validate database connections prior to deploying FastGPT:
| Database Type | Recommended Tool |
|---------------|------------------|
| MongoDB       | `mongocompass`   |
| PostgreSQL    | `navicat`        |
These tools provide visual connection testing and database management capabilities, allowing you to identify configuration mistakes before they disrupt FastGPT functionality.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/dev)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
