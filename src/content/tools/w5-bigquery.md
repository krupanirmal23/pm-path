---
id: w5-bigquery
title: "BigQuery sandbox: query real e-commerce data"
week: 5
estimatedMinutes: 10
tags: [tool, bigquery, sql]
---

## What it is

**BigQuery** is Google Cloud’s data warehouse: a database designed to query very large datasets quickly with SQL. The **BigQuery sandbox** lets you use it for free, without a credit card, within monthly limits.

## Why PMs use it

Many companies store their product analytics in a data warehouse like BigQuery, Snowflake or Redshift. Querying a real, messy event dataset teaches you things a clean practice dataset can’t: nested fields, huge tables, cost awareness and real event names. Google publishes a free **GA4 sample e-commerce dataset** (from the Google Merchandise Store) that’s perfect practice.

## Account setup (free sandbox)

1. Go to console.cloud.google.com/bigquery and sign in with your Google account.
2. If prompted, accept the terms and create a project (e.g., `pm-path-sandbox`). You do **not** need to enable billing. The page will show “Sandbox” near the top.
3. Sandbox limits (check the BigQuery sandbox documentation for current numbers): a monthly free query allowance and storage limits, and tables you create expire after a set number of days. Querying public datasets counts toward your free query allowance, so write careful queries.

## Walkthrough: 5 funnel queries on GA4 sample data

### 1. Find the dataset
1. In the query editor, paste and run:
```sql
SELECT event_name, COUNT(*) AS events
FROM `bigquery-public-data.ga4_obfuscated_sample_ecommerce.events_20210131`
GROUP BY event_name
ORDER BY events DESC;
```
2. This queries one day’s table. The dataset has one table per day (`events_YYYYMMDD`) for a few months around late 2020–early 2021.

### 2. Check the cost before running
1. Before clicking **Run**, look at the top-right of the editor: it shows “This query will process X MB”. Keep queries to a single day or a few days while learning.
2. Querying `events_*` (all days) processes much more data. Use a filter on `_TABLE_SUFFIX` to limit days:
```sql
FROM `bigquery-public-data.ga4_obfuscated_sample_ecommerce.events_*`
WHERE _TABLE_SUFFIX BETWEEN '20210101' AND '20210107'
```

### 3. Understand the structure
- Each row is an **event** with `event_name`, `event_timestamp` (microseconds), `user_pseudo_id` (anonymous user id), `device.category`, `geo.country` and more.
- `event_params` is a **nested, repeated field** (a list of key/value pairs). You don’t need it for basic funnels.

### 4. Query 1: an e-commerce funnel for one week
```sql
SELECT
  COUNT(DISTINCT IF(event_name = 'view_item',       user_pseudo_id, NULL)) AS viewed_item,
  COUNT(DISTINCT IF(event_name = 'add_to_cart',     user_pseudo_id, NULL)) AS added_to_cart,
  COUNT(DISTINCT IF(event_name = 'begin_checkout',  user_pseudo_id, NULL)) AS began_checkout,
  COUNT(DISTINCT IF(event_name = 'purchase',        user_pseudo_id, NULL)) AS purchased
FROM `bigquery-public-data.ga4_obfuscated_sample_ecommerce.events_*`
WHERE _TABLE_SUFFIX BETWEEN '20210101' AND '20210107';
```
`IF(condition, value, NULL)` is BigQuery’s short form of `CASE WHEN … THEN … END`.

### 5. Query 2: funnel by device
Add `device.category AS device` to SELECT and `GROUP BY device`.

### 6. Query 3: daily purchasers trend
```sql
SELECT PARSE_DATE('%Y%m%d', event_date) AS day,
       COUNT(DISTINCT user_pseudo_id) AS purchasers
FROM `bigquery-public-data.ga4_obfuscated_sample_ecommerce.events_*`
WHERE _TABLE_SUFFIX BETWEEN '20210101' AND '20210131'
  AND event_name = 'purchase'
GROUP BY day
ORDER BY day;
```

### 7. Query 4: funnel by country (top 5 countries by viewers)
Group by `geo.country`, order by `viewed_item DESC`, `LIMIT 5`.

### 8. Query 5: conversion rates
Wrap query 1 as a subquery and compute `ROUND(100 * added_to_cart / viewed_item, 1)` etc. (BigQuery division returns decimals.)

### 9. Save and share
1. Click **Save → Save query** for each, with a clear name (“Funnel by device – Jan W1”).
2. Copy results into your Google Sheets “Funnel – actual” tab and note the dataset and date range.
3. Screenshot the queries and results for your deliverable.

## Tips

- **SQLite vs. BigQuery**: BigQuery uses `IF()`, `DATE_TRUNC()`, `PARSE_DATE()`, `TIMESTAMP_MICROS()`; SQLite uses `CASE`, `strftime()`, `julianday()`.
- **Always preview bytes processed** and filter dates with `_TABLE_SUFFIX`.
- **Use the “Preview” tab** on a table (click the table name in the Explorer) to see rows for free.
- **Backticks** wrap full table names in BigQuery: `` `project.dataset.table` ``.
- **Don’t enable billing** for this roadmap; the sandbox is enough.
