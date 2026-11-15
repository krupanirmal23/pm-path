---
id: w5-sql-groupby
title: "SQL: GROUP BY and aggregates"
week: 5
estimatedMinutes: 15
tags: [sql, data, analytics]
---

## Why this matters for a PM

Most PM questions aren’t about single rows; they’re about totals, averages and comparisons. “How many orders per city?” “What’s the average delivery time by payment method?” “Which cuisines have the highest cancellation rate?” `GROUP BY` and aggregate functions answer all of these. This is the most-used SQL skill for PMs.

## Core concepts

### Aggregate functions

An **aggregate function** turns many rows into one value:

- `COUNT(*)`: number of rows.
- `COUNT(column)`: number of rows where that column is **not NULL**.
- `COUNT(DISTINCT column)`: number of unique non-NULL values.
- `SUM(column)`: total.
- `AVG(column)`: average (ignores NULLs).
- `MIN(column)`, `MAX(column)`: smallest and largest.

Without `GROUP BY`, an aggregate returns one row for the whole (filtered) table:

```sql
SELECT COUNT(*) AS orders,
       SUM(total) AS gross_value,
       AVG(total) AS avg_order_value
FROM orders
WHERE status = 'delivered';
```

### GROUP BY: one result row per group

`GROUP BY` splits rows into groups that share a value, then applies aggregates to each group.

```sql
SELECT payment_method,
       COUNT(*) AS orders,
       ROUND(AVG(total), 0) AS avg_total
FROM orders
WHERE status = 'delivered'
GROUP BY payment_method
ORDER BY orders DESC;
```

Result: one row per payment method with its order count and average total.

**Rule:** every column in `SELECT` must either be in `GROUP BY` or be inside an aggregate function. Selecting `order_id` here would make no sense (which order_id would represent “upi”?).

### Grouping by several columns

```sql
SELECT status, payment_method, COUNT(*) AS orders
FROM orders
GROUP BY status, payment_method
ORDER BY status, orders DESC;
```

One row per (status, payment_method) combination.

### HAVING: filter groups

`WHERE` filters **rows before** grouping. `HAVING` filters **groups after** aggregation.

```sql
SELECT restaurant_id, COUNT(*) AS orders
FROM orders
WHERE status = 'delivered'
GROUP BY restaurant_id
HAVING COUNT(*) >= 30
ORDER BY orders DESC;
```

“Restaurants with at least 30 delivered orders.” You can’t put `COUNT(*) >= 30` in `WHERE`, because the count doesn’t exist until rows are grouped.

### Rates and percentages

PMs constantly need rates. A neat trick: in SQLite (and many databases), a true/false comparison returns 1 or 0, so `AVG(condition)` gives the share of rows where it’s true.

```sql
SELECT payment_method,
       COUNT(*) AS orders,
       ROUND(100.0 * AVG(status = 'cancelled'), 1) AS cancel_rate_pct
FROM orders
GROUP BY payment_method
ORDER BY cancel_rate_pct DESC;
```

Note `100.0` (not `100`): mixing in a decimal avoids **integer division**, where `3 / 4` returns `0` in some databases. A portable alternative: `SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) * 1.0 / COUNT(*)` (CASE comes in the next-but-one lesson).

### ROUND

`ROUND(value, digits)`: `ROUND(AVG(total), 2)` rounds to 2 decimal places.

### Full clause order

```
SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT …
```

Logical execution order: FROM → WHERE → GROUP BY → aggregates → HAVING → SELECT → ORDER BY → LIMIT.

### COUNT gotchas

- `COUNT(*)` counts rows; `COUNT(coupon_code)` counts rows with a coupon (non-NULL).
- To count **users** (not orders), use `COUNT(DISTINCT user_id)`. This matters for funnels and active-user metrics.
- `AVG(delivery_minutes)` ignores cancelled orders where `delivery_minutes` is NULL, which is usually what you want, but be aware of it.

## Worked example

**Question:** “Is cash on delivery worse for us? Compare payment methods on order volume, average value, cancellation rate and delivery time.”

```sql
SELECT payment_method,
       COUNT(*) AS orders,
       COUNT(DISTINCT user_id) AS customers,
       ROUND(AVG(total), 0) AS avg_total,
       ROUND(100.0 * AVG(status = 'cancelled'), 1) AS cancel_pct,
       ROUND(AVG(delivery_minutes), 1) AS avg_delivery_min
FROM orders
GROUP BY payment_method
ORDER BY orders DESC;
```

How to read the result (example pattern you might see): COD has a noticeably higher cancellation rate than UPI. Average totals are similar. Delivery times are similar.

**Follow-up question:** “Is that true in every city?”

