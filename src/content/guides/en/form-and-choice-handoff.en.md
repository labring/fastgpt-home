<!--
Delivery metadata (not published with the body)
slug: form-and-choice-handoff
locale: en
canonical: https://fastgpt.io/guide/form-and-choice-handoff
hreflang: en | zh-CN → https://fastgpt.cn/guide/form-and-choice-handoff | en → https://fastgpt.io/guide/form-and-choice-handoff | x-default → https://fastgpt.io/guide/form-and-choice-handoff
Meta title: FastGPT Forms and Choices: Outputs and Workflow Handoffs
Meta description: Check FastGPT form and user selection outputs, variable references, required inputs and branch connections, with clear tests for each interaction stage.
keywords:
结构化数据: Article + BreadcrumbList
内链:
配图需求: none
发布批次: W16
-->

# Data Handoff Between Form Input and User Selection Nodes: How formInputResult and selectResult Flow

Submitted form fields are read from formInputResult, while the option chosen by a user is read from selectResult. Each interaction must finish before its connected path continues. Configuration starts by locating where information is collected and where the user makes a decision, followed by checking downstream references. Automatic comparisons of existing fields belong in a condition node.

## What Happens to the Workflow When the Form Input Node Triggers Interaction
The form input node serves as the interaction entry point in the flow. After it is triggered, it enters a waiting state and records the current workflow state, waiting for the user to fill in and submit. The workflow pauses at the form input node and continues after the user submits the form. Understanding this is critical, because the field values that subsequent nodes receive come from the result of this submission, not from the default values in the form configuration. During configuration, confirm that the form input node is indeed triggered and not skipped by an upstream condition; if the upstream branch does not reach this node, subsequent nodes naturally cannot obtain any submitted content. The verification action is to check whether the node shows both the waiting and submission phases in the run record. The failure symptom is usually that subsequent node variables are empty, or the flow stays at the form input node for a long time without continuing. Another easily overlooked point is that the workflow state recorded by the form input node is bound to the submitted content; only the result submitted in the same run will be referenced by subsequent nodes, and cross-run or repeated submissions will not be automatically merged.

## How Fields Are Passed to Subsequent Nodes After Submission
After submission occurs, the field results of the form input node serve as the output of that node for subsequent nodes to reference. The reference form usually appears as the node identifier plus the field name, that is, a result object such as formInputResult. If a subsequent node needs to use a certain field, it must point to the corresponding output of the form input node in variable selection; it cannot simply hand-write a field with the same name and treat it as available. During configuration, confirm one by one that the field names match the form definition, and that the field types also match. For example, when a selection-type field is passed to a node that requires text comparison, the form of the value will affect the judgment. The verification action is to check the actual value in the input preview of the subsequent node, confirming that the submitted content indeed appears at the reference position. Failure symptoms include the field reference pointing to the wrong node, inconsistent field name spelling, and fields being overwritten after submission. If the form input node only serves as an interactive display in the flow and its result is not connected to subsequent nodes, the flow can continue, but subsequent nodes will read empty values. Explicitly connecting the submission result to subsequent nodes is the basic action for linking form input with subsequent logic.

## Which Interaction the User Selection Node Waits For
When the user selection node is triggered, the conversation enters an interaction state and the workflow records its current state. The configured options are presented to the user. Once an option is selected, the node produces selectResult and execution continues along the corresponding branch. Configuration should check the displayed label, the stored option value and the branch connection together. Similar-looking options still need separate test runs to confirm that their paths have not been reversed.

The form input node collects information, and the user selection node records a decision made during this run. An application flow can first collect an application description, then ask the user to select a service. A downstream processing node can receive both the form object and the chosen value. If the service must instead be determined automatically from an application category or date, those fields should be passed to a condition node with explicit comparisons. User decisions and automatic comparisons each need a clear place on the canvas.

During a run, check whether the user has made a choice, whether selectResult has been produced and whether the selected branch connects to the intended next node. If execution never reaches the selection node, inspect the upstream path. If it remains in the waiting state, check whether interaction is complete. If a completed selection takes the wrong path, compare the option value with its connection.

## How formInputResult and selectResult Connect
formInputResult is the object produced by the form input node after submission. selectResult is the string produced by the user selection node after a choice. A downstream node should reference the source that holds the information it needs: business fields from the form result object, and the selected service from the user selection result. Both outputs can be passed to the same business processing node.

For an application intake flow, submit the form first, ask the user to choose a service and then let the next node read the submitted fields and selected value. Add a condition node wherever those fields require automatic comparison. The test record should keep the submitted object, the chosen value and the downstream input separately. Compare them to confirm that they come from the correct nodes in this run. When several forms exist on the canvas, check the source node name and reference path individually.

For a missing field, first confirm that its source node executed and its interaction finished, then check the target reference and field name. For an unexpected selected value, compare the user's choice with the selection node output. Checking these paths separately makes the source of the material, the user's decision and the subsequent processing traceable.

## Verification Order and Common Failure Symptoms
Start by following the complete path on the canvas. Locate the form input node at the step that collects material and the user selection node at the step that asks for a decision. In the same test run, submit the form and record formInputResult. Then choose an option and record selectResult together with the branch that actually runs. Finally, inspect the downstream input to confirm that both the business fields and the selected value came from these interactions.

The first sample supplies complete required fields and selects the expected service; check whether the next node receives the corresponding content. The second sample leaves a required field missing, checks the interaction prompt and then completes the missing information before submission. The third sample chooses another option and checks whether the branch and output value change accordingly. Keep submitted content, selected values and downstream inputs for each sample. The final generated answer alone cannot establish that a field was passed correctly.

When execution remains at the form, inspect whether submission has finished. When a downstream field is missing, inspect its source node and field path. When a user choice leads to the wrong path, inspect option bindings and connections. For an automatic comparison, inspect the actual value and type received by the condition node. After these checks, use a business question that spans the relevant materials to verify that subsequent processing uses the intended inputs.

## Field Handoff of Interaction Nodes
Interaction nodes have two types of output: the form input node outputs formInputResult, and the user selection node outputs selectResult. Both are handed to subsequent nodes in the form of field values and do not automatically become judgment conditions. Treating these two outputs as a switch to "read form fields and judge conditions" is the most common misunderstanding in this area.

During handoff, verify in three steps: first confirm the field names and types in the node, and mark which are required; then reference these fields one by one in subsequent nodes, and run a test to confirm that values can be obtained; finally check whether all selection branches are connected to subsequent nodes. Branches that are not connected will produce empty values during test runs. The interaction state is recorded by the interaction node during runtime, and no additional global switch needs to be configured; after form submission, field values enter the reference list of subsequent nodes, and the selection node continues according to the selected branch.

Three groups of acceptance samples can be prepared: complete fields, missing required fields, and selection taking another branch. For each group, record the submitted content, field values, and what the subsequent nodes actually receive. Only when all three groups match is the handoff complete. When field values cannot be obtained, first check whether the reference is correct, then check whether the node actually executed to this step.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/guide/build/workflow/nodes/form_input.mdx)
- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/guide/build/workflow/nodes/user-selection.mdx)

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/guide/build/workflow/nodes/form_input.mdx)
- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/guide/build/workflow/nodes/user-selection.mdx)
