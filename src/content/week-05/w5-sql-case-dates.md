---
id: w5-sql-case-dates
title: "SQL: CASE and date functions"
week: 5
estimatedMinutes: 16
tags: [sql, data, analytics]
---

## Why this matters for a PM

Two things turn basic SQL into PM-grade analysis: **CASE**, which lets you create your own categories (“new vs. returning”, “fast vs. slow delivery”), and **date functions**, which let you group by day, week or month and build cohorts and funnels. With these, you can answer almost any product question yourself, including the funnel queries in this week’s deliverable.

## Core concepts

### CASE: if-then logic inside a query

`CASE` returns different values depending on conditions:

```sql
SELECT order_id,
       delivery_minutes,
       CASE
         WHEN delivery_minutes IS NULL THEN 'not delivered'
         WHEN delivery_minutes <= 30 THEN 'fast'
         WHEN delivery_minutes <= 45 THEN 'ok'
         ELSE 'slow'
       END AS delivery_bucket
FROM orders;
```

- Conditions are checked **top to bottom**; the first true one wins. So order matters.
- `ELSE` catches everything else. Without it, unmatched rows get `NULL`.
- `END AS name` gives the new column a name.

### CASE inside aggregates: conditional counting

This is the PM superpower. Count or sum only rows that meet a condition, side by side:

```sql
SELECT payment_method,
       COUNT(*) AS orders,
       SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled,
       SUM(CASE WHEN status = 'delivered' THEN total ELSE 0 END) AS delivered_value
FROM orders
GROUP BY payment_method;
```

This is how you build funnels in one query (see below), compare segments, and compute rates portably:
`ROUND(100.0 * SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) / COUNT(*), 1) AS cancel_pct`.

### Grouping by a CASE

```sql
SELECT CASE WHEN total >= 500 THEN 'large' ELSE 'small' END AS basket,
       COUNT(*) AS orders,
       ROUND(AVG(delivery_minutes), 1) AS avg_minutes
FROM orders
WHERE status = 'delivered'
GROUP BY basket;
```

(SQLite allows grouping by the alias; some databases require repeating the CASE expression in GROUP BY.)

### Dates in SQLite

The playground uses **SQLite**, which stores dates as text (`'2025-03-14'`, `'2025-03-14 19:42:10'`). Useful functions:

- `date(ts)`: just the date part: `date('2025-03-14 19:42:10')` → `'2025-03-14'`.
- `strftime(format, ts)`: format a date. Common formats:
  - `strftime('%Y-%m', ts)` → `'2025-03'` (month)
  - `strftime('%W', ts)` → week number of the year (`'00'`–`'53'`, weeks start Monday)
  - `strftime('%w', ts)` → day of week (`'0'` = Sunday … `'6'` = Saturday)
  - `strftime('%H', ts)` → hour (`'00'`–`'23'`)
- `julianday(a) - julianday(b)`: number of days between two dates (a decimal).
- `date(ts, '+7 days')`, `date(ts, 'start of month')`: date arithmetic.
- `substr(ts, 1, 7)`: a quick way to get `'YYYY-MM'` from text.

Other databases (BigQuery, PostgreSQL, MySQL) use different names (`DATE_TRUNC`, `EXTRACT`, `DATE_DIFF`), but the ideas are the same. When you use BigQuery this week, check its date functions in the tool guide.

### Time series

Group by a date part to see trends:

```sql
SELECT strftime('%Y-%m', order_ts) AS month,
       COUNT(*) AS orders,
       COUNT(DISTINCT user_id) AS customers
FROM orders
WHERE status = 'delivered'
GROUP BY month
ORDER BY month;
```

### Days since sign-up (for activation and cohorts)

```sql
SELECT u.user_id,
       u.signup_date,
       MIN(o.order_ts) AS first_order_ts,
       julianday(MIN(o.order_ts)) - julianday(u.signup_date) AS days_to_first_order
FROM users u
JOIN orders o ON o.user_id = u.user_id
GROUP BY u.user_id, u.signup_date;
```

Wrap it to compute an activation rate (“first order within 7 days of sign-up”):

