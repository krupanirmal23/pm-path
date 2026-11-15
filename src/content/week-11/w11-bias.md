---
id: w11-bias
title: Bias and fairness
week: 11
estimatedMinutes: 14
tags: [ai, fairness, responsible-ai]
---

## Why this matters for a PM

AI systems learn from data that reflects society, including its unfairness. Left unchecked, they can work worse for some groups, stereotype people, or make unfair decisions about loans, jobs or prices. In India, with its diversity of languages, regions, castes, religions, genders and incomes, these risks are real. PMs decide where AI is used, what it’s tested on, and which outcomes are monitored, so fairness is a product responsibility.

## Core concepts

### What bias means here

**Bias** in AI means systematic differences in how a system treats or performs for different groups, in ways that are unfair or harmful. Not every difference is unfair (a children’s product behaving differently for adults is fine), so judging fairness requires context and values.

### Where bias comes from

1. **Training data:** if text online over-represents some groups or contains stereotypes, models absorb them (e.g., associating certain jobs with a gender).
2. **Representation gaps:** less data for some languages, dialects, regions or accents → worse performance (e.g., speech recognition struggling with some regional accents; weaker quality in lower-resource Indian languages).
3. **Labelling bias:** human labellers bring their own assumptions.
4. **Proxy variables:** a feature that seems neutral (PIN code, device type, name) can stand in for caste, religion or income.
5. **Feedback loops:** a system that shows fewer opportunities to a group gets less engagement data from them, reinforcing the gap.
6. **Product design choices:** English-only interfaces, assumptions about literacy, or default settings that suit some users more than others.

### Types of harm

- **Quality-of-service harm:** the product works worse for some groups (lower accuracy in Tamil than English; voice features failing for certain accents).
- **Allocation harm:** unfair distribution of opportunities or resources (credit limits, job shortlists, delivery coverage, prices).
- **Representational harm:** stereotyping, demeaning or erasing groups in generated content.
- **Dignity and safety harms:** offensive outputs targeting identities.

### Fairness for generative AI in practice

For LLM features, focus on:
- **Performance parity:** does quality hold across languages, regions and user types? Measure eval pass rates per segment.
- **Stereotype checks:** prompts that mention different groups should get consistent, respectful treatment (swap names, genders, religions, regions and compare outputs: **counterfactual testing**).
- **Content policies:** refuse or carefully handle requests for demeaning content.
- **Inclusive defaults:** examples, images and language that reflect your diverse users.

### Fairness for decisions (classic ML and rules)

When AI influences decisions about people (credit, hiring, pricing, fraud flags):
- Avoid using protected characteristics directly, and check for **proxies**.
- Measure outcome rates across groups (e.g., approval rates, false positive rates for fraud flags) where legally and ethically appropriate.
- Provide **explanations** and **human review/appeal** paths.
- Be careful: different mathematical fairness definitions can conflict; choose with stakeholders based on context.

### Mitigation steps PMs can drive

- **Diverse eval sets:** include languages, dialects, regions, genders, ages and abilities your users represent.
- **Segmented metrics:** report quality and outcomes by segment, not just overall.
- **Counterfactual tests:** swap identity attributes and compare.
- **Diverse testers:** include users from different backgrounds in usability tests and red-teaming.
- **Human oversight** for consequential decisions.
- **Feedback and appeal channels.**
- **Document** known limitations honestly (in the product and in your responsible-AI note).

## Worked example

**Feature (P4-style):** an AI resume feedback tool for first-time job seekers in India.

**Fairness review:**
1. **Counterfactual test:** the same resume submitted with 10 different names (varying apparent gender, religion and region) and two college types (tier 1 vs. tier 3).
   - Finding: feedback for tier-3 college resumes was more negative in tone (“consider gaining more credible experience”) even when content was identical apart from the college name. Gender-swapped versions got similar feedback, except “leadership” was suggested more often for male names.
2. **Language parity:** resumes in English got specific feedback; Hindi-mixed resumes got vague feedback (eval pass rate 86% vs. 61%).
3. **Mitigations:**
   - System prompt: “Evaluate only the content of experiences and skills. Do not comment on college prestige, names, gender or background.”
   - Remove names and college names from the text sent to the model (pseudonymise) for the feedback step.
   - Add 15 Hindi-mixed resumes to the eval set with good reference feedback; few-shot examples in Hinglish.
   - Re-test: counterfactual differences eliminated on 18 of 20 pairs; Hindi-mixed pass rate 82%.
