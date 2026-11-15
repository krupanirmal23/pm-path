---
id: w10-promptfoo
title: "Promptfoo: automate your evals"
week: 10
estimatedMinutes: 11
tags: [tool, promptfoo, evals]
---

## What it is

**Promptfoo** is an open-source command-line tool for **testing prompts and LLM apps**. You write a simple configuration file listing prompts, models (“providers”) and test cases with **assertions** (code checks or LLM-graded rubrics). Promptfoo runs everything and shows a results table comparing versions side by side. It’s free and runs on your laptop.

## Why PMs use it

Labelling 50 outputs by hand once is valuable; doing it after every prompt change isn’t sustainable. Promptfoo turns your golden set and rubrics into an **automated regression suite**: change the prompt, re-run, see what broke. It also makes it easy to compare models (Week 9) with numbers.

## Account setup (free plan)

1. Install **Node.js** (LTS version) from nodejs.org if you don’t have it. Check with `node -v` in a terminal.
2. In a terminal, run: `npx promptfoo@latest init p4-evals` (this creates a folder with an example config). `npx` downloads and runs Promptfoo without a global install.
3. Set your Gemini key as an environment variable so it isn’t written in files:
   - macOS/Linux: `export GEMINI_API_KEY=your_key_here` (or `GOOGLE_API_KEY`, depending on the provider docs)
   - Windows (PowerShell): `$env:GEMINI_API_KEY="your_key_here"`
4. No account is required for local use.

## Walkthrough: turn your golden set into an automated suite

### 1. Edit the config
Open `p4-evals/promptfooconfig.yaml` and replace its contents with a structure like this (adapt to your P4):

```yaml
description: P4 expense parser evals
prompts:
  - file://prompts/parser_v1.txt
  - file://prompts/parser_v2.txt
providers:
  - id: google:gemini-flash-latest   # use the exact model id from AI Studio/Promptfoo docs
    config:
      temperature: 0.1
defaultTest:
  assert:
    - type: is-json
tests:
  - vars:
      message: "paid 600 for wifi, split with everyone"
    assert:
      - type: javascript
        value: JSON.parse(output).expenses[0].amount === 600
  - vars:
      message: "kal dinner ke 1.8k maine diye, rohan aur priya ke saath"
    assert:
      - type: javascript
        value: JSON.parse(output).expenses.reduce((s,e)=>s+e.amount,0) === 1800
  - vars:
      message: "what's the weather?"
    assert:
      - type: llm-rubric
        value: The output politely declines because the request is not about expenses.
```

Notes:
- `prompts`: your prompt files, with `{{message}}` where the input goes.
- `providers`: the model(s). Check Promptfoo’s Google/Gemini provider docs for the exact id format.
- `assert` types: `is-json`, `contains`, `not-contains`, `javascript` (custom code checks), `llm-rubric` (LLM-as-judge with your rubric), and more.

### 2. Load tests from a file (for 50 cases)
Instead of writing tests inline, put them in a CSV with columns `message` and `__expected` (or custom assertion columns) and reference it: `tests: file://tests.csv`. Promptfoo’s docs show the CSV format.

### 3. Run
1. In the `p4-evals` folder: `npx promptfoo@latest eval`
2. Then open the results viewer: `npx promptfoo@latest view`
3. You’ll see a grid: rows = test cases, columns = prompt versions; cells show pass/fail with outputs. The header shows pass rates per version.

### 4. Use it for your checkpoint
1. Compare `parser_v1` vs. `parser_v2` pass rates.
2. Click failing cells to see why (assertion message, output).
3. Record: “v1 62% → v2 88% on 50 cases; failures fixed: Hinglish amounts, unknown names.”

### 5. Validate your llm-rubric judges
1. For criteria graded with `llm-rubric`, export results and compare against your own labels in the Eval Labeler’s agreement checker.
2. Tighten the rubric text if agreement or failure recall is low.

## Tips

- **Never commit API keys**; use environment variables.
- **Start with code assertions** (JSON validity, amounts, enums); add `llm-rubric` only for nuanced criteria.
- **Cache is on by default**: re-runs reuse earlier results for identical inputs. Clear it if you need fresh outputs (`--no-cache`).
- **Mind free-tier rate limits**: use a lower concurrency option (see `--max-concurrency` in the docs).
- **Commit the config and tests** (without keys) to your P4 GitHub repo as evidence of systematic evaluation.
