---
title: Document FastGPT user chat file storage structure
slug: /en/tutorial/fastgpt-user-chat-file-storage
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/build/general/fileInput
source_type: Official documentation
---

# Document FastGPT user chat file storage structure

## User Chat File Data Overview
For engineers and technical decision makers working with FastGPT chat integrations, understanding the structure and storage of uploaded file data is critical. FastGPT standardizes the format of user role chat messages containing uploaded files, with all relevant metadata and references defined in a strict type schema. Per official implementation rules, this type definition is exclusively used for chat items where the message `role` is set to `user`. No parsed document content extracted from uploaded files is saved directly in the user chat history.

## UserChatItemValueItemType Data Schema
The core type for user chat message values is `UserChatItemValueItemType`, with the following defined fields:

| Field | Type | Requirements |
|-------|------|--------------|
| `type` | `string` | Must be either `text` or `file`; defines the primary content category of the chat item |
| `text` | `object` | Optional. Only present when `type` is `text`. Contains a `content` field with the chat text string |
| `file` | `object` | Optional. Only present when `type` is `file`. Stores metadata and reference details for uploaded files |
| `file.type` | `string` | Must be one of `image`, `audio`, `video`, or `file`; categorizes the uploaded file type |
| `file.name` | `string` | Optional. The original filename provided at upload time |
| `file.key` | `string` | Optional. A unique system-generated identifier for the uploaded file |
| `file.url` | `string` | Required. Publicly accessible URL hosting the uploaded file |

## File Storage Behavior
Uploaded files referenced in FastGPT user chat history are stored exclusively as publicly accessible URLs. FastGPT does not save raw file bytes or parsed document content extracted from uploaded files directly within the chat record. This design keeps chat history lightweight, as file data is referenced rather than duplicated across chat sessions. When a user uploads a file, the system generates a unique URL alongside optional metadata such as the original filename and file key, which are then stored in the chat item’s `file` object.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/general/fileInput)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
