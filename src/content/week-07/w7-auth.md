---
id: w7-auth
title: Authentication
week: 7
estimatedMinutes: 14
tags: [technical, security, auth]
---

## Why this matters for a PM

Login is the front door of every product. It’s where users drop off (OTP not arriving), where security incidents start (account takeovers), and where regulation bites (KYC in fintech). PMs make real decisions here: OTP vs. password, how long sessions last, when to ask for re-verification. Understanding the basics helps you balance security and friction.

## Core concepts

### Authentication vs. authorisation

- **Authentication (AuthN):** proving *who you are*. “This is Krupa.”
- **Authorisation (AuthZ):** deciding *what you’re allowed to do*. “Krupa can view her orders but not other users’ orders; an admin can issue refunds.”

A system can authenticate you correctly and still wrongly authorise you (a bug that lets users see others’ data). Both matter.

### Authentication factors

Ways to prove identity fall into three categories:
1. **Something you know:** password, PIN (UPI PIN), security answer.
2. **Something you have:** your phone (receives an OTP), a hardware key, a registered device.
3. **Something you are:** fingerprint, face (biometrics).

**Multi-factor authentication (MFA / 2FA)** combines two or more categories, e.g., password + OTP. UPI combines “something you have” (your registered phone with the SIM bound to the bank account) and “something you know” (UPI PIN).

### Common login methods in India

- **Phone number + OTP:** the dominant pattern (Swiggy, Zepto, Ola). A **one-time password (OTP)** is a short code sent by SMS (or WhatsApp) that expires quickly. Pros: no password to remember; works for first-time internet users. Cons: SMS delivery delays and costs, SIM-swap fraud risk, and OTP-sharing scams.
- **Email/password:** common for B2B and web products. Passwords must be stored **hashed** (transformed one-way so even the company can’t read them), never in plain text.
- **Social login / SSO:** “Continue with Google”. **SSO (single sign-on)** lets users log in with an existing account. Built on standards like **OAuth 2.0** and **OpenID Connect (OIDC)**. Pros: fast, no new password. Cons: dependence on the provider; less data if users decline permissions.
- **Biometrics / device unlock:** after first login, apps let users unlock with fingerprint or face (the phone verifies it locally and unlocks a stored credential).
- **Passkeys:** a newer passwordless standard using cryptographic keys stored on the device, unlocked by biometrics. Growing in adoption.

### Sessions and tokens

After login, the server doesn’t make you log in for every request. It gives the client a **token** (or a **session cookie** on the web) that proves you’re logged in.

- **Access token:** sent with each API request (often in a header). Short-lived (minutes to hours) to limit damage if stolen.
- **Refresh token:** longer-lived; used to get new access tokens without asking the user to log in again.
- **JWT (JSON Web Token):** a common token format that contains signed information (user ID, expiry).

**Session length is a product decision.** A food app might keep you logged in for months; a banking app logs you out after a few minutes of inactivity and asks for a PIN or biometric to reopen.

### Step-up authentication

**Step-up authentication** asks for extra verification only for sensitive actions: changing the registered phone number, adding a payee, withdrawing money, viewing full card details. This keeps everyday use smooth while protecting risky moments.

### OAuth for third-party access

**OAuth 2.0** lets a user grant one app limited access to their data in another service, without sharing their password. Example: an expense app reads your Gmail receipts after you click “Allow” on a Google consent screen. The app gets a token with specific **scopes** (permissions), like “read email” only.

### Security basics PMs should push for

- **Rate limiting** on login and OTP requests (stops brute-force guessing and SMS bombing).
- **OTP expiry** (e.g., 5 minutes) and limited attempts.
- **Device binding** for high-risk products (fintech).
- **Alerts** for new device logins.
- **Never logging sensitive data** (passwords, OTPs, full card numbers).
- **Clear account recovery** that isn’t easier to abuse than login itself.

### KYC is not login

**KYC (Know Your Customer)** is identity verification required by regulators (RBI, SEBI) for financial products: verifying PAN, Aadhaar (e.g., via DigiLocker or Aadhaar OTP), bank account, sometimes a video check. KYC proves *the real-world identity* behind an account; authentication proves *the same person is coming back*.

## Worked example

