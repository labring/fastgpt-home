---
title: Batch Work in Workflows: Loop Node, Batch Run or Parallel Run
slug: /en/guide/loop-vs-parallel-execution
page_type: Decision matrix
source_type: FastGPT v4.17.2 documentation and community threads
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/parallel_run
source_note: "Criteria taken from the FastGPT v4.17.2 documentation and community threads, verified 2026-10-13."
check_day: 2026-10-13
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_description: This technical decision guide helps enterprise AI workflow technical buyers select between loop, batch run, and parallel run nodes to optimize batch task processing, efficiency, and workflow adaptability.
date_published: 2026-10-14
date_modified: 2026-10-14
---

# Batch Work in Workflows: Loop Node, Batch Run or Parallel Run

## When this decision has to be made
You must make this decision when your workflow needs to process multiple sets of identical input types, repeat specific subflows, or improve batch task processing efficiency. If you skip early planning and use a single chained node instead, your workflow will become redundant, run slowly, and fail to meet batch task requirements. You will spend significant time and labor reworking the workflow later. Choosing the wrong option for small batch tasks adds unnecessary configuration complexity and resource usage. Prioritize this decision when your business requires clear batch data processing, conditional iterative optimization, or parallel independent task processing. Failing to do so will leave your workflow unable to adapt to future business growth or cause performance issues after launch. You must also make this decision when batch task scale exceeds a single node’s processing capacity, or you need to repeat subflows per fixed logic. This avoids logical gaps or execution delays in your workflow.

## Criteria matrix
| Candidate | Input Data Requirements | Execution Mode | Nesting Restrictions | Interactive Node Support | Result Output Method | Error Handling Mechanism | Resource Scheduling Characteristics |
|-----------|--------------------------|----------------|----------------------|-------------------------|---------------------|--------------------------|-------------------------------------|
| Parallel Run Node | Supports array-type inputs; elements can be strings, numbers, objects, etc. | Accepts arrays, processes each element simultaneously. You can configure a maximum concurrency limit. Tasks run independently without dependencies. | Cannot contain Parallel Run or Batch Run nodes internally. | No | Outputs successful result array, full result array, completion status. Successful results are ordered per input sequence. | Individual task failures do not affect the overall workflow. Supports retries. Aggregates successful and failed results. | Default maximum concurrency is 5. The upper limit is set by the deployer via `WORKFLOW_PARALLEL_MAX_CONCURRENCY` (default value 10). |
| Loop Node | Array loops require array inputs; conditional loops require no input. | Array loops iterate through array elements sequentially. Conditional loops run continuously until a loop termination node is triggered. Default maximum iterations: 100. | Cannot contain Loop or Parallel Run nodes internally. | Yes | Customize output of the final iteration’s value. You must use global variables and variable update nodes to aggregate results across all iterations. | Retains records before an error occurs. Failed iterations do not commit variable changes. Supports runtime pause and resume via user interaction. | Runs sequentially. Resource usage remains stable. Default maximum iterations: 100. |
| Batch Run Node | Supports arrays of strings, numbers, booleans, and object types. | Traverses array elements while preserving processing order. Supports parallel processing optimization. | Not stated in the documentation; verify in your environment. | Not stated in the documentation; verify in your environment. | All loop results form a new array as the final output. | Not stated in the documentation; verify in your environment. | Supports parallel processing optimization to improve processing efficiency. |

## Why each criterion matters
Input data requirements are the foundational compatibility condition for batch processing solutions. Choosing the wrong option will prevent your workflow from correctly receiving output from upstream nodes. For example, the Parallel Run Node only supports array inputs. If your upstream node outputs a single object, you must add an extra configuration node to wrap the input, which adds workflow complexity. The Loop Node’s array loop mode relies on array inputs, while its conditional loop mode works without fixed input sets, making it suitable for iterative tasks without fixed inputs. The Batch Run Node only supports array inputs but is compatible with multiple array element types, fitting most standard batch scenarios. Ignoring input data requirements will lead to workflow failures after configuration, forcing you to repeatedly adjust parameters and delay launch.

Execution mode defines the core logic of batch task processing, directly impacting processing efficiency and business adaptability. The Parallel Run Node’s simultaneous processing mode shortens total runtime, making it ideal for independent tasks. It cannot handle iterative tasks with dependencies. The Loop Node’s sequential execution mode suits tasks that require ordered processing or logic adjustments based on prior iteration results. Its conditional loop mode fits iterative optimization tasks without fixed input sets. The Batch Run Node’s sequential traversal plus parallel optimization mode balances processing efficiency and execution logic stability, making it suitable for batch tasks that require preserved processing order. Mismatched execution mode will lead to poor performance or failure to meet business iterative requirements.

