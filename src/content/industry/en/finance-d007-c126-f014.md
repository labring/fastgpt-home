---
title: Form and Interaction for Airport Revenue Yield
slug: /en/industry/finance-d007-c126-f014
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Form and Interaction for Airport Revenue Yield
meta_description: Data related to airport revenue yield comes primarily from publicly available statistical datasets released by the Civil Aviation Administration of
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Form and Interaction for Airport Revenue Yield

## What Data for This Category Looks Like
Data related to airport revenue yield comes primarily from publicly available statistical datasets released by the Civil Aviation Administration of China, monthly and annual announcements from airport operators, and public civil aviation industry data APIs. Data is updated once daily, corresponding to the operational accounting results from the previous day.

The data is structured as a standardized table, with core fields including: airport unique identifier (ICAO/IATA code), report date, takeoff and landing sorties, passenger throughput, cargo and mail throughput, main business revenue, and operating costs. Field units follow industry-specific conventions:
- Takeoff and landing sorties: sorties
- Passenger throughput: person-times
- Cargo and mail throughput: tons
- Revenue and cost fields: ten thousand yuan

## Constraints on Form and Interaction From These Data Characteristics
Because the data relies on unique airport identification codes, the form must support precise airport selection to prevent data matching failures caused by manual input errors.

The daily update cadence of the daily report requires the form’s date picker to default to yesterday’s date, and limit the selectable range to the past 30 days. This prevents pulling non-existent historical data.

The multi-field structure with specific units requires the form to include built-in unit verification rules, which block inputs with negative values or mismatched units.

Revenue yield accounting requires linking multiple operational data points, so the form must support linked field loading. Selecting an airport will automatically populate corresponding data field options, reducing manual entry steps.

## How to Set Configurations
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `formFieldType` | `Single-select + numeric input combination` | Matches the needs of airport selection and multi-field data entry; ICAO codes require single-select, and accounting fields require numeric input |
| `datePickerRange` | `Default to yesterday, selectable range limited to the past 30 days` | Aligns with the update rhythm of airport revenue yield daily reports, avoids pulling invalid historical data |
| `optionSource` | `Bind to the airport code list from civil aviation industry public data APIs` | Automatically loads compliant airport identifiers, reduces manual input errors |
| `inputValidationRule` | `Numeric fields must be greater than or equal to 0, units must match preset items` | Blocks abnormal input that does not conform to industry logic |
| `formSubmitTimeout` | `600 seconds` | Airport data requires pulling from external APIs, which takes a long time; prevents request interruption due to early timeout |
| `apiFieldMapping` | `Associate corresponding operational data fields by ICAO code` | Achieves precise matching between form fields and external data sources |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis, and it is recommended to test on independent samples before finalizing.

## Three Common Misconfigurations
- After calling the FastGPT form API, a third-party platform cannot load the form component and returns `400 Bad Request`. This issue is prevalent in FastGPT versions below 4.9.7, and stems from incorrect configuration of the `formApiAuth` parameter and failure to enable cross-domain access permissions.
- After form submission, revenue yield-related accounting fields are empty, with no corresponding data returned. The cause is that no mapping relationship between airport codes and accounting fields is configured in `apiFieldMapping`, leading to failed data retrieval.
- Single-select variables cannot receive airport code values passed by global variables, and cannot trigger subsequent data loading. The cause is that the `airportCode` field of the global variable is not bound to the `optionValue` parameter of the single-select node, breaking the variable transfer chain.

## How to Verify a Correct Configuration
- Navigate to the form preview interface, select any airport code, and verify whether corresponding data fields load automatically.
- Submit a test data entry, and check if the returned response body includes all configured fields to confirm the field mapping relationship is active.
- Call the form API interface, and check if the third-party platform can load the form component normally to confirm cross-domain configuration meets requirements.
- Adjust the airport code value in the global variable, check if the single-select node updates synchronously and triggers data loading, to confirm the variable transfer chain works properly.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
