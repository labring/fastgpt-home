---
title: Where Variables Come From: Globals, Node Outputs and API Inputs
slug: /en/guide/variable-injection-strategy
page_type: Decision matrix
source: https://github.com/labring/FastGPT
source_type: Open-source repository docs and community threads
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_title: Where Variables Come From: Globals, Node Outputs and API Inputs
meta_description: Technical decision guide for choosing variable injection methods in enterprise AI applications. Covers globals, node outputs, and API inputs.
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Where Variables Come From: Globals, Node Outputs and API Inputs

## When this decision has to be made
When you build or optimize workflow-based applications, choosing how to inject variables is a core decision. This choice directly impacts workflow flexibility, maintainability, debugging efficiency, and data flow clarity.

Deciding too early can lead to frequent re-architecture later, increasing development costs as business needs change. For instance, if you initially only use global variables, you might face data corruption or race conditions when business logic becomes complex, requiring local data isolation or concurrent processing.

Conversely, delaying this decision too long, especially as systems scale and workflow numbers grow, can lead to untraceable data flows, difficult debugging, redundant development, and performance bottlenecks. For example, if you do not define API input parameter usage scenarios, API design might become too rigid and unable to handle external system data inputs.

You must carefully evaluate and select a variable injection method during initial design, or when existing workflows show data confusion, inefficient debugging, or limited scalability.

## Criteria matrix

| Candidate | Data Scope | Lifecycle | Data Type Support | Debugging Complexity | Applicable Scenarios |
| :-------- | :--------- | :-------- | :---------------- | :------------------- | :------------------- |
| Global Variables | Application/Workflow Level | Entire Session | String, Number, Boolean, Object | Medium | Cross-node sharing, configuration parameters |
| Node Outputs | Within Node and Downstream Nodes | During Node Execution | Any (depends on node type) | Low | Inter-node data transfer, intermediate results |
| API Inputs | API Request Level | Single API Call | String, Number, Boolean, Object, File | Low | External system data input, workflow triggering |

## Why each criterion matters
**Data Scope**: This criterion defines the range within which a variable can be accessed and modified in a workflow. Global variables are accessible throughout the application or workflow lifecycle. This is convenient when you need to share data across multiple non-contiguous nodes. However, if not managed properly, global variables can lead to data corruption, where one node unintentionally modifies data that another node relies on. Node outputs are scoped only to their own node and directly downstream nodes. This provides good data encapsulation, reducing the risk of accidental data modification, but it limits data sharing across branches or non-directly connected nodes. API inputs are scoped only to a single API call, ensuring each request is independent and preventing data interference between requests. An incorrect choice here makes data flow difficult to trace, increasing debugging difficulty.

**Lifecycle**: A variable's lifecycle determines how long it exists. Global variables tie their lifecycle to the entire session or application runtime. This suits storing long-term configurations or user states. If you frequently create and destroy them, it can lead to resource waste or data inconsistency. Node outputs have a lifecycle limited to node execution and then pass to downstream nodes upon completion. This makes resource management more efficient but prevents data persistence across different sessions or independent workflow instances. API inputs have the shortest lifecycle, valid only during a single API request. This guarantees isolation for each request but means each request must re-transmit any required data. Improper lifecycle management can result in data loss or unnecessary memory consumption.

**Data Type Support**: This criterion describes how compatible different injection methods are with data formats. Global variables in v4.15.0 support `object` type data input. This enhances their ability to store complex configurations or structured information. Node output data types depend on the specific node's processing capabilities. For example, a file processing node might output a file object, while a text processing node outputs a string. API inputs support various types, including string, number, boolean, object, and file. In v4.14.4, tool call file input supports manual entry and variable referencing, offering high flexibility. If your chosen injection method does not support the required data type, it will lead to complex, error-prone data conversion, or even prevent the desired functionality. For instance, if you need to pass a binary file, and the chosen method does not support file types, you will need additional Base64 encoding and decoding, increasing complexity.