```sql
SELECT ROUND(100.0 * AVG(CASE WHEN days_to_first <= 7 THEN 1 ELSE 0 END), 1) AS activated_pct
FROM (
  SELECT u.user_id,
         julianday(MIN(o.order_ts)) - julianday(u.signup_date) AS days_to_first
  FROM users u
  LEFT JOIN orders o ON o.user_id = u.user_id
  GROUP BY u.user_id
);
```

The inner query in brackets is a **subquery**: a query whose result is used like a table. Users with no orders get `NULL` days, which the CASE treats as not activated.

### A funnel in one query

Using the `events` table and conditional counting of distinct users:

```sql
SELECT
  COUNT(DISTINCT CASE WHEN event_name = 'app_open'         THEN user_id END) AS opened,
  COUNT(DISTINCT CASE WHEN event_name = 'view_restaurant'  THEN user_id END) AS viewed,
  COUNT(DISTINCT CASE WHEN event_name = 'add_to_cart'      THEN user_id END) AS added,
  COUNT(DISTINCT CASE WHEN event_name = 'checkout_start'   THEN user_id END) AS checkout,
  COUNT(DISTINCT CASE WHEN event_name = 'payment_success'  THEN user_id END) AS paid
FROM events
WHERE event_ts >= '2025-05-01' AND event_ts < '2025-06-01';
```

`CASE … THEN user_id END` returns the user_id only for matching events (NULL otherwise), and `COUNT(DISTINCT …)` ignores NULLs. This simple version counts users who did each step at any point in the month; a strict funnel would also require steps to happen in order, which needs more advanced SQL.

## Worked example

**Question:** “Do late-night orders (after 10 p.m.) get delivered slower, and on which weekdays is the gap worst?”

```sql
SELECT CASE strftime('%w', order_ts)
         WHEN '0' THEN 'Sun' WHEN '1' THEN 'Mon' WHEN '2' THEN 'Tue'
         WHEN '3' THEN 'Wed' WHEN '4' THEN 'Thu' WHEN '5' THEN 'Fri'
         ELSE 'Sat' END AS weekday,
       ROUND(AVG(CASE WHEN CAST(strftime('%H', order_ts) AS INTEGER) >= 22
                      THEN delivery_minutes END), 1) AS late_night_avg,
       ROUND(AVG(CASE WHEN CAST(strftime('%H', order_ts) AS INTEGER) < 22
                      THEN delivery_minutes END), 1) AS other_avg
FROM orders
WHERE status = 'delivered'
GROUP BY strftime('%w', order_ts)
ORDER BY strftime('%w', order_ts);
```

Notes:
- `CAST(… AS INTEGER)` turns the hour text into a number so `>= 22` compares numerically.
- `AVG(CASE WHEN … THEN delivery_minutes END)` averages only matching rows (others are NULL and ignored).

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 210" role="img" aria-labelledby="cs-t cs-d">
<title id="cs-t">CASE as a sorting machine</title>
<desc id="cs-d">Rows enter a CASE block with three conditions checked top to bottom and come out labelled fast, ok or slow.</desc>
<defs><marker id="cs-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<rect x="20" y="70" width="130" height="70" rx="10" class="d-surface d-ink" stroke-width="2"/>
<text x="34" y="100" class="d-text" font-size="12" font-weight="700">order rows</text>
<text x="34" y="120" class="d-text" font-size="11">delivery_minutes</text>
<rect x="190" y="20" width="230" height="170" rx="10" class="d-lavender d-ink" stroke-width="2"/>
<text x="206" y="46" class="d-text-dark" font-weight="700">CASE (top to bottom)</text>
<text x="206" y="76" class="d-text-dark" font-size="12">WHEN ≤ 30 → 'fast'</text>
<text x="206" y="104" class="d-text-dark" font-size="12">WHEN ≤ 45 → 'ok'</text>
<text x="206" y="132" class="d-text-dark" font-size="12">ELSE → 'slow'</text>
<text x="206" y="168" class="d-text-dark" font-size="11">first true condition wins</text>
<line x1="152" y1="105" x2="186" y2="105" class="d-ink" stroke-width="2" marker-end="url(#cs-a)"/>
<line x1="422" y1="70" x2="470" y2="50" class="d-ink" stroke-width="2" marker-end="url(#cs-a)"/>
<line x1="422" y1="105" x2="470" y2="105" class="d-ink" stroke-width="2" marker-end="url(#cs-a)"/>
<line x1="422" y1="140" x2="470" y2="160" class="d-ink" stroke-width="2" marker-end="url(#cs-a)"/>
<rect x="475" y="30" width="110" height="36" rx="8" class="d-mint d-ink" stroke-width="2"/><text x="508" y="54" class="d-text-dark" font-weight="700">fast</text>
<rect x="475" y="88" width="110" height="36" rx="8" class="d-butter d-ink" stroke-width="2"/><text x="514" y="112" class="d-text-dark" font-weight="700">ok</text>
<rect x="475" y="146" width="110" height="36" rx="8" class="d-pink d-ink" stroke-width="2"/><text x="508" y="170" class="d-text-dark" font-weight="700">slow</text>
</svg>
<figcaption>CASE creates your own categories; combine it with GROUP BY and aggregates for segment analysis.</figcaption>
</figure>

