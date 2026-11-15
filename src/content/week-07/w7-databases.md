---
id: w7-databases
title: "Databases: SQL vs. NoSQL"
week: 7
estimatedMinutes: 14
tags: [technical, databases, architecture]
---

## Why this matters for a PM

Every feature reads or writes data. The way data is stored affects what’s easy (instant order history), what’s hard (a new report across five systems), how fast things are, and how reliable money-related features can be. When engineers say “we can’t do that query in real time” or “that needs a migration”, understanding databases lets you follow the trade-off and help choose a path.

## Core concepts

### What a database does

A **database** stores data so it can be reliably saved, found, updated and protected. Apps rarely keep important data only on the phone; it lives in databases on servers.

### Relational (SQL) databases

A **relational database** stores data in **tables** with fixed **columns** (a **schema**), and links tables with **keys**, exactly like the SQL Playground. You query it with SQL. Examples: PostgreSQL, MySQL, Oracle, SQL Server, Amazon Aurora.

Strengths:
- **Structured, consistent data**: the schema enforces types and rules (an order must have a user_id).
- **Powerful queries**: joins and aggregations across tables.
- **Transactions with ACID guarantees**:
  - **Atomicity:** all steps of a transaction succeed or none do (debit and credit both happen, or neither).
  - **Consistency:** data always follows the rules.
  - **Isolation:** simultaneous transactions don’t corrupt each other.
  - **Durability:** once saved, data survives crashes.

That’s why payments, orders, wallets and ledgers usually live in relational databases.

Trade-offs: changing the schema (adding/changing columns) needs **migrations**; scaling writes across many machines is harder (though modern systems handle large scale).

### NoSQL databases

**NoSQL** (“not only SQL”) is a family of databases that don’t use fixed relational tables. Main types:

- **Document stores** (MongoDB, Firestore): store JSON-like documents. Flexible structure; each document can have different fields. Good for catalogues, user profiles, content.
- **Key–value stores** (Redis, DynamoDB): store a value under a key, extremely fast lookups. Good for caching, sessions, counters, carts.
- **Wide-column stores** (Cassandra, Bigtable): huge write volumes across many machines. Good for time-series, event logs, messaging.
- **Graph databases** (Neo4j): store nodes and relationships. Good for social graphs, fraud rings, recommendations.

Strengths: flexible schemas, easy horizontal scaling, very fast for specific access patterns.
Trade-offs: joins and ad-hoc queries are harder; many offer **eventual consistency** (different copies may briefly disagree) unless configured otherwise.

### Consistency in plain words

- **Strong consistency:** after a write, every read sees the new value immediately. Needed for balances and payments.
- **Eventual consistency:** copies catch up shortly; a read may briefly show old data. Fine for like counts, view counts, feeds.

PM translation: “Can the user see slightly stale data for a few seconds here?” If yes, eventual consistency may make the system faster and cheaper.

### OLTP vs. OLAP (product databases vs. analytics)

- **OLTP (online transaction processing)** databases run the live product: many small, fast reads and writes (place order, update status).
- **OLAP (online analytical processing)** systems, often a **data warehouse** (BigQuery, Snowflake, Redshift), are built for big analytical queries across months of data.

Data is copied from product databases to the warehouse through **ETL/ELT pipelines** (extract, transform, load). That’s why analytics data is sometimes delayed by hours: the pipeline runs on a schedule. Running heavy analytics directly on the production database can slow down the app for users.

### Indexes

An **index** is like the index at the back of a book: it lets the database find rows quickly without scanning everything. Adding the right index can make a slow query fast. Indexes slow down writes slightly and use storage, so engineers choose them carefully. If a feature needs a new kind of search (“orders by restaurant by hour”), it may need a new index.

### Polyglot persistence

Big products use **several databases**, each for what it’s good at: PostgreSQL for orders and payments, Redis for carts and sessions, Elasticsearch for search, a document store for the menu catalogue, a warehouse for analytics.

## Worked example

**Zomato-like app (illustrative architecture):**

| Data | Likely store | Why |
|---|---|---|
| Orders, payments, refunds | Relational (PostgreSQL/MySQL) | Transactions, consistency, money |
| Restaurant menus | Document store | Varying structures (customisations, add-ons), read-heavy |
| Cart, session, rate limits | Key–value (Redis) | Very fast, temporary data |
| Restaurant search | Search engine (Elasticsearch) | Text search, filters, ranking |
| Rider location pings | Wide-column / time-series | Huge write volume, time-ordered |
| Analytics events | Data warehouse | Large analytical queries |

