---
id: w11-privacy-dpdp
title: "Privacy and data (incl. India’s DPDP Act basics)"
week: 11
estimatedMinutes: 16
tags: [ai, privacy, regulation]
---

## Why this matters for a PM

AI products eat data: user messages, documents, voice notes, behaviour logs. Much of it is personal. India’s **Digital Personal Data Protection Act, 2023 (DPDP Act)** sets rules for how organisations collect and use personal data, with significant penalties for violations. PMs decide what data features collect, what’s sent to AI providers, what’s logged and how long it’s kept. Privacy-by-design is a product responsibility, not just legal’s.

> [!NOTE]
> This lesson gives a plain-English overview for product thinking, not legal advice. Rules are detailed and evolving (implementation rules were notified after the Act); always check current official sources and involve legal/compliance for real products.

## Core concepts

### Key terms

- **Personal data:** any data about an individual who can be identified by or in relation to it: name, phone, email, address, Aadhaar/PAN, photos, voice, location, device IDs, and things like order history linked to a person.
- **Data Principal:** the individual the data is about (your user).
- **Data Fiduciary:** the organisation that decides why and how personal data is processed (your company).
- **Data Processor:** an organisation that processes data on the fiduciary’s behalf (e.g., a cloud provider, an AI API provider, an analytics tool).
- **Processing:** almost anything done with data: collecting, storing, using, sharing, deleting.

### DPDP Act: the main ideas (simplified)

1. **Lawful purpose and consent:** process personal data for a lawful purpose, generally based on the person’s **consent**, or certain **legitimate uses** defined in the Act (for example, data a person voluntarily provides for a specified purpose, some employment and legal-obligation situations).
2. **Notice:** before or when asking for consent, tell people **what data** you collect, **for what purpose**, and how they can exercise their rights and complain.
3. **Consent quality:** consent should be **free, specific, informed, unconditional and unambiguous**, given by a **clear affirmative action**, and limited to what’s needed for the stated purpose. It must be as easy to **withdraw** as to give. The Act also provides for **Consent Managers** (registered entities that help people manage consent).
4. **Purpose limitation and data minimisation:** collect only what’s needed for the stated purpose; don’t reuse it for unrelated purposes without a proper basis.
5. **Accuracy:** take reasonable steps to keep data accurate, especially if used for decisions or shared.
6. **Security safeguards:** take reasonable measures to prevent **personal data breaches**.
7. **Breach notification:** inform the **Data Protection Board of India** and affected individuals in the event of a breach, as prescribed.
8. **Retention and erasure:** delete data when the purpose is served or consent is withdrawn (unless the law requires retention).
9. **Rights of Data Principals:** access information about processing, correction and erasure, grievance redressal, and nominating someone to exercise rights in case of death or incapacity.
10. **Children’s data:** for individuals under 18, **verifiable parental consent** is required, and tracking, behavioural monitoring and targeted advertising directed at children are restricted (with some exemptions).
11. **Significant Data Fiduciaries:** organisations designated based on volume/sensitivity of data and risk have extra duties (data protection officer, audits, impact assessments).
12. **Cross-border transfers:** generally allowed except to countries the government restricts.
13. **Penalties:** the Data Protection Board can impose substantial financial penalties (up to hundreds of crores of rupees for serious failures like inadequate security safeguards).

### What this means for AI products

- **Sending data to AI providers:** the AI provider is typically your data processor. Check the provider’s terms: is your data used for training? where is it processed? retention period? Use enterprise/paid tiers with appropriate terms for real user data. Free tiers may allow data use for product improvement; don’t send real personal data there.
- **Minimise what the model sees:** send only the fields needed (order items, not full address and phone). Mask or pseudonymise identifiers.
- **Logs and traces:** redact personal data before logging; set retention limits; restrict access.
- **Training/fine-tuning on user data:** needs a clear purpose and basis; often requires explicit consent and careful anonymisation.
- **Memory features:** if the AI “remembers” users, tell them, let them view and delete it.
- **User-uploaded content:** documents may contain third parties’ personal data (e.g., flatmates’ names, ID cards). Design for minimal retention.
- **Children:** if minors may use your product (e.g., education apps), plan for parental consent and avoid behavioural tracking and targeted ads.
- **Automated decisions:** be transparent where AI influences outcomes for people; provide human review paths (also good practice under responsible AI principles).

### Privacy-by-design practices

- **Data inventory:** list every personal data field you collect, why, where it’s stored, who can access it, retention period, and which processors receive it.
- **Clear, short notices** at the point of collection, in the user’s language.
- **Granular consent toggles** (e.g., “Use my messages to improve the assistant” off by default).
- **Easy controls:** download my data, delete my data, withdraw consent.
- **Pseudonymisation** (replace identifiers with codes) and **anonymisation** (irreversibly remove identity) where possible.
- **Access control** and encryption.
- **Retention schedules** with automatic deletion.
- **Breach response plan.**

## Worked example

**P4-style product:** an AI assistant that summarises flat expenses from users’ UPI SMS messages.

