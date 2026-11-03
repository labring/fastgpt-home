---
title: Routing Documents by Validity in FastGPT
slug: /en/guide/document-validity-routing
page_type: Decision matrix
source: https://github.com/labring/FastGPT
source_type: 官方文档
meta_title: Routing Documents by Validity in FastGPT
meta_description: Compare proposed methods for routing queries to valid documents in FastGPT by limiting scope, retaining version notes, or using subsequent validation.
keywords: 
schema_type: TechArticle
date_published: 2026-10-26
date_modified: 2026-10-26
---

# Routing Documents by Validity in FastGPT

Applications that depend on document validity require a reliable method for routing queries to current and applicable sources. In FastGPT, this involves managing the relationship between original documents, their indexed representations, and the retrieval process. The choice of method depends on where validity information is stored and how it is maintained. Proposed implementation designs can be based on controlling the input scope, embedding version metadata within the source text, or performing validation in a subsequent process.

## Implementation paths for validity routing

A primary approach is to limit the scope of knowledge bases available for retrieval. This method involves preparing and selecting only the documents that are currently valid for a given task. It places the responsibility for currency on the management of the knowledge base itself. When a document is superseded, it is removed or replaced. This simplifies the retrieval logic, as any result from the selected knowledge base is considered to have originated from an approved source. The main operational effort is in maintaining the document sets and ensuring that the correct knowledge bases are associated with the application's search scope. It is important to note that knowledge bases can only be associated if they use the same vector model.

An alternative is to retain validity information, such as version numbers or effective dates, directly within the document text. FastGPT processes and chunks the source material, so this method's effectiveness depends on the parsing process keeping the validity metadata attached to the corresponding content segments. For example, a condition must not be separated from the text it constrains. This approach allows a single knowledge base to contain multiple versions of a document. The application must then interpret the retrieved chunks to determine their applicability. Sample queries using specific terms, document identifiers, and natural language questions can help assess how chunking affects the retrieval of this embedded metadata.

A third proposed path is to perform validation as a separate, subsequent step. In this design, the retrieval process returns content along with any available source identifiers. A distinct business process or system component then uses these identifiers to check an external authority, such as a document management system, to confirm the validity of the source. This decouples the retrieval from the validation logic. It requires a robust implementation for passing traceable source information and a reliable external system for validation. The retrieval result itself, even if relevant, does not establish the currency or authority of the source document.

## Comparison of validity routing methods

Selecting a method for routing documents by validity involves balancing upfront data preparation against downstream processing complexity. The following table compares the three proposed implementation paths across several criteria. These paths are not mutually exclusive; for instance, retaining version notes in source text can be combined with subsequent business validation to create a layered verification process.

| Criterion | Limit Input Scope | Retain Version Notes in Source | Perform Subsequent Validation |
| --- | --- | --- | --- |
| Primary dependency | Knowledge base and document selection process. | Document structure and parsing that preserves metadata. | External system or logic for validation checks. |
| Handling multiple versions | Manages versions by including only the current one in the active knowledge base. | Allows multiple versions to coexist in one knowledge base; requires interpretation of retrieved chunks. | Retrieves content regardless of version; validity is determined externally after retrieval. |
| Implementation effort | Focused on data curation and knowledge base management. | Requires careful document authoring and chunking verification. | Requires development of a separate validation component and integration. |
| Source traceability | Traceability is to the selected document version within the knowledge base. | Traceability depends on metadata remaining attached to content chunks after parsing. | Traceability is passed to an external system for verification against a source of truth. |
| Update verification | Confirm that the correct document versions are in the selected knowledge bases and indexed. | Check that updated metadata is correctly parsed and associated with content. | Confirm that the external validation system has the latest status information. |

## Verifying retrieval and citation

Regardless of the chosen path, verification involves checking the state of the data and the retrieval outputs. A successful file upload does not mean the content is immediately indexed and available for retrieval; the actual index status must be confirmed after any changes. When a query is executed, the search node in FastGPT produces an array of citations. This array may be empty, which indicates that no relevant passages were found in the specified knowledge bases; it does not signify a workflow error.

The final step is to check that the application correctly uses these citations. The content of the generated response should be compared against the original text of the cited sources. This confirms that the answer is grounded in the retrieved evidence. For illustrative purposes, a test could involve using queries with known answers in specific document versions, then checking the citations returned. The traceability provided by citations is the mechanism for confirming that a response originates from a valid and appropriate document.