## Step by step

Writing your 5 funnel queries (deliverable):

1. **Define the funnel steps** using `events.event_name` values (check with `SELECT DISTINCT event_name FROM events;`).
2. **Pick a time window** and filter `event_ts`.
3. **Count distinct users per step** with `COUNT(DISTINCT CASE WHEN … THEN user_id END)`.
4. **Compute step conversion**: wrap the query as a subquery and divide (`ROUND(100.0 * added / viewed, 1)`).
5. **Segment the funnel**: join `users` and `GROUP BY u.platform` (query 2) and `u.city` (query 3).
6. **Trend it**: group by `strftime('%Y-%m', event_ts)` (query 4).
7. **New vs. returning**: CASE on whether the event date is within 7 days of `signup_date` (query 5).
8. **Save all five** with comments in a doc or the playground notes.

## Common mistakes

1. **CASE conditions in the wrong order** (a broad condition first swallows narrower ones).
2. **Forgetting ELSE**, leaving NULLs that disappear from counts.
3. **Comparing text hours or weekdays as numbers** without CAST.
4. **Using the wrong date function for the database** (SQLite vs. BigQuery).
5. **Counting events instead of distinct users** in funnels.
6. **Not filtering the time window**, mixing months with different user volumes.

## How it shows up in interviews

> [!INTERVIEW]
> **“Write a query for the weekly cancellation rate trend.”**
> Outline: group by `strftime('%Y-%W', order_ts)` → `COUNT(*)` and `SUM(CASE WHEN status='cancelled' THEN 1 ELSE 0 END)` → rate with 100.0 → order by week. Mention checking small weeks at the edges.

> [!INTERVIEW]
> **“How would you compute the % of new users who order within 7 days of signing up?”**
> Outline: users LEFT JOIN orders → MIN(order_ts) per user → julianday difference → CASE ≤ 7 → AVG ×100. Mention LEFT JOIN so non-orderers count in the denominator.

## Practice exercise

**Task (35 minutes, in the SQL Playground):**
1. Bucket delivered orders by total into `'<₹300'`, `'₹300–599'`, `'₹600+'` and count each.
2. Monthly orders and cancellation rate (%), January–June.
3. Orders by hour of day; which hour is busiest?
4. % of users who placed their first order within 7 days of sign-up, by acquisition channel.
5. A 4-step funnel (view_restaurant → add_to_cart → checkout_start → payment_success) by platform, with each step’s count of distinct users.

