# Lift Ledger

A single-page training log for a chest / back / legs / (arms) / chest / back / legs week.
It opens on today's session, works out the next loads from what was logged, and tracks
estimated maxes, weekly hard sets per muscle and bodyweight.

Everything is in `index.html`. No build step and no server: logs are saved in the browser
on the device, with Export and Import on the Data tab for backups.

## Putting it online (GitHub Pages)

Repository Settings → Pages → Source "Deploy from a branch" → pick the branch and `/ (root)` → Save.
The page is then served at `https://evandamours.github.io/Lifting/`.

## Changing the program

At the top of the `<script>` in `index.html`:

- `EX` lists the exercises: rep range, load jump, rest time, muscles trained, starting estimate.
- `ROT` is the week: which exercises and how many sets on each day (`dow` 0 = Sunday).
- `BASE` holds the starting numbers from 12 Nov 2026.

## Progression rules

- Straight sets use double progression: add reps inside the range, add load when every set
  reaches the top of the range.
- Bench and squat use a top set of 3–5 plus back-off sets at a fixed share of the top set.
- A first set under the range lowers the load; three flat sessions trigger a reset.
- Deload-week sessions are logged but never change the progression.
