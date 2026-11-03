---
title: Choosing How to Carry and Present Evidence in FastGPT
slug: /en/guide/citation-evidence-display-choice
page_type: Decision matrix
source: https://github.com/labring/FastGPT
source_type: 官方文档
meta_title: Choosing How to Carry and Present Evidence in FastGPT
meta_description: Compare proposed implementation paths for handling and displaying knowledge base citations, including in-answer references, separate UI, or human handoff.
keywords: 
schema_type: TechArticle
date_published: 2026-10-26
date_modified: 2026-10-26
---

# Choosing How to Carry and Present Evidence in FastGPT

A FastGPT application can present evidence from knowledge base documents to support its answers. The search node's output is a citation array containing passages from the source material. This array can be empty, which does not indicate a workflow error. The design decision is how to handle this citation data, whether to integrate it directly into the answer, present it separately, or use it to trigger a handoff for human review. Each approach involves distinct implementation responsibilities and verification steps.

## Handling Citation Data in a Workflow

The foundation for any evidence presentation is the workflow's data flow. A search node retrieves information from associated knowledge bases, which must share the same vector model. The output is a citation array that is passed to a subsequent node, typically for generating an answer. A critical design consideration is what happens when this array is empty. The workflow continues, so an explicit path must be designed to handle cases where no direct evidence is found.

Workflow orchestration nodes can manage this process. For example, a Form Input node can collect required information from a user before a search is initiated. After retrieval, a User Choice node could present an option to the user if the evidence is ambiguous, or a logic node could route the task based on whether the citation array is empty. The information collected or generated at each step must be explicitly passed to the next. Any external actions, such as writing to a database or updating an external system, require a separate business interface connected to the workflow.

## Comparing Evidence Presentation Paths

The choice of how to present evidence depends on the application's requirements for traceability and user interaction. The following table outlines three proposed implementation paths. These are design patterns that can be constructed using FastGPT workflow nodes. The paths are not mutually exclusive; for instance, a separate source display can be combined with a workflow that hands off to a human reviewer under specific conditions.

Verifying the implementation involves testing with sample documents. Check that the displayed source matches the original text from the correct document version. The fluency of a generated answer or the visibility of the model's internal reasoning process is not a substitute for accurate source citation. The connection between the retrieval output and the answer generation input must be confirmed to establish that the model had access to the evidence when formulating its response.

| Comparison Criterion | Path 1: In-Answer Citations | Path 2: Separate Source Display | Path 3: Human Review Handoff |
| --- | --- | --- | --- |
| Core Task | Integrate source references directly within the generated answer text. | Build a distinct UI component to show source documents or passages alongside the answer. | Route the query and its context to a person when the application cannot provide a supported answer. |
| Input Precondition | The search node's citation array is successfully passed to the answer generation node. | The application's response contract includes the citation array for consumption by a separate presentation layer. | The workflow logic identifies a condition, such as an empty citation array or low-confidence result, that requires human judgment. |
| Implementation Focus | Prompt engineering to encourage the model to cite sources correctly and consistently. | Frontend development to parse the citation array and render a user interface for source inspection. | Workflow design using logic nodes to trigger and pass necessary information to a handoff interface or task queue. |
| Verification Method | Compare the final answer's claims against the original text referenced in the citation array. | Confirm that the separate display correctly links to and presents the source passages from the citation array. | Verify that the handoff trigger activates under the defined conditions and that all required context is passed correctly. |
| Key Limitation | The model may not always adhere to instructions to cite sources, requiring output validation. | Source visibility does not by itself confirm that the model used the evidence to generate the answer. | Requires an external process and personnel to handle review tasks; does not generate an immediate answer. |
