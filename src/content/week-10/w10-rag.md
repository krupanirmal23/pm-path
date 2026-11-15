---
id: w10-rag
title: "RAG: chunking, embeddings, retrieval quality"
week: 10
estimatedMinutes: 18
tags: [ai, rag, retrieval]
---

## Why this matters for a PM

Most valuable AI products need to answer from **your** data: help articles, policies, product catalogues, contracts, a user’s own documents. The model doesn’t know these, and they change. **Retrieval-augmented generation (RAG)** is the standard way to ground answers in your data. When a RAG product gives wrong answers, the problem is very often retrieval, not the model. AI PMs who understand the pipeline can diagnose and prioritise fixes.

## Core concepts

### What RAG is

**RAG** combines two steps:
1. **Retrieve:** find the most relevant pieces of your content for the user’s question.
2. **Generate:** give those pieces to the LLM as context and ask it to answer using them.

Instead of hoping the model “knows” your refund policy, you **look it up** and **hand it** the right paragraphs every time. This reduces hallucinations, keeps answers up to date (update the documents, not the model), and enables citations.

### The RAG pipeline

**Offline (preparing your content, “indexing”):**
1. **Collect documents:** help centre articles, PDFs, policies, FAQs, product data.
2. **Clean** them: remove navigation text, duplicates, outdated versions.
3. **Chunk** them: split into smaller pieces (chunks).
4. **Embed** each chunk: convert it into a vector (see below).
5. **Store** vectors plus the original text and metadata in a **vector database** (or a search index).

**Online (answering a question):**
1. **Embed the user’s question.**
2. **Search** for the chunks most similar to the question (top-k, e.g., top 5).
3. Optionally **re-rank** results with a more precise model.
4. **Build the prompt:** instructions + retrieved chunks + question.
5. **Generate** the answer, ideally with citations to the chunks used.

### Embeddings, in plain words

An **embedding** is a list of numbers (a **vector**) that represents the *meaning* of a piece of text. Texts with similar meaning have vectors that are close together. “How long do refunds take?” and “When will I get my money back?” have similar embeddings even though they share few words.

An **embedding model** creates these vectors (a separate, smaller model than the chat LLM). **Semantic search** compares the question’s vector with stored chunk vectors to find the closest ones (often using a measure called **cosine similarity**).

**Keyword search** (classic search like BM25) matches exact words. It’s better for exact terms: order IDs, product codes, names, rare words. Many good systems use **hybrid search**: combine keyword and semantic results.

### Chunking: the underrated decision

**Chunking** is how you split documents. It strongly affects quality:
- **Too big:** chunks contain lots of irrelevant text; the right sentence gets diluted; costs more tokens.
- **Too small:** chunks lose context (“It takes 5–7 days” without saying *what* takes 5–7 days).

Common approaches:
- **Fixed size** with **overlap** (e.g., 300–800 tokens with 10–20% overlap so ideas aren’t cut in half).
- **Structure-aware:** split by headings, sections, FAQ question–answer pairs, table rows.
- **Add metadata** to chunks: title, section, product, date, language, URL. Metadata helps filtering (“only policies for UPI refunds”) and citations.
- **Prefix chunks with context:** e.g., include the document title and section heading in each chunk’s text.

There’s no universal best size; test on your eval set.

### Retrieval quality: what can go wrong

When a RAG system gives a bad answer, check in this order:
1. **Was the answer in the knowledge base at all?** (Coverage gap → add content.)
2. **Was the right chunk retrieved?** (Retrieval failure → chunking, embeddings, hybrid search, metadata filters, query rewriting.)
3. **Was it ranked high enough** to be included in the top-k? (Ranking → re-ranker, more k.)
4. **Did the model use it correctly?** (Generation failure → prompt, model choice, conflicting chunks.)
5. **Was the content itself wrong or outdated?** (Content quality → content ops.)

Retrieval metrics (measured on a test set of questions with known relevant chunks):
- **Recall@k / hit rate:** did the correct chunk appear in the top k results? (e.g., hit rate@5 = 85%.)
- **Precision@k:** how many of the top k results were relevant?
- **MRR (mean reciprocal rank):** how high the first relevant result appears, on average.

