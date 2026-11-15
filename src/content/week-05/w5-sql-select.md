---
id: w5-sql-select
title: "SQL: SELECT, WHERE, ORDER BY"
week: 5
estimatedMinutes: 16
tags: [sql, data, analytics]
---

## Why this matters for a PM

PMs who can pull their own numbers make faster, better decisions and earn engineers’ and analysts’ respect. You don’t need to be a data engineer; you need to answer questions like “How many orders were cancelled in Bengaluru last month?” in a few minutes. Many PM interviews include a SQL round or SQL questions. This lesson and the next three get you there, using the built-in SQL Playground.

## Core concepts

### Databases and tables

A **database** stores data in **tables**. A table is like a spreadsheet: **columns** are the fields (user_id, city…) and **rows** are records (one user, one order). **SQL** (Structured Query Language, often pronounced “sequel”) is the language for asking questions of those tables.

The SQL Playground in PM Path’s Toolkit has a synthetic food-delivery dataset (January–June 2025) with six tables:

| Table | One row is… | Key columns |
|---|---|---|
| `users` | a customer | user_id, name, city, signup_date, platform, acquisition_channel, is_premium |
| `restaurants` | a restaurant | restaurant_id, name, city, cuisine, rating, avg_cost_for_two, is_veg_only, onboarded_date |
| `orders` | an order | order_id, user_id, restaurant_id, order_ts, status, payment_method, subtotal, delivery_fee, discount, total, delivery_minutes, coupon_code |
| `order_items` | one line item in an order | order_item_id, order_id, item_name, category, quantity, price |
| `sessions` | an app session | session_id, user_id, session_start, platform, duration_seconds |
| `events` | a tracked action | event_id, user_id, session_id, event_name, event_ts |

Amounts are in rupees. Dates are text in `YYYY-MM-DD` format; timestamps are `YYYY-MM-DD HH:MM:SS`.

### SELECT and FROM: choose columns from a table

```sql
SELECT name, city, platform
FROM users;
```

- `SELECT` lists the columns you want.
- `FROM` names the table.
- `SELECT *` returns all columns. Useful for exploring, but in real work, name the columns you need.
- End statements with `;` (optional in the playground, but good habit).

### LIMIT: look at a few rows

```sql
SELECT * FROM orders LIMIT 10;
```

Always start exploring a new table this way.

### WHERE: filter rows

`WHERE` keeps only rows that match a condition.

```sql
SELECT order_id, total, status
FROM orders
WHERE status = 'cancelled';
```

Comparison operators: `=`, `!=` (or `<>`), `>`, `<`, `>=`, `<=`.
Text values go in **single quotes**: `'Bengaluru'`. Text comparison is case-sensitive for `=` in many databases, so match the exact spelling used in the data.

Combine conditions with `AND`, `OR` and `NOT`. Use brackets to be clear:

```sql
SELECT order_id, total, payment_method
FROM orders
WHERE status = 'delivered'
  AND (payment_method = 'upi' OR payment_method = 'wallet')
  AND total >= 500;
```

Useful helpers:
- `IN` for a list: `WHERE city IN ('Bengaluru', 'Pune')`
- `BETWEEN` for ranges (inclusive): `WHERE total BETWEEN 200 AND 400`
- `LIKE` for text patterns: `%` means “any characters”. `WHERE name LIKE '%Biryani%'` finds names containing “Biryani”.
- `IS NULL` / `IS NOT NULL` for missing values: `WHERE coupon_code IS NOT NULL`. **Never** write `= NULL`; it doesn’t work.

### Filtering dates

Because dates are stored as `YYYY-MM-DD` text, comparisons work in order:

```sql
SELECT order_id, order_ts
FROM orders
WHERE order_ts >= '2025-03-01' AND order_ts < '2025-04-01';
```

This returns all March orders. Using `< '2025-04-01'` (rather than `<= '2025-03-31'`) safely includes times on 31 March.

### ORDER BY: sort results

```sql
SELECT name, rating
FROM restaurants
ORDER BY rating DESC;
```

- `ASC` (ascending, default) or `DESC` (descending).
- Sort by several columns: `ORDER BY city ASC, rating DESC`.

### Aliases and calculated columns

Rename columns with `AS`, and calculate new ones:

```sql
SELECT order_id,
       subtotal,
       discount,
       subtotal - discount AS paid_before_fees
FROM orders
WHERE discount > 0
ORDER BY discount DESC
LIMIT 20;
```

### DISTINCT: unique values

```sql
SELECT DISTINCT cuisine FROM restaurants ORDER BY cuisine;
```

### Order of clauses

SQL clauses must appear in this order: `SELECT` → `FROM` → `WHERE` → `ORDER BY` → `LIMIT`. (Next lessons add `GROUP BY` and `HAVING` between `WHERE` and `ORDER BY`.)