```sql
SELECT u.city,
       o.payment_method,
       COUNT(*) AS orders,
       ROUND(100.0 * AVG(o.status = 'cancelled'), 1) AS cancel_pct
FROM orders o
JOIN users u ON u.user_id = o.user_id
GROUP BY u.city, o.payment_method
HAVING COUNT(*) >= 20
ORDER BY u.city, cancel_pct DESC;
```

(This uses a JOIN, covered in the next lesson. `HAVING COUNT(*) >= 20` hides tiny groups whose rates would be noisy.)

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 220" role="img" aria-labelledby="gb-t gb-d">
<title id="gb-t">GROUP BY collapses rows into groups</title>
<desc id="gb-d">On the left, order rows coloured by payment method; on the right, one summary row per payment method with a count.</desc>
<defs><marker id="gb-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<g class="d-ink" stroke-width="1.5">
<rect x="20" y="20" width="200" height="24" class="d-sky"/><rect x="20" y="46" width="200" height="24" class="d-butter"/><rect x="20" y="72" width="200" height="24" class="d-sky"/><rect x="20" y="98" width="200" height="24" class="d-pink"/><rect x="20" y="124" width="200" height="24" class="d-sky"/><rect x="20" y="150" width="200" height="24" class="d-butter"/><rect x="20" y="176" width="200" height="24" class="d-pink"/>
</g>
<text x="30" y="37" class="d-text-dark" font-size="11">#101 upi ₹420</text><text x="30" y="63" class="d-text-dark" font-size="11">#102 cod ₹310</text><text x="30" y="89" class="d-text-dark" font-size="11">#103 upi ₹560</text><text x="30" y="115" class="d-text-dark" font-size="11">#104 card ₹890</text><text x="30" y="141" class="d-text-dark" font-size="11">#105 upi ₹250</text><text x="30" y="167" class="d-text-dark" font-size="11">#106 cod ₹380</text><text x="30" y="193" class="d-text-dark" font-size="11">#107 card ₹640</text>
<line x1="235" y1="110" x2="330" y2="110" class="d-ink" stroke-width="3" marker-end="url(#gb-a)"/>
<text x="240" y="100" class="d-text" font-size="11">GROUP BY method</text>
<g class="d-ink" stroke-width="2"><rect x="345" y="50" width="270" height="34" class="d-sky"/><rect x="345" y="94" width="270" height="34" class="d-butter"/><rect x="345" y="138" width="270" height="34" class="d-pink"/></g>
<text x="358" y="72" class="d-text-dark" font-size="12">upi · 3 orders · avg ₹410</text>
<text x="358" y="116" class="d-text-dark" font-size="12">cod · 2 orders · avg ₹345</text>
<text x="358" y="160" class="d-text-dark" font-size="12">card · 2 orders · avg ₹765</text>
</svg>
<figcaption>Many rows in, one row per group out, with aggregates calculated for each group.</figcaption>
</figure>

## Step by step

1. **Write the question** and identify the **grouping** (“per city”, “by month”, “for each restaurant”).
2. **Pick the measures**: counts, sums, averages, rates.
3. **Decide what you’re counting**: rows (orders) or distinct users?
4. **Write `WHERE`** filters for rows (date range, status).
5. **Add `GROUP BY`** with the grouping columns, and include them in `SELECT`.
6. **Add `HAVING`** to drop tiny or irrelevant groups.
7. **Sort** by the most useful measure.
8. **Sanity-check**: do group totals add up to the overall total (run the query without `GROUP BY`)?

## Common mistakes

1. **Selecting a non-grouped, non-aggregated column.** Some databases error; SQLite silently returns an arbitrary value, which is worse.
2. **Using `WHERE` for aggregate conditions.** Use `HAVING`.
3. **Integer division** giving 0 for rates. Multiply by `100.0` or `1.0`.
4. **Counting orders when you meant users.** Use `COUNT(DISTINCT user_id)`.
5. **Ignoring tiny groups** whose rates are noise. Filter with `HAVING COUNT(*) >= N`.
6. **Forgetting that `AVG` ignores NULLs**, which can bias averages if NULLs mean something.

## How it shows up in interviews

> [!INTERVIEW]
> **“Find the top 5 cuisines by number of delivered orders in Q2 2025.”**
> Outline: needs restaurants and orders joined → filter delivered and date range → GROUP BY cuisine → COUNT(*) → ORDER BY DESC → LIMIT 5. Say “I’d check distinct cuisine spellings first”.

> [!INTERVIEW]
> **“What’s the difference between WHERE and HAVING?”**
> Outline: WHERE filters rows before grouping; HAVING filters groups after aggregation. Example with COUNT(*).

## Practice exercise