4. **Ongoing:** segment 👍/👎 rates by input language; quarterly counterfactual audit; known limitation stated in the app.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 250" role="img" aria-labelledby="bi-t bi-d">
<title id="bi-t">Segmented evaluation and counterfactual testing</title>
<desc id="bi-d">A bar chart of eval pass rates by segment showing a gap for one language, and a counterfactual test where two inputs differ only in a name and their outputs are compared.</desc>
<text x="20" y="24" class="d-text" font-weight="700" font-size="12">Pass rate by segment</text>
<line x1="30" y1="200" x2="320" y2="200" class="d-ink" stroke-width="2"/>
<g class="d-ink" stroke-width="1.5">
<rect x="45" y="56" width="50" height="144" class="d-mint"/><rect x="115" y="62" width="50" height="138" class="d-mint"/><rect x="185" y="100" width="50" height="100" class="d-pink"/><rect x="255" y="70" width="50" height="130" class="d-mint"/>
</g>
<g class="d-text" font-size="10"><text x="48" y="218">English</text><text x="120" y="218">Tier-1 city</text><text x="188" y="218">Hinglish</text><text x="258" y="218">Tier-3 city</text></g>
<text x="190" y="94" class="d-text" font-size="11" font-weight="700">61% ⚠</text>
<text x="52" y="50" class="d-text" font-size="11">86%</text>
<line x1="340" y1="20" x2="340" y2="230" class="d-ink" stroke-width="1" stroke-dasharray="4 4"/>
<text x="360" y="24" class="d-text" font-weight="700" font-size="12">Counterfactual test</text>
<rect x="360" y="40" width="120" height="50" rx="8" class="d-sky d-ink" stroke-width="2"/><text x="370" y="62" class="d-text-dark" font-size="10">Resume, name: Rahul</text><text x="370" y="78" class="d-text-dark" font-size="10">identical content</text>
<rect x="500" y="40" width="120" height="50" rx="8" class="d-sky d-ink" stroke-width="2"/><text x="510" y="62" class="d-text-dark" font-size="10">Resume, name: Ayesha</text><text x="510" y="78" class="d-text-dark" font-size="10">identical content</text>
<rect x="360" y="120" width="260" height="80" rx="8" class="d-butter d-ink" stroke-width="2"/>
<text x="372" y="144" class="d-text-dark" font-size="11" font-weight="700">Compare outputs</text>
<text x="372" y="164" class="d-text-dark" font-size="10">Same score? Same tone? Same suggestions?</text>
<text x="372" y="182" class="d-text-dark" font-size="10">Differences = bias to investigate</text>
<line x1="420" y1="92" x2="460" y2="118" class="d-ink" stroke-width="2"/><line x1="560" y1="92" x2="520" y2="118" class="d-ink" stroke-width="2"/>
</svg>
<figcaption>Averages hide gaps. Segment your evals and run counterfactual swaps.</figcaption>
</figure>

## Step by step

A fairness check for P4:

1. **Identify affected groups** relevant to your users (language, region, gender, age, ability, income, education).
2. **Ask where harm could occur**: quality of service, allocation, representation, dignity.
3. **Segment your eval set** and compare pass rates.
4. **Run 10–20 counterfactual pairs** (swap names, genders, regions, languages).
5. **Check proxies** in any decision-like outputs.
6. **Mitigate**: prompt rules, pseudonymisation, more diverse examples, routing to better models for weaker languages, human review.
7. **Re-test** and record before/after.
8. **Document known limitations** in your responsible-AI note and the product UI where relevant.
9. **Monitor** segmented feedback after launch.

## Common mistakes

1. **Looking only at overall accuracy.**
2. **Testing only in English** with urban, educated personas.
3. **Assuming removing a sensitive field removes bias** (proxies remain).
4. **No appeal or feedback path** for affected users.
5. **Treating fairness as a one-time audit.**
6. **Overclaiming** (“our AI is unbiased”).

## How it shows up in interviews

