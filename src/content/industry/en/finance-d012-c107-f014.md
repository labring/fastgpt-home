---
title: Forms and Interactions for Electric Power Marketing Content
slug: /en/industry/finance-d012-c107-f014
page_type: Industry scenario page
article_section: Marketing Content and Lead Generation
is_part_of: FastGPT Tech Center
meta_title: Forms and Interactions for Electric Power Marketing Content
meta_description: Electric power marketing-related data mainly comes from the electricity consumption collection system, customer marketing management system, and
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Forms and Interactions for Electric Power Marketing Content

## What the data for this category looks like
Electric power marketing-related data mainly comes from the electricity consumption collection system, customer marketing management system, and offline installation work orders. Data updates follow a fixed rhythm: newly added electricity user profiles and outreach records are synchronized daily, and full historical data calibration is completed monthly. Most documents use structured forms, with core fields including 10-digit user account numbers, electricity usage addresses, electricity usage categories (residential/commercial/large-scale industrial), with units of kilowatt-hour and yuan per kilowatt-hour. In some scenarios, it is necessary to associate user historical payment records and electricity load data.

## What constraints these characteristics impose on the "forms and interactions" link
1. The 10-digit user account number requirement requires form input controls to add fixed-length numeric validation to prevent invalid inputs.
2. Fixed-enumeration electricity usage category fields must be restricted to single-select or multi-select components, and free text input is prohibited.
3. Users in different electricity usage categories need to be matched with differentiated form fields, so trigger rules for dynamic display must be configured.
4. Fields associated with electricity load and payment records must support automatically pulling data via the user account number to reduce manual input steps.
5. Some marketing forms converted from offline to online need to accommodate the input habits of non-digital users, providing auxiliary input prompts.

## How to set the configurations
| Configuration Item | Recommended Approach | Rationale |
| ---- | ---- | ---- |
| `radio_option_api` | Bind to the electricity usage classification interface of the electric power marketing system | Obtain the latest electricity usage category enumerations in real time, adapting to the classification update requirements of electric power business |
| `input_pattern` | `^\d{10}$` | Match the 10-digit format of user account numbers, quickly filtering invalid inputs |
| `input_max_length` | `10` | Limit input length to match the account number format, reducing the complexity of validation logic |
| `dynamic_field_switch` | Trigger based on electricity usage category | Display differentiated form fields for residential, commercial, and large-scale industrial users |
| `auto_fill_trigger` | Trigger after the account number input passes validation | Automatically pull associated electricity usage addresses and payment records to reduce manual input steps |
| `dialog_display_mode` | Hide when nested in workflows | Resolve the interaction issue of duplicate dialog box display in nested scenarios |

> The parameter values provided on this page are all conventional recommendations used to determine the starting point for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing.

## Three common mistakes
- Symptom: The form node dialog box is hidden when triggered in a single workflow, but still displays when nested in other workflows. Cause: No adaptation rules for nested scenarios are configured for `dialog_display_mode`, and the default logic does not accommodate workflow nested interaction scenarios.
- Symptom: The options of single-select or multi-select components are not updated in real time, resulting in a mismatch between the electricity usage category enumeration and the actual system. Cause: The business interface is not bound using `radio_option_api`, and fixed enumerations are maintained manually, making it impossible to synchronize the latest business classification adjustments.
- Symptom: Subsequent service flow is not triggered after the form is submitted, resulting in no assigned contact for user inquiries. Cause: No callback trigger rules are configured after form submission, and no association is made with the work order distribution interface of the marketing system, causing submitted data to not flow to the corresponding service link.

## How to confirm the configuration is complete
- Enter a user account number that does not conform to the 10-digit format, check whether the corresponding format error prompt pops up, and confirm that the validation rule of `input_pattern` takes effect.
- Switch between different electricity usage category options, check whether the form fields are dynamically switched and displayed, and confirm that the configuration of `dynamic_field_switch` is correct.
- Enter a valid 10-digit account number, check whether associated fields such as the electricity usage address are automatically pulled, and confirm that the trigger logic of `auto_fill_trigger` works normally.
- Nest the form node into a test workflow, check whether the dialog box is hidden as configured, and confirm that the adaptation rule of `dialog_display_mode` takes effect.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