Answer metrics (Week 10 evals): **faithfulness** (does the answer stick to the retrieved text?), **answer correctness**, **citation accuracy**.

### Improving retrieval

- Better **chunking** (structure-aware, right size, overlap).
- **Hybrid search** (keyword + semantic).
- **Metadata filters** (product, language, date, user permissions).
- **Query rewriting:** turn “and for cards?” into a full question using conversation context.
- **Re-ranking** the top 20 results with a stronger model to choose the best 5.
- **Cleaning content:** remove duplicates and outdated versions; one source of truth per policy.
- **Permissions:** only retrieve documents the user is allowed to see (critical in B2B and personal data).

### RAG vs. alternatives

- **Long context (“stuff everything in”):** works for small, stable knowledge (a few documents) if the model’s context is big enough. Simpler, but costlier per request and can reduce quality with lots of irrelevant text.
- **Fine-tuning:** trains a model on examples to change style or behaviour. **Not** a good way to keep facts updated; use RAG for knowledge, fine-tuning (if ever) for behaviour.
- **Tools / APIs:** for live, structured data (order status, balance), call an API instead of retrieving documents.

## Worked example

**Product:** a support assistant for a payments app, answering from 400 help articles in English and Hindi.

**v1 (naive):** articles split every 1,000 characters; semantic search only; top 3 chunks.
**Eval:** 100 real user questions with known correct articles.
- Hit rate@3: 62%. Answer correctness: 58%.

**Error analysis (what went wrong):**
- 15 failures: questions with exact codes (“error U30”, “UPI ID @ybl”) → semantic search missed exact terms.
- 10 failures: chunks cut mid-answer (“the reversal happens within” | “48 hours”).
- 8 failures: retrieved an outdated 2022 article contradicting the current policy.
- 5 failures: Hindi questions retrieved English chunks poorly.

**v2 changes:**
- Structure-aware chunking by FAQ question–answer pairs and headings, with 15% overlap.
- Hybrid search (keyword + semantic).
- Removed 37 outdated articles; added “last updated” metadata and filtered to current versions.
- Indexed Hindi articles separately and filtered by detected language.
- Top 5 with a re-ranker.

**Results:** hit rate@5: 89%; answer correctness: 81%. Remaining errors: coverage gaps (questions with no article) → content team writes 12 new articles.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 280" role="img" aria-labelledby="rag-t rag-d">
<title id="rag-t">The RAG pipeline</title>
<desc id="rag-d">Offline: documents are chunked, embedded and stored in a vector database. Online: the question is embedded, similar chunks are retrieved and re-ranked, and the LLM generates a grounded answer with citations.</desc>
<defs><marker id="rag-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<text x="20" y="22" class="d-text" font-weight="700" font-size="12">Offline (indexing)</text>
<g font-size="11">
<rect x="20" y="32" width="110" height="46" rx="8" class="d-surface d-ink" stroke-width="2"/><text x="32" y="60" class="d-text">Documents</text>
<rect x="160" y="32" width="110" height="46" rx="8" class="d-lavender d-ink" stroke-width="2"/><text x="172" y="54" class="d-text-dark" font-weight="700">Chunk</text><text x="172" y="70" class="d-text-dark" font-size="10">+ metadata</text>
<rect x="300" y="32" width="110" height="46" rx="8" class="d-lavender d-ink" stroke-width="2"/><text x="312" y="60" class="d-text-dark" font-weight="700">Embed</text>
<rect x="440" y="32" width="180" height="46" rx="8" class="d-butter d-ink" stroke-width="2"/><text x="452" y="54" class="d-text-dark" font-weight="700">Vector DB / index</text><text x="452" y="70" class="d-text-dark" font-size="10">vectors + text + metadata</text>
</g>
<g class="d-ink" stroke-width="2"><line x1="132" y1="55" x2="156" y2="55" marker-end="url(#rag-a)"/><line x1="272" y1="55" x2="296" y2="55" marker-end="url(#rag-a)"/><line x1="412" y1="55" x2="436" y2="55" marker-end="url(#rag-a)"/></g>
<text x="20" y="122" class="d-text" font-weight="700" font-size="12">Online (answering)</text>
<g font-size="11">
<rect x="20" y="132" width="110" height="46" rx="8" class="d-sky d-ink" stroke-width="2"/><text x="32" y="160" class="d-text-dark">User question</text>
<rect x="160" y="132" width="110" height="46" rx="8" class="d-sky d-ink" stroke-width="2"/><text x="172" y="154" class="d-text-dark" font-weight="700">Retrieve top-k</text><text x="172" y="170" class="d-text-dark" font-size="10">hybrid search</text>
<rect x="300" y="132" width="110" height="46" rx="8" class="d-sky d-ink" stroke-width="2"/><text x="312" y="160" class="d-text-dark" font-weight="700">Re-rank</text>
<rect x="440" y="132" width="180" height="46" rx="8" class="d-mint d-ink" stroke-width="2"/><text x="452" y="154" class="d-text-dark" font-weight="700">LLM answers</text><text x="452" y="170" class="d-text-dark" font-size="10">from chunks, with citations</text>
</g>
<g class="d-ink" stroke-width="2"><line x1="132" y1="155" x2="156" y2="155" marker-end="url(#rag-a)"/><line x1="272" y1="155" x2="296" y2="155" marker-end="url(#rag-a)"/><line x1="412" y1="155" x2="436" y2="155" marker-end="url(#rag-a)"/><line x1="530" y1="80" x2="230" y2="128" stroke-dasharray="5 4" marker-end="url(#rag-a)"/></g>
<rect x="20" y="210" width="600" height="56" rx="10" class="d-pink d-ink" stroke-width="2"/>
<text x="34" y="234" class="d-text-dark" font-size="12" font-weight="700">Debug order: content exists? → right chunk retrieved? → ranked high? → model used it? → content correct?</text>
<text x="34" y="254" class="d-text-dark" font-size="11">Most RAG failures are retrieval or content problems, not model problems.</text>
</svg>
<figcaption>Retrieve the right pieces, then generate from them. Measure retrieval separately from answers.</figcaption>
</figure>