> [!INTERVIEW]
> **“How would you ensure your AI feature is fair?”**
> Outline: define relevant groups and possible harms → segmented evals and counterfactual tests → check proxies → mitigations (data, prompts, pseudonymisation, human review) → transparency and appeal → ongoing monitoring → honesty about limitations.

> [!INTERVIEW]
> **“Your voice assistant works worse for users in some states. What do you do?”**
> Outline: measure by region/accent/language → find causes (data gaps, model limits) → targeted data collection with consent, model or provider choice for those languages, fallback to text/buttons → set parity targets → monitor.

## Practice exercise

**Task (25 minutes):** Design a fairness test plan for **an AI that suggests credit card limits based on users’ transaction summaries** (a decision-like feature). Include groups to check, 3 counterfactual tests, proxy risks, mitigations, and whether an LLM should make this decision at all.

```answer Reveal a model answer
- **Should an LLM decide?** No. Credit limits are high-stakes, regulated and need consistency and explainability. Use a validated credit model with documented features, human oversight for edge cases, and an LLM at most to explain the decision in plain language using approved reasons.
- **Groups to check:** gender, age, region/state, urban vs. rural, language, income band (where data allows and is lawful).
- **Counterfactual tests (on the explanation layer and any AI-assisted step):** same transactions with different names (gender/religion signals); same transactions with different PIN codes (urban/rural); same profile with transaction descriptions in Hindi vs. English.
- **Proxy risks:** PIN code (region/caste/income), merchant types (religious places, specific community stores), device type, name.
- **Mitigations:** exclude or carefully review proxy features; monitor approval rates and limit distributions by group; human review and appeal; clear, consistent reasons; regular fairness audits with compliance.
```

## Quiz

```quiz
Q: Which is a quality-of-service harm?
- [ ] Denying loans unfairly to a group :: That’s an allocation harm.
- [x] A voice feature that works worse for certain regional accents :: Correct. The product serves some groups less well.
- [ ] Generating a stereotype in a story :: That’s a representational harm.
- [ ] A server outage for everyone :: Affects all users equally; not a fairness harm.

Q: What is counterfactual testing?
- [ ] Testing with fake data only :: Not the definition.
- [x] Changing only an identity attribute (like name or gender) and comparing outputs :: Correct. Differences suggest bias.
- [ ] Testing the opposite feature :: Not the meaning.
- [ ] Testing after launch only :: It can be done any time, ideally before launch.

Q: Why isn’t removing gender and religion fields enough to prevent bias?
- [ ] Models ignore removed fields anyway :: That’s the goal, but bias can persist.
- [x] Other features like names or PIN codes can act as proxies for those attributes :: Correct. Check proxies, not just the obvious fields.
- [ ] Removing fields is illegal :: It isn’t illegal; it’s just not sufficient on its own.
- [ ] Bias only comes from labels :: It comes from many sources.

Q: Your eval pass rate is 85% overall, but 60% for Hinglish inputs. What should you do?
- [ ] Report 85% and move on :: Hides a serious gap for many users.
- [x] Treat it as a quality gap: add Hinglish examples, adjust prompts or models, and set a target for that segment :: Correct. Segment gaps are product bugs to fix.
- [ ] Block Hinglish users :: Excludes users rather than fixing the product.
- [ ] Ignore it because Hinglish is informal :: Many Indian users write this way.

Q: Which statement is most responsible to put in a product?
- [ ] “Our AI is completely unbiased.” :: An overclaim no system can guarantee.
- [x] “Our assistant may be less accurate in some languages; tell us if something seems wrong.” :: Correct. Honest about limits with a feedback path.
- [ ] Nothing at all :: Users deserve to know key limitations.
- [ ] “AI decides, no appeals.” :: Removes recourse for affected users.
```

## Key takeaways

- **Bias** = systematic, unfair differences in how AI treats or serves groups.
- Sources: **training data, representation gaps, labelling, proxies, feedback loops, design choices**.
- Harms: **quality of service, allocation, representation, dignity**.
- Test with **segmented evals** and **counterfactual swaps**; watch **proxies**.
- Mitigate, keep **humans and appeals** for consequential decisions, monitor continuously, and **be honest about limitations**.
