---
name: tab-hygiene
description: Review open tabs, group them by task, and suggest which to close or keep.
version: 1.0.0
category: browsing
allowed-tools:
  - list_tabs
---

# Tab hygiene

Help the user cut down on open tabs.

1. Call `list_tabs`.
2. Group the tabs by apparent task, using the titles and URLs only.
3. For each group, recommend: keep, close, or defer — and say why in one short
   clause. Titles can be misleading, so flag any group where the URL suggests the
   page is not what the title claims.
4. Never close a tab yourself. Report the suggestion and let the user act.
