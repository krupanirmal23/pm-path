---
id: w7-excalidraw
title: "Excalidraw: draw your architecture diagram"
week: 7
estimatedMinutes: 9
tags: [tool, excalidraw, diagrams]
---

## What it is

**Excalidraw** (excalidraw.com) is a free, open-source virtual whiteboard with a hand-drawn style. No account is needed; drawings are saved in your browser and can be exported as PNG, SVG or `.excalidraw` files.

## Why PMs use it

Architecture diagrams, user flows and quick sketches help PMs and engineers agree on how something works. Excalidraw’s sketchy style signals “this is a working diagram”, which encourages discussion rather than polishing. It’s ideal for your P3 annotated architecture diagram.

## Account setup (free plan)

1. Open excalidraw.com. That’s it.
2. Your drawing autosaves in the browser. To keep it safe, **export the file** (Menu → **Save to…** → **Save to disk** as `.excalidraw`) and re-open it later with **Open**.
3. Optional: **Live collaboration** (the people icon) lets others draw with you via a link.

## Walkthrough: UPI payment architecture (P3)

### 1. Plan the components
Write the list before drawing. For UPI “Pay” (simplified):
- User’s phone: **payer app** (PhonePe/GPay/Paytm, called a **TPAP**, third-party app provider).
- **Payer PSP bank** (the bank partnering with the app to access UPI).
- **NPCI UPI switch** (the central network run by the National Payments Corporation of India).
- **Issuer bank** (the payer’s bank, where money is debited).
- **Payee PSP / acquiring bank** and **beneficiary bank** (where money is credited).
- **Merchant server** (if paying a merchant) and **notifications**.

### 2. Draw the boxes
1. Press **R** (rectangle). Draw one box per component.
2. Double-click a box to type its name.
3. Use colours to group: pick a box → background colour in the left panel. E.g., user side = lavender, banks = sky, NPCI = butter, merchant = mint.
4. Arrange left-to-right in the order money and messages flow.

### 3. Draw the arrows
1. Press **A** (arrow). Drag from one box to another; the arrow **binds** to boxes so it follows when you move them.
2. Double-click an arrow to add a label: “1. Collect/Pay request + encrypted PIN”, “2. Route to issuer”, “3. Debit account”, “4. Credit beneficiary”, “5. Success response”, “6. Notify payer and payee”.
3. Number the arrows in order. Use **dashed** arrows (select → stroke style) for asynchronous notifications.

### 4. Annotate failure points
1. Press **T** (text) and add small notes in red near risky steps:
   - “Issuer bank server down → timeout → ‘pending’ status”
   - “Wrong PIN → failure, retry limit”
   - “Network drops after debit → reconciliation; auto-reversal if credit fails”
2. Add a legend box explaining colours and arrow styles.

### 5. Add latency and ownership (bonus)
1. Next to key arrows, add rough timing (“~1–3 s end to end typical”) and owner (“NPCI”, “Bank”).
2. Mark which parts the app company controls vs. depends on. This drives your trade-offs note.

### 6. Export
1. Select everything (**Ctrl/Cmd + A**) to check nothing is outside the frame.
2. Menu → **Export image** → PNG, with **Background** on, scale 2x for sharp text.
3. Also **Save to disk** the `.excalidraw` file so you can edit later.
4. Upload the PNG to your P3 GitHub repo and link it in the README.

## Tips

- **Keyboard shortcuts:** V (select), R (rectangle), O (ellipse), A (arrow), T (text), L (line), Ctrl/Cmd + D (duplicate).
- **Align**: select items → right-click → alignment options.
- **Lock** finished parts (right-click → Lock) so you don’t move them by accident.
- **Keep it readable**: 6–10 boxes, short labels, numbered arrows.
- **Explain it out loud**: if you can walk through the diagram in 3 minutes, you’re ready for the checkpoint.
