---
title: Multi-Turn Conversation and Prompts for Research Project Task Agreement Signing: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c058-f005
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Conversation | Review
meta_description: Research Agreements: review conversation for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Multi-Turn Conversation and Prompts for Research Project Task Agreement Signing: Trace Exceptions and Review Results

## What this category's data looks like

The materials involved in the signing of research project task books fall into three categories: project task books, subject task breakdown tables, and budget books. Their sources are the project approval notice, subject application, and financial verification stages, and their update cadence changes as the signing process advances. Their field characteristics center on names, quantities, dates, and signature receipts. The project task book carries the overall objectives of the subject and the signature of the person in charge; the subject task breakdown table carries the division of labor among sub-subjects and milestone dates; the budget book carries the amounts of budget categories and the signature of the preparer. When the materials enter the multi-turn dialogue and prompt function, the task book serves as the anchor of the main record, while the breakdown table and budget book serve as comparison sources, used to discover exceptions such as names, quantities, and dates for the same record not matching across the two materials, versions not being synchronized, and missing signatures or receipts.

## Configuration and implementation checks

This step is executed by the memory turns and prompt configuration in the application settings, outputting the historical message range and answer constraints to be referenced. The exception list and review conclusions are then completed by the model. The memory turns control how many previous turns of dialogue can be referenced at most when answering. If the value is too small, the preceding context cannot be used; if the value is too large, irrelevant content is brought in and consumption increases.

| Object | Check | Verification action |
| --- | --- | --- |
| Memory turns | Matches the range of preceding context required by the question | Check the current value in the application settings, run a trial with two consecutive questions, and check whether the `messages` corresponding to `chatId` are correctly included in the reference range |
| Project task book | The four items of name, quantity, date, and signature are self-consistent within the task book and match the breakdown table and budget book | Compare the subject names and milestone dates in the task book and breakdown table item by item, compare the budget category amounts and preparer signatures in the budget book, and record inconsistent items |
| Subject task breakdown table | The sub-subject names, quantities, and dates are consistent with the task book and budget book, and the version is the latest | Check the version number and receipt of the breakdown table, and when a version is not synchronized or a signature is missing, list it in the exception list |
| Budget book | The budget category amounts, quantities, and dates are consistent with the task book and breakdown table, and signatures are complete | Check the corresponding fields of each budget category in the budget book against the task book and breakdown table, and mark for review when a signature or receipt is missing |

## Three common errors

- Phenomenon: The same subject name is written differently in the task book and the breakdown table, and the quantities and dates also do not match. Cause: The two were entered separately, without field-level comparison and version synchronization.
- Phenomenon: The budget category amounts in the budget book are inconsistent with the task book, and the preparer's signature or receipt is missing. Cause: The version was not synchronized, and the review was entered before the signature process was completed.
- Phenomenon: When the second question uses a reference, the answer does not address the question, and the response becomes slower and consumption rises. Cause: The memory turns are too large and bring in irrelevant content, or the opening message is treated as preceding context.

## How to verify the setup

Acceptance of this function: ask two consecutive follow-up questions, see whether the second question picks up the reference from the first question, check the performance of `chatId` and `messages` in the reference range, and confirm that `variables` do not mix in irrelevant content.

Business test: create an exception record, see whether the source material can be traced, and check the names, quantities, dates, and signature receipts of the task book, breakdown table, and budget book.

- Check the memory turns value in the application settings, run a trial with two consecutive questions, and compare the usage records of the two runs.
- Compare the names, quantities, dates, and signature receipts of the project task book, subject task breakdown table, and budget book item by item, and output the exception list and review conclusions to the person in charge for handling.
