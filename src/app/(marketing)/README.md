# (marketing) — Route group

A Next.js route group: it shares a layout without adding a URL segment. Public marketing pages live here (home, pricing, about, how-it-works, contact).

**Belongs here:** audience-facing marketing routes that share the marketing header/footer chrome.

**Does NOT belong here:** app/dashboard routes, auth flows, or anything needing a different shell — those get their own route group. Group by audience and layout, never by nesting depth.
