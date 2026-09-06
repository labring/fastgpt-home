---
title: Handle Document and Multimodal File Inputs in FastGPT
slug: /en/tutorial/fastgpt-file-input-processing
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/build/general/fileInput
source_type: Official documentation
---

# Handle Document and Multimodal File Inputs in FastGPT

## File Input Processing Overview
FastGPT implements two separate processing paths for uploaded files, aligned with the type of file being submitted. The native document parsing node does not support multimodal file formats, specifically images, audio, and video. Any media file uploads must be paired with a large language model that supports native multimodal recognition capabilities, with the multimodal recognition feature enabled via the AI Settings interface.

## Document Parsing Workflow
This processing path is dedicated to standard text-based document files. It supports a defined set of document formats: PDF, Word, Excel, Markdown, and HTML. The workflow converts the full internal content of these supported files into plain, machine-readable text. This parsed text is then passed directly to the configured AI model for further processing.

## Multimodal Recognition Workflow
This processing path is designed exclusively for media file formats, including images, audio, and video. FastGPT first converts these media files into a standardized format that is readable by compatible large language models. The processed media input is then routed to the selected LLM, which uses its native multimodal processing capabilities to interpret the uploaded media content. Unlike the document parsing workflow, this path does not generate intermediate plain text output, instead passing the formatted media directly to the capable LLM.

## Enable Multimodal Recognition (Step-by-Step)
To activate support for media file inputs, complete these required configuration steps:
1. Navigate to the AI Settings page, which is referenced in the FastGPT build or administrative interface.
2. Locate the multimodal recognition configuration setting within the settings menu.
3. Enable the multimodal recognition feature to allow the platform to route media files to the appropriate processing pipeline.
Without this setting enabled, FastGPT will not process media file uploads via the multimodal recognition path.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/general/fileInput)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
