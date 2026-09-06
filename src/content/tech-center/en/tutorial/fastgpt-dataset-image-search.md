---
title: Configure and Use FastGPT Dataset Image Search
slug: /en/tutorial/fastgpt-dataset-image-search
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/dataset/dataset_engine
source_type: Official documentation
---

# Configure and Use FastGPT Dataset Image Search

## Overview of FastGPT Dataset Image Search
FastGPT dataset search enables image-based retrieval alongside standard text queries, with processing behavior determined by configured model capabilities. This feature does not operate as a standalone external system; instead, it adds an image-input path to the existing dataset search pipeline. Two core processing methods are supported:
1.  Image description search: When a compatible vision model is configured, the system first generates a text description of uploaded images, then uses this description for standard text retrieval.
2.  Image vector search: When the selected embedding model supports image input, the system directly generates vectors for images and matches these vectors against stored image vectors in the dataset.

Image search quality is influenced by several factors: image clarity, how easily the model can interpret image content, whether a vision model is configured, and whether the embedding model supports image vector generation. Additionally, whether images can be retrieved depends not only on upload during search but also on the indexes created during dataset ingestion.

## Common Image Search Usage Patterns
Three standard use cases are supported for dataset image search:
1.  Text-to-image search: Enter a text query to find stored images with semantically related content.
2.  Image-to-image search: Upload an existing image to locate visually or semantically similar images within the dataset.
3.  Text + image search: Combine a text query and uploaded image to use the text as an additional constraint for filtering image search results.

## Supported Capabilities and Query Behavior
The table below outlines how query behavior varies based on dataset configuration:
| Dataset Capability                                | Text-only Query                              | Image-only Query                                                | Text + Image Query                                |
| ------------------------------------------------- | -------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------- |
| Regular embedding model, no vision model          | Normal text retrieval                        | Usually unavailable                                             | Mainly uses the text part                         |
| Regular embedding model with a vision model       | Normal text retrieval                        | Converts image to text description, uses text retrieval | Text + image description participate in retrieval |
| Image-capable embedding model, no vision model    | Normal text retrieval                        | Image vector retrieval                                          | Text retrieval + image vector retrieval           |
| Image-capable embedding model with a vision model | Text retrieval including image descriptions | Image description + image vector retrieval                      | Text + image description + image vector retrieval |

## Troubleshooting Poor Image Search Performance
If image-to-image search returns subpar results, do not only adjust search parameters. Instead, validate three critical configuration and ingestion details: first, confirm that a compatible vision model is properly configured for image description generation; second, verify that the selected embedding model supports image vector input; third, check that valid image indexes were created during the initial dataset ingestion process.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/dataset_engine)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