**Privacy review:**
| Data | Needed? | Decision |
|---|---|---|
| Full SMS inbox | No | Read only messages from known bank/UPI senders, on device, after explicit permission |
| Bank account numbers in SMS | No | Mask to last 4 digits on device before sending anything |
| Payee names | Yes (to match flatmates) | Send names only; store hashed IDs |
| Amounts, dates | Yes | Send |
| Full transcripts of chats with the assistant | Partly | Keep 30 days for support; redact names in logs; delete after 30 days |
| Use chats to improve prompts | Optional | Separate opt-in toggle, off by default; anonymise examples before adding to eval sets |
| AI provider | Processor | Paid tier with no-training terms; document data location; DPA (data processing agreement) |

**Notice text (in-app, short):** “To find shared expenses, we read payment SMS from banks and UPI apps on your phone. We send only amounts, dates and payee names to our AI provider to create your summary. We never read personal messages. You can turn this off anytime in Settings.”

**User controls:** toggle SMS reading; view and delete stored expenses; “Delete my account and data”.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 250" role="img" aria-labelledby="pv-t pv-d">
<title id="pv-t">Data flow with privacy controls</title>
<desc id="pv-d">User data flows from the phone through minimisation and masking, to the app server, to the AI provider as a processor, with notice and consent at the start, retention and deletion controls, and redacted logs.</desc>
<defs><marker id="pv-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<g font-size="11">
<rect x="15" y="60" width="110" height="80" rx="10" class="d-lavender d-ink" stroke-width="2"/><text x="27" y="84" class="d-text-dark" font-weight="700">User</text><text x="27" y="104" class="d-text-dark" font-size="10">Data Principal</text><text x="27" y="120" class="d-text-dark" font-size="10">notice + consent</text>
<rect x="150" y="60" width="120" height="80" rx="10" class="d-butter d-ink" stroke-width="2"/><text x="162" y="84" class="d-text-dark" font-weight="700">Minimise</text><text x="162" y="104" class="d-text-dark" font-size="10">only needed fields</text><text x="162" y="120" class="d-text-dark" font-size="10">mask identifiers</text>
<rect x="295" y="60" width="130" height="80" rx="10" class="d-sky d-ink" stroke-width="2"/><text x="307" y="84" class="d-text-dark" font-weight="700">Your company</text><text x="307" y="104" class="d-text-dark" font-size="10">Data Fiduciary</text><text x="307" y="120" class="d-text-dark" font-size="10">security, retention</text>
<rect x="450" y="60" width="175" height="80" rx="10" class="d-mint d-ink" stroke-width="2"/><text x="462" y="84" class="d-text-dark" font-weight="700">AI provider</text><text x="462" y="104" class="d-text-dark" font-size="10">Data Processor</text><text x="462" y="120" class="d-text-dark" font-size="10">no-training terms, DPA</text>
</g>
<g class="d-ink" stroke-width="2"><line x1="127" y1="100" x2="146" y2="100" marker-end="url(#pv-a)"/><line x1="272" y1="100" x2="291" y2="100" marker-end="url(#pv-a)"/><line x1="427" y1="100" x2="446" y2="100" marker-end="url(#pv-a)"/></g>
<rect x="150" y="170" width="275" height="56" rx="10" class="d-pink d-ink" stroke-width="2"/>
<text x="164" y="193" class="d-text-dark" font-size="11" font-weight="700">Rights: access · correct · erase · withdraw</text>
<text x="164" y="212" class="d-text-dark" font-size="10">grievance redressal · breach notification</text>
<rect x="450" y="170" width="175" height="56" rx="10" class="d-surface d-ink" stroke-width="2"/>
<text x="462" y="193" class="d-text" font-size="11" font-weight="700">Logs/traces</text>
<text x="462" y="212" class="d-text" font-size="10">redacted · time-limited</text>
</svg>
<figcaption>Collect less, mask early, use processors with proper terms, and give users real control.</figcaption>
</figure>

## Step by step

Writing the privacy section of your P4 responsible-AI note:

1. **Inventory** every personal data field your product touches.
2. **Justify** each by purpose; remove what isn’t needed.
3. **Map the flow**: device → your servers → AI provider → logs/analytics; list processors.
4. **Check provider terms** (training use, location, retention); prefer tiers with no-training commitments for real data.
5. **Add masking/pseudonymisation** before sending and before logging.
6. **Write a short notice** and consent flow; add separate opt-ins for secondary uses (e.g., improving the model).
7. **Set retention periods** and deletion mechanisms.
8. **Provide user controls**: view, delete, withdraw consent, grievance contact.
9. **Consider children** if minors could use the product.
10. **Plan breach response** and note who to contact.

## Common mistakes

1. **Sending full user records** to the model “for context”.
2. **Using free-tier AI services** with real personal data.
3. **Logging raw prompts and outputs** forever.
4. **Bundled consent** (“agree to everything to use the app”).
5. **Ignoring third-party data** inside user uploads.
6. **Treating privacy as legal’s job** after the product is designed.

