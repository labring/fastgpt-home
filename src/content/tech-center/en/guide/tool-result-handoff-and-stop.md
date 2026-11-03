---
title: FastGPT Handling Tool Results and Termination
slug: /en/guide/tool-result-handoff-and-stop
page_type: Deep-dive guide
source: https://github.com/labring/FastGPT
source_type: 官方文档
meta_title: FastGPT Handling Tool Results and Termination
meta_description: Review handling tool results and termination. Check document scope, input handoffs and failure paths; retain test evidence tied to original records.
keywords: tool calls, HTTP integrations
schema_type: TechArticle
date_published: 2026-10-26
date_modified: 2026-10-26
---

# FastGPT Handling Tool Results and Termination

**Before a tool's results enter a business process, it is necessary to check the invocation conditions, the actual request, the returned content, and the receiving stage. The FastGPT tool-calling module allows a model to select from connected tools. The tool's introduction and parameter descriptions are for explaining its purpose and do not represent a guarantee of execution in every instance. When processes involve orders, contracts, or inventory, a distinction must also be made between reading information and performing actual business operations. A tool returning a segment of readable text is not sufficient proof that an external operation has been completed, nor can it replace the authorization and result logging of the business system.**

## First, Determine the Task a Tool is Responsible For

A self-devised implementation scenario can involve checking contracts against settlement materials. For electronic contracts and settlement forms, it is first necessary to confirm that they belong to the same transaction, then to specify which of the recorded contents need to be compared. When the scope of amounts, the time period, or the identity of the materials has not been confirmed, information should be collected or the matter should be handed over to business personnel. The tool-calling module does not automatically generate contract comparison algorithms; the relevant calculations, material parsing, and result formatting are the responsibility of the actual tool or an external implementation.

A tool's description should clearly state its purpose, input conditions, and non-applicable scenarios. A tool designed for reading contract information should not be described as also being capable of confirming contract validity, approving refunds, or modifying orders. If the description exceeds the scope of the actual implementation, the model will not be able to acquire the corresponding capabilities even if it initiates a call. During a review, the descriptive text should be compared against the actual interface or tool implementation to confirm that it does not promise additional business behaviors.

An application can connect to different tools, yet each tool should have independent input and result interpretation. It is advisable to first validate the selection logic with a small number of tools before considering an expansion of scope. A large number of tools should not be equated with complete task coverage, nor should it be assumed that the model will call all tools in a preconceived order. Business steps that require a fixed sequence should be explicitly arranged and validated within the actual process design.

## Required Parameters Only Explain Input Prerequisites

Parameters from system modules and configurable plugins require separate verification. The specific names and types for fields such as material identifiers or query scopes are governed by the actual tool's contract; this document does not presuppose a universal contract numbering format or invent ready-made fields for amount verification. A parameter's description should inform the calling party about the input's origin; the descriptive text cannot be treated as already implemented validation code.

When a tool lacks suitable required parameters, the model may not invoke it. In this situation, the first step is to check if the input has already provided the necessary information, then to review the tool's description, its connection, and the current problem. Missing information can be collected through interaction and then passed in. A form input is only responsible for collecting the filled-in content; it does not automatically validate the authenticity of a business entity. A user's selection is responsible for entering the corresponding branch; it is not equivalent to automatically selecting a target record from a business database.

During consecutive follow-up questions, only an entity that is already clearly established in the context provides a basis for continued use. If the original question did not supply a contract identity, the model cannot be made to guess based on the most recent record. The presence of all parameters does not guarantee that their values are correct; the input that is actually sent must still be compared item by item. For sensitive materials, business access permissions must be checked beforehand; a service-to-service authentication credential or the presence of a customer name within a parameter cannot be treated as authorization.

## Observe Model Selection and Actual Invocation Separately

When a model does not select a tool, the actual question, available tools, their descriptive content, and the completeness of the input should be recorded. This information helps determine whether supplementary information or adjustments to the descriptions are needed. One cannot infer that a tool has already been executed simply by observing the final answer, nor can non-invocation be directly attributed to an external interface failure. The input used for validation should be able to explicitly trigger the target task and have its expected result supported by the original text or authorized test data.

After an invocation occurs, the next step is to verify that the request reached the correct tool and that the address, method, request headers, and request body comply with the actual contract. HTTP nodes can reference variables that have already been provided and the outputs of preceding nodes, yet the existence of a variable does not prove its business meaning is correct. During inspection, anonymized input identifiers, the return status, and necessary content should be retained, avoiding the inclusion of real credentials or unnecessary personal data in public records.

A successful external request and a completed business process require separate verification. For read-oriented tasks, check if the returned materials correspond to the same object and query window. For write-oriented tasks, investigate the business outcome separately. Features such as approvals, idempotency, and duplicate submission protection must be explicitly implemented by the interface or a subsequent solution; they are not automatically acquired upon integrating a tool. When a result is uncertain, the external record should be checked first to avoid masking the lack of result verification with repeated invocations.

## Design Result Handling and Termination Together

A tool's actual returned content is determined by its own implementation contract. The application should explicitly define which results are passed to the answer-generation stage, which require handling by business personnel, and which are intended solely for subsequent procedural logic. A model's summary should be confined to the tool's actual return and the evidence already provided. If a specific field is missing, the summary should state that the information has not yet been obtained, rather than presuming the external system has completed the corresponding action.

The FastGPT tool call termination node concludes the current tool invocation and also prevents the subsequent calling of an AI to summarize the tool's result. Therefore, before termination, it must be clear who will receive and present the result. If the business genuinely requires an AI to continue explaining the returned content, the process arrangement and connections should be re-examined. It is not possible to both expect the current invocation to have terminated and for a subsequent AI summary to appear naturally. Termination itself does not signify business success or failure.

Content designated for manual handoff should include the original problem, the materials that have been obtained, and the information that is still missing. The handoff entry point, the responsible party, and the processing records must be implemented by the solution; an option named 'manual processing' is not proof of a connected ticket management system. For an invocation that has already ended, the interface display and the external processing status should also be checked separately to prevent misinterpreting a displayed result as an actual completion.

## Verify Each Path with Verifiable Samples

For acceptance, one can start by preparing a contract and settlement materials from the same transaction, clearly specifying the permissible comparison content and criteria. Then, check the input received by the tool and any discrepancies in the return. Additionally, prepare contrastive samples, such as those missing required information, materials belonging to different transactions, or source documents that do not contain the target content. All materials must be self-devised or test data that one is authorized to use; the number of tests or the conclusions from samples should not be written as a product's default capability.

Execute the non-invocation, normal return, and termination paths separately. Record the model's selection, the actual request, the tool's output, and the receiving step for each. When no invocation occurs, there should be no conclusion that an operation has been executed. For an incomplete return, check the handling of the missing items. For the termination path, verify that the result has been received by the designated step and confirm that there is no further expectation of an AI summary. These checks require an examination of inputs and outputs, not just the presence of a node.

Finally, use the same samples to re-test any changes made to a tool's description, parameters, or connection. Explain only the impact of the change on the affected steps, and retain a record of any unresolved discrepancies. Data retrieval, business authorization, calculation logic, and result presentation each have distinct responsibility boundaries. Documenting these boundaries in the actual solution helps to locate problems and to determine whether subsequent handling is the responsibility of the tool implementer, the external system, or business personnel.

Further reading: [FastGPT technical guide](https://fastgpt.io/en/node/fastgpt-tool-calling-nodes).