**Debugging Complexity**: Debugging is critical for ensuring correct workflow operation. Global variables, due to their broad scope and long lifecycle, mean any node's modification can affect other areas, making problem tracing complex, especially in concurrent scenarios. Workflow Debug mode in v4.8 allows debugging individual nodes or step-by-step debugging, which helps mitigate this issue. Node outputs, with their local scope, offer clear data flow, making problems generally easier to pinpoint to a specific node. API inputs have lower debugging complexity because each request is independent. You can quickly locate issues by examining the request body and response. Increased debugging complexity directly raises development and maintenance costs, particularly in large, complex workflows.

**Applicable Scenarios**: This criterion indicates the most suitable application scenarios for each injection method. Global variables are suitable for configuration information or session states that need to be shared across multiple nodes, such as user IDs (the `uid` global variable was added in v4.8.10). Node outputs are suitable for inter-node data transfer and storing intermediate results, for example, using the processing result of a previous node as the input for a subsequent node. API inputs are primarily used to receive data input from external systems, trigger workflow execution, or, in v4.14.4, for API uploading local files to a knowledge base. Choosing an injection method that does not match the scenario leads to poor workflow design, making it difficult to extend or maintain, and potentially failing to meet business requirements.

## The cost of switching later
Once you select a variable injection method and widely apply it in a workflow, changing it later incurs significant costs.

First, there is the cost of **data migration and compatibility**. For example, if you switch from global variables to node outputs, you must redesign the data flow. Ensure all nodes that relied on global variables can correctly receive outputs from upstream nodes. This may involve extensive code or configuration modifications and handling conversions between different data types.

Second, there is the cost of **index and dependency refactoring**. Workflow nodes typically establish internal dependencies based on variable names or paths. Changing the injection method means these internal indices might become invalid. You will need to scan and refactor them manually or with automated tools. This is a massive undertaking in complex workflows.

**Downtime windows** are another important consideration. Large-scale changes to variable injection methods typically require deploying new workflow versions. This can lead to brief service outages or feature unavailability. For production environments, any downtime means business loss. Even with blue-green deployments or canary releases, additional deployment and validation processes are necessary.

Finally, there is the **validation workload**. After changing the variable injection method, you must conduct comprehensive functional, regression, and performance testing on all affected workflows. This ensures the new data flow's correctness, stability, and performance. This includes verifying data transfer, expected execution of logical branches, and correct concurrent processing. Incorrect modifications can introduce new bugs, leading to data errors or system crashes. For example, v4.15.1 fixed an issue where the main process did not update synchronously when global variables or outputs of nodes outside the container were modified via variable updates in loop nodes and parallel execution nodes. You must thoroughly validate such issues after a change.

## When this decision can wait
In certain specific situations, you can postpone the decision on variable injection methods. You do not need to finalize it at the project's outset. If the application or workflow logic you are currently building is very simple, for example, with only one or two linear nodes, a single data flow, and no complex conditional judgments, loops, or concurrency requirements, then any intuitive variable passing method (such as directly passing outputs via node connections) will suffice.

When business requirements are unclear, or the product prototype is in a rapid iteration phase, prematurely fixing variable injection methods might limit future flexible adjustments. At this stage, prioritize implementing core business logic and quick validation, using the simplest default method. For example, if a workflow is only for one-time data processing or a proof of concept, and you do not anticipate large-scale expansion, you can defer in-depth design of the variable injection strategy. Additionally, if your team is still learning and exploring the workflow platform, you can start with basic node outputs and simple global variables. Optimize your decision after gaining a deeper understanding of platform features and business patterns.

## Keep reading

- [Chunking by Document Type: How Each Class Splits and What Values to Use](/en/guide/chunking-strategy-selection)
- [When an Index Must Be Rebuilt: Triggers, Cost and Migration Paths](/en/guide/index-rebuild-and-migration)

## References

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT Docker Compose deployment](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)

## Next steps

The criteria above can be checked against public documentation and a test deployment. To decide against a specific workload, data boundary and operations setup, contact sales for an assessment; the cloud service can be used first to validate feasibility before choosing a deployment form.

- Contact sales: assess the choice against your conditions
- Get started: validate feasibility on the cloud service
- Pricing: compare what each form covers
