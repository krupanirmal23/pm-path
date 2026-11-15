---
id: w5-sql-joins
title: "SQL: JOINs"
week: 5
estimatedMinutes: 16
tags: [sql, data, analytics]
---

## Why this matters for a PM

Real questions span tables: “Which **cities** have the most **cancelled orders**?” needs users and orders. “Which **cuisines** sell the most **desserts**?” needs restaurants, orders and order items. **JOINs** combine tables. Your Week 5 checkpoint is a 3-table JOIN with GROUP BY in under 10 minutes, so this is the lesson to practise most.

## Core concepts

### Keys

Tables connect through **keys**:
- A **primary key** uniquely identifies each row in a table: `users.user_id`, `orders.order_id`.
- A **foreign key** is a column that points to another table’s primary key: `orders.user_id` points to `users.user_id`; `orders.restaurant_id` points to `restaurants.restaurant_id`; `order_items.order_id` points to `orders.order_id`.

In the playground dataset:

```
users (user_id) ─< orders (user_id, restaurant_id) >─ restaurants (restaurant_id)
                     │
                     └─< order_items (order_id)
users (user_id) ─< sessions (user_id) ─< events (session_id)
```

“─<” means one-to-many: one user has many orders.

### INNER JOIN

An **INNER JOIN** returns rows where the key matches in both tables.

```sql
SELECT o.order_id, o.total, u.city
FROM orders o
JOIN users u ON u.user_id = o.user_id;
```

- `JOIN` on its own means `INNER JOIN`.
- `o` and `u` are **table aliases**: short names to keep queries readable. Prefix columns with the alias to avoid confusion when both tables have a column with the same name.
- `ON` states how rows match.

### LEFT JOIN

A **LEFT JOIN** returns **all rows from the left table**, plus matching rows from the right table. Where there’s no match, right-side columns are `NULL`.

Use it when you want to keep everything on one side, for example **users who never ordered**:

```sql
SELECT u.user_id, u.name, u.signup_date
FROM users u
LEFT JOIN orders o ON o.user_id = u.user_id
WHERE o.order_id IS NULL;
```

The `WHERE o.order_id IS NULL` keeps users with no matching order. This **anti-join** pattern is very common for finding “users who signed up but never activated”.

(There are also RIGHT and FULL OUTER joins. You rarely need them; you can usually swap table order and use LEFT JOIN.)

### Joining three or more tables

Chain joins one at a time:

```sql
SELECT r.cuisine,
       COUNT(DISTINCT o.order_id) AS orders,
       SUM(oi.quantity) AS items_sold
FROM orders o
JOIN restaurants r ON r.restaurant_id = o.restaurant_id
JOIN order_items oi ON oi.order_id = o.order_id
WHERE o.status = 'delivered'
GROUP BY r.cuisine
ORDER BY items_sold DESC;
```

### The row-multiplication trap

Joining a one-to-many relationship **multiplies rows**. One order with 3 items becomes 3 rows after joining `order_items`. If you then do `SUM(o.total)`, each order’s total is counted 3 times.

Fixes:
- Use `COUNT(DISTINCT o.order_id)` for order counts after joining items.
- Sum item-level values (`oi.price * oi.quantity`) instead of order-level totals.
- Or aggregate items first in a subquery, then join (advanced).

**Always sanity-check totals** after a join against a simple query on the main table.

### Joins with conditions

Put matching conditions in `ON` and filters in `WHERE`. For a LEFT JOIN, a filter on the right table inside `WHERE` turns it into an INNER JOIN (because NULL rows fail the filter). If you want “all users, with their *delivered* orders if any”, put the status condition in `ON`:

```sql
SELECT u.user_id, COUNT(o.order_id) AS delivered_orders
FROM users u
LEFT JOIN orders o
  ON o.user_id = u.user_id AND o.status = 'delivered'
GROUP BY u.user_id;
```

Users with zero delivered orders still appear, with a count of 0.

## Worked example

**Checkpoint-style question:** “For each city, how many delivered orders included at least one item from the ‘Desserts’ category, and what was the dessert revenue?”

Plan:
- City comes from `users` (the customer’s city).
- Orders and status from `orders`.
- Categories and prices from `order_items`.

```sql
SELECT u.city,
       COUNT(DISTINCT o.order_id) AS orders_with_dessert,
       SUM(oi.price * oi.quantity) AS dessert_revenue
FROM orders o
JOIN users u        ON u.user_id = o.user_id
JOIN order_items oi ON oi.order_id = o.order_id
WHERE o.status = 'delivered'
  AND oi.category = 'Desserts'
GROUP BY u.city
ORDER BY dessert_revenue DESC;
```

