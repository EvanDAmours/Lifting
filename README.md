# Lift Ledger

A single-page training log that runs a five-session powerbuilding rotation (upper-body bias),
works out the next session's loads from what was logged, and tracks estimated maxes, weekly
hard sets per muscle and bodyweight.

- `app.html` is the whole app: program definition, progression rules, UI. It is also the file
  published as the Claude artifact, where logs are saved to the artifact's cloud store.
- `index.html` is the same app wrapped as a standalone page (`node build.js` regenerates it).
  Served from any static host it saves logs in the browser on that device.

## Changing the program

Everything lives at the top of the `<script>` in `app.html`:

- `EX` lists the exercises: rep range, load jump, rest time, muscles trained, starting estimate.
- `ROT` is the rotation: which exercises and how many sets per session.
- `BASE` holds the starting numbers from 12 Nov 2026.

After editing, run `node build.js`.

## Progression rules

- Straight sets use double progression: add reps inside the range, add load when every set
  reaches the top of the range.
- Bench and squat use a top set of 3–5 plus back-off sets at a fixed share of the top set.
- A first set under the range lowers the load; three flat sessions trigger a reset.
- Deload sessions are logged but never change the progression.
