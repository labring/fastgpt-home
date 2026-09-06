# Store technical content in Markdown and indexes

Technical article Markdown is the authored content. `src/components/tech-center/entries.json`
identifies published routes; locale search indexes contain discovery fields derived from it.
The importer validates explicit delivery inputs and updates these files. Source checks validate
all indexed bodies and search entries, and export checks validate the generated site.

Git preserves previous content and import history. The former normalized manifests, decision
ledgers, batch contracts, and custom release controllers were retired after ablation confirmed
that the website consumes the Markdown and indexes directly.
