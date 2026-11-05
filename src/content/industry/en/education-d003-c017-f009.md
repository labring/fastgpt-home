---
title: Tool Calls and Plugins for Undergraduate Program Establishment and Adjustment: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c017-f009
page_type: 行业问题页
application_area: education
meta_title: Undergraduate Programs | Tool Calls | Intake
meta_description: Undergraduate Programs: review tool calls for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Undergraduate Program Establishment and Adjustment: Handle Questions and Collect Missing Information

## What this category's data looks like

The data for this category looks like this
Undergraduate program setup and dynamic adjustment involves three types of materials: program setup application forms, talent cultivation plans, and expert review opinions. The program setup application form contains the program name, code, degree-granting category, length of study, signature of the person in charge, and the date of the college seal; the talent cultivation plan contains course modules, credits and class hours, the proportion of practical components, signatures of the preparer and reviewer, version number, and effective date; the expert review opinions contain expert names, titles, affiliations, review conclusions, sign-in sheets, and receipt dates. Materials are aggregated from three sources: exports from the academic affairs system, submissions from colleges, and compilation of meeting minutes, and are updated according to the academic-year application cycle and temporary adjustment windows. When entering the Q&A intake and missing-item follow-up function, the application form serves as the source of fields for the application subject, the cultivation plan serves as the source of fields for courses and credits, and the review opinions serve as the source of fields for compliance and signatures; the three serve as cross-checking bases for one another.

## Configuration and implementation checks

How to configure it
This step is executed by the tool-calling node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the input parameters and return in the call record). The intake record and the follow-up questions to be completed are then handled by subsequent AI nodes or manual review. The model decides whether to call based on the tool description, parameter descriptions, and whether it is required; when there are no required parameters, it may fabricate values on its own, and when there are required parameters but the context is missing, it may not call.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup application form | Whether the name, code, degree category, length of study, signature of the person in charge, and date of the college seal are complete and consistent with the cultivation plan | Open the tool node description field to check the purpose and return description; run a test with a question missing the signature date to see whether it asks a follow-up first; check the diamond-shaped interface connections and node status on the canvas |
| Talent cultivation plan | Whether the course modules, credits and class hours, practical proportion, version number, signatures of the preparer and reviewer, and effective date are synchronized with the application form | Open each parameter configuration one by one and check the parameter description and whether it is required; check whether the values of `toolChoice` and `functionCall` in the call record come from the materials |
| Expert review opinions | Whether the expert names, titles, affiliations, review conclusions, sign-in sheets, and receipt dates are complete and consistent with the meeting minutes | Run a test with a question missing the expert affiliation to see whether it asks a follow-up before answering; check whether the returned result contains values that do not exist in the materials |

## Three common errors

- Symptom: The name or code of the same program does not match across two materials. Cause: The application form and the cultivation plan versions were not synchronized, and each was modified independently without cross-checking.
- Symptom: The credits and class hours or the number of experts are inconsistent between the application form and the review opinions. Cause: When materials were aggregated, they were not collected under the same version number, and an old version overwrote a new version.
- Symptom: Missing signature fields or receipt dates are still accepted as complete materials. Cause: Missing-item identification depends on model judgment, and marking a parameter as required does not guarantee that a follow-up will be asked.

## How to verify the setup

Acceptance for this function: run a test with a question missing required parameters, check the input parameters and return in the call record, and confirm whether it asks a follow-up or calls according to the description; check whether `toolChoice`, `functionCall`, and whether the parameter is required correspond to the material fields.

Business test: submit a question missing key information and see whether it asks a follow-up before answering; if it answers directly, check whether values appear that do not exist in the materials.

- Open the tool node description field, check whether this description can be understood when taken out on its own, and check the diamond-shaped connections and node status.
- Open each parameter configuration one by one, check the parameter description and whether it is required, and run a test with a question missing that field.