**PM scenario:** You want a “Your most-ordered dishes” feature on the home screen, updated in real time.
- The engineer says: computing it from the orders table on every app open is too slow at scale.
- Options: (1) **precompute** each user’s top dishes nightly into a key–value store (fast, but up to a day stale); (2) update the user’s top dishes **incrementally** each time an order is delivered (fresh, more engineering); (3) compute on the fly with a new index (simple but risky for performance).
- PM judgement: users won’t notice if it’s a few hours stale. Choose (1) for v1, measure usage, then consider (2).

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 250" role="img" aria-labelledby="dbs-t dbs-d">
<title id="dbs-t">Databases in a typical product</title>
<desc id="dbs-d">The app talks to services that use a relational database for orders, a key value cache for carts, a document store for menus and a search engine; a pipeline copies data to a warehouse for analytics.</desc>
<defs><marker id="dbs-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<rect x="20" y="95" width="100" height="60" rx="10" class="d-lavender d-ink" stroke-width="2"/>
<text x="38" y="130" class="d-text-dark" font-weight="700" font-size="12">Services</text>
<rect x="170" y="15" width="150" height="46" rx="10" class="d-mint d-ink" stroke-width="2"/><text x="182" y="36" class="d-text-dark" font-size="11" font-weight="700">Relational (SQL)</text><text x="182" y="52" class="d-text-dark" font-size="10">orders, payments</text>
<rect x="170" y="73" width="150" height="46" rx="10" class="d-butter d-ink" stroke-width="2"/><text x="182" y="94" class="d-text-dark" font-size="11" font-weight="700">Key–value cache</text><text x="182" y="110" class="d-text-dark" font-size="10">cart, sessions</text>
<rect x="170" y="131" width="150" height="46" rx="10" class="d-sky d-ink" stroke-width="2"/><text x="182" y="152" class="d-text-dark" font-size="11" font-weight="700">Document store</text><text x="182" y="168" class="d-text-dark" font-size="10">menus, profiles</text>
<rect x="170" y="189" width="150" height="46" rx="10" class="d-peach d-ink" stroke-width="2"/><text x="182" y="210" class="d-text-dark" font-size="11" font-weight="700">Search engine</text><text x="182" y="226" class="d-text-dark" font-size="10">restaurant search</text>
<rect x="430" y="80" width="190" height="90" rx="10" class="d-surface d-ink" stroke-width="2"/>
<text x="446" y="110" class="d-text" font-weight="700" font-size="12">Data warehouse</text>
<text x="446" y="130" class="d-text" font-size="11">analytics (OLAP)</text>
<text x="446" y="148" class="d-text" font-size="11">delayed by pipelines</text>
<g class="d-ink" stroke-width="2"><line x1="122" y1="115" x2="166" y2="40" marker-end="url(#dbs-a)"/><line x1="122" y1="120" x2="166" y2="96" marker-end="url(#dbs-a)"/><line x1="122" y1="130" x2="166" y2="154" marker-end="url(#dbs-a)"/><line x1="122" y1="140" x2="166" y2="210" marker-end="url(#dbs-a)"/></g>
<line x1="322" y1="38" x2="426" y2="110" class="d-ink" stroke-width="2" stroke-dasharray="6 4" marker-end="url(#dbs-a)"/>
<text x="340" y="66" class="d-text" font-size="10">ETL pipeline</text>
</svg>
<figcaption>Different data, different stores. Live product data (OLTP) is copied to a warehouse (OLAP) for analysis.</figcaption>
</figure>

## Step by step

Thinking through the data needs of a feature:

1. **List the data the feature reads and writes.**
2. **Classify each**: money/critical (needs strong consistency), user-facing but tolerant (can be slightly stale), temporary (cache), analytical.
3. **Ask how fresh it must be** (“real time”, “within a minute”, “daily is fine”).
4. **Ask about access patterns**: lookups by ID? searches? aggregations across millions of rows?
5. **Ask engineers** where it lives today and whether new indexes, tables or pipelines are needed.
6. **Consider precomputing** expensive results.
7. **Plan analytics**: will the warehouse have the data you need to measure success, and with what delay?
8. **Note migration risks** if existing data must change shape.

## Common mistakes

1. **Demanding “real time” everywhere**, adding cost and complexity where users wouldn’t notice delay.
2. **Running heavy analytics on production databases.**
3. **Assuming NoSQL is always faster or more modern**; it’s about fit.
4. **Ignoring data migrations** when changing what a field means.
5. **Forgetting that analytics data lags**, then misreading “today’s” numbers.
6. **Storing personal data everywhere** without considering privacy and deletion requests.

