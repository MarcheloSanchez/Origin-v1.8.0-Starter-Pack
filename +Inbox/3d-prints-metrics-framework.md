# Metrics Framework — 3D Prints Marketplace

> **Product**: Web marketplace for selling 3D-printed models
> **Stage**: Pre-launch / MVP
> **Created**: 2026-03-04

---

## North Star Metric

**Weekly completed orders**

This metric captures the core value exchange — a customer found a model they wanted, trusted the product enough to buy it, and the transaction completed. It reflects supply quality, demand health, and purchase experience all at once.

Think of it like the heartbeat of your marketplace: if this number is going up, the organism is alive and growing. Everything else is a diagnostic to understand *why* it's moving.

**Why not revenue?** Revenue is a lagging indicator and can be inflated by one-off big orders. Completed orders reflect repeat behavior and breadth of demand, which matter more at the MVP stage.

---

## L1 Metrics — Health Indicators

These are your 6 vital signs. Together they tell you whether the marketplace is healthy across the entire customer journey.

### 1. Acquisition — Are people finding your store?

| Metric | Definition | Why it matters |
|--------|-----------|----------------|
| **Weekly unique visitors** | Unique users who visit the site per week | Top of funnel — no visitors, no sales |
| **Traffic source mix** | % from organic search, social, direct, paid, referral | Tells you which channels work; diversification = resilience |
| **Cost per visitor** (if running ads) | Ad spend ÷ visitors from paid channels | Efficiency of paid acquisition |

**Pre-launch priority**: Focus on *where* your first visitors will come from. For 3D prints, communities like Reddit (r/3Dprinting, r/functionalprint), Instagram/TikTok showcasing prints, and SEO for specific model searches ("custom 3D printed phone stand") are likely your best early channels.

### 2. Activation — Do visitors engage with the catalog?

| Metric | Definition | Why it matters |
|--------|-----------|----------------|
| **Catalog browse rate** | % of visitors who view ≥2 product pages | Signals that the catalog is interesting enough to explore |
| **Add-to-cart rate** | % of visitors who add at least one item to cart | The strongest pre-purchase intent signal |
| **Time to first add-to-cart** | Median time from first visit to first add-to-cart | Shorter = better product/market fit and UX |

**Activation event** (your "aha moment"): A visitor adds their first item to cart. This is analogous to the moment someone picks up a product in a physical store — they've gone from browsing to seriously considering a purchase.

### 3. Conversion — Are browsers becoming buyers?

| Metric | Definition | Why it matters |
|--------|-----------|----------------|
| **Visitor-to-purchase rate** | Orders ÷ unique visitors | End-to-end funnel efficiency |
| **Cart-to-purchase rate** | Orders ÷ users who added to cart | Checkout experience health |
| **Average order value (AOV)** | Total revenue ÷ number of orders | Revenue per transaction; influences pricing strategy |

**Key funnel to track**:
```
Visit → View product → Add to cart → Begin checkout → Complete purchase
```

Measure conversion between each step. The biggest drop-off is your highest-leverage improvement opportunity.

### 4. Retention — Do buyers come back?