## Step by step

Planning RAG for your P4 (if it answers from documents):

1. **List knowledge sources** and who owns them; remove outdated and duplicate content.
2. **Write 30–50 test questions** with the correct source document/section for each.
3. **Choose chunking** (structure-aware first) and metadata fields.
4. **Pick retrieval**: semantic, keyword or hybrid (no-code tools in n8n support this; see the guide).
5. **Measure retrieval** first: hit rate@k on your test questions.
6. **Write the generation prompt**: answer only from provided chunks, cite them, say when not found.
7. **Measure answers**: correctness, faithfulness, citation accuracy.
8. **Error analysis**: classify failures (coverage, retrieval, ranking, generation, content).
9. **Fix the biggest category first**; re-run the same tests.
10. **Plan content operations**: who updates documents, and how re-indexing happens.

## Common mistakes

1. **Blaming the model** when retrieval is the problem.
2. **Fixed-size chunks that cut answers in half.**
3. **Semantic search only**, missing exact codes and names.
4. **Messy, duplicated or outdated content** in the index.
5. **No permission filtering**, risking data leaks across users or customers.
6. **No retrieval metrics**, only end-to-end impressions.

## How it shows up in interviews

> [!INTERVIEW]
> **“Our RAG chatbot gives wrong answers. How would you debug it?”**
> Outline: build a labelled test set → measure retrieval (hit rate@k) separately from answers → error analysis by category (coverage, retrieval, ranking, generation, content) → fixes per category (content, chunking, hybrid search, re-ranking, prompt) → re-measure → monitor in production.

> [!INTERVIEW]
> **“RAG or fine-tuning for our support bot?”**
> Outline: RAG for knowledge that changes and needs citations; fine-tuning for style or narrow behaviour, not for keeping facts current; often prompts + RAG are enough; consider cost, maintenance and evaluation.

## Practice exercise

**Task (30 minutes):** You’re building a RAG assistant on Zerodha’s public support articles (illustrative). Write: 5 test questions with the expected source section; your chunking plan; 2 metadata filters; retrieval approach; and how you’d measure success.