````answer Reveal model answers
```sql
-- 1
SELECT CASE WHEN total < 300 THEN '<₹300'
            WHEN total < 600 THEN '₹300–599'
            ELSE '₹600+' END AS bucket,
       COUNT(*) AS orders
FROM orders
WHERE status = 'delivered'
GROUP BY bucket;

-- 2
SELECT strftime('%Y-%m', order_ts) AS month,
       COUNT(*) AS orders,
       ROUND(100.0 * SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) / COUNT(*), 1) AS cancel_pct
FROM orders
GROUP BY month
ORDER BY month;

-- 3
SELECT CAST(strftime('%H', order_ts) AS INTEGER) AS hour, COUNT(*) AS orders
FROM orders
GROUP BY hour
ORDER BY orders DESC;

-- 4
SELECT acquisition_channel,
       ROUND(100.0 * AVG(CASE WHEN days_to_first <= 7 THEN 1 ELSE 0 END), 1) AS activated_7d_pct
FROM (
  SELECT u.user_id, u.acquisition_channel,
         julianday(MIN(o.order_ts)) - julianday(u.signup_date) AS days_to_first
  FROM users u
  LEFT JOIN orders o ON o.user_id = u.user_id
  GROUP BY u.user_id, u.acquisition_channel
)
GROUP BY acquisition_channel
ORDER BY activated_7d_pct DESC;

-- 5
SELECT u.platform,
  COUNT(DISTINCT CASE WHEN e.event_name = 'view_restaurant' THEN e.user_id END) AS viewed,
  COUNT(DISTINCT CASE WHEN e.event_name = 'add_to_cart'     THEN e.user_id END) AS added,
  COUNT(DISTINCT CASE WHEN e.event_name = 'checkout_start'  THEN e.user_id END) AS checkout,
  COUNT(DISTINCT CASE WHEN e.event_name = 'payment_success' THEN e.user_id END) AS paid
FROM events e
JOIN users u ON u.user_id = e.user_id
GROUP BY u.platform;
```
````

## Quiz

```quiz
Q: In a CASE expression, which condition is used when several are true?
- [ ] The last true one :: CASE stops at the first true condition.
- [x] The first true one, checked top to bottom :: Correct. Order your conditions carefully.
- [ ] All of them, combined :: CASE returns one value.
- [ ] A random one :: CASE is deterministic.

Q: What does `SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END)` compute?
- [ ] Total order value :: It adds 1s and 0s, not values.
- [x] The number of cancelled orders :: Correct. Each cancelled row adds 1 and every other row adds 0, so the sum is the count.
- [ ] The cancellation rate :: Divide by COUNT(*) for the rate.
- [ ] The number of statuses :: Not what it does.

Q: In SQLite, how do you get the month (like '2025-03') from order_ts?
- [ ] MONTH(order_ts) :: Not a SQLite function.
- [x] strftime('%Y-%m', order_ts) :: Correct. substr(order_ts, 1, 7) also works.
- [ ] DATE_TRUNC('month', order_ts) :: That’s PostgreSQL/BigQuery style.
- [ ] order_ts / 12 :: Not valid: dividing a text timestamp by 12 doesn’t produce a month.

Q: Why use LEFT JOIN when calculating “% of users who ordered within 7 days”?
- [ ] It’s faster :: Not the reason.
- [x] So users who never ordered stay in the denominator :: Correct. INNER JOIN would drop them and inflate the rate.
- [ ] Because INNER JOIN doesn’t work with dates :: INNER JOIN works with dates; the problem is it drops non-ordering users.
- [ ] It isn’t necessary :: It is, for a correct rate.

Q: Why `CAST(strftime('%H', order_ts) AS INTEGER) >= 22` instead of comparing the text?
- [ ] CAST makes it faster :: Not the point.
- [x] To compare hours as numbers rather than text :: Correct. It avoids surprises in text comparison.
- [ ] strftime returns a date :: It returns text.
- [ ] It’s required syntax :: It’s a safety practice.

Q: In a funnel query, why use COUNT(DISTINCT CASE WHEN … THEN user_id END)?
- [ ] To count events :: That would over-count repeat actions.
- [x] To count unique users who did each step :: Correct. NULLs from the CASE are ignored.
- [ ] To remove the WHERE clause :: Unrelated: the CASE trick is about counting, not filtering.
- [ ] To sort steps :: Unrelated: sorting is done by ORDER BY, not by COUNT(DISTINCT …).
```

## Key takeaways

- **CASE** creates your own categories; conditions are checked **top to bottom**.
- **Conditional aggregation** (`SUM/COUNT` with CASE) builds side-by-side comparisons and funnels in one query.
- SQLite dates: `date()`, `strftime()`, `julianday()`; other databases use different names for the same ideas.
- Use **LEFT JOIN + subqueries** for activation rates so non-actors stay in the denominator.
- Count **distinct users** per funnel step, within a **fixed time window**.
