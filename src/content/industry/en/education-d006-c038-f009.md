---
title: Tool Calls and Plugins for Continuing Education Training Hour Recognition: Track Progress and Check Statistics
slug: /en/industry/education-d006-c038-f009
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Tool Calls | Progress
meta_description: Continuing Education: review tool calls for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Tool Calls and Plugins for Continuing Education Training Hour Recognition: Track Progress and Check Statistics

## What this category's data looks like

Continuing education hour recognition involves three types of materials: course filing forms, study certificates, and hour recognition forms. The course filing form is submitted by the training institution and contains the course name, number of class hours, filing date, and institutional seal; the study certificate is obtained by the learner after completing the course and contains the course name, study start and end dates, number of hours, and institutional receipt; the hour recognition form is filled out by the employer or recognition institution and contains the recognized course, recognized hours, recognition date, and handler signature. Materials are summarized weekly or monthly, and field names, quantities, and dates often differ across materials; after version updates, old forms not being synchronized, missing signatures, or missing receipts also occur from time to time. When the three types of materials enter the progress record and statistical verification function, the course filing form serves as the baseline reference, the study certificate serves as the completion evidence, and the hour recognition form serves as the result record; together they support the progress table and statistical scope explanation in weekly or monthly reports.

## Configuration and implementation checks

This step is executed by the tool call node in the workflow (the model decides whether to call it, and the node executes it), outputting the tool call result (the input parameters and return in the call record). The "progress table and statistical scope explanation" is then completed by a subsequent AI node or manual verification.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | Check whether the name, number of class hours, filing date, and institutional seal are complete, and whether they are consistent with the course name and quantity in the study certificate | Compare the course name, number of class hours, and date in the course filing form and the study certificate one by one, mark differences, and record blank items in the signature column |
| Study certificate | Check whether the study start and end dates, number of hours, and institutional receipt are complete, and whether they match the recognized hours and date in the hour recognition form | Summarize the number of hours in study certificates weekly, check them one by one against the hour recognition form, and inspect missing receipts and unsynchronized versions |
| Hour recognition form | Check whether the recognized course, recognized hours, recognition date, and handler signature are complete, and whether the scope is consistent with the course filing form and study certificate | Open the tool call node, check the configuration related to `toolChoice` and `functionCall` and the explanation of `toolChoice` values, and confirm the two items: parameter description and whether it is required |

## Three common errors

- Symptom: The name and number of class hours of the same course do not match between the course filing form and the study certificate. Cause: The two materials are filled out at different stages, and the field scope and version have not been unified.
- Symptom: The study certificate lacks an institutional receipt or the hour recognition form lacks a handler signature. Cause: No signature and receipt checkpoints are set in the material circulation process.
- Symptom: After the course filing form is updated, the study certificate and hour recognition form still use the old version. Cause: There is no version synchronization mechanism, and the update notice does not cover all materials.

## How to verify the setup

Acceptance of this function: run a trial with a question missing required parameters, check the input parameters and return in the call record, and confirm whether it asks a follow-up question or calls according to the description; at the same time, check how `toolChoice` and `functionCall` are reflected in the call record.

Business test: use one week of records to check the totals, and see whether the scope and exceptions are clearly stated.

- Open each parameter configuration one by one, check the two items of description and whether it is required, and confirm that they correspond to fields that actually exist in the course filing form, study certificate, and hour recognition form.
- On the canvas, check the diamond connectors and the status of the tool call node, and confirm that the interface is connected to the target tool.
