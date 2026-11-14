# Lift Ledger

A single-page training log for a chest / back / legs / (arms) / chest / back / legs week.
It opens on today's session, works out the next loads from what was logged, and tracks
estimated maxes, weekly hard sets per muscle and bodyweight.

Everything is in `index.html`. No build step and no server: logs are saved in the browser
on the device, with optional sync, backup files and restore on the Data tab.

## The goal

A 315 lb bench press. The bench appears twice a week (heavy top set on Monday, volume on
Friday) and the Progress tab tracks the estimated max against 315 with a projected date.
`GOAL` in `index.html` holds the target.

## Using it

- Enter reps per set and tap Finish. Blank sets are left out (the app asks once before saving).
- `− Set` / `+ Set` change the number of sets; `Skip today` drops an exercise from the session
  without affecting its progression; "Add another exercise" logs a lift from another day.
- The History tab shows a six-week calendar, every saved session, and a per-exercise log.
  A saved session can be corrected or deleted there.
- Entries in progress survive a reload and are flagged if left unsaved overnight.

## Syncing across devices

Optional. The Data tab can connect the app to a private GitHub repo, where the whole log is
kept as `lift-ledger.json`. Each device keeps its own copy and merges on sync: sessions are
matched by id, the newer edit wins, and deletions carry across. It needs a fine-grained
access token limited to that repo with Contents read and write; the token is stored only in
the browser.

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
  The top set goes up at 5 reps, or earlier when reps plus reps-in-reserve show it was easy.
- One rep short on a top set repeats the load once; a second or larger miss, or a heavy
  single, sets the load from the best recent top set.
- On other lifts a first set under the range lowers the load, except right after a jump,
  where the new load is kept while reps build. Three flat sessions trigger a step back.
- Deload-week sessions are logged but never change the progression.
