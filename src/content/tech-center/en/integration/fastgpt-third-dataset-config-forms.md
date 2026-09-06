---
title: Add Third-Party API Dataset Configuration Forms
slug: /en/integration/fastgpt-third-dataset-config-forms
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/dataset/third-party/third_dataset
source_type: Official documentation
---

# Add Third-Party API Dataset Configuration Forms

## Third-Party Dataset Form Extension Fundamentals
This documentation covers targeted modifications to the FastGPT dataset configuration interface for external API integrations. All changes are applied to a single core component file that handles user input fields when creating a new API-based dataset, ensuring consistency with the core FastGPT form framework.

## Core Target File and Key Components
The primary file for these modifications is `FastGPT\projects\app\src\pageComponents\dataset\ApiDatasetForm.tsx`. Two optional UI components can be added to this file to extend the dataset configuration flow:
- `renderBaseUrlSelector()`: Renders a dedicated input field for the external API's base URL, allowing users to specify the endpoint for their third-party dataset.
- `renderDirectoryModal()`: Triggers a modal window for selecting a root directory when the user clicks the Select button, tied exclusively to the `getFileDetail` API method to retrieve directory metadata.

Visual previews of these components are available in the provided image assets, labeled thirddataset-14 through thirddataset-18, showing both the base URL field and root directory selection interface.

## Step-by-Step Implementation Workflow
1.  Locate and open the `FastGPT\projects\app\src\pageComponents\dataset\ApiDatasetForm.tsx` file in your local FastGPT project directory. This file is responsible for all input fields during the API dataset creation process.
2.  Insert the following code within the form's render function to add the core configuration fields:
    ```
    {renderBaseUrlSelector()} // Renders the `Base URL` field
    {renderDirectoryModal()} // The `Select Root Directory` modal that appears when clicking `Select`
    ```
3.  Validate compatibility with your third-party dataset's API:
    - If your dataset does not support the `getFileDetail` API method, omit the root directory selector components to avoid incomplete or broken functionality.
    - If your dataset does support the `getFileDetail` API method, add any additional required code within the `ApiDatasetForm` component to fully enable the root directory selection workflow, as outlined in the official source documentation.

A reference table of component purposes and dependencies is listed below:
| Component Name | Core Purpose | Required API Support |
|----------------|--------------|----------------------|
| renderBaseUrlSelector | Displays a base URL input field for the external API | None |
| renderDirectoryModal | Shows root directory selection modal on button click | `getFileDetail` |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/third-party/third_dataset)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