## Worked example

**Question from your manager:** “Which high-rated, affordable restaurants in Bengaluru should we feature in a ‘value picks’ banner?”

Translate to criteria: Bengaluru; rating ≥ 4.2; average cost for two ≤ ₹500. Show the best first.

```sql
SELECT name, cuisine, rating, avg_cost_for_two
FROM restaurants
WHERE city = 'Bengaluru'
  AND rating >= 4.2
  AND avg_cost_for_two <= 500
ORDER BY rating DESC, avg_cost_for_two ASC
LIMIT 10;
```

How to read it: from `restaurants`, keep only Bengaluru rows that are highly rated and affordable, sort by rating (highest first) and then by price (cheapest first), and show the top 10.

**A second question:** “Show me the 15 most recent cancelled UPI orders so I can check them with support.”

```sql
SELECT order_id, user_id, order_ts, total
FROM orders
WHERE status = 'cancelled' AND payment_method = 'upi'
ORDER BY order_ts DESC
LIMIT 15;
```

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 230" role="img" aria-labelledby="sq1-t sq1-d">
<title id="sq1-t">How a SELECT query works</title>
<desc id="sq1-d">A table flows through FROM, then WHERE filters rows, then SELECT picks columns, then ORDER BY sorts, then LIMIT keeps the top rows.</desc>
<defs><marker id="sq1-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<rect x="10" y="70" width="100" height="80" rx="10" class="d-surface d-ink" stroke-width="2"/>
<text x="24" y="104" class="d-text" font-weight="700" font-size="12">FROM</text>
<text x="24" y="124" class="d-text" font-size="11">all rows</text>
<rect x="135" y="70" width="100" height="80" rx="10" class="d-sky d-ink" stroke-width="2"/>
<text x="149" y="104" class="d-text-dark" font-weight="700" font-size="12">WHERE</text>
<text x="149" y="124" class="d-text-dark" font-size="11">keep rows</text>
<rect x="260" y="70" width="100" height="80" rx="10" class="d-lavender d-ink" stroke-width="2"/>
<text x="274" y="104" class="d-text-dark" font-weight="700" font-size="12">SELECT</text>
<text x="274" y="124" class="d-text-dark" font-size="11">pick columns</text>
<rect x="385" y="70" width="110" height="80" rx="10" class="d-butter d-ink" stroke-width="2"/>
<text x="399" y="104" class="d-text-dark" font-weight="700" font-size="12">ORDER BY</text>
<text x="399" y="124" class="d-text-dark" font-size="11">sort</text>
<rect x="520" y="70" width="100" height="80" rx="10" class="d-mint d-ink" stroke-width="2"/>
<text x="534" y="104" class="d-text-dark" font-weight="700" font-size="12">LIMIT</text>
<text x="534" y="124" class="d-text-dark" font-size="11">top N</text>
<g class="d-ink" stroke-width="2"><line x1="112" y1="110" x2="131" y2="110" marker-end="url(#sq1-a)"/><line x1="237" y1="110" x2="256" y2="110" marker-end="url(#sq1-a)"/><line x1="362" y1="110" x2="381" y2="110" marker-end="url(#sq1-a)"/><line x1="497" y1="110" x2="516" y2="110" marker-end="url(#sq1-a)"/></g>
<text x="120" y="190" class="d-text" font-size="12">You write SELECT first, but the database filters before it picks columns.</text>
</svg>
<figcaption>Logical order of execution: FROM → WHERE → SELECT → ORDER BY → LIMIT.</figcaption>
</figure>

## Step by step

How to write any query:

1. **Write the question in plain English**, as precisely as you can.
2. **Find the table** that holds the answer (one row per what?).
3. **Look at the data first**: `SELECT * FROM table LIMIT 10;`. Check exact spellings of values.
4. **Write the filters** (`WHERE`) one at a time, running the query after each.
5. **Choose the columns** you need.
6. **Sort and limit** to make the answer readable.
7. **Sanity-check**: do the numbers look plausible? Spot-check a few rows.
8. **Save the query** with a comment explaining the question: `-- Bengaluru value picks for banner`.

## Common mistakes

1. **Double quotes for text.** Use single quotes: `'Bengaluru'`.
2. **`= NULL`.** Use `IS NULL`.
3. **Wrong value spelling or case** (`'bangalore'` vs. `'Bengaluru'`). Check `SELECT DISTINCT` first.
4. **Mixing AND/OR without brackets**, which changes the logic.
5. **Date ranges that miss the last day** because timestamps include times.
6. **Clauses in the wrong order** (`WHERE` after `ORDER BY`).

## How it shows up in interviews