Nesting restrictions are critical constraints for workflow node configuration. Violating them will prevent your workflow from saving or running. Both Parallel Run and Loop Nodes do not support nesting similar or related nodes internally. If you place a Loop Node inside a Parallel Run Node, the editor will block configuration or cause runtime errors. The Batch Run Node’s nesting restrictions are not stated in official documentation; you must test them based on your deployment environment. Ignoring nesting restrictions will prevent your workflow from saving after configuration, forcing you to rework node layouts and increase debugging effort.

Interactive node support determines whether your batch task requires human intervention. The Loop Node supports runtime interaction, making it ideal for scenarios where you need to confirm each iteration’s results manually. For example, you can require user review of each translated segment before proceeding to the next iteration. The Parallel Run Node does not support interactive nodes, as multiple simultaneous tasks cannot wait for user input synchronously. The editor will block configuration if you add an interactive node to a Parallel Run Node. The Batch Run Node’s interactive support is not stated in official documentation; you must test it based on your deployment environment. Choosing the wrong option will cause interactive batch tasks to fail, or require extra transit nodes that add complexity.

Result output method directly impacts how downstream nodes use batch processing results. The Parallel Run Node offers three output options: successful result array, full result array, and completion status. This fits different downstream processing needs. For example, you can reference the successful result array directly if you only need successful outputs, or reference the full result array to debug failed tasks. The Loop Node only outputs the final iteration’s value. To aggregate results across all iterations, you must configure global variables and variable update nodes, which adds configuration complexity. The Batch Run Node automatically aggregates all iteration results into a single array without extra configuration, making it ideal for scenarios that require complete batch results. Mismatched output options will prevent downstream nodes from accessing required data, forcing you to write extra code or configure additional nodes to organize data.

## The cost of switching later
Once you have selected a batch processing option, switching to another will incur rework costs. First, you must adjust data and variable configurations: Switching from a Parallel Run Node to a Loop Node requires modifying result output logic. The Parallel Run Node already returns an array of successful results. The Loop Node needs global variables and variable update nodes to collect results from every iteration. You must also update variable reference paths for downstream nodes. Second, you must change node configurations: Remove parameters from your original node, such as maximum concurrency and retry counts, and replace them with Loop Node settings like loop type and maximum iteration limits. For downtime windows: Switching requires pausing workflow operations, reconfiguring node parameters, and debugging. The length of downtime depends on workflow complexity and debugging efficiency. For validation workload: You must retest the batch task’s execution logic, result output, and error handling mechanisms to ensure the modified workflow runs correctly. You must also verify that all downstream nodes can access required data properly. If your original workflow used nested nodes or interactive nodes, you must adjust node layouts and configurations to avoid violating nesting restrictions. For example, switching from a Loop Node to a Parallel Run Node requires removing interactive nodes inside the loop body, as the Parallel Run Node does not support interactive nodes.

## When this decision can wait
You can delay this decision when your batch task scale is extremely small, with only a small number of items to process. For example, a batch task that only processes 2-3 text fragments can use a single chained node to meet requirements, avoiding added workflow complexity. You can also delay this decision when your business requirements are unclear and only in the initial exploration phase. Use a single-node workflow for testing first, then rework once your business requirements stabilize. If your batch tasks have strong dependencies that cannot be split into independent tasks, you can temporarily skip Parallel Run or Batch Run nodes and use the Loop Node for sequential processing instead. If your deployment environment has strict resource limits that prevent parallel processing, you can avoid Parallel Run Nodes and use the Loop Node or Batch Run Node’s sequential execution mode instead. You can also delay this decision when your batch task only needs to run once and does not need to be repeated. Manual processing will avoid unnecessary configuration work.

## Keep reading

- [Where Custom Code Runs: the Code Node or the Agent VM, and Which Sandbox Backs the VM](/guide/code-execution-environment-selection)
- [Knowledge Base Permissions: Team Roles, Dataset Collaborators or Collection-Level Access](/guide/dataset-permission-granularity)

## References

- [Loop node](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/loop_run)
- [Batch run node](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/loop)
- [Parallel run node](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/parallel_run)

## Next steps

The criteria above can be checked against public documentation and a test deployment. To decide against a specific workload, data boundary and operations setup, contact sales for an assessment; the cloud service can be used first to validate feasibility before choosing a deployment form.

- Contact sales: assess the choice against your conditions
- Get started: validate feasibility on the cloud service
- Pricing: compare what each form covers