**PM decision: login for a new investing app (Groww-like).**

**Requirements:**
- First-time investors (low friction) but money at stake (high security).
- Regulatory KYC needed before investing.

**Design:**
1. **Sign-up:** phone number + OTP (familiar, fast). Optional “Continue with Google” to prefill email.
2. **App unlock:** set a 4-digit app PIN or enable fingerprint/face after first login; required every time the app opens after 5 minutes in the background.
3. **Session:** access token valid for 15 minutes; refresh token for 30 days, revoked on logout or new-device login.
4. **Step-up:** OTP + PIN for changing bank account, phone number or email, and for withdrawals above a threshold.
5. **New device:** log out other devices for sensitive actions; send an alert “New login on Redmi Note 12 in Pune”.
6. **Abuse controls:** max 5 OTP requests per hour per number; lockout after 5 wrong PIN attempts.

**Metrics:** OTP delivery success rate and time (p95 under 10 seconds), sign-up completion, unlock success rate, account takeover incidents (guardrail), support tickets about login.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 230" role="img" aria-labelledby="au-t au-d">
<title id="au-t">Login and token flow</title>
<desc id="au-d">User enters phone, server sends OTP, user verifies, server returns access and refresh tokens, app uses access token on API requests and refreshes it when it expires.</desc>
<defs><marker id="au-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<rect x="20" y="30" width="120" height="170" rx="14" class="d-lavender d-ink" stroke-width="2"/>
<text x="54" y="58" class="d-text-dark" font-weight="700">App</text>
<rect x="500" y="30" width="120" height="170" rx="14" class="d-sky d-ink" stroke-width="2"/>
<text x="530" y="58" class="d-text-dark" font-weight="700">Server</text>
<g class="d-ink" stroke-width="2">
<line x1="142" y1="75" x2="496" y2="75" marker-end="url(#au-a)"/>
<line x1="496" y1="100" x2="142" y2="100" marker-end="url(#au-a)"/>
<line x1="142" y1="125" x2="496" y2="125" marker-end="url(#au-a)"/>
<line x1="496" y1="150" x2="142" y2="150" marker-end="url(#au-a)"/>
<line x1="142" y1="178" x2="496" y2="178" marker-end="url(#au-a)"/>
</g>
<text x="160" y="70" class="d-text" font-size="11">1. Phone number</text>
<text x="300" y="95" class="d-text" font-size="11">2. OTP sent via SMS</text>
<text x="160" y="120" class="d-text" font-size="11">3. OTP entered (expires in 5 min)</text>
<text x="250" y="145" class="d-text" font-size="11">4. Access token (15 min) + refresh token (30 d)</text>
<text x="160" y="173" class="d-text" font-size="11">5. API calls carry the access token</text>
<text x="160" y="220" class="d-text" font-size="11">Sensitive action? Step-up: ask for PIN/OTP again.</text>
</svg>
<figcaption>Authenticate once, then prove it on each request with short-lived tokens; step up for risky actions.</figcaption>
</figure>

## Step by step

Specifying authentication for a feature:

1. **Classify sensitivity**: what’s the worst thing an attacker could do with this account?
2. **Pick the login method(s)** that fit your users (OTP, social, email, passkeys).
3. **Decide session length** and unlock behaviour (PIN/biometric) by risk.
4. **List step-up actions** that need re-verification.
5. **Define abuse controls**: rate limits, OTP expiry, lockouts, new-device alerts.
6. **Design recovery**: lost phone, changed number, forgotten PIN.
7. **Write error states**: OTP not received (resend timer, call option), wrong OTP, too many attempts.
8. **Set metrics**: OTP success and latency, sign-up completion, takeover incidents, login support tickets.

## Common mistakes

1. **Treating authentication and authorisation as the same.**
2. **Same session rules for everything**; a food app and a trading app need different risk settings.
3. **No rate limits on OTP**, leading to SMS cost spikes and abuse.
4. **Weak recovery flows** that attackers use to take over accounts.
5. **Ignoring OTP delivery failures**, a major silent drop-off in India.
6. **Asking for too many permissions** in OAuth, scaring users away.

## How it shows up in interviews