> [!INTERVIEW]
> **“Write a query to find all delivered orders over ₹1,000 placed with a coupon in May 2025, newest first.”**
> Outline: `SELECT ... FROM orders WHERE status = 'delivered' AND total > 1000 AND coupon_code IS NOT NULL AND order_ts >= '2025-05-01' AND order_ts < '2025-06-01' ORDER BY order_ts DESC;` Talk through each filter aloud.

> [!INTERVIEW]
> **“What’s the difference between WHERE and ORDER BY?”**
> Outline: WHERE filters which rows are included; ORDER BY only sorts the rows that remain.

## Practice exercise

**Task (30 minutes, in the SQL Playground):** Write queries for:
1. All users from Pune who signed up via referral.
2. The 10 most expensive orders (by total) that were refunded.
3. Restaurants whose name contains “Dosa”, sorted by rating.
4. Orders in April 2025 paid by cash on delivery (`cod`) that took more than 45 minutes to deliver.
5. All distinct item categories in `order_items`.

````answer Reveal model answers
```sql
-- 1
SELECT user_id, name, signup_date
FROM users
WHERE city = 'Pune' AND acquisition_channel = 'referral';

-- 2
SELECT order_id, user_id, total, order_ts
FROM orders
WHERE status = 'refunded'
ORDER BY total DESC
LIMIT 10;

-- 3
SELECT name, city, rating
FROM restaurants
WHERE name LIKE '%Dosa%'
ORDER BY rating DESC;

-- 4
SELECT order_id, order_ts, delivery_minutes, total
FROM orders
WHERE payment_method = 'cod'
  AND delivery_minutes > 45
  AND order_ts >= '2025-04-01' AND order_ts < '2025-05-01';

-- 5
SELECT DISTINCT category
FROM order_items
ORDER BY category;
```
````

## Quiz

```quiz
Q: Which query returns only orders placed with UPI?
- [ ] SELECT * FROM orders ORDER BY payment_method = 'upi'; :: ORDER BY sorts; it doesn’t filter.
- [x] SELECT * FROM orders WHERE payment_method = 'upi'; :: Correct. WHERE filters rows.
- [ ] SELECT payment_method = 'upi' FROM orders; :: This returns a true/false column for every row.
- [ ] SELECT * FROM orders LIMIT 'upi'; :: LIMIT takes a number.

Q: How do you find orders with no coupon code?
- [ ] WHERE coupon_code = NULL :: Comparing with = NULL never matches.
- [x] WHERE coupon_code IS NULL :: Correct.
- [ ] WHERE coupon_code = '' :: That matches empty text, not missing values.
- [ ] WHERE NOT coupon_code :: Not reliable for NULL checks.

Q: Which filter correctly captures all orders in March 2025 when order_ts includes times?
- [ ] order_ts BETWEEN '2025-03-01' AND '2025-03-31' :: Misses orders on 31 March after 00:00:00.
- [x] order_ts >= '2025-03-01' AND order_ts < '2025-04-01' :: Correct. Includes all of 31 March.
- [ ] order_ts = '2025-03' :: Exact match won’t work on full timestamps.
- [ ] order_ts LIKE '2025-04%' :: That’s April.

Q: What does `WHERE name LIKE '%Biryani%'` match?
- [ ] Only names exactly equal to “Biryani” :: That would be = 'Biryani'.
- [x] Names containing “Biryani” anywhere :: Correct. % matches any characters.
- [ ] Names starting with “Biryani” only :: That would be 'Biryani%'.
- [ ] Nothing; LIKE needs numbers :: LIKE works on text.

Q: In which order must these clauses appear?
- [ ] SELECT, WHERE, FROM, ORDER BY :: FROM must come before WHERE.
- [x] SELECT, FROM, WHERE, ORDER BY, LIMIT :: Correct.
- [ ] FROM, SELECT, LIMIT, WHERE :: Not valid SQL.
- [ ] SELECT, ORDER BY, WHERE, FROM :: Not valid SQL.

Q: Why check `SELECT DISTINCT city FROM users` before filtering by city?
- [ ] It’s required syntax :: It isn’t required.
- [x] To see the exact spellings used, so your WHERE clause matches :: Correct.
- [ ] It speeds up later queries :: Not meaningfully.
- [ ] To delete duplicates :: SELECT never deletes data.
```

## Key takeaways

- `SELECT` picks columns, `FROM` picks the table, `WHERE` filters rows, `ORDER BY` sorts, `LIMIT` caps rows.
- Text in **single quotes**; use `IN`, `BETWEEN`, `LIKE`, and **`IS NULL`** (never `= NULL`).
- Filter dates with **`>= start AND < next_start`** to include whole days.
- Always **explore first** (`LIMIT 10`, `DISTINCT`) and **sanity-check** results.
- Write the **question in plain English** before writing SQL.
