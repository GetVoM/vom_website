---
version: 1
slug: "app-lang-vom-foodics-page-tsx"
primary_target: "app/[lang]/vom-foodics/page.tsx"
related_targets: ["app/[lang]/vom-marn/page.tsx","app/[lang]/vom-zid/page.tsx","components/integrations/IntegrationPage.tsx"]
---

# Surface brief: integration pages (Arabic `/vom-foodics/`, `/vom-marn/`, `/vom-zid/`; English `/en/vom-foodics/`, `/en/vom-marn/`, `/en/vom-zid/`)

Scope: three integration pages, VoM & Foodics, VoM & Marn and VoM & Zid, in both locales, sharing one template; visitor mode Persuade. Audience: merchants already on Foodics or Marn (restaurant POS) or Zid (e-commerce) who want their accounting to follow on its own, arriving from search or from the partner's marketplace. Job: see that VoM connects to their system, watch how, understand exactly what moves into VoM, then register on app.getvom.com. Proof and content: only the old pages (lockup image, one partner line, the sync rules, the partner's own bullets, the Arabic YouTube videos with their posters). Constraints: dictionaries hold the copy; Arabic typo fixes only, English rewritten natively; Zid keeps its single sync rule and has no partner list (owner, 2026-11-10); Marn's sixth rule runs Marn → VoM like Foodics (owner); English pages show the Arabic videos labelled "(in Arabic)" (owner); the YouTube iframe loads only after the visitor presses play; `/en/vom-*-2/` and `/vom-*-2/` are 301s to `/en/vom-*/`. Prexle (`/vom-prexle/`) is out of scope.

## Direction contract

THESIS: Each page shows the connection working: the partner's own connection video leads on the teal field, and a posting ledger states exactly what each partner record becomes in VoM. It refuses the category's logo-arrow-logo hero over a bullet grid.

OWN-WORLD: Official Record unchanged: paper, one slanted teal guilloche field, double-hairline frames, Effra only, small pills, orange only on Register. New atoms: the screen (a paper doc-frame holding a 16:9 poster on the field, with a white double-ring play seal); the posting ledger (a ruled two-column sheet, partner item → VoM result, mirrored arrows, closed by the double teal rule); the letterhead lockup (VoM | partner) above the H1; the connection emblem (VoM and partner seals joined by a white double hairline) on the close band.

STORY: The merchant reads "Connect Foodics to VoM" and what the partner does, sees the connection video on the field and plays it in place, or registers at once. Below they learn exactly what moves into VoM, then what the partner itself offers (Foodics, Marn), then the sibling integrations; the page closes on Register.

FIRST VIEWPORT: At 1440×900, RTL: start 6/12 holds breadcrumb, lockup letterhead (about 18rem), H1 at display scale, lede, orange Register and a ghost link to the video; end 6/12 a teal guilloche field cut by a slanted start edge, bleeding to the viewport end, holding the screen (about 36rem) with the video title and length under it in white (Foodics adds its second, short video). Signature motion once on load, about 1.2 s: the screen lifts onto the field, then the play seal stamps in; reduced motion shows it finished. Below 1024 px: copy and buttons, then the field as a full-width panel with a slanted top edge holding the screen.

FORM: Watch it connect, candidate 4 on an ordered list of 7, dealt lead and chosen by the owner. Seed key 809350c1. Code-led.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
