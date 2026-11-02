---
title: Separating Reply Format from Business Validation
slug: /en/guide/response-schema-vs-business-validation
page_type: Decision matrix
source: https://github.com/labring/FastGPT
source_type: 官方文档
meta_title: Separating Reply Format from Business Validation
meta_description: Decide between using a model's JSON schema response format and an external HTTP call for business validation based on system design and API availability.
keywords: 
schema_type: TechArticle
date_published: 2026-10-26
date_modified: 2026-10-26
---

# Separating Reply Format from Business Validation

A key implementation decision is whether to enforce a reply structure within the model's response or to use an external system for business validation. Choosing a path depends on the consumer of the response and the availability of a separate, authoritative system for business rules. A model can generate a syntactically correct JSON object, but this format compliance does not confirm the business validity of the values within it. Conversely, an external validation service requires a separate interface and its own distinct maintenance.

## Connecting Response Structure to System Design

The initial choice is between a natural language text response and a structured format. A text response is suitable when the recipient is a human reader or a subsequent process that does not depend on a fixed machine-readable contract. The prompt instructions must define the task, the scope of available information, and the required behavior when evidence is missing, preventing the model from inventing business facts. This approach places the burden of interpretation on the consuming party.

When a downstream application requires a predictable, field-based contract, the response-format configuration can specify `json_schema`. The actual response still requires a parsing check and separate validation of the values inside its fields. This requires providing the format requirements to the model. The resulting output's structure, fields, and data types can then be parsed programmatically. While this enforces a consistent format, the syntactic correctness of the JSON does not validate the business meaning or accuracy of the content. For example, a field for an order ID might contain a correctly formatted number that does not correspond to an actual order.

A third approach delegates validation to a separate, external system via an HTTP call. This design is appropriate when an implemented business interface with its own rules and authorization is available. The model's output, whether structured or extracted from text, is mapped to the external system's API contract. The HTTP node is configured with the correct address, method, parameters, and headers. Authentication credentials should be injected through secure configurations, not hardcoded. The external system's response then determines the business outcome. This separates the concern of generating a reply from the concern of validating its business implications, such as checking inventory or confirming user permissions.

## Comparison of Implementation Paths

Each proposed implementation path carries distinct responsibilities and is suited for different technical conditions. The following table outlines these paths, which represent design choices rather than built-in FastGPT modes. A successful implementation may combine these approaches, such as using a `json_schema` response to create a valid request body for a subsequent external HTTP validation call.

| Criterion | Text Response | JSON Schema Response | External HTTP Validation |
| --- | --- | --- | --- |
| Primary Consumer | Human reader or flexible text processor. | Automated system requiring a fixed data structure. | Authoritative business service or API. |
| Enforcement Method | Instructions within the prompt. | Model configuration specifying the `json_schema` format. | External system's API contract and business logic. |
| Verification Focus | Factual alignment of text with source documents. | Syntactic correctness and parsing of the JSON structure. | Business rule compliance and state changes in the external system. |
| Failure Condition | Response is factually incorrect or deviates from instructions. | Response does not parse against the provided schema. | HTTP call fails or the external service returns a business error. |
| Implementation Work | Crafting precise prompts and planning for manual or NLP-based interpretation. | Defining and maintaining the JSON schema; implementing parsing and error handling. | Implementing and maintaining the external API; managing authentication and network reliability. |

## Verifying Inputs and Outputs

Regardless of the chosen path, verification involves checking the inputs and outputs at each stage. For conversational applications, it is important to inspect the actual history supplied as context to distinguish new sessions from continuing ones. If question optimization is active for knowledge base interactions, its effect on resolving references or expanding questions should be checked. The model's context limits and reply length settings also need to be considered, especially when processing long documents or engaging in extended follow-up conversations.

When using HTTP nodes to connect to external systems, every variable reference must be checked to confirm the correct value is passed. This includes global variables, system variables, and outputs from previous nodes in the workflow. During testing, it is important to note that variables like `chatId` and `responseChatItemId` may not exist in certain test modes; their absence in these contexts is not a business failure. The final validation step always involves comparing the generated output against the original source information to confirm that the response is grounded in the provided evidence.
