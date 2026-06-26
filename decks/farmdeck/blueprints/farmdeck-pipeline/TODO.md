# Pipeline Overview
<!-- lifecycle: standing -->

## BOT

- [ ] Read `PIPELINE.md` (sibling in `pipeline/`) for stage definitions and stale threshold.
- [ ] Scan all `prospects/*/PROSPECT.md` — extract slug, name, company, stage, last-interaction date.
- [ ] Group by stage (Seed / Nurture / Active). Flag any whose last interaction is older than the stale threshold.
- [ ] Surface a pipeline summary table and a "needs attention" list under `## HUMAN`.

## HUMAN

## ACTIONS

<!-- Move an item to ## BOT to activate it, then play this card. -->

- [ ] add-prospect — open farmdeck-add-prospect blueprint
