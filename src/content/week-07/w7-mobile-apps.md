---
id: w7-mobile-apps
title: How mobile apps are built and released
week: 7
estimatedMinutes: 14
tags: [technical, mobile, release]
---

## Why this matters for a PM

India is a mobile-first market: for most users, the product *is* the app. Mobile has constraints the web doesn’t: app store reviews, users who don’t update, thousands of Android device models, low storage, patchy networks. A fix that takes minutes on a website can take days to reach mobile users. PMs who understand the mobile release cycle plan better launches and avoid painful surprises.

## Core concepts

### Native, cross-platform and web

- **Native apps:** built separately for each platform using its own language and tools: **Android** (Kotlin/Java, Android Studio) and **iOS** (Swift, Xcode). Best performance and access to device features; two codebases to maintain.
- **Cross-platform apps:** one codebase that runs on both, using frameworks like **React Native** (JavaScript/TypeScript) or **Flutter** (Dart). Faster to build for both; sometimes harder for complex, performance-critical features. Many Indian startups use these.
- **Web apps / PWAs:** websites that work well on mobile; a **PWA (progressive web app)** can be installed on the home screen and work offline. No app store needed; limited access to some device features.
- **Hybrid in practice:** many big apps mix approaches: native shell with some screens as web views or cross-platform modules.

### Android vs. iOS in India

Android has the vast majority of Indian smartphone users, across a huge range of devices (from ₹6,000 phones to flagships). iOS users are fewer but often higher-spending. Implications:
- **Design and test for low-end Android**: limited RAM and storage, slower CPUs, older OS versions.
- **App size matters**: users with full storage uninstall big apps. Some companies build **“lite” apps**.
- **Feature parity** decisions: launch on Android first? Both at once?

### How a release works

1. **Development** on feature branches; code review; automated tests.
2. **Build:** compile the app into an installable package (an **APK/AAB** for Android, an **IPA** for iOS).
3. **Internal testing (QA):** testers and employees use pre-release builds (TestFlight on iOS; internal testing tracks on Google Play).
4. **Beta:** optional external testers.
5. **Store submission:** upload to **Google Play Console** and **App Store Connect** with release notes and screenshots.
6. **Store review:** Apple reviews every update (usually within a day or two, sometimes longer, and can reject); Google also reviews, typically faster.
7. **Phased (staged) rollout:** release to a percentage of users (e.g., 1% → 5% → 20% → 100%) over days, watching crash rates and reviews. Both stores support this; you can pause a rollout if something breaks.
8. **Users update:** many have auto-update; many don’t. Weeks later, a meaningful share is still on old versions.

Many teams run a fixed **release train**: e.g., a new app version every 1–2 weeks, with a **code freeze** a few days before, regardless of which features are ready. Features that miss the train wait for the next one (or ship hidden behind flags).

### The update problem

Unlike a website, you can’t instantly change the app on everyone’s phone:
- **Old versions linger**, so your servers must support several app versions at once (that’s why APIs are versioned).
- **Forced updates:** for critical fixes, apps can show a “Please update to continue” screen (use sparingly).
- **Remote config and feature flags:** change behaviour (turn features on/off, change text, limits) without a new release. Essential for mobile.
- **Server-driven UI:** some screens are defined by the server (layouts, banners), so they can change without an app update.
- **Over-the-air (OTA) updates:** some cross-platform frameworks can push certain code changes without a store release, within store policies.

### Quality signals for mobile

- **Crash-free sessions / users:** % of sessions without a crash (healthy apps aim for 99.5%+).
- **ANRs (Application Not Responding)** on Android: the app freezes; Google Play penalises high rates.
- **App start time** (cold start), **app size**, **battery and data usage**.
- **App store rating and reviews**, which affect discoverability.
- Tools: Firebase Crashlytics, Play Console vitals, Xcode Organizer.

### Permissions and platform rules

Apps must ask for permissions (location, contacts, camera, notifications) and follow store policies (payments for digital goods, data safety disclosures, privacy labels). Asking for permissions at the wrong time (on first open, with no explanation) causes many users to deny them. Ask in context, with a reason (“Allow location to find restaurants near you”).

## Worked example

**Scenario:** Your team is launching “scheduled orders” on a food app. Marketing wants it live for a campaign on the 15th.

