---
title: Retail Input and Interaction Starting Points | FastGPT
slug: /en/guide/retail-input-checks-hub
page_type: Issue list
source: https://github.com/labring/FastGPT
source_type: 官方文档
meta_title: Retail Input and Interaction Starting Points | FastGPT
meta_description: Learn to build retail workflows in FastGPT by collecting data with forms, routing with selections, and integrating with external systems via HTTP nodes.
keywords: 
schema_type: TechArticle
date_published: 2026-10-26
date_modified: 2026-10-26
---

# Retail Input and Interaction Starting Points | FastGPT

FastGPT workflows can be designed to handle retail interactions by collecting user input, routing decisions, and integrating with external systems. A proposed design for a retail fulfillment workflow might begin with a user interaction, proceed to a decision point, and then call an external API. Each stage requires specific node configurations and a clear division of responsibility between the FastGPT workflow and external business systems.

## Collecting User Information with Forms

The initial step in many interactive workflows is gathering information from a user. The Form Input node is designed for this purpose. When a workflow reaches this node, it enters an interactive state, presenting a form to collect required information. After the user submits the form, the collected data is passed to subsequent nodes in the workflow. It is important to note that this node's function is data collection and transmission; it does not include a business database for storage.

A proposed implementation would define all necessary fields within the Form Input node. Downstream responsibilities, such as field validation, business logic for approvals, or writing data back to an external system like an order management database, must be handled by subsequent nodes or external system integrations. To learn how to configure a node that collects user-submitted data before proceeding, see the guide to the Form Input node.

For more information, see "Collect User Input with FastGPT Form Input Nodes".

## Branching Logic with User Selections

After collecting initial data, a workflow may need to branch based on a user's choice. The User Selection node facilitates this by presenting options and waiting for a selection. Upon receiving the user's choice, the workflow proceeds down the corresponding 'Yes' branch connected to that option. This allows for the creation of conditional paths, such as routing a query to different knowledge bases or triggering distinct API calls based on user intent.

Like the Form Input node, the User Selection node also places the workflow into an interactive state until the interaction is complete. This state management is an inherent behavior of these nodes and does not require a separate global configuration. The node is intended for workflow routing and should not be configured as a dynamic data selector for business records or as a personnel directory. To implement branching logic based on direct user choices, consult the guide on user selection nodes.

For more information, see "Implement Interactive User Selection in FastGPT Workflows".

## Integrating with External Systems via HTTP

To complete business operations such as writing an order to a database or retrieving shipment status, the workflow must communicate with external systems. The HTTP node allows FastGPT to send requests to external APIs. The node's configuration must precisely match the external API's contract, including the request address, method (e.g., GET, POST), parameters, and headers. The request address can incorporate variables from previous nodes or global settings.

Authentication credentials should be injected through secure configurations, not hardcoded into request headers or parameters in examples. A request body is used only for applicable request types, and its JSON structure must conform to the external API's requirements. The HTTP node can reference global variables, system variables, and outputs from preceding nodes. It is necessary to verify that the correct values are passed during execution. Note that the system variables `chatId` and `responseChatItemId` are not present in test mode, and their absence in that context does not indicate a business failure. To configure calls to external APIs, refer to the documentation on using system variables in HTTP requests.

For more information, see "Use System Variables in HTTP Node Request Parameters".
