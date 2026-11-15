export interface PromptExample {
  id: string;
  title: string;
  task: string;
  badPrompt: string;
  badOutput: string;
  problems: string[];
  goodPrompt: string;
  goodOutput: string;
  why: string[];
}

// All outputs below are illustrative, pre-written examples so the lab works fully offline.
export const PROMPT_LIBRARY: PromptExample[] = [
  {
    id: 'summarise-ticket',
    title: 'Summarise a support chat',
    task: 'Turn a long customer chat into a summary an agent can act on.',
    badPrompt: 'Summarise this chat.\n\n{chat}',
    badOutput: 'The customer contacted support about an order. They were unhappy because something went wrong with the delivery and food. The agent apologised and said they would look into it. The customer also mentioned a refund and asked about timelines, and said they had ordered before. Overall the customer was frustrated and wanted a resolution soon.',
    problems: ['No audience or purpose, so it’s vague and long', 'Misses key facts (order ID, items, amount)', 'No structure; the agent must reread to act'],
    goodPrompt: 'You summarise customer chats for support agents at a food delivery app.\n\nWrite exactly 3 bullets, under 50 words total:\n1. Problem (include order ID, item and amount if present)\n2. What has been tried\n3. What the customer wants now\n\nUse only facts in the chat. If something is missing, write "unknown".\n\n<chat>\n{chat}\n</chat>',
    goodOutput: '• Problem: Order #8812 arrived without paneer (₹110); biryani cold.\n• Tried: Agent apologised; no refund issued yet.\n• Wants: Refund for paneer today and confirmation of timeline.',
    why: ['Defines audience and purpose', 'Fixed structure the agent can scan', 'Grounding rule and “unknown” path prevent guessing'],
  },
  {
    id: 'classify-intent',
    title: 'Classify a message (structured output)',
    task: 'Route WhatsApp messages to the right support queue.',
    badPrompt: 'What is this message about?\n\n{message}',
    badOutput: 'This message seems to be about a delayed order. The customer may also be interested in a refund. It could be categorised as a delivery or payment issue depending on the context.',
    problems: ['Free text can’t be parsed by software', 'No fixed category list, so labels vary', 'Hedges between categories'],
    goodPrompt: 'Classify the message into exactly one category: late_delivery, missing_item, wrong_item, refund_status, payment_issue, other.\nReturn only JSON: {"category": "...", "confidence": "high"|"low"}.\nIf two apply, pick what the customer is most upset about.\n\nExamples:\n"bhai paise kat gaye order cancel" → {"category":"refund_status","confidence":"high"}\n"where is my order, it\'s been an hour" → {"category":"late_delivery","confidence":"high"}\n\n<message>{message}</message>',
    goodOutput: '{"category": "late_delivery", "confidence": "high"}',
    why: ['Enum makes outputs consistent', 'JSON can be validated in code', 'Hinglish example covers real inputs', 'Tie-break rule removes hedging'],
  },
  {
    id: 'explain-fund',
    title: 'Explain a mutual fund to a beginner',
    task: 'Explain fund facts simply without giving financial advice.',
    badPrompt: 'Explain this fund and tell me if it is good.\n\n{fund}',
    badOutput: 'This is an excellent large-cap fund with strong returns of 13%. It is a safe choice for beginners and you should consider investing for great long-term gains. The expense ratio is low and the alpha is impressive.',
    problems: ['Gives advice (“safe”, “should invest”), which is risky', 'Implies future returns', 'Unexplained jargon (“alpha”)'],
    goodPrompt: 'You help first-time investors in India understand mutual funds.\nRules: use only facts in <fund>; never say a fund is good, safe or recommended; never predict returns; define every financial term in brackets; if you mention past returns add "past returns don’t guarantee future returns".\nFormat: 4 short sections — What it invests in · Risk · Costs · Who it may suit. Under 120 words.\n\n<fund>{fund}</fund>',
    goodOutput: 'What it invests in: Shares of India’s largest companies.\nRisk: Very high. Its value can rise or fall a lot in the short term.\nCosts: Expense ratio (a yearly fee taken from your investment) of 0.9%.\nWho it may suit: People investing for 5+ years who can handle ups and downs. Past returns (13% a year over 5 years) don’t guarantee future returns.',
    why: ['Compliance rules stated explicitly', 'Jargon handling built in', 'Fixed format and length'],
  },
  {
    id: 'reply-review',
    title: 'Draft a reply to a negative app review',
    task: 'Reply professionally to a 1-star review.',
    badPrompt: 'Reply to this review.\n\n{review}',
    badOutput: 'We are so sorry!!! We value you deeply as a customer and we promise this will never happen again. Please give us another chance, we will refund you immediately and give you a free month!',
    problems: ['Over-promises (refund, “never again”) the company may not honour', 'Tone too gushing', 'No next step or contact path'],
    goodPrompt: 'You draft replies to app store reviews for a payments app. A human approves every reply.\nRules: be calm and specific; acknowledge the exact issue; never promise refunds, dates or compensation; never ask for card numbers, PINs or OTPs; give the support path "Help > Raise a ticket"; under 60 words.\n\n<review>{review}</review>',
    goodOutput: 'Sorry the payment showed “pending” for so long. That’s frustrating, especially for rent. Pending payments are usually resolved by your bank automatically. Please raise a ticket via Help > Raise a ticket with the transaction ID so our team can check it. We never ask for your PIN or OTP.',
    why: ['States human approval context', 'Bans risky promises', 'Adds safety reminder and clear next step'],
  },
  {
    id: 'extract-expense',
    title: 'Extract expenses from Hinglish',
    task: 'Turn a casual message into structured expenses.',
    badPrompt: 'Extract the expense: {message}',
    badOutput: 'Amount: 1000\nDescription: dinner',
    problems: ['Misreads “dedh hazaar” (1,500) as 1,000', 'No schema; missing payer and split', 'No path for unclear names'],
    goodPrompt: 'Convert the message into JSON expenses for the group <members>{members}</members>.\nAmounts are in ₹: "1.2k"=1200, "dedh hazaar"=1500, "dhai sau"=250.\nIf a name isn’t in the group, set "needs_clarification": true and ask who it is.\nSchema: {"expenses":[{"description":string,"amount":number,"paid_by":string,"split_between":[string]}],"needs_clarification":boolean,"question":string|null}\n\n<message>{message}</message>',
    goodOutput: '{"expenses":[{"description":"Dinner","amount":1500,"paid_by":"Krupa","split_between":["Krupa","Rohan","Priya"]}],"needs_clarification":false,"question":null}',
    why: ['Teaches Hindi number words', 'Schema with types', 'Clarification path instead of guessing names'],
  },
  {
    id: 'judge-faithfulness',
    title: 'LLM-as-judge: faithfulness',
    task: 'Grade whether an answer sticks to its sources.',
    badPrompt: 'Is this answer good? Rate 1-10.\n\nQuestion: {q}\nAnswer: {a}',
    badOutput: '8/10. The answer is clear and helpful, though it could be more detailed.',
    problems: ['No sources given, so it can’t judge faithfulness', 'Vague 1–10 scale', 'Mixes several criteria'],
    goodPrompt: 'You check whether an answer is fully supported by the sources.\nFAIL if the answer states any fact, number, timeline or policy not in the sources, even if it might be true. Paraphrased numbers must match exactly. Generic advice not in sources counts as unsupported.\nPASS if every claim is supported, or the answer says the information isn’t available.\nReturn JSON: {"verdict":"PASS"|"FAIL","unsupported_claim":string|null}\n\n<sources>{sources}</sources>\n<answer>{a}</answer>',
    goodOutput: '{"verdict":"FAIL","unsupported_claim":"Refunds arrive within 24 hours (sources say 5–7 working days)"}',
    why: ['One criterion, binary verdict', 'Evidence provided', 'Borderline rules spelled out', 'Explains the failure for debugging'],
  },
  {
    id: 'persona-interview',
    title: 'Practise an interview with a simulated user',
    task: 'Rehearse discovery interview technique.',
    badPrompt: 'Pretend to be a user and tell me what features you want in an expense app.',
    badOutput: 'I would love an app with automatic splitting, reminders, charts, AI insights, dark mode and integration with all my bank accounts!',
    problems: ['Asks for feature wishes (opinions about the future)', 'Produces generic, unrealistic answers', 'Doesn’t help practise good questions'],
    goodPrompt: 'Role-play Priya, 26, who shares a flat in Bengaluru with two people. You split groceries, Wi-Fi and the cook’s salary. You dislike asking friends for money. Answer only what I ask, briefly, like a real person, with specific past examples. Don’t suggest features. If I ask a leading or future-focused question, answer vaguely, as real people do.\nI’ll interview you. After I type "END", score my questions 1–5 on past-behaviour focus and neutrality, with one tip.',
    goodOutput: '(As Priya) Last month? Ugh. I paid the cook ₹6,000 in cash and the Wi-Fi bill, and Rohan did groceries. We tried to settle on WhatsApp but it got messy because he’d bought some protein bars only he eats. We just rounded it off…',
    why: ['Specific persona and context', 'Realistic behaviour, including vague answers to bad questions', 'Built-in feedback on your technique'],
  },
  {
    id: 'prd-critique',
    title: 'Critique a PRD like an engineer',
    task: 'Find gaps before a real developer review.',
    badPrompt: 'Is my PRD good?\n\n{prd}',
    badOutput: 'Your PRD looks good! It covers the problem and the solution well. Maybe add a few more details.',
    problems: ['Invites flattery, not critique', 'No perspective or criteria', 'Unactionable feedback'],
    goodPrompt: 'Act as a senior backend engineer reviewing this PRD before sprint planning.\nList up to 10 open questions you would need answered to estimate and build it, grouped as: missing edge cases · unclear requirements · data/API questions · non-functional (performance, security) · rollout.\nFor each: the question and why it matters. Don’t praise; be specific.\n\n<prd>{prd}</prd>',
    goodOutput: 'Missing edge cases\n1. What happens if UPI payment stays pending >10 min? (Affects duplicate-payment handling.)\nUnclear requirements\n2. Is the payee one person or each creditor? (Changes the data model.)\nNon-functional\n3. How many groups receive summaries on the 1st? (Sets batch job capacity.)…',
    why: ['Assigns a critical persona', 'Structured categories mirror real reviews', 'Explicitly bans flattery'],
  },
];