| Metric | Definition | Why it matters |
|--------|-----------|----------------|
| **30-day repeat purchase rate** | % of buyers who make a 2nd purchase within 30 days | Validates that product quality drives repeat business |
| **90-day repeat purchase rate** | % of buyers who return within 90 days | More realistic for physical goods (people don't buy 3D prints weekly) |
| **Customer lifetime orders** | Average total orders per customer over their lifetime | Long-term value indicator |

**Important context for 3D prints**: Physical goods marketplaces naturally have lower purchase frequency than SaaS or digital products. A 90-day repeat rate of 15–25% would be strong for this category. Don't benchmark against software retention numbers — that's comparing apples to oranges.

### 5. Revenue — Is the business sustainable?

| Metric | Definition | Why it matters |
|--------|-----------|----------------|
| **Weekly revenue** | Total revenue per week | Business health |
| **Revenue per visitor** | Revenue ÷ visitors | Combines conversion + AOV into one efficiency metric |
| **Gross margin per order** | (Revenue − COGS) ÷ revenue | With 3D prints, material + print time + shipping costs matter a lot |

**Pre-launch note**: Define your cost structure early. For each model, track: material cost, print time (electricity), post-processing labor, packaging, and shipping. This determines pricing and whether the unit economics work.

### 6. Satisfaction — How do customers feel?

| Metric | Definition | Why it matters |
|--------|-----------|----------------|
| **Post-purchase rating** | Average star rating from buyers | Product quality signal |
| **Support ticket rate** | Tickets ÷ orders | Lower = smoother experience |
| **Return/refund rate** | Returns ÷ orders | Quality and expectation alignment |

---

## L2 Metrics — Diagnostic Drill-downs

Use these when an L1 metric moves and you need to understand *why*.

### Catalog & Product Metrics
- Product page view distribution (which models get the most views?)
- Conversion rate per product (which models sell best?)
- Category performance (functional prints vs decorative vs custom)
- New product listing velocity (how fast is the catalog growing?)
- Zero-view products (models nobody is finding — SEO or discoverability issue)

### Checkout & Payment Metrics
- Checkout step drop-off (where do people abandon?)
- Payment method success rate
- Shipping cost impact on conversion (do people abandon when they see shipping?)
- Coupon/discount usage rate

### Traffic & SEO Metrics
- Organic search impressions and click-through rate
- Top landing pages and their conversion rates
- Bounce rate by traffic source
- Keyword rankings for target product terms

### Fulfillment Metrics
- Order-to-ship time (how fast can you print and ship?)
- Print failure rate (failed prints that need re-doing)
- Shipping damage rate
- Delivery time (order placed → customer receives it)

---

## Pre-Launch Checklist

Before launch, make sure you can actually measure these things. A metric you can't track is just a wish.

- [ ] **Analytics installed**: Google Analytics 4 (or Plausible/PostHog) tracking page views, events, conversions
- [ ] **E-commerce tracking**: Purchase events with revenue, order ID, product details
- [ ] **Funnel events defined**: View product, add to cart, begin checkout, complete purchase — all firing correctly
- [ ] **UTM parameters**: Every link you share tagged with source/medium/campaign
- [ ] **Cost tracking**: Spreadsheet or system tracking material cost, print time, shipping per product
- [ ] **Customer feedback loop**: Post-purchase email or form collecting ratings and feedback
- [ ] **Dashboard set up**: Single page showing North Star + L1 metrics (even a spreadsheet works at MVP stage)

---

## MVP Dashboard Layout

At the MVP stage, you don't need a fancy BI tool. A weekly spreadsheet or simple dashboard is enough.

```
┌─────────────────────────────────────────────────────┐
│  NORTH STAR: Weekly Completed Orders                │
│  Current: ___    Target: ___    Trend: ↑↓→          │
├─────────────────────────────────────────────────────┤
│  ACQUISITION     │  ACTIVATION      │  CONVERSION   │
│  Visitors: ___   │  Browse rate: ___ │  V→P rate: ___│
│  Top source: ___ │  ATC rate: ___   │  AOV: ___     │
├─────────────────────────────────────────────────────┤
│  RETENTION       │  REVENUE         │  SATISFACTION  │
│  90d repeat: ___ │  Weekly rev: ___ │  Avg rating: __│
│  LT orders: ___  │  Margin: ___     │  Return rate: _│
└─────────────────────────────────────────────────────┘
```

---

## Setting Initial Targets

For a pre-launch MVP, you don't have baseline data yet. Here's how to approach target-setting:

**Week 1–4 (Launch)**: Don't set numeric targets. Focus on getting instrumentation right and collecting baseline data. Your only goal is: "Can I get 10 people to complete a purchase?"

**Month 2–3 (Baseline)**: You now have data. Set targets based on what you've observed + modest improvement. For example, if your visitor-to-purchase rate is 1.5%, target 2% — not 10%.

**Quarter 2 (Growth)**: Set proper OKRs with stretch targets based on your proven baseline and planned initiatives.

### Benchmark Ranges (Small E-commerce / Niche Marketplace)

These are rough industry benchmarks for context. Your actual numbers will vary.

| Metric | Typical range | Notes |
|--------|--------------|-------|
| Visitor-to-purchase rate | 1–3% | Niche products can be higher due to intent |
| Add-to-cart rate | 5–10% | |
| Cart-to-purchase rate | 30–60% | High shipping costs kill this for physical goods |
| Bounce rate | 40–60% | Lower for targeted traffic, higher for social |
| 90-day repeat rate | 10–25% | Physical goods = lower frequency |
| AOV | Depends on pricing | Track trend, not absolute |

---

## Review Cadence

| When | What | Duration | Action |
|------|------|----------|--------|
| **Weekly** | Check North Star + L1 dashboard | 15 min | Note anomalies, check active experiments |
| **Monthly** | Full L1 + L2 review, cohort analysis | 30 min | Identify 1–2 improvement areas |
| **Quarterly** | OKR scoring, strategy assessment | 60 min | Set next quarter's targets and priorities |

---

## What to Ignore (For Now)

At the MVP stage, these metrics are distractions:

- **Social media follower counts**: Vanity metric. Followers ≠ customers.
- **Total registered users**: Grows forever, tells you nothing about health.
- **Page views**: Without conversion context, meaningless.
- **Time on site**: Can mean engagement OR confusion. Not useful alone.
- **Feature-level metrics**: You don't have enough features yet. Focus on the core purchase flow.

Revisit these once you have a stable, growing baseline on your L1 metrics.