**PM plan with mobile constraints:**
- **Release train:** versions ship every Tuesday; code freeze Friday before. The feature must be code-complete by Friday the 6th to make the Tuesday 10th train. Store review buffer: 1–3 days (iOS especially).
- **Feature flag:** ship the code in version 8.4 *hidden*, then turn it on remotely on the 15th, at the same time on both platforms, regardless of review timing.
- **Old versions:** users on 8.3 or below won’t see the feature. On the 15th, maybe 60–70% of active users have 8.4. The campaign message includes “Update your app to try it”, and the server returns a friendly “update needed” prompt to old versions that tap the campaign link.
- **Phased rollout:** 8.4 goes 5% → 25% → 100% between the 10th and 13th, watching crash-free rate (≥ 99.5%) and ANRs.
- **Kill switch:** if scheduled orders cause issues on the 15th, turn the flag off instantly.

## Visual

<figure class="diagram">
<svg viewBox="0 0 640 220" role="img" aria-labelledby="mr-t mr-d">
<title id="mr-t">Mobile release pipeline</title>
<desc id="mr-d">Steps: develop, build, QA, store review, phased rollout, and users updating over weeks, with feature flags allowing remote control.</desc>
<defs><marker id="mr-a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="d-fill-ink"/></marker></defs>
<g font-size="11">
<rect x="10" y="60" width="90" height="56" rx="10" class="d-lavender d-ink" stroke-width="2"/><text x="22" y="92" class="d-text-dark" font-weight="700">Develop</text>
<rect x="115" y="60" width="90" height="56" rx="10" class="d-lavender d-ink" stroke-width="2"/><text x="132" y="92" class="d-text-dark" font-weight="700">Build</text>
<rect x="220" y="60" width="90" height="56" rx="10" class="d-sky d-ink" stroke-width="2"/><text x="232" y="85" class="d-text-dark" font-weight="700">QA / beta</text><text x="232" y="101" class="d-text-dark">TestFlight</text>
<rect x="325" y="60" width="95" height="56" rx="10" class="d-pink d-ink" stroke-width="2"/><text x="335" y="85" class="d-text-dark" font-weight="700">Store review</text><text x="335" y="101" class="d-text-dark">1–3 days</text>
<rect x="435" y="60" width="95" height="56" rx="10" class="d-butter d-ink" stroke-width="2"/><text x="445" y="85" class="d-text-dark" font-weight="700">Phased</text><text x="445" y="101" class="d-text-dark">1→5→20→100%</text>
<rect x="545" y="60" width="85" height="56" rx="10" class="d-mint d-ink" stroke-width="2"/><text x="555" y="85" class="d-text-dark" font-weight="700">Users</text><text x="555" y="101" class="d-text-dark">update slowly</text>
</g>
<g class="d-ink" stroke-width="2"><line x1="102" y1="88" x2="111" y2="88" marker-end="url(#mr-a)"/><line x1="207" y1="88" x2="216" y2="88" marker-end="url(#mr-a)"/><line x1="312" y1="88" x2="321" y2="88" marker-end="url(#mr-a)"/><line x1="422" y1="88" x2="431" y2="88" marker-end="url(#mr-a)"/><line x1="532" y1="88" x2="541" y2="88" marker-end="url(#mr-a)"/></g>
<rect x="150" y="150" width="340" height="44" rx="10" class="d-surface d-ink" stroke-width="2" stroke-dasharray="6 4"/>
<text x="164" y="177" class="d-text" font-size="12">Feature flags + remote config: change behaviour without a release</text>
</svg>
<figcaption>Plan around trains, review time and slow updates; use flags to control launch timing.</figcaption>
</figure>

## Step by step

Planning a mobile feature launch:

1. **Check the release calendar**: which train can this make? When is code freeze?
2. **Add store review buffer** (especially iOS).
3. **Ship behind a feature flag** so launch timing isn’t tied to review or adoption.
4. **Plan for old versions**: what do users on older versions see? Is an update prompt needed?
5. **Define minimum supported OS versions and devices**; test on low-end Android.
6. **Use phased rollout** and watch crash-free rate, ANRs and reviews.
7. **Prepare a kill switch** and rollback plan (you can’t un-release an app version, but you can turn features off).
8. **Mind app size and permissions**; ask for permissions in context.

## Common mistakes

1. **Promising a launch date without considering store review and release trains.**
2. **Assuming everyone updates**; old versions break or miss features.
3. **Testing only on flagship phones.**
4. **Bloating app size** with heavy libraries and assets.
5. **Asking for all permissions on first launch.**
6. **No flags**, so a bug requires a full release cycle to fix.

