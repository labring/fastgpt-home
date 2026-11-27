---
title: Knowledge Answers or Multi-Step Agents in FastGPT
slug: /en/compare/fastgpt-v4-17-4-task-decision-matrix
page_type: matrix
source: https://doc.fastgpt.io/guide/build/workflow/intro
source_type: 深度场景内容
meta_title: Knowledge Answers or Multi-Step Agents in FastGPT
meta_description: Compare knowledge answers, current record queries and business submissions in FastGPT by their inputs, required actions and evidence of completion.
delivery_metadata: {"source_front_matter":{"slug":"fastgpt-v4-17-4-task-decision-matrix-en","task_id":"W19-matrix-01","article_id":"W19-matrix-01-en","language":"en","content_type":"matrix","meta_title":"Knowledge Answers or Multi-Step Agents in FastGPT","meta_description":"Compare knowledge answers, current record queries and business submissions in FastGPT by their inputs, required actions and evidence of completion.","product_version":"v4.17.4","review_date":"2026-11-23","translation_group":"fastgpt-v4-17-4-task-decision-matrix","source_language":"zh","source_sha256":"a275090919dedf2ac4becadb747d698eb791da6a65002b8be0c231ed2efe16ee","keywords":"[\"knowledge question answering\",\"multi-step agent\",\"business actions\"]"},"editorial_notes":[]}
keywords: knowledge question answering, multi-step agent, business actions
schema_type: Article
date_modified: 2026-11-23
---

# Knowledge Answers or Multi-Step Agents in FastGPT

## Define the result the user needs

Understanding a policy and submitting an application require different processing. One can end with an answer that can be checked; the other needs a business-system request and an acceptance result. FastGPT [workflows](https://doc.fastgpt.io/guide/build/workflow/intro) can combine retrieval, interaction and APIs. Define the result and who is responsible for it before choosing nodes.

## Compare paths by task conditions

Use knowledge retrieval for answers grounded in manuals or policies, a record source for a customer’s current state, and a submission path for changing a business record. These can be combined, such as looking up a service and explaining its terms, while retaining separate checks for each output. Select the required processing in the table, then identify any missing inputs. When showing a business state, include when it was retrieved.

| Task | Main inputs | Result to inspect |
| --- | --- | --- |
| Document explanation | Question and applicable files | Answer and references |
| Current record query | Object identifier and authorized API | Fields and query time |
| Business submission | Confirmed fields and caller identity | Receipt identifier or error |

## Inspect references for a knowledge answer

[Knowledge search](https://doc.fastgpt.io/guide/build/workflow/nodes/dataset_search) returns a reference array, and its output path can continue when that array is empty. Check applicability, retained conditions and the route for missing material before treating a knowledge answer as complete. After adding a retrieval node, check what it actually returns against the organization of the material and the current question scope.

## Inspect identity and acceptance for an action

An [HTTP request](https://doc.fastgpt.io/guide/build/workflow/nodes/http) can call an existing business API. The actual system enforces authentication and business rules. [User choice](https://doc.fastgpt.io/guide/build/workflow/nodes/user-selection) can confirm content before submission, and formal approval remains the responsibility of the business system. The application needs the receiving API’s acceptance evidence before showing that the request has been received.

## Test ordinary and incomplete inputs

After design, test one well-supported question and one without sufficient material, checking references and answers separately. For business actions, also test missing fields, a user returning to edit, and an API error. Record where the task ends and check the model reply and receiving system’s receipt separately. These checks help explain whether interaction or API steps are needed and when a simpler question-answering path is sufficient.