Why `COUNT(DISTINCT o.order_id)`: an order with two dessert items would otherwise be counted twice. Why `SUM(oi.price * oi.quantity)`: we want dessert revenue only, at item level, which avoids the multiplication trap.

**Sanity check:** run `SELECT COUNT(*) FROM order_items WHERE category = 'Desserts';` and compare with the total number of dessert rows behind the result. (Category spelling may differ in your dataset; check `SELECT DISTINCT category FROM order_items;` first.)

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 230" role="img" aria-labelledby="j-t j-d">
<title id="j-t">INNER JOIN versus LEFT JOIN</title>
<desc id="j-d">Two pairs of overlapping circles. In the inner join, only the overlap is shaded. In the left join, the whole left circle is shaded.</desc>
<text x="100" y="24" class="d-text" font-weight="700">INNER JOIN</text>
<circle cx="110" cy="115" r="70" class="d-surface d-ink" stroke-width="2"/>
<circle cx="190" cy="115" r="70" class="d-surface d-ink" stroke-width="2"/>
<path d="M150 58 A70 70 0 0 1 150 172 A70 70 0 0 1 150 58 Z" class="d-mint d-ink" stroke-width="2"/>
<text x="62" y="120" class="d-text" font-size="12">users</text>
<text x="208" y="120" class="d-text" font-size="12">orders</text>
<text x="70" y="210" class="d-text" font-size="11">only users who have orders</text>
<text x="420" y="24" class="d-text" font-weight="700">LEFT JOIN</text>
<circle cx="430" cy="115" r="70" class="d-sky d-ink" stroke-width="2"/>
<circle cx="510" cy="115" r="70" class="d-surface d-ink" stroke-width="2" fill-opacity="0.6"/>
<path d="M470 58 A70 70 0 0 1 470 172 A70 70 0 0 1 470 58 Z" class="d-mint d-ink" stroke-width="2"/>
<text x="382" y="120" class="d-text-dark" font-size="12">users</text>
<text x="528" y="120" class="d-text" font-size="12">orders</text>
<text x="370" y="210" class="d-text" font-size="11">all users; order columns NULL if none</text>
</svg>
<figcaption>INNER keeps matches only. LEFT keeps every row from the left table.</figcaption>
</figure>

## Step by step

A method for any multi-table question (aim for 10 minutes):

1. **Write the question** and underline each piece of information you need (city, cuisine, status, category…).
2. **Map each piece to a table.**
3. **Choose the base table**: usually the one whose rows you’re counting (orders, users).
4. **Add one JOIN at a time**, with the correct key, and run the query with `LIMIT 10` to check.
5. **Decide INNER vs. LEFT**: do you need rows with no match? If yes, LEFT.
6. **Add WHERE filters.**
7. **Add GROUP BY and aggregates**, using `COUNT(DISTINCT …)` where joins multiply rows.
8. **Sanity-check totals** against a simpler query.

## Common mistakes

1. **Forgetting the ON condition** or using the wrong key, producing a huge cross product.
2. **Ambiguous column names** (`user_id` exists in several tables). Always prefix with aliases.
3. **Double-counting** after joining one-to-many tables.
4. **Filtering the right table in WHERE after a LEFT JOIN**, accidentally turning it into an INNER JOIN.
5. **Using INNER JOIN when you need “users with zero orders”.**
6. **Not checking row counts** after each join.

## How it shows up in interviews

> [!INTERVIEW]
> **“Find users who signed up in March but never placed an order.”**
> Outline: `users LEFT JOIN orders ON user_id` → `WHERE u.signup_date >= '2025-03-01' AND u.signup_date < '2025-04-01' AND o.order_id IS NULL`. Explain the anti-join.

> [!INTERVIEW]
> **“What’s the difference between INNER and LEFT JOIN? When would you use each?”**
> Outline: INNER = matches only; LEFT = all left rows with NULLs where no match. Use LEFT for “including zeros” or “never did X”.

## Practice exercise

**Task (35 minutes, in the SQL Playground):**
1. Number of delivered orders per restaurant **cuisine**.
2. Users (id and name) who signed up via `paid_social` and never ordered.
3. For each **customer city**, average delivery minutes of delivered orders.
4. **3-table checkpoint:** for each restaurant **city**, the number of distinct customers who ordered an item in the ‘Beverages’ category in Q2 2025 (April–June).
5. All users with their count of delivered orders, including users with zero.