> [!INTERVIEW]
> **“OTP-based sign-up completion dropped 8%. What would you check?”**
> Outline: OTP delivery rate and time by telecom operator and region (SMS provider issue?) → DLT/template or sender changes → app version bugs in auto-read → rate limiting blocking legitimate users → fallback options (WhatsApp OTP, voice call).

> [!INTERVIEW]
> **“How would you balance security and ease of use for a payments app?”**
> Outline: segment actions by risk → low friction for low-risk (viewing balance with biometric) → step-up for high-risk (new payee, large amounts) → device binding → monitoring and alerts → measure both conversion and fraud.

## Practice exercise

**Task (20 minutes):** Design the authentication approach for **CRED’s “pay rent with credit card” feature**. Include login method, session/unlock, 3 step-up actions, 3 abuse controls, and 2 metrics.

```answer Reveal a model answer
- **Login:** phone + OTP at sign-up, with device binding; email for statements.
- **Session/unlock:** app PIN or biometric on every open after 2 minutes in background; tokens refreshed silently; logout other devices on new-device login.
- **Step-up actions:** adding a new landlord bank account/UPI ID; changing the registered phone or email; paying more than ₹50,000 in a single transaction (OTP from card issuer via 3-D Secure also applies).
- **Abuse controls:** limit new payee additions per day; cooling-off period (e.g., 30 minutes) before first payment to a new payee; alerts by SMS and email for every rent payment and new device login.
- **Metrics:** rent payment completion rate (conversion); fraud/chargeback rate per 1,000 rent payments (guardrail).
```

## Quiz

```quiz
Q: What’s the difference between authentication and authorisation?
- [ ] They mean the same thing :: They’re related but different steps.
- [x] Authentication proves who you are; authorisation decides what you can do :: Correct. Both must be right: correct identity and correct permissions.
- [ ] Authorisation happens before authentication :: Usually identity is established first.
- [ ] Authentication is only for admins :: Every user authenticates.

Q: UPI payment approval combines which factors?
- [ ] Only something you know :: The registered phone/SIM binding adds another factor.
- [x] Something you have (the bound phone) and something you know (UPI PIN) :: Correct. Two different factor types make it multi-factor.
- [ ] Only biometrics :: UPI PIN is still required for most payments.
- [ ] Email and password :: Not how UPI works.

Q: Why are access tokens usually short-lived?
- [ ] To make users log in often :: Refresh tokens avoid that.
- [x] To limit damage if a token is stolen :: Correct. A stolen short-lived token expires quickly.
- [ ] Because servers can’t store them :: Storage isn’t the reason.
- [ ] Because JSON can’t hold dates :: JSON can hold dates as text.

Q: Which is the best example of step-up authentication?
- [ ] Asking for OTP every time the user opens the menu :: Too much friction for a low-risk action.
- [x] Asking for PIN + OTP before changing the linked bank account :: Correct. Extra checks for a high-risk action.
- [ ] Never asking again after first login :: Risky for sensitive actions.
- [ ] Asking for a selfie on every order :: Excessive for most products.

Q: What does OAuth let a user do?
- [ ] Share their password with another app :: OAuth avoids sharing passwords.
- [x] Grant an app limited access to their data in another service via scoped tokens :: Correct. Scopes limit what the app can do, and no password is shared.
- [ ] Complete KYC :: KYC is separate regulatory identity verification.
- [ ] Encrypt their phone :: Unrelated: OAuth is about delegated access, not device encryption.

Q: Why should OTP requests be rate limited?
- [ ] To save battery :: Not the reason.
- [x] To prevent brute-force guessing, SMS cost abuse and spamming users :: Correct. Limits protect users, security and your SMS bill.
- [ ] Because SMS is free :: SMS costs money, which is part of the reason.
- [ ] It isn’t necessary :: It’s an important control.
```

## Key takeaways

- **Authentication** = who you are; **authorisation** = what you can do. Both must be right.
- Factors: **know** (PIN), **have** (phone), **are** (biometric); combine them for **MFA**.
- After login, **short-lived access tokens + refresh tokens** keep sessions secure and smooth.
- Use **step-up authentication** for risky actions; tune session length to the product’s risk.
- Push for **rate limits, OTP expiry, alerts and solid recovery**; KYC is separate from login.
