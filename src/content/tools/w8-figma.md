---
id: w8-figma
title: "Figma: wireframes to a clickable prototype"
week: 8
estimatedMinutes: 12
tags: [tool, figma, prototyping]
---

## What it is

**Figma** is the most widely used interface design tool. It runs in the browser (and as a desktop app), supports real-time collaboration, and can turn static screens into **clickable prototypes**. The free **Starter** plan is enough for personal projects.

## Why PMs use it

PMs review designs, leave comments, inspect details, and increasingly create quick wireframes and prototypes themselves to test ideas. Being able to build a simple clickable prototype makes your P1 case study much stronger and lets you run real usability tests.

## Account setup (free plan)

1. Go to figma.com → **Get started for free**; sign up with Google.
2. Choose the free plan. It limits the number of collaborative design files in teams and some features, but personal drafts are generous. Check the pricing page for current limits.
3. Install the **Figma mobile app** (optional) to view prototypes on your phone.

## Walkthrough: build the P1 prototype

### 1. Get a free UI kit
1. Click **Explore Community** (or visit figma.com/community).
2. Search for a free **mobile UI kit** or **wireframe kit** (e.g., “mobile wireframe kit”, “iOS UI kit”, “Material Design kit”). Check the licence allows free use.
3. Click **Open in Figma** → it copies into your drafts. Browse its components.

### 2. Create your file and frames
1. Create a new **Design file**: “P1 Prototype – v1”.
2. Press **F** (Frame) and choose a phone size from the right panel (e.g., **Android Compact** or **iPhone 14**). This is one screen.
3. Rename frames by double-clicking their name: “01 Summary”, “02 UPI chooser”, “03 Success”, “04 Failed”, “05 Pending”, “06 Dispute”.

### 3. Build mid-fi screens
1. Copy components from the UI kit (buttons, list items, headers) and paste them into your frames.
2. Use **Auto layout** (select items → **Shift + A**) to stack elements with consistent spacing; it makes edits easy.
3. Use **real content**: “You owe ₹420”, “Groceries – ₹1,260 – paid by Rohan”.
4. Keep colours greyscale at first; add one accent colour for the primary button.
5. Create all states from your user flow (success, failure, pending, empty).

### 4. Make components for repeated items (optional)
1. Select an expense row → right-click → **Create component** (**Ctrl/Cmd + Alt + K**).
2. Reuse **instances** of it; edits to the main component update all instances.

### 5. Wire up the prototype
1. Switch to the **Prototype** tab (top right panel).
2. Select the “Settle ₹420” button → drag the **+** handle (blue dot) onto the “02 UPI chooser” frame.
3. Set the interaction: **On tap → Navigate to → 02**, animation **Smart animate** or **Instant**.
4. Connect every button in your flow. For decision points, make two buttons on a helper screen (e.g., “Simulate success” / “Simulate failure”) or use separate test paths.
5. Set the **starting frame**: select “01 Summary” → in the Prototype panel, add a **Flow starting point**.

### 6. Test it
1. Click **Present** (▶ play icon). Click through the full flow.
2. Fix dead ends (buttons that go nowhere).
3. Share: **Share → Copy link** (set to “Anyone with the link can view”). Open it on your phone via the Figma app or browser.

### 7. Version 2
1. After your usability tests, duplicate the page (right-click page → **Duplicate**) and name it “v2”.
2. Apply fixes. Keep v1 for your case study “before/after”.

### 8. Comments and handoff
1. Press **C** to leave comments on specific spots (e.g., notes for engineers).
2. Engineers can inspect sizes and colours in **Dev Mode** (availability depends on plan) or by selecting elements in view mode.

## Tips

- **Shortcuts:** F (frame), R (rectangle), T (text), Shift + A (auto layout), Ctrl/Cmd + D (duplicate), Ctrl/Cmd + G (group), C (comment).
- **Name layers** clearly; it helps you and anyone reviewing.
- **Use 8-pt spacing** (8, 16, 24, 32) for consistent layouts.
- **Check contrast** with a free Figma community contrast plugin.
- **Don’t over-polish v1**; get it testable, then iterate.
