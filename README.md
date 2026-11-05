# AquaQ Challenges

These are my solutions to the [AquaQ Challenges](https://challenges.aquaq.co.uk/), in JavaScript.

```
challenges/challengeNN/   solution.js, README.md (the answer)
puzzlehub.json            tells the puzzle hub how this repository is laid out
hub.db                    answers and run history (sqlite)
template.js               what a new solution starts from
```

Every solution exports one (async) `solution` function that takes the challenge input as a string and returns the answer. Only the challenges I have worked on have a folder.

### Running them

The tooling lives in its own repository, [puzzle-hub](https://github.com/CodingAP/puzzle-hub): a small Deno server with a CLI, a JSON API and a browser editor that can host any number of puzzle repositories like this one. Clone both next to each other, list this folder in the hub's `hub.json`, and:

```bash
deno task cli credential --source=aquaq --value=<your challenges.aquaq.co.uk session cookie>
deno task cli fetch --source=aquaq --challenge=0    # creates the solution and downloads input.txt (never committed)
deno task cli run --source=aquaq --challenge=0
deno task serve                                     # dashboard + editor on http://localhost:8000
```

If the download does not work for you, paste the input into the hub's Input panel instead. My own instance runs at https://challenges.codingap.dev.
