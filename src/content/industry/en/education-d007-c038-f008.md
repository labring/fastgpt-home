---
title: Workflow Orchestration for Continuing Education Training Hour Recognition: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c038-f008
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Workflows | Review
meta_description: Continuing Education: review workflows for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Workflow Orchestration for Continuing Education Training Hour Recognition: Trace Exceptions and Review Results

## What this category's data looks like

This category's materials for continuing education credit recognition mainly consist of three types: course filing forms, study certificates, and credit recognition forms. The course filing form records the course name, course number, filing date, and the signature of the person in charge; the study certificate records the learner's name, course name, study start and end dates, and the number of completed credit hours; the credit recognition form records the recognition conclusion, the number of recognized credit hours, the signature of the recognizer, and the recognition date. The three types of materials come from different sources: the filing form comes from the course-providing institution, the study certificate comes from the learning platform or in-person attendance sign-in, and the recognition form comes from the recognition handler. In terms of update cadence, the filing form is updated with course offering batches, the study certificate is updated with study completion receipts, and the recognition form is updated with review batches. In terms of field characteristics, the four types of fields—names, quantities, dates, and signatures—are the most likely to require cross-material comparison. When materials enter workflow orchestration, the filing form takes on the role of comparing course legitimacy, the study certificate takes on the role of comparing study facts, and the recognition form takes on the role of comparing recognition conclusions and signature completeness; together, the three support exception tracing and manual review.

## Configuration and implementation checks

This step is executed by the workflow node (user selection and branching), outputting branch directions and interaction state records. The "exception list and review conclusion" is then completed by subsequent nodes continuing execution according to the branch. When the user selection node is triggered, the conversation enters an interaction state and records the workflow state; after the user completes the selection, execution continues along the branch corresponding to the selected option.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | Whether the course name, course number, filing date, and signature of the person in charge are complete, and whether the course name is consistent with that in the study certificate | Check the options and branch connections one by one in the node, compare the filing form fields with the study certificate fields item by item, and write inconsistent items into the exception list |
| Study certificate | Whether the learner's name, course name, study start and end dates, and number of completed credit hours are consistent with the corresponding fields in the credit recognition form | Reference `variables` and run a trial once, check whether the names, quantities, and dates in the study certificate and recognition form match, and mark an exception if the receipt is missing |
| Credit recognition form | Whether the recognition conclusion, number of recognized credit hours, signature of the recognizer, and recognition date are complete, and whether the signature is missing | Trigger the user selection node once, check the node status in the run record, verify whether the signature and receipt in the recognition form are complete, and enter the manual review branch if the signature is missing |
| User selection node | Whether each option corresponds to one branch, and whether the branch connections correspond one-to-one with the options | Check the options and branch connections one by one in the node, and reference `variables` and `nodeId` in subsequent nodes to confirm that the branch direction is consistent with the interaction state record |

## Three common errors

- Symptom: The same learner's course name is written differently in the study certificate and the credit recognition form. Cause: The two materials are entered in different stages, and the names are not uniformly mapped, so they cannot be automatically matched during comparison.
- Symptom: The number of completed credit hours in the study certificate and the recognition form does not match. Cause: The recognition form is filled in as a whole-batch summary, while the study certificate is filled in based on individual study records, and the quantity basis is not synchronized.
- Symptom: The recognition form lacks the recognizer's signature or the study certificate lacks a receipt. Cause: When materials flow to the review node, the signature and receipt fields are not mandatorily validated, so they cannot be intercepted before manual review.

## How to verify the setup

Feature acceptance: run trials option by option, check the branch direction and interaction state in the run record, confirm that each option corresponds to one branch, and reference `variables` and `nodeId` in subsequent nodes to verify that the selection result variable has been passed.

Business test: create an exception record, see whether the source material can be traced, and confirm that the exception list and review conclusion can be traced back to the original fields and signatures in the course filing form, study certificate, and credit recognition form.

- In the user selection node, check the options and branch connections one by one, trigger it once, then check the node status in the run record to confirm that the interaction state is recorded and the branch direction is correct.
- Reference `variables` and `nodeId` in subsequent nodes and run a trial once to confirm that the selection result variable has been passed, and that the exception list and review conclusion are completed by subsequent nodes continuing execution according to the branch.
