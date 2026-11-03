---
title: Resolve References or Collect Missing Inputs with FastGPT
slug: /en/guide/question-optimization-vs-form-collection
page_type: Decision matrix
source: https://github.com/labring/FastGPT
source_type: 官方文档
meta_title: Resolve References or Collect Missing Inputs with FastGPT
meta_description: Decide whether to use question optimization to resolve ambiguous references from context or use interactive forms to collect required user inputs.
keywords: 
schema_type: TechArticle
date_published: 2026-10-26
date_modified: 2026-10-26
---

# Resolve References or Collect Missing Inputs with FastGPT

When a user's question is incomplete or ambiguous, a choice arises between attempting to resolve its meaning from context or pausing to collect the missing information directly. FastGPT provides distinct capabilities for each approach: question optimization for resolving references and interactive forms for collecting new inputs. The decision depends on whether the necessary information already exists in the conversational history or if it must be supplied by the user to proceed.

## Clarifying Intent with Question Optimization

Question optimization is designed to handle ambiguity by rewriting a user's query before it is sent to a knowledge base. This process addresses two common issues: anaphora resolution, where pronouns like 'it' or 'they' are replaced with the specific subjects they refer to from earlier in the conversation, and query expansion, where a brief question is elaborated with relevant context. The goal is to produce a standalone, explicit query that improves the chances of a successful semantic or hybrid search.

This path is appropriate when the conversational history contains the information needed to clarify the user's intent. For example, if a user asks, 'What is its price?' after previously mentioning a specific product, question optimization can rewrite the query to 'What is the price of [specific product]?'. The effectiveness of this approach relies on the presence of an unambiguous referent in the supplied context. It is important to compare the original and optimized questions during implementation to confirm that the subject has not been misinterpreted. Question optimization cannot invent identifiers or facts that are absent from the conversation history.

## Gathering Missing Information with Forms

When a task requires specific information that has not been provided, an interactive form node can be used to collect it. This node pauses the workflow, presents the user with fields to complete, and then passes the submitted data to subsequent nodes for processing. This approach is suitable for structured processes where certain inputs are mandatory, such as opening a support ticket, scheduling an appointment, or configuring a product.

A form node's responsibility is limited to collecting the user's input. It does not have built-in business database functions. Any subsequent tasks, such as validating the format of a field, seeking business approval for a request, or writing the collected data back to an external system, must be implemented in separate downstream nodes or through integrations with external systems. This clear division of responsibility allows for the creation of complex, multi-step workflows. For example, a workflow could first attempt to answer a question using knowledge base retrieval and, if key information is missing, then trigger a form to collect the necessary details before proceeding.

## Comparing Implementation Paths

The choice between resolving references and collecting inputs is a fundamental design decision. Question optimization is an automated attempt to clarify an existing query, while a form is an explicit interruption to gather new information. The following table outlines the conditions and trade-offs for three proposed implementation paths. These paths are illustrative design patterns, not pre-configured modes.

| Criterion | Path 1: Use Original Question | Path 2: Resolve References from Context | Path 3: Collect Inputs with a Form |
| --- | --- | --- | --- |
| Input Precondition | The question is self-contained and requires no additional context to be understood. | The question contains ambiguous references (e.g., pronouns) that can be resolved using prior conversational history. | The task requires specific information that is completely missing from the user's query and history. |
| Primary FastGPT Node | Knowledge Base Search node. | Question Optimization node, followed by a Knowledge Base Search node. | Form Input node, which then passes data to other nodes. |
| Handling Strategy | Send the user's query directly to the search node for retrieval against associated knowledge bases. | Rewrite the query to replace pronouns and add context before sending it to the search node. | Pause the workflow, display a form to the user, and wait for submission before continuing. |
| Combination Potential | This is the baseline path. It can be a fallback if question optimization fails or a starting point before determining that a form is needed. | Can be combined with form collection. A proposed flow could first attempt to resolve references and, if the query is still incomplete, then trigger a form. | Can be combined with reference resolution. A proposed flow could use a form to collect a primary subject, then use optimization for follow-up questions about it. |
| External Dependencies | Relies entirely on the content and structure of the associated knowledge bases. | Depends on the quality and availability of conversational history to provide context for rewriting. | Requires subsequent nodes or external systems to handle validation, business logic, and data storage. |

## Making the Decision

To select the appropriate path, first analyze the requirements of the task. If the goal is to answer questions based on a fixed set of documents and user queries are often ambiguous but contain contextual clues, start with question optimization. This enhances the retrieval process without interrupting the user. Test this by comparing the original and optimized questions to verify that the subject is correctly identified.

Conversely, if the task involves a structured process that cannot proceed without specific, user-supplied data, a form is the correct choice. Check each form submission against the input received by the next step. Required business fields and handling for incomplete submissions need to be defined and tested in the implementation. A hybrid approach is also feasible. A workflow can be designed to first attempt an answer via optimized retrieval and, upon failing to find a satisfactory result, escalate to a form to collect the missing details needed for a more structured or external process.