````answer Reveal model answers
```sql
-- 1
SELECT r.cuisine, COUNT(*) AS delivered_orders
FROM orders o
JOIN restaurants r ON r.restaurant_id = o.restaurant_id
WHERE o.status = 'delivered'
GROUP BY r.cuisine
ORDER BY delivered_orders DESC;

-- 2
SELECT u.user_id, u.name
FROM users u
LEFT JOIN orders o ON o.user_id = u.user_id
WHERE u.acquisition_channel = 'paid_social'
  AND o.order_id IS NULL;

-- 3
SELECT u.city, ROUND(AVG(o.delivery_minutes), 1) AS avg_minutes
FROM orders o
JOIN users u ON u.user_id = o.user_id
WHERE o.status = 'delivered'
GROUP BY u.city
ORDER BY avg_minutes;

-- 4
SELECT r.city, COUNT(DISTINCT o.user_id) AS customers
FROM orders o
JOIN restaurants r  ON r.restaurant_id = o.restaurant_id
JOIN order_items oi ON oi.order_id = o.order_id
WHERE oi.category = 'Beverages'
  AND o.order_ts >= '2025-04-01' AND o.order_ts < '2025-07-01'
GROUP BY r.city
ORDER BY customers DESC;

-- 5
SELECT u.user_id, u.name, COUNT(o.order_id) AS delivered_orders
FROM users u
LEFT JOIN orders o ON o.user_id = u.user_id AND o.status = 'delivered'
GROUP BY u.user_id, u.name
ORDER BY delivered_orders DESC;
```
````

## Quiz

```quiz
Q: What does an INNER JOIN between users and orders return?
- [ ] All users, even those without orders :: That’s a LEFT JOIN (users on the left).
- [x] Only rows where a user has a matching order :: Correct.
- [ ] All orders and all users, unmatched :: That would be a FULL OUTER JOIN.
- [ ] Only users without orders :: That’s a LEFT JOIN with IS NULL.

Q: How do you find users who never ordered?
- [ ] users INNER JOIN orders WHERE order_id IS NULL :: INNER JOIN already removes users without orders.
- [x] users LEFT JOIN orders … WHERE o.order_id IS NULL :: Correct. The anti-join pattern.
- [ ] SELECT * FROM users WHERE orders = 0 :: There’s no orders column in users.
- [ ] orders LEFT JOIN users WHERE user_id IS NULL :: This finds orders without users, the reverse.

Q: After joining orders to order_items, SUM(o.total) looks too high. Why?
- [ ] SUM is broken :: SUM works fine.
- [x] Each order appears once per item, so its total is counted multiple times :: Correct. One-to-many joins multiply rows.
- [ ] Totals include tax :: Not the cause.
- [ ] The join removed rows :: It added rows.

Q: Why use table aliases like `o` and `u`?
- [ ] They make queries run faster :: Not meaningfully.
- [x] They shorten queries and make it clear which table each column comes from :: Correct.
- [ ] They’re required in every query :: Optional, but strongly recommended with joins.
- [ ] They rename tables permanently :: Aliases only apply inside the query.

Q: You LEFT JOIN users to orders and add `WHERE o.status = 'delivered'`. What happens?
- [ ] All users are kept :: Users with no orders have NULL status and fail the filter.
- [x] Users without delivered orders disappear, so it behaves like an INNER JOIN :: Correct. Put the condition in ON to keep them.
- [ ] Nothing changes :: It changes the result.
- [ ] It causes an error :: It runs, but gives a different answer.

Q: In the playground, which key connects order_items to orders?
- [ ] order_items.user_id = orders.user_id :: order_items has no user_id column.
- [x] order_items.order_id = orders.order_id :: Correct.
- [ ] order_items.restaurant_id = orders.restaurant_id :: order_items has no restaurant_id column.
- [ ] order_items.item_name = orders.order_id :: Not a key relationship.
```

## Key takeaways

- Tables connect through **primary and foreign keys**.
- **INNER JOIN** keeps matches; **LEFT JOIN** keeps all left rows (NULLs where no match).
- Use the **anti-join** (`LEFT JOIN … WHERE right.id IS NULL`) for “never did X”.
- One-to-many joins **multiply rows**: use `COUNT(DISTINCT …)` and item-level sums.
- Build joins **one at a time**, check row counts, and **sanity-check totals**.