## How it shows up in interviews

> [!INTERVIEW]
> **“When would you use SQL vs. NoSQL?”**
> Outline: SQL for structured data with relationships and transactions (payments, orders) → NoSQL for flexible schemas, huge scale or specific access patterns (catalogues, caches, logs, social graphs) → most products use both → decide by consistency needs and access patterns.

> [!INTERVIEW]
> **“The dashboard shows today’s orders are down 40% at 11 a.m. Should you panic?”**
> Outline: likely pipeline delay or partial day (OLTP → warehouse lag) → check the live system or real-time monitoring → compare with same time last week.

## Practice exercise

**Task (25 minutes):** For **PhonePe’s “transaction history” and “spending insights” features**, list the data involved, where you’d expect each to be stored, required freshness, and one trade-off you’d discuss with engineering.

```answer Reveal a model answer
**Transaction history**
- Data: transaction ID, amount, payee, status, timestamp, method.
- Store: relational database (source of truth) with indexes on user_id + time; possibly a read-optimised copy for fast history views.
- Freshness: near real time (a user expects to see a payment immediately; pending → success updates within seconds).

**Spending insights (monthly categories, totals)**
- Data: aggregated spend by category per user per month.
- Store: precomputed summaries in a key–value or document store, generated from the warehouse or a stream.
- Freshness: daily (or a few hours) is acceptable.

**Trade-off:** computing insights live from all transactions on every app open would be slow and expensive at PhonePe’s scale. Precomputing nightly is cheap and fast but stale; show “Updated today at 6 a.m.” and include a “recent transactions” section from the live history to cover the gap.
```

## Quiz

```quiz
Q: Which data most needs a relational database with ACID transactions?
- [ ] Number of likes on a post :: Slight staleness is fine; eventual consistency works.
- [x] Wallet balances and payments :: Correct. Money requires atomic, consistent, durable updates.
- [ ] A user’s recently viewed restaurants :: Can tolerate staleness and loss.
- [ ] Rider GPS pings :: Huge volume, better suited to time-series or wide-column stores.

Q: What does “atomicity” guarantee?
- [ ] Data is encrypted :: Encryption is a separate concern.
- [x] All steps of a transaction succeed together or none do :: Correct. No half-completed transfers.
- [ ] Queries run quickly :: Speed isn’t what atomicity means.
- [ ] Data is copied to many regions :: That’s replication.

Q: What is eventual consistency?
- [ ] Data is never consistent :: It becomes consistent after a short time.
- [x] Copies of data may briefly differ but converge shortly :: Correct. Fine for counts and feeds, not for balances.
- [ ] Data is consistent only on weekends :: Not a real concept.
- [ ] A type of index :: Unrelated: consistency describes how copies agree, not how data is indexed.

Q: Why might analytics dashboards lag behind the live product?
- [ ] Analytics tools are slow by design :: Not the main reason.
- [x] Data is copied from production databases to the warehouse by scheduled pipelines :: Correct. Pipeline schedules create the delay you see in dashboards.
- [ ] Users submit data late :: Not the usual reason.
- [ ] Warehouses delete recent data :: They don’t; recent data just hasn’t arrived yet.

Q: What does a database index do?
- [ ] Deletes duplicate rows :: That’s not an index’s job.
- [x] Speeds up finding rows without scanning the whole table :: Correct, at a small cost to writes and storage.
- [ ] Encrypts data :: Unrelated: indexes speed up lookups; encryption is separate.
- [ ] Backs up the database :: Backups are separate.

Q: Which store best fits a shopping cart that must be read and updated very quickly?
- [ ] A data warehouse :: Built for big analytics, not fast per-user updates.
- [x] A key–value store like Redis :: Correct. Very fast reads and writes for temporary data.
- [ ] A graph database :: Built for relationships, not carts.
- [ ] A spreadsheet :: Not a production database.
```

## Key takeaways

- **Relational (SQL)** databases: tables, schemas, joins and **ACID transactions**; ideal for money and orders.
- **NoSQL** (document, key–value, wide-column, graph): flexible and scalable for specific access patterns.
- **Strong vs. eventual consistency**: ask “can this be stale for a few seconds?”
- **OLTP** runs the product; **OLAP/warehouses** power analytics, fed by pipelines with delay.
- Real products use **several stores**; precomputing expensive results is a common, smart trade-off.
