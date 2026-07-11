---
title: "Audited a Wedding Organizer's Website in Semarang"
author: "Hafi"
publish_date: 2026-07-09
category: "HTML"
tags: ["html", "css", "tailwind"]
description: "This article shares my experience auditing a Wedding Organizer website in Semarang, from analyzing performance issues to redesigning it for better experience."
image: "/images/smg-wo-redesign.webp"
imageAlt: "Redesign Process"
draft: false
featured: false
---

That day, I was learning how to create a landing page that doesn't look sloppy using AI. I searched for "Wedding Organizer Semarang" and found several websites ranking at the top of search results. I opened one of them and noticed that the design felt outdated and didn't really stand out. So, I decided to take a deeper look and audit the website. The results were quite surprising, not only did the visual need design improvement, but the website's Google PageSpeed Insights score was also far from ideal and it even failed the Core Web Vital assessment.

---

## SEO ≠ Conversion

Imagine your website as a physical store. SEO helps people discover your store and brings more visitors to your doorstep. But once they walk in, a different challenge begins.

The way your store looks, how the products are displayed, and how easy it is for visitors to find what they need will determine whether they decide to make a purchase or simply walk away.

The same thing applies to your website. Your design, the clarity of your information, how you showcase testimonials, portfolios, and trusted partners all play an important role in building trust and influencing potential clients’ decisions.

This becomes even more important for a Wedding Organizer business, where clients are not making a simple purchase. They are choosing someone to handle one of the most important moments of their lives and every detail on your website can affect their confidence in choosing you.

---

## Audit Findings
### 1. Website Performance Is Below Standard
The website performance score is far from ideal. Based on PageSpeed Insights, the mobile score is 51 and the desktop score is 64. The Core Web Vitals assessment also failed, with a mobile Speed Index of 8.7 seconds — while a good website should ideally load within around 3 seconds.

Every additional second of loading time increases the chance of losing potential clients before they even see what you offer.

### 2 . The Hero Section Lacks Readability
The hero section is the first thing visitors see, but the contrast between the text and background colors makes the main message difficult to read.

![Original Hero Section](/images/smg-wo/smg-wo-before-0.webp)

A strong first impression matters. If visitors struggle to understand your value within the first few seconds, they may leave before exploring further.

### 3. Poor Mobile Layout Experience
Several elements on the mobile version feel too small, with inconsistent spacing, conflicting color contrasts, and a layout that doesn’t feel polished.

Since more than 80% of users now browse websites through their smartphones, a smooth mobile experience is no longer optional — it is a necessity.

![Footer Layout Section](/images/smg-wo/smg-wo-before-2.webp)


### 4. Lack of Strong Social Proof and Trust Signals
For a Wedding Organizer, trust is everything. Potential clients need reasons to feel confident before making a decision.

Important elements such as testimonials, years of experience, the number of events handled, vendor partnerships, and portfolio galleries should be highlighted more prominently to build credibility.

### 5. CTA Buttons Are Difficult to Notice
The CTA button in the navbar is barely visible, even though it plays an important role in guiding visitors toward the next action.

Other CTA buttons across the website face a similar issue. A call-to-action should stand out clearly and encourage potential clients to take the next step, not make them search for it.

![CTA Buttons](/images/smg-wo/smg-wo-before-1.webp)


---

## Redesign Process
I decided to use this website as a learning project to explore how to create a landing page with AI — while avoiding the common “AI slop” look that often feels generic and unpolished.

For the redesign, I built a separate version from scratch using Astro.js and Tailwind CSS, focusing on four main areas: performance, readability, mobile experience, and stronger trust signals. I didn’t modify the original website; instead, I created a redesigned version that could be directly compared with the existing one.

To achieve a more refined result, I experimented with different AI-assisted workflows. I started with design prompts from Design Prompts and used Gemini CLI/Gemini Flash 3 for the initial generation. However, the first results still needed improvement, so I continued iterating using Evonic with models from OpenRouter, testing different models such as GLM, MiniMax, DeepSeek, and Qwen to refine the design and overall user experience.

![Redesign Mockup](/images/smg-wo/smg-wo-mockup.webp)


---

## Results: From Slow Experience to a Faster, More Convincing Website

After completing the redesign, I compared the results side by side to see how much impact the improvements actually made.

The biggest changes came from performance optimization. The original website struggled with slow loading times and failed Core Web Vitals, which could negatively affect user experience and potential client trust. After the redesign, the website became significantly faster and more responsive.

![Original Website's Google PageSpeed Insights](/images/smg-wo/smg-wo-psi-0.webp)


| Metric | Before | After |
|---|---|---|
| PageSpeed Mobile | 59 🟡 | 97 🟢 |
| PageSpeed Desktop | 64 🟡 | 99 🟢 |
| Core Web Vitals | Failed ❌ | Pass ✅ |
| LCP Mobile | 14.8 second | 1.7 second |
| Total Blocking Time | 240 ms | 0 ms |
| First impression | Hard to understand | Clear at first glance |

![Redesign Website's Google PageSpeed Insights](/images/smg-wo/smg-wo-psi-1.webp)


The numbers tell the story: reducing the mobile LCP from **14.8 seconds to 1.7 seconds** means potential clients no longer have to wait through a frustrating loading experience. They can immediately see the hero section, understand the offer, and continue exploring the website.

This project shows that a website redesign is not only about making things look better, it is about creating a faster, clearer, and more trustworthy experience that helps visitors move closer to becoming clients.

**Live Demo:**
👉 [hadiset.com/showcase/smg-wo/](https://hadiset.com/showcase/smg-wo/)

---

## Final Thoughts
This project taught me that a successful website is not only about getting visitors — it is about what happens after they arrive.

Being on the first page of Google is only the beginning. The traffic you receive needs to be welcomed with a website that is fast, clear, and trustworthy. Website speed is not just a technical metric; it directly affects user experience, business credibility, and potential conversions. And in today’s mobile-first world, having a website that doesn’t provide a good mobile experience is no longer just a design issue — it can become a missed opportunity.

If you own a business and are curious about how your website performs, I’d be happy to help you take a look through a free website audit. No strings attached — just an opportunity to understand what can be improved.

Feel free to reach out: [Here](mailto:work@hadiset.com)
