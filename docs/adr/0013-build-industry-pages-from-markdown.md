# Build Industry pages from Markdown sources

W9 Industry pages use a server-only build-time loader over locale-scoped Markdown sources. The loader derives static params, page metadata, owner-relative canonical URLs, and sitemap entries from the same content source; existing Guide and Reference indexes continue to own their route families. Production generates the complete inventory through owner-relative routes, while locale-prefixed review routes remain available to preview builds. This keeps the publication surface small while preserving the repository's established Markdown-and-index model.

## Considered options

- A second hand-maintained publication registry would duplicate route identity and sitemap data, so delivery tracking remains outside runtime code.
- Mapping Industry pages into an existing Technical Center category would distort their domain meaning and couple the route to unrelated search and listing behavior.

## Consequences

- Industry pages need a dedicated route adapter and content validator.
- The normalized W9 Industry source set is validated as a 19,080-page release gate.
- A later Industry hub or search projection can derive from the loader without changing page identity.