## How it shows up in interviews

> [!INTERVIEW]
> **“How would you handle privacy for an AI feature that reads users’ documents?”**
> Outline: purpose and minimisation → notice and consent → masking and pseudonymisation → provider terms (no training, location, DPA) → retention and deletion → user rights and controls → security and breach plan → mention DPDP Act principles and involving legal.

> [!INTERVIEW]
> **“Can we use customer chats to improve our AI?”**
> Outline: depends on basis and notice → separate, specific opt-in → anonymise/pseudonymise → minimise and limit retention → access controls → document purpose → allow withdrawal → legal review.

## Practice exercise

**Task (25 minutes):** For your P4 product, write a one-page **data inventory** (field, purpose, needed?, where stored, processors, retention) and a 3-sentence user notice.

```answer Reveal a model answer (AI study helper for students)
| Field | Purpose | Needed? | Stored | Processors | Retention |
|---|---|---|---|---|---|
| Phone number | Login (OTP) | Yes | Auth DB | SMS provider | Until account deletion |
| Age / class | Content level; child safeguards | Yes | Profile DB | — | Until deletion |
| Parent’s consent record (if under 18) | Legal requirement | Yes | Consent DB | — | As required |
| Questions typed/photographed | Generate explanations | Yes | Not stored by default | AI provider (paid tier, no training) | Session only |
| Chat history | “Continue where you left off” | Optional | History DB | — | 30 days, user can delete |
| Usage events | Product improvement | Yes (minimal) | Analytics (pseudonymised ID) | Analytics tool | 12 months |
| Use questions to improve AI | Quality improvement | Optional opt-in | Anonymised eval set | — | Until withdrawn |

**Notice:** “We use your questions only to explain answers to you. Your questions are sent to our AI provider, which doesn’t use them to train its models, and we don’t store them unless you turn on chat history. If you’re under 18, we’ll ask a parent to confirm before you start, and we never show you targeted ads.”
```

## Quiz

```quiz
Q: Under the DPDP Act, what is a Data Fiduciary?
- [ ] The user whose data is processed :: That’s the Data Principal.
- [x] The organisation that decides why and how personal data is processed :: Correct. That’s usually your company.
- [ ] The government regulator :: That role belongs to the Data Protection Board.
- [ ] Any AI model :: Models aren’t legal entities.

Q: Which practice best reflects data minimisation?
- [ ] Sending the full user profile to the AI for better context :: Collects and shares more than needed.
- [x] Sending only the fields needed for the task and masking identifiers :: Correct. Less data shared means less risk.
- [ ] Keeping logs forever in case they’re useful :: Violates retention and minimisation principles.
- [ ] Asking users for Aadhaar for every feature :: Collects sensitive data without need.

Q: What does good consent look like under DPDP principles?
- [ ] Pre-ticked boxes accepting everything :: Not an affirmative, specific action.
- [x] Free, specific, informed and unambiguous, given by a clear action, and easy to withdraw :: Correct. These are the qualities the Act describes.
- [ ] Consent hidden in a long terms page :: Not informed or specific.
- [ ] Consent that can’t be withdrawn :: Withdrawal must be easy.

Q: What’s special about children’s data under the DPDP Act?
- [ ] Nothing; it’s treated the same :: Children have extra protections.
- [x] Verifiable parental consent is needed for under-18s, and tracking and targeted ads directed at children are restricted :: Correct. Plan for this in education and youth products.
- [ ] Children’s data can never be processed :: It can, with safeguards.
- [ ] Only applies to under-5s :: The Act defines children as under 18.

Q: Why avoid sending real users’ personal data to a free-tier AI service?
- [ ] Free tiers are always slower :: Speed isn’t the main concern.
- [x] Free-tier terms may allow data use for product improvement and may lack appropriate data protections :: Correct. Use tiers with suitable terms.
- [ ] Free tiers can’t process Hindi :: Unrelated: language support isn’t the privacy concern.
- [ ] It’s cheaper to use paid tiers :: Not the reason.

Q: In an AI product, which role does the AI API provider typically play?
- [ ] Data Principal :: That’s the user.
- [x] Data Processor acting on your behalf :: Correct. You remain responsible as the fiduciary.
- [ ] Regulator :: No: the regulator is the Data Protection Board, not the AI provider.
- [ ] Consent Manager :: That’s a specific registered role, not the AI provider.
```

## Key takeaways

- The **DPDP Act** governs digital personal data in India: **lawful purpose, notice, quality consent, minimisation, security, breach notification, retention limits and user rights**.
- Know the roles: **Data Principal** (user), **Data Fiduciary** (your company), **Data Processor** (e.g., AI provider).
- For AI: **minimise and mask** what models and logs see; use providers with **appropriate terms**; give users **control over memory and data**.
- **Children** need verifiable parental consent and protection from tracking and targeted ads.
- Privacy is **designed in** by PMs, with legal review; this lesson isn’t legal advice.

*Go deeper (optional):* the official DPDP Act text and rules on the Ministry of Electronics and IT (MeitY) website.
