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

- Straight sets use double progression: add reps inside the range; move to the next weight the
  equipment has when the first set reaches the top and the rest are within two reps of it.
  Hitting the top with reps to spare beyond the target jumps further, capped at about 15%.
- A lift done on two days follows that day's own history; a heavier weight already handled on
  the other day carries over. One rep short after a good session repeats the load once.
- A step back needs six sessions at one load since the last deload with reps going backwards,
  and is one equipment notch. Nothing resets straight after a deload.
- Bench and squat use a top set of 3-5. Back-offs are set live from the top set's reps and reps
  in reserve (82% of the implied max on bench, 75% on squat), capped at about 95% of it.
- Deload-week sessions are logged but never change the progression.