## How it shows up in interviews

> [!INTERVIEW]
> **“A critical bug is found in the new app version after 20% rollout. What do you do?”**
> Outline: halt the phased rollout → turn off the feature via flag if possible → assess impact (crash rate, affected users) → hotfix build → expedited review if needed → communicate to support and users → postmortem.

> [!INTERVIEW]
> **“Should we build native or cross-platform?”**
> Outline: depends on team skills, performance needs, device features, time to market, and long-term maintenance → cross-platform for faster parity with smaller teams → native for performance-critical or deeply platform-integrated features → many companies mix.

## Practice exercise

**Task (20 minutes):** You’re launching a new “UPI Lite” payment option in a payments app in 3 weeks. Write a release plan: target train, flag strategy, old-version handling, rollout steps with metrics, and kill-switch criteria.

```answer Reveal a model answer
- **Target train:** code-complete by day 8 for the day-12 release train (code freeze day 9); allows 2–3 days of store review and a phased rollout before launch on day 21.
- **Flag strategy:** UPI Lite code ships hidden in v6.2; enabled via remote config for employees (day 14), 1% of eligible users (day 16), 10% (day 18), 50% (day 19), 100% on day 21 if guardrails hold.
- **Old versions:** users below v6.2 don’t see UPI Lite; the server hides UPI Lite promotions for them and shows “Update to use UPI Lite” where relevant. No forced update.
- **Metrics per step:** UPI Lite payment success rate (≥ 99%); crash-free sessions (≥ 99.6%); ANR rate unchanged; support tickets on wallet balance mismatches; reconciliation discrepancies (must be zero).
- **Kill switch:** turn off if success rate < 98% for 15 minutes, any balance reconciliation mismatch, or crash rate rises more than 0.2 percentage points.
```

## Quiz

```quiz
Q: Why is a feature flag especially valuable on mobile?
- [ ] It makes the app smaller :: Flags don’t meaningfully change app size.
- [x] It lets you turn features on or off without waiting for a new store release :: Correct. It decouples launch timing from store review and user updates.
- [ ] It removes the need for QA :: You still need testing.
- [ ] It forces all users to update :: That’s a forced update, a different mechanism.

Q: What is a phased (staged) rollout?
- [ ] Releasing different features in different countries :: That’s a geographic launch, not a staged rollout.
- [x] Releasing a new version to a growing percentage of users while monitoring quality :: Correct. You can pause if crash rates or reviews look bad.
- [ ] Building the app in phases :: That’s just development.
- [ ] Releasing only to iOS first :: That’s a platform choice.

Q: Why must servers support several app versions at once?
- [ ] Servers prefer variety :: Not a reason.
- [x] Many users don’t update immediately, so old versions keep calling the APIs :: Correct. Breaking old versions would break the app for those users.
- [ ] App stores require it :: The need comes from user behaviour.
- [ ] It improves app ratings :: Not directly.

Q: Which is a good mobile quality metric?
- [ ] Number of screens in the app :: Not a quality signal.
- [x] Crash-free sessions percentage :: Correct. Healthy apps aim very high, e.g., 99.5%+.
- [ ] Number of developers :: Not a product quality metric.
- [ ] Number of colours used :: Not a quality metric.

Q: What’s a sensible way to request location permission?
- [ ] Ask on the first screen before showing anything :: Users often deny permissions without context.
- [x] Ask when the user needs it, with a clear reason like finding nearby restaurants :: Correct. Context and a clear benefit raise acceptance rates.
- [ ] Never ask; guess the location :: You need permission for precise location.
- [ ] Ask repeatedly until they allow it :: Annoying and often against platform guidelines.

Q: Which is a key advantage of cross-platform frameworks like React Native or Flutter?
- [ ] They always outperform native apps :: Native often wins on performance.
- [x] One codebase can serve both Android and iOS, speeding up development :: Correct. Smaller teams can ship to both platforms faster.
- [ ] They avoid app store review :: Apps still go through store review.
- [ ] They don’t need testing :: Testing is still needed.
```

## Key takeaways

- Apps are **native**, **cross-platform** or **web/PWA**; choose by performance needs, team and speed.
- In India, design for **low-end Android**, small storage and patchy networks.
- Releases go through **build → QA → store review → phased rollout**, often on a **release train**.
- **Old versions linger**: use **feature flags, remote config** and versioned APIs.
- Watch **crash-free rate, ANRs, app size and start time**; ask for **permissions in context**.