**Task (30 minutes, in the SQL Playground):**
1. Count users by acquisition channel, highest first.
2. For each city in `restaurants`, the number of restaurants and their average rating (1 decimal).
3. Average delivery time by payment method for delivered orders only.
4. Restaurants (by restaurant_id) with a cancellation rate above 15% and at least 20 orders.
5. Number of distinct customers who ordered each month (use `substr(order_ts, 1, 7)` for the month).

````answer Reveal model answers
```sql
-- 1
SELECT acquisition_channel, COUNT(*) AS users
FROM users
GROUP BY acquisition_channel
ORDER BY users DESC;

-- 2
SELECT city, COUNT(*) AS restaurants, ROUND(AVG(rating), 1) AS avg_rating
FROM restaurants
GROUP BY city
ORDER BY restaurants DESC;

-- 3
SELECT payment_method, ROUND(AVG(delivery_minutes), 1) AS avg_minutes
FROM orders
WHERE status = 'delivered'
GROUP BY payment_method;

-- 4
SELECT restaurant_id,
       COUNT(*) AS orders,
       ROUND(100.0 * AVG(status = 'cancelled'), 1) AS cancel_pct
FROM orders
GROUP BY restaurant_id
HAVING COUNT(*) >= 20 AND AVG(status = 'cancelled') > 0.15
ORDER BY cancel_pct DESC;

-- 5
SELECT substr(order_ts, 1, 7) AS month,
       COUNT(DISTINCT user_id) AS customers
FROM orders
GROUP BY month
ORDER BY month;
```
````

## Quiz

```quiz
Q: What does `COUNT(DISTINCT user_id)` return?
- [ ] The number of orders :: That would be COUNT(*).
- [x] The number of unique users :: Correct. DISTINCT removes duplicate user_ids before counting.
- [ ] The largest user_id :: That would be MAX(user_id).
- [ ] The number of NULL user_ids :: Not what it counts.

Q: You want restaurants with more than 50 orders. Where does `COUNT(*) > 50` go?
- [ ] WHERE :: WHERE runs before grouping; the count doesn’t exist yet.
- [x] HAVING :: Correct. HAVING filters groups after aggregation.
- [ ] ORDER BY :: ORDER BY sorts; it doesn’t filter.
- [ ] SELECT :: Putting it in SELECT returns a true/false column, not a filter.

Q: Why write `100.0 * AVG(status = 'cancelled')` instead of `100 * …`?
- [ ] 100.0 is more precise for display :: Partly, but the main reason is avoiding integer division in rate calculations.
- [x] To make sure the calculation uses decimals rather than integer division :: Correct. Integer division can turn rates into 0.
- [ ] Because AVG requires decimals :: Not a requirement.
- [ ] It doesn’t matter in any database :: It matters in many databases.

Q: Which query is invalid (or unreliable) SQL?
- [ ] SELECT city, COUNT(*) FROM users GROUP BY city :: Valid: city is grouped and COUNT(*) is an aggregate.
- [x] SELECT city, name, COUNT(*) FROM users GROUP BY city :: Correct. `name` isn’t grouped or aggregated.
- [ ] SELECT COUNT(*) FROM users :: Valid: an aggregate over the whole table needs no GROUP BY.
- [ ] SELECT city, platform, COUNT(*) FROM users GROUP BY city, platform :: Valid: both selected columns are in GROUP BY.

Q: `AVG(delivery_minutes)` when cancelled orders have NULL delivery_minutes:
- [ ] Treats NULLs as 0 :: AVG ignores NULLs.
- [x] Ignores the NULL rows and averages the rest :: Correct. AVG skips NULLs, so cancelled orders don’t drag the average to zero.
- [ ] Returns NULL for the whole result :: Only if all values are NULL.
- [ ] Throws an error :: It doesn’t error; AVG simply skips NULL values.

Q: What’s the logical order of execution?
- [ ] SELECT → FROM → WHERE → GROUP BY :: SELECT is evaluated later.
- [x] FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY :: Correct. That’s why you can’t use a SELECT alias in WHERE in most databases.
- [ ] GROUP BY → WHERE → FROM → SELECT :: Not valid: FROM must come first, and WHERE runs before GROUP BY.
- [ ] WHERE → HAVING → GROUP BY → FROM :: Not valid: HAVING filters groups, so it must come after GROUP BY.
```

## Key takeaways

- Aggregates (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) collapse rows into values.
- `GROUP BY` gives **one row per group**; every selected column must be grouped or aggregated.
- **`WHERE` filters rows; `HAVING` filters groups.**
- Use **`COUNT(DISTINCT user_id)`** for users, and **`100.0 * AVG(condition)`** for rates.
- Drop **tiny groups** with `HAVING` and sanity-check that groups add up to the total.
