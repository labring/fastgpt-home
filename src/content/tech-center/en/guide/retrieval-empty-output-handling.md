---
title: Choosing a No-Evidence Response Path in FastGPT
slug: /en/guide/retrieval-empty-output-handling
page_type: Decision matrix
source: https://github.com/labring/FastGPT
source_type: 官方文档
meta_title: Choosing a No-Evidence Response Path in FastGPT
meta_description: Learn to design workflow paths for when a FastGPT knowledge base search finds no evidence by collecting input, sourcing documents, or assigning a handoff.
keywords: 
schema_type: TechArticle
date_published: 2026-10-26
date_modified: 2026-10-26
---

# Choosing a No-Evidence Response Path in FastGPT

A FastGPT knowledge base search can return an empty citation array, indicating that no relevant evidence was found for a given query. This outcome does not halt a workflow. Instead, it presents a decision point that requires an explicit, implemented path. The choice of path depends on whether the query was incomplete, the necessary evidence is absent from the knowledge base, or the question requires a business decision beyond the scope of automated retrieval. Designing these paths involves distinct workflow components and integration with external business processes.

## Collecting Missing Information for Incomplete Queries

When a question lacks a necessary subject, such as an order number or document identifier, the immediate gap is in the input itself. A proposed implementation can use an interactive workflow to collect the required information before attempting another retrieval. A Form Input node can be configured to enter an interactive state, present fields for the user to complete, and then pass the submitted information to subsequent nodes. For example, if a query about a refund does not specify which order, the workflow can prompt for the order ID.

This path addresses an incomplete question, not an absence of evidence. FastGPT question optimization may resolve some ambiguities by using conversational context for coreference resolution, but it cannot invent a subject that was never provided. After the information is collected, it can be passed to another knowledge base search node or to an external interface for a direct lookup. The workflow must explicitly map the output of the collection node to the input of the next step. This approach is distinct from sourcing new documents; it completes the query so that existing sources can be searched effectively.

## Sourcing External Evidence for Known Subjects

If a query has a clear subject but the knowledge base lacks the relevant policy, record, or status, the workflow can be designed to obtain the information from an authorized external source. This path is appropriate when the subject is known and the evidence is expected to exist outside the pre-indexed material. Implementation requires connecting to a business interface to retrieve the necessary data or assigning the task to a person responsible for providing confirmed source material.

Successfully retrieving external data does not automatically resolve the query. The retrieved content, such as a single transaction record, must be evaluated to determine what statements it supports. It may then be used as context for a final response or handed off for further processing. This path is different from collecting input because the query is already complete. It is also distinct from a business handoff, as its goal is to acquire specific, missing evidence rather than to delegate a decision.

## Assigning a Handoff for Business Decisions

Some questions cannot be answered by retrieval alone because they require operational authority, a business judgment, or access to evidence that is unavailable through any connected system. In these cases, the appropriate path is to hand the matter over to a responsible owner. A proposed workflow for this path would package the original question, any information collected, and any evidence already found, then transfer it to a designated business process, such as a customer service or ticketing system.

This route is the designated endpoint for issues that fall outside the scope of automated information retrieval. The implementation must connect to an actual intake point and verify that the handoff is successfully recorded in the target system. This path can be a direct entry point for certain types of questions or the final step after attempts to collect input and source external evidence have been exhausted. Its role is to route the unresolved query to the designated responsible party and verify that the receiving process records it.

## Comparison of Implementation Paths

Choosing the correct path when a FastGPT retrieval returns no evidence requires analyzing the nature of the information gap. The three primary paths—collecting input, obtaining a source, and assigning a handoff—are not mutually exclusive and can be combined into a comprehensive workflow. For instance, a workflow could first attempt to collect a missing order ID, then search for its status in an external system, and finally create a support ticket if the status requires a manual intervention. The following table compares the conditions and characteristics of each proposed implementation.

| Comparison Criterion | Collect Missing Input | Obtain an Authorized Source | Assign Human Handoff |
| --- | --- | --- | --- |
| Triggering Condition | The query lacks a required subject or identifier. | The subject is known, but the knowledge base lacks the specific evidence. | The query requires a business decision, authority, or unavailable evidence. |
| Primary Goal | Complete the query with necessary information. | Retrieve specific, missing evidence from an external system or owner. | Transfer the query and context to a responsible business owner. |
| Key Workflow Node | Form Input or User Selection node to gather information. | HTTP Request node or an equivalent interface for external data lookup. | HTTP Request node to a ticketing or task system, or a notification action. |
| Output of Path | Structured data to be used in a subsequent retrieval or action. | New documentary evidence to be processed or presented. | A record of the transfer, such as a ticket ID or confirmation message. |
| External Dependency | An interactive user session to provide the missing information. | An available business API or a designated human source for documents. | An operational intake system (e.g., ticketing, CRM) and process. |