```answer Reveal a model answer
**Test questions (with expected source):**
1. “How long does a fund withdrawal take?” → Funds › Withdrawals › Timelines.
2. “What is a GTT order?” → Orders › GTT › Overview.
3. “Why was my order rejected with RMS error?” → Orders › Rejections › RMS reasons.
4. “Can NRIs open an account?” → Account opening › NRI accounts.
5. “What are the charges for delivery trades?” → Charges › Equity delivery.

**Chunking:** split by article headings and FAQ question–answer pairs; keep tables (charges) as single chunks with the table title; ~300–600 tokens; 15% overlap for long sections; prefix each chunk with “Article title › Section”.

**Metadata filters:** product area (account, funds, orders, charges); last-updated date (exclude superseded versions). Optional: segment (resident/NRI).

**Retrieval:** hybrid (keyword for codes like “RMS”, “GTT”; semantic for natural questions), top 20 → re-rank → top 5.

**Measure:** hit rate@5 on 50 questions (target ≥ 90%); answer correctness and faithfulness rated against the source (target ≥ 85%); citation accuracy (the cited section actually supports the answer); production: 👎 rate and “not found” rate by topic.
```

## Quiz

```quiz
Q: What does RAG do?
- [ ] Retrains the model on your documents every night :: That’s closer to fine-tuning, and RAG doesn’t change the model.
- [x] Retrieves relevant pieces of your content and gives them to the model as context for the answer :: Correct. It grounds answers in your data.
- [ ] Removes the need for prompts :: You still need a prompt that uses the retrieved text.
- [ ] Makes models faster :: Retrieval adds a step; speed isn’t the goal.

Q: What is an embedding?
- [ ] A compressed image :: Not in this context.
- [x] A list of numbers representing the meaning of text, so similar meanings are close together :: Correct. It powers semantic search.
- [ ] A secure password :: Unrelated: embeddings represent meaning, not credentials.
- [ ] A type of chunk :: Chunks are text pieces; embeddings represent them.

Q: Users ask about “error U30” and the bot retrieves unrelated chunks. What’s the likely fix?
- [ ] Use a bigger chat model :: The problem is retrieval, not generation.
- [x] Add keyword (hybrid) search so exact codes are matched :: Correct. Semantic search often misses exact codes.
- [ ] Increase temperature :: Unrelated to retrieval.
- [ ] Remove all metadata :: Metadata helps, not hurts.

Q: Chunks are cutting answers in half. What should you change?
- [ ] Nothing; the model will guess the rest :: That invites hallucination.
- [x] Use structure-aware chunking with some overlap :: Correct. Keep complete ideas together.
- [ ] Make chunks one sentence each :: Too small; loses context.
- [ ] Remove the documents :: Throws away needed knowledge.

Q: What does hit rate@5 measure?
- [ ] How many users clicked 5 times :: Unrelated: hit rate@5 is a retrieval metric on test questions.
- [x] The share of test questions where a correct chunk appears in the top 5 retrieved results :: Correct. It tells you whether retrieval found the right material.
- [ ] Answer politeness :: Not a retrieval metric.
- [ ] Token cost :: Not a retrieval metric.

Q: For keeping facts up to date, which is generally better?
- [ ] Fine-tuning the model whenever policies change :: Slow, costly and not designed for factual updates.
- [x] RAG: update the documents and re-index :: Correct. Knowledge changes without retraining.
- [ ] Hard-coding answers in the system prompt :: Doesn’t scale beyond a few facts.
- [ ] Higher temperature :: Unrelated: temperature affects randomness, not freshness of facts.

Q: Why must RAG systems filter by user permissions?
- [ ] To speed up search :: A side effect at best.
- [x] To avoid retrieving documents a user isn’t allowed to see, which would leak data :: Correct. Critical in B2B and personal data products.
- [ ] Because embeddings require it :: Embeddings don’t enforce permissions.
- [ ] To reduce token count :: Not the main reason.
```

## Key takeaways

- **RAG = retrieve relevant chunks + generate from them**; it grounds answers in your current data.
- Pipeline: **clean → chunk → embed → store**, then **embed question → retrieve → re-rank → generate with citations**.
- **Chunking and hybrid search** often matter more than model choice.
- Measure **retrieval (hit rate@k)** separately from **answers (correctness, faithfulness)**.
- Debug in order: **content → retrieval → ranking → generation → content quality**; enforce **permissions**.
