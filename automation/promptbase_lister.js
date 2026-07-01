/**
 * PromptBase Auto-Lister
 * Lists all 10 prompts on PromptBase autonomously using Playwright.
 *
 * Setup:
 *   npm install playwright
 *   npx playwright install chromium
 *
 * Usage:
 *   PROMPTBASE_EMAIL=you@email.com PROMPTBASE_PASSWORD=yourpass node promptbase_lister.js
 *
 * Or with .env file (requires: npm install dotenv):
 *   node -r dotenv/config promptbase_lister.js
 */

const { chromium } = require('playwright');

// ─── Credentials (set via env vars or replace directly) ────────────────────
const EMAIL    = process.env.PROMPTBASE_EMAIL    || 'codyr2292@gmail.com';
const PASSWORD = process.env.PROMPTBASE_PASSWORD || '';  // Set via env — never hardcode

// ─── All 10 prompts ────────────────────────────────────────────────────────
const PROMPTS = [
  {
    title: 'Meta-Prompt Engineer — Turn Any Task Into a Perfect AI Prompt',
    price: '7.99',
    description: 'Stop getting mediocre AI outputs. This prompt transforms any task description into a maximally effective, production-ready prompt in seconds. Used by prompt engineers to 10x their AI results. Works with ChatGPT, Claude, Gemini.',
    tags: 'prompt engineering, AI prompts, ChatGPT, productivity, meta-prompt',
    gptType: 'chat',
    gptVersion: 'gpt-5.5',
    template: `You are a world-class prompt engineer with deep expertise in large language models. Your job is to transform any task description into a maximally effective AI prompt.

When I give you a task, you will:
1. Identify the core goal and desired output format
2. Determine the ideal role/persona for the AI to adopt
3. Add necessary context, constraints, and examples
4. Structure it with clear sections using XML tags
5. Include output format specifications
6. Add chain-of-thought instructions where beneficial

Task: [DESCRIBE YOUR TASK HERE]

Output a complete, ready-to-use prompt that I can copy and paste directly. After the prompt, provide a brief "Why this works" explanation (3 bullets max).

Format your response as:
<prompt>
[THE OPTIMIZED PROMPT]
</prompt>

<why_it_works>
- [reason 1]
- [reason 2]
- [reason 3]
</why_it_works>`,
    examples: [
      `Task: Write a cold email to a VP of Sales at a B2B SaaS company.\n\n<prompt>\nYou are a B2B sales expert who has helped 500+ sales teams exceed quota. Write a cold email to a VP of Sales.\n\nTarget: VP of Sales at B2B SaaS companies\nYour solution: [YOUR PRODUCT/SERVICE]\nKey outcome: [MAIN RESULT YOU DELIVER]\nCTA: 15-min discovery call\n\nWrite one cold email under 120 words with a pattern-interrupt opener, one specific pain point, a concrete metric, and a soft CTA question.\nSubject line: Give 3 variations.\n</prompt>\n\n<why_it_works>\n- Expert role makes AI write from authority, not template\n- Length constraint produces immediately usable output\n- 3 subject lines enable A/B testing without re-running\n</why_it_works>`,
      `Task: Summarize a 40-page research paper for a non-technical executive.\n\n<prompt>\nYou are a science communicator who translates complex research into clear business insights.\n\nPaper topic: [PASTE ABSTRACT HERE]\nAudience: C-suite, no technical background\nFormat: Executive briefing memo, max 400 words\n\nStructure:\n1. What they discovered (1 sentence)\n2. Why it matters for business (2-3 sentences)\n3. Key findings — 3 bullets, plain English\n4. Limitations\n5. Recommended action for our team\n\nAvoid all jargon. Define any technical term in parentheses.\n</prompt>\n\n<why_it_works>\n- Explicit audience calibrates vocabulary automatically\n- Fixed format prevents 2,000-word essays when you need 400 words\n- Action item forces synthesis, not just description\n</why_it_works>`,
      `Task: Write a LinkedIn post about growing a consulting business to $20K/month.\n\n<prompt>\nYou are a LinkedIn content expert. Write a high-performing post for a consultant.\n\nMy story: [YOUR JOURNEY IN 2-3 SENTENCES]\nKey insight: [ONE TAKEAWAY]\nGoal: Attract consulting leads\n\nWrite 2 versions:\nVersion A (Story Arc): Lowest point → turning point → lesson + question CTA\nVersion B (Contrarian): Polarizing statement → backed by experience → question\n\nRules: No paragraphs over 2 lines. First line can't start with "I". 3 hashtags. Under 250 words each.\n</prompt>\n\n<why_it_works>\n- Two versions = instant A/B test material\n- "Can't start with I" forces stronger hooks automatically\n- Question CTA drives comments (LinkedIn rewards comments in algorithm)\n</why_it_works>`,
      `Task: Write a professional response to a negative 1-star Google review.\n\n<prompt>\nYou are a customer experience manager specializing in de-escalation.\n\nBusiness type: [YOUR BUSINESS TYPE]\nThe review: [PASTE EXACT REVIEW]\nYour side: [YOUR CONTEXT or "respond based on review only"]\nBrand tone: [FORMAL / WARM / CASUAL]\n\nWrite a public response that:\n1. Acknowledges frustration without being defensive\n2. Takes responsibility for their experience\n3. Offers a specific resolution\n4. Invites them to contact you directly\n5. Is under 150 words total\n\nAlso provide: One sentence explaining WHY this response works psychologically.\n</prompt>\n\n<why_it_works>\n- "Without being defensive" prevents both extremes\n- 150-word limit avoids PR-statement feel that reads as inauthentic\n- Psychological note forces AI to reason, not just template-fill\n</why_it_works>`,
    ],
    instructions: `1. Replace [DESCRIBE YOUR TASK HERE] with any task — be as specific as possible for best results.
2. Paste the generated prompt directly into ChatGPT, Claude, or any AI chat interface.
3. The <prompt> block is your ready-to-use prompt. The <why_it_works> block explains the engineering.
4. To customize further: add "use a [TONE] tone" or "assume the reader has [BACKGROUND] knowledge".
5. Works best with GPT-4, GPT-4o, Claude 3.5+, or any frontier model.`,
  },
  {
    title: 'Complete Business Plan Generator — Investor-Ready in Minutes',
    price: '9.99',
    description: 'Get a full investor-ready business plan with TAM/SAM/SOM, financial projections, competitive analysis, and go-to-market strategy. Used by founders and consultants to save 20+ hours per plan.',
    tags: 'business plan, startup, investor, entrepreneurship, fundraising',
    gptType: 'chat',
    gptVersion: 'gpt-5.5',
    template: `You are a seasoned startup advisor and business plan writer who has helped raise over $50M in funding. Create a comprehensive, investor-ready business plan for the following business.

Business: [YOUR BUSINESS NAME AND ONE-LINE DESCRIPTION]
Industry: [INDUSTRY]
Stage: [IDEA / MVP / EARLY REVENUE / GROWTH]
Target Raise (if applicable): [AMOUNT OR "N/A"]

Generate a full business plan with these sections:

1. **Executive Summary** (compelling 3-paragraph pitch)
2. **Problem Statement** (pain points with market evidence)
3. **Solution** (product/service with key differentiators)
4. **Market Opportunity** (TAM/SAM/SOM with reasoning)
5. **Business Model** (revenue streams, pricing, unit economics)
6. **Go-To-Market Strategy** (first 90 days, then 12 months)
7. **Competitive Landscape** (3x3 competitive matrix)
8. **Team** (placeholder structure with key roles needed)
9. **Financial Projections** (3-year revenue model with assumptions)
10. **Funding Ask & Use of Funds** (if raising)
11. **Key Risks & Mitigations**

Be specific, data-driven where possible, and write in a confident tone that would impress a Series A investor.`,
    examples: [
      `Business: FitCoach AI — AI personal trainer app\nIndustry: Health & Fitness SaaS\nStage: MVP\nRaise: $500K\n\n**Executive Summary**\nFitCoach AI delivers personalized workout and nutrition plans through an AI coach that adapts in real-time to user progress, schedule, and goals. Unlike static fitness apps, FitCoach learns from each session — getting smarter every week. We're targeting the 87M Americans who want a personal trainer but can't afford the $100/hour average cost.\n\n**Problem Statement**\nPersonal training costs $100–$200/hour, pricing out 95% of the market. Generic fitness apps have a 90-day churn rate of 70% because they don't adapt. The result: $35B in gym memberships sold annually, with 67% going unused.\n\n**Market Opportunity**\nTAM: $96B global fitness industry. SAM: $18B digital fitness market. SOM: $450M addressable in Year 3 at 2.5% market share.\n\n**Financial Projections**\nY1: $120K ARR (1,000 subscribers at $9.99/mo)\nY2: $1.2M ARR (10,000 subscribers)\nY3: $6M ARR (50,000 subscribers + B2B gym partnerships)`,
      `Business: LegalDraft — AI contract drafting for small businesses\nIndustry: LegalTech\nStage: Early Revenue\nRaise: $1M Seed\n\n**Executive Summary**\nLegalDraft gives small business owners instant, attorney-reviewed contract templates powered by AI customization. We eliminate the $300–$500/contract cost of hiring a lawyer for routine agreements. 600K new small businesses launch monthly in the US — each needing 5–10 contracts in year one.\n\n**Business Model**\nFreemium: 3 free contracts/month → $29/month Pro (unlimited) → $199/month Business (team + e-sign). Enterprise: $500/month for law firms to white-label.\n\nUnit Economics:\n- CAC: $42 (Google Ads + SEO)\n- LTV: $348 (12-month retention at $29/mo)\n- LTV:CAC ratio: 8.3x`,
      `Business: MenuAI — AI menu optimization for restaurants\nIndustry: Restaurant Tech\nStage: Idea\nRaise: N/A\n\n**Go-To-Market Strategy**\nFirst 90 days: Partner with 10 independent restaurants in one city. Offer free 30-day trial. Collect data on menu performance lift. Build case studies.\n\nMonths 4–12: Expand to 3 cities via restaurant association partnerships. Launch self-serve onboarding. Target: 200 paying restaurants at $99/month = $20K MRR.\n\n**Competitive Landscape**\n| Feature | MenuAI | Toast | Square ||\n|---|---|---|---|\n| AI menu optimization | ✅ | ❌ | ❌ |\n| Real-time sales data | ✅ | ✅ | ✅ |\n| Price: | $99/mo | $110/mo | $60/mo |`,
      `Business: RemoteReady — corporate remote work training platform\nIndustry: HR Tech / Corporate Training\nStage: Growth\nRaise: $2M Series A\n\n**Key Risks & Mitigations**\n1. Risk: Enterprise sales cycles are 6–9 months\n   Mitigation: Offer self-serve SMB plan to generate revenue while enterprise pipeline builds\n\n2. Risk: L&D budgets get cut in recessions\n   Mitigation: Position as cost-reduction tool (reduces manager time by 4 hrs/week per report)\n\n3. Risk: Competitors like LinkedIn Learning expand into this space\n   Mitigation: Specialize in remote-specific skills (async communication, virtual presence) — territory large players ignore\n\n**Funding Ask & Use of Funds**\nAsking: $2M Seed\n- 40% Engineering (2 senior engineers)\n- 30% Sales & Marketing\n- 20% Operations & CS\n- 10% Reserve`,
    ],
    instructions: `1. Fill in all [BRACKETED] fields with your specific business details.
2. The more specific you are in the inputs, the more tailored and investor-ready the output.
3. Run it section by section if you want to go deeper on any area — just paste one section header as a follow-up.
4. For financial projections: tell the AI your actual pricing and estimated conversion rates for more accurate numbers.
5. Works best with GPT-4, GPT-4o, or Claude 3.5+ Sonnet.`,
  },
  {
    title: 'Cold Email Sequence Generator — 5-Email Sequence That Books Meetings',
    price: '6.99',
    description: 'Generate a complete 5-email cold email sequence with subject lines, personalization hooks, and send timing. Based on sequences that have generated $2M+ in pipeline.',
    tags: 'cold email, sales, outreach, B2B, email marketing',
    gptType: 'chat',
    gptVersion: 'gpt-5.5',
    template: `You are a cold email specialist who has generated over $2M in pipeline. Write a complete 5-email cold outreach sequence for the following scenario.

Product/Service: [WHAT YOU SELL]
Target Prospect: [JOB TITLE + COMPANY TYPE, e.g. "VP of Sales at SaaS companies with 50-500 employees"]
Key Pain Point You Solve: [MAIN PROBLEM]
Your #1 Differentiator: [WHAT MAKES YOU UNIQUE]
Call to Action: [DESIRED NEXT STEP, e.g. "15-min call"]

Write 5 emails with the following structure:
- Email 1 (Day 1): Pattern interrupt opener + value hook + soft CTA
- Email 2 (Day 3): Social proof / case study angle
- Email 3 (Day 7): Different angle / insight-led
- Email 4 (Day 14): Short, direct "still relevant?" bump
- Email 5 (Day 21): Breakup email with value leave-behind

For each email provide:
SUBJECT: [subject line with open-rate tip]
BODY: [full email, under 120 words]
SEND TIME: [best day/time]
PERSONALIZATION HOOK: [where to add personal research]

Keep all emails conversational, specific, and focused on THEIR outcome — never on your features.`,
    examples: [
      `Product: AI sales coaching software ($299/mo)\nTarget: VP of Sales at SaaS companies\nPain: Reps miss quota, managers don't have time to coach 1:1\nDifferentiator: AI listens to every call and gives rep feedback instantly\nCTA: 20-min demo\n\nEmail 1 (Day 1):\nSUBJECT: your Q3 number (honest question)\nBODY: Quick question, [Name] — when a rep misses quota at [Company], what usually happens? We work with VP Sales teams where AI listens to every sales call and gives each rep personalized coaching within 24 hours. No more waiting for manager bandwidth. Teams using this see 31% quota attainment lift in 90 days. Worth a 20-minute look this week?\nSEND TIME: Tuesday or Wednesday, 8–9am their timezone\nPERSONALIZATION: Reference their recent LinkedIn post or company news`,
      `Product: B2B bookkeeping service ($500/mo)\nTarget: Founders of 1-10 person startups\nPain: Spending 5+ hours/month on bookkeeping, books always behind\nDifferentiator: Dedicated bookkeeper + real-time Slack updates\nCTA: Free 30-day trial\n\nEmail 3 (Day 7) — Insight-led:\nSUBJECT: the $47K mistake most startups make in year 2\nBODY: [Name], founders who do their own bookkeeping in year 1 often hit a wall in year 2: investor due diligence takes 6x longer because books aren't audit-ready. We've cleaned up books for 200+ startups. The founders who stay cleanest spend zero hours on it — because they delegated it Day 1. Happy to share what that looks like for [Company]. Free 30-day trial, cancel anytime.\nSEND TIME: Thursday, 10am\nPERSONALIZATION: Mention their funding stage or recent raise if visible`,
      `Product: LinkedIn ghostwriting service ($1,500/mo)\nTarget: B2B consultants who want inbound leads\nPain: No time to post consistently, LinkedIn feels like a black hole\nDifferentiator: Done-for-you posts that match their voice exactly\nCTA: Free sample post\n\nEmail 4 (Day 14) — Bump:\nSUBJECT: still relevant?\nBODY: [Name] — just floating this back up. I know inboxes get loud. If LinkedIn content isn't a priority right now, no problem at all — just let me know and I'll stop following up. If it is, I'd love to write you one free post this week so you can see exactly what we do. Either way, totally fine. — [Your name]\nSEND TIME: Tuesday, 7am\nPERSONALIZATION: None needed — brevity IS the personalization`,
      `Product: HR compliance software ($199/mo)\nTarget: HR managers at companies with 50-200 employees\nPain: Keeping up with changing employment laws across states\nDifferentiator: Real-time compliance alerts + auto-updated policy templates\nCTA: Free compliance audit\n\nEmail 5 (Day 21) — Breakup:\nSUBJECT: closing your file\nBODY: [Name], I'll stop reaching out after this — clearly the timing isn't right, and I respect your inbox. Before I go: we just published a free 2024 Multi-State Employment Law Checklist (link below) — it's helped 400+ HR teams catch issues before they become fines. No strings, no form, just download it. Hope it's useful. And if compliance ever becomes a headache, you know where to find us. — [Your name]\n[LINK TO FREE RESOURCE]\nSEND TIME: Friday, 8am\nPERSONALIZATION: Reference their state or industry in the opening if known`,
    ],
    instructions: `1. Fill in all 5 inputs at the top before running.
2. Paste the full sequence into a Google Doc or your email tool (Instantly, Apollo, Outreach, etc.).
3. Replace [Name] and [Company] with your actual prospect's info before sending.
4. Use the PERSONALIZATION HOOK guidance to add 1 sentence of custom research per email.
5. Test subject lines: duplicate the sequence and change only the subject line to A/B test open rates.`,
  },
  {
    title: 'LinkedIn Viral Post Formula — Hook, Story, CTA That Gets 10K+ Views',
    price: '5.99',
    description: 'Generate 3 different LinkedIn post formats (Story Arc, Listicle, Contrarian Take) rated by virality potential. Stop posting into the void.',
    tags: 'LinkedIn, viral, content, social media, personal brand',
    gptType: 'chat',
    gptVersion: 'gpt-5.5',
    template: `You are a LinkedIn content strategist who has written posts that collectively generated 50M+ impressions. Create a high-performing LinkedIn post using proven viral frameworks.

Topic: [YOUR TOPIC OR LESSON LEARNED]
Your Professional Background: [YOUR ROLE / INDUSTRY]
Goal: [THOUGHT LEADERSHIP / LEADS / FOLLOWERS / ENGAGEMENT]
Tone: [CHOOSE: Professional / Conversational / Storytelling / Controversial]

Create 3 different LinkedIn post variations using these formats:

**Version A — Story Arc Format:**
Hook (1-2 lines that stop the scroll) → 5-7 short paragraphs building tension → Insight/lesson → CTA

**Version B — Listicle Format:**
Bold opener → Numbered list (5-7 items, each 1-2 lines) → Closing thought → CTA

**Version C — Contrarian Take:**
Provocative statement → "Here's what most people get wrong:" → 3 counterpoints → Your position → CTA

Rules for all versions:
- First line must work as a standalone hook (no "I" opener)
- No paragraphs longer than 2 lines
- End with a question or clear CTA
- Include 3 relevant hashtags

After the 3 posts, rate each on: Virality potential (1-10), Lead gen potential (1-10), Brand building (1-10).`,
    examples: [
      `Topic: I quit my $200K corporate job to start a business\nBackground: Former McKinsey consultant, now founder\nGoal: Thought leadership + followers\nTone: Storytelling\n\nVersion A (Story Arc):\n18 months ago, I had the "perfect" job.\n\n$200K salary. Corner office. Fast-track to partner.\n\nI also had Sunday anxiety so bad I'd spend 3 hours dreading Monday.\n\nI told my wife I wanted to quit.\nShe said: "Then quit."\n\nI said: "But the salary—"\nShe said: "We'll figure it out."\n\nI gave notice the next day.\n\nFirst month: $0 in revenue. Pure terror.\nMonth 6: $15K.\nMonth 12: $60K — more than my old monthly salary.\n\nThe thing nobody tells you about leaving a big salary:\nThe fear doesn't go away. You just stop letting it make decisions for you.\n\nWhat's the Sunday anxiety telling you right now?\n\n#entrepreneurship #careerchange #founder`,
      `Topic: Why most people's morning routines are a waste of time\nBackground: Executive coach\nGoal: Engagement + leads\nTone: Controversial\n\nVersion C (Contrarian Take):\nYour 5am morning routine isn't making you more productive. It's making you more tired.\n\nHere's what most people get wrong:\n\n1. Early wake-ups without enough sleep reduce cognitive performance by 20-30%. You're not a high performer — you're sleep-deprived.\n\n2. Copying someone else's routine means copying their biology, goals, and schedule. None of which are yours.\n\n3. Rigid routines break under real life. The most resilient performers I coach have flexible systems, not fixed rituals.\n\nThe real secret: Protect 90 minutes of deep work whenever it naturally fits your energy. For some that's 5am. For others, 10pm.\n\nStop optimizing for when you wake up. Optimize for what you do with your best hours.\n\nWhen is YOUR best cognitive window? Drop it below.\n\n#productivity #leadership #coaching`,
      `Topic: 7 things I learned closing $1M in consulting deals\nBackground: B2B consultant, 8 years\nGoal: Leads\nTone: Professional\n\nVersion B (Listicle):\nClosed $1M in consulting deals last year. Here's what actually works:\n\n1. Lead with their problem, not your solution. Clients hire you to remove their headache — name it first.\n\n2. Price anchoring: always present 3 options. The middle one closes 70% of the time.\n\n3. "What happens if you don't solve this?" is worth more than any pitch deck.\n\n4. Follow up 6x. Most consultants stop at 2. Most deals close between 4 and 8.\n\n5. Proposals lose deals. Conversations win them. Never send a proposal to someone who hasn't verbally agreed.\n\n6. Testimonials from similar industries convert 3x better than generic ones.\n\n7. The best close: "Does this feel like the right fit for where you're headed?"\n\nWhich one surprised you most?\n\n#consulting #sales #B2B`,
      `Topic: Failing publicly and what I learned\nBackground: SaaS founder\nGoal: Followers + authenticity\nTone: Conversational\n\nRatings:\nVersion A (Story Arc): Virality 9/10 | Lead gen 6/10 | Brand building 10/10\nVersion B (Listicle): Virality 7/10 | Lead gen 9/10 | Brand building 7/10\nVersion C (Contrarian): Virality 8/10 | Lead gen 7/10 | Brand building 8/10\n\nRecommendation: Post Version A first to build audience, then Version B to convert followers to leads. Version C for when you want a spike in comments and debate.`,
    ],
    instructions: `1. Fill in all 4 fields at the top — the more specific, the better the output.
2. Post all 3 versions in different weeks to find your highest performer.
3. Use the ratings grid at the bottom to decide which version to post first based on your current goal.
4. Best posting times: Tuesday–Thursday, 8–10am or 5–6pm in your audience's timezone.
5. Engage with every comment in the first 60 minutes — it signals the algorithm to boost reach.`,
  },
  {
    title: 'SEO Blog Article Writer — Rank-Ready 2,000-Word Articles From One Keyword',
    price: '7.99',
    description: 'Full 2,000-word SEO-optimized article with title tag, meta description, FAQ section, and internal link placeholders. Just give it your keyword.',
    tags: 'SEO, blog, content marketing, writing, Google',
    gptType: 'chat',
    gptVersion: 'gpt-5.5',
    template: `You are an expert SEO content writer and strategist. Write a comprehensive, rank-worthy blog article optimized for the target keyword below.

Target Keyword: [PRIMARY KEYWORD]
Secondary Keywords: [2-3 RELATED TERMS, or write "suggest some"]
Target Audience: [WHO WILL READ THIS]
Brand Voice: [CASUAL / PROFESSIONAL / AUTHORITATIVE / FRIENDLY]
Word Count: 2,000 words

Follow this exact structure:

**SEO Setup:**
- Title tag (60 chars max, keyword near front)
- Meta description (155 chars, includes keyword + CTA)
- URL slug suggestion

**Article Structure:**
- H1 (matches title tag intent)
- Introduction (hook + preview of what they'll learn, 150 words)
- H2 Section 1: [What is X / The Problem]
- H2 Section 2: [How to / Step-by-step]
- H2 Section 3: [Best practices / Tips]
- H2 Section 4: [Examples / Case studies]
- H2 Section 5: [Common mistakes to avoid]
- Conclusion (summary + CTA, 150 words)
- FAQ section (5 questions using People Also Ask format)

**SEO Checklist:**
- Use primary keyword in first 100 words, H1, and conclusion
- Use secondary keywords naturally throughout
- Add internal link placeholders: [LINK: related article about X]
- Suggest 2 external authority links to cite
- Bold key terms, use numbered/bulleted lists for scannability

Write the full article now.`,
    examples: [
      `Keyword: "how to write a cold email"\nSecondary: "cold email subject lines, B2B outreach"\nAudience: Sales reps and founders\nVoice: Conversational\n\nSEO Setup:\nTitle: How to Write a Cold Email That Actually Gets Replies (2024 Guide)\nMeta: Learn how to write a cold email that books meetings. 5-step framework, proven subject lines, and real examples from $2M in pipeline. Read now.\nSlug: /how-to-write-cold-email\n\nH1: How to Write a Cold Email That Gets Replies\n\nIntroduction:\nMost cold emails get deleted in 3 seconds. Not because cold email doesn't work — it does, generating billions in B2B pipeline every year — but because 95% of cold emails make the same 5 mistakes. This guide shows you exactly how to write a cold email that stands out, gets opened, and converts prospects into conversations. We'll cover the 5-step framework, the subject lines that get 40%+ open rates, and real before/after examples...`,
      `Keyword: "best project management software"\nSecondary: "project management tools, team productivity software"\nAudience: Small business owners and team leads\nVoice: Professional\n\nFAQ Section (People Also Ask format):\n\nQ: What is the best free project management software?\nA: Trello, Asana (free tier), and Notion offer the strongest free plans for small teams. Trello is best for visual kanban workflows; Asana for task assignments; Notion for combining notes and tasks.\n\nQ: What project management software do large companies use?\nA: Enterprise teams most commonly use Jira (for engineering), Monday.com, or Microsoft Project. Salesforce and SAP also offer enterprise project management modules.\n\nQ: Is project management software worth it for small teams?\nA: Yes — teams of even 2-3 people reduce project delays by 30-40% when using dedicated PM software vs. spreadsheets, according to PMI research.`,
      `Keyword: "email marketing for small business"\nSecondary: "email list building, email open rates"\nAudience: Small business owners new to email marketing\nVoice: Friendly\n\nH2 Section 2 — Step-by-Step:\n\nHow to Start Email Marketing in 5 Steps\n\nStep 1: Choose your platform\nMailchimp is free up to 500 subscribers and perfect for beginners. ConvertKit works better if you're a creator or course seller. Both have drag-and-drop editors.\n\nStep 2: Create a lead magnet\nNobody signs up for "join my newsletter." Give them something: a free checklist, discount code, or short guide. Businesses with lead magnets grow their lists 7x faster.\n\nStep 3: Add a signup form to your website\nPlace it: above the fold on your homepage, at the bottom of blog posts, and as a pop-up triggered at 50% scroll depth.\n\nStep 4: Send your first welcome email within 5 minutes of signup\nWelcome emails have 4x higher open rates than any other email. Use it to deliver the lead magnet and tell your story.\n\nStep 5: Set a consistent send schedule\nWeekly beats monthly. Consistency matters more than frequency — pick a day and stick to it.`,
      `Keyword: "how to start a podcast"\nSecondary: "podcast equipment for beginners, podcast hosting"\nAudience: Aspiring podcasters with no experience\nVoice: Casual\n\nSEO Checklist Results:\n✅ Primary keyword "how to start a podcast" in: first 100 words, H1, conclusion\n✅ Secondary keywords used in H2 headings and naturally throughout\n✅ Internal link placeholders added: [LINK: best podcast editing software], [LINK: how to grow a podcast audience]\n✅ External authority links: cite Buzzsprout's State of Podcasting report, Edison Research Infinite Dial\n✅ Bold terms used for equipment names, platform names, key stats\n✅ Numbered lists used in all step-by-step sections\n\nEstimated word count: 2,050 words\nRecommended target: Aim to rank for "how to start a podcast for beginners" as a secondary angle`,
    ],
    instructions: `1. Set your target keyword first — this drives everything else.
2. For Secondary Keywords: type "suggest some" and the AI will research related terms.
3. The full 2,000-word article is generated in one shot — copy it directly into your CMS.
4. After publishing: submit the URL to Google Search Console → URL Inspection → Request Indexing.
5. For best results, add 2-3 original images or screenshots — Google rewards original visual content.`,
  },
  {
    title: 'Pitch Deck Script Generator — Slide-by-Slide Script for Fundraising',
    price: '9.99',
    description: 'Get a word-for-word spoken script for a 10-slide pitch deck (12 minutes) with what to say, what shows on screen, and how to handle investor Q&A. For pre-seed through Series A.',
    tags: 'pitch deck, fundraising, VC, startup, investor',
    gptType: 'chat',
    gptVersion: 'gpt-5.5',
    template: `You are a pitch coach who has helped founders raise from Sequoia, a16z, and Y Combinator. Write a compelling, narrative-driven pitch deck script for the following startup.

Company: [COMPANY NAME]
One-liner: [WHAT YOU DO IN ONE SENTENCE]
Stage: [PRE-SEED / SEED / SERIES A]
Traction: [KEY METRICS OR "EARLY STAGE"]
Ask: [AMOUNT RAISING]

Write a word-for-word spoken script for a 10-slide deck (12 minutes total). Each slide section includes:
- What appears on screen (bullet points only, max 5 words each)
- What you SAY (full script, natural speaking voice)
- Transition to next slide

Slides:
1. Cover (30 sec) — memorable one-liner delivery
2. Problem (90 sec) — make them feel the pain
3. Solution (90 sec) — the "aha" moment
4. Market Size (60 sec) — TAM/SAM/SOM narrative
5. Product Demo (120 sec) — show, don't tell
6. Business Model (60 sec) — how you make money
7. Traction (60 sec) — proof it's working
8. Team (60 sec) — why you're the ones to win
9. Competition (60 sec) — why you win
10. Ask + Use of Funds (90 sec) — confident close

Include: 3 investor questions you'll likely face + how to answer them brilliantly.`,
    examples: [
      `Company: NutriAI\nOne-liner: Personalized nutrition plans powered by your bloodwork\nStage: Seed\nTraction: 2,400 users, $18K MRR, 94% retention\nAsk: $1.5M\n\nSlide 2 — Problem (90 sec):\nON SCREEN:\n• 75% of diets fail within a week\n• Generic advice ignores your biology\n• $72B wasted on ineffective nutrition products\n\nYOU SAY:\n"Let me tell you about my co-founder's mom. She did everything right. Low-carb diet, daily walks, tracked every calorie. Six months later, she'd gained four pounds. Her doctor told her to 'try harder.'\n\nShe wasn't the problem. The diet was. It wasn't built for her body.\n\nEvery nutrition plan most people follow was designed for a statistical average person. You're not average. Your metabolism, your gut microbiome, your hormones — they're unique. Yet we're all eating the same generic advice.\n\nThe result? Seventy-five percent of diets fail within a week. Not because people lack willpower — because the plan was wrong for them."\n\nTRANSITION: "There's a better way — and it starts with your blood."`,
      `Company: BuildDesk\nOne-liner: Jira for construction crews\nStage: Pre-Seed\nTraction: Early stage, 3 pilot customers\nAsk: $750K\n\nSlide 6 — Business Model (60 sec):\nON SCREEN:\n• $149/month per crew\n• Free 30-day trial\n• Volume: discount 5+ crews\n\nYOU SAY:\n"We charge $149 per month per crew — that's about $5 a day. For context, one day of crew downtime from miscommunication costs a general contractor $2,000 to $8,000. We're a rounding error on their budget.\n\nWe start with a free 30-day trial — no credit card. Once a crew is set up, switching costs are high because their entire project history lives in BuildDesk. We've seen zero churn in our pilots after the trial period.\n\nAt 100 paying crews, we're at $180K ARR. Our target by month 18 is 500 crews across the Southwest — that's $900K ARR."`,
      `Company: Clarify\nOne-liner: AI that summarizes your legal contracts in plain English\nStage: Series A\nTraction: $1.2M ARR, 340 SMB customers, 110% net revenue retention\nAsk: $5M\n\nTop 3 Investor Questions + Brilliant Answers:\n\nQ1: "Why can't ChatGPT do this for free?"\nA: "ChatGPT is a generalist. It hallucinates on legal nuance — it once told a lawyer a 'liquidated damages' clause was optional when it was mandatory. Clarify is fine-tuned on 2M contracts with lawyer-reviewed outputs. We have liability coverage and a 99.3% accuracy rate on our benchmark. That's why law firms pay us instead of using free tools — the risk of getting it wrong is too high."\n\nQ2: "How do you compete if a big legal platform like DocuSign adds this feature?"\nA: "DocuSign is a signing platform — their core product is signatures, not analysis. We've seen this movie before: TurboTax didn't kill H&R Block, it created a bigger market. Clarify focuses on SMBs who can't afford in-house counsel — a segment DocuSign doesn't serve well."\n\nQ3: "Your retention is 110% — how?"\nA: "Every new feature unlocks a new contract type. Customers start with NDAs, then add employment contracts, then vendor agreements. Each expansion is a natural upsell because the value is already proven."`,
      `Company: PetAlert\nOne-liner: Real-time health monitoring for pets via AI collar\nStage: Pre-Seed\nTraction: Early stage\nAsk: $500K\n\nSlide 10 — Ask + Use of Funds (90 sec):\nON SCREEN:\n• Raising $500K Pre-Seed\n• Hardware: 40%\n• Engineering: 35%\n• Pilot: 25%\n\nYOU SAY:\n"We're raising $500K to get from prototype to 500 paying pet owners in 12 months.\n\nForty percent goes to hardware — finalizing the collar sensor with our manufacturer in Taiwan. Thirty-five percent funds two engineers to complete the iOS app and AI health model. Twenty-five percent runs our pilot program in three cities.\n\nBy the end of this round, we'll have: proven hardware that lasts 6 months on a charge, validated that pet owners pay $29/month for health alerts, and data to show vets adopt the platform. That de-risks the Series A story completely.\n\nWe're looking for investors who've backed hardware-software hybrids before, because the operational nuance matters. If that's you, I'd love to talk about what this looks like at scale."\n\nTRANSITION: [Pause. Look up from deck. Make eye contact.] "What questions do you have?"`,
    ],
    instructions: `1. Fill in all 5 fields — traction is especially important. Even "3 beta users, 90% said they'd pay" is valid traction.
2. Practice the script out loud at least 3 times. 12 minutes is tight — don't wing it.
3. Customize the "what appears on screen" bullets — these should match your actual slide design.
4. The 3 investor Q&As are generated for your specific company. Add them to a prep doc.
5. For demo-heavy pitches (Slide 5): swap the scripted section for live product interaction — the script gives you the talking points.`,
  },
  {
    title: 'AI Persona Creator — Build Custom GPT Personalities & System Prompts',
    price: '6.99',
    description: 'Get a complete AI persona with backstory, system prompt, example conversations, and evaluation rubric. Production-ready for Custom GPTs, Claude Projects, or any LLM.',
    tags: 'custom GPT, AI persona, system prompt, chatbot, automation',
    gptType: 'chat',
    gptVersion: 'gpt-5.5',
    template: `You are an AI systems designer specializing in creating highly effective custom AI personas and system prompts. Build a complete AI persona for the following use case.

Use Case: [WHAT THIS AI WILL DO, e.g. "Customer support bot for a SaaS product"]
Company/Brand: [NAME + BRIEF DESCRIPTION]
Target Users: [WHO WILL TALK TO THIS AI]
Tone & Personality: [e.g. "Friendly, concise, never condescending"]
Key Capabilities: [LIST 3-5 THINGS IT MUST DO WELL]
Hard Limits: [WHAT IT SHOULD NEVER DO OR SAY]

Deliver:
1. **Persona Name & Bio** (150 words — give it personality and backstory)
2. **System Prompt** (ready to paste into Custom GPT / Claude Project / any LLM):
   - Role definition
   - Personality traits (5 traits with behavioral examples)
   - Communication style guide
   - Knowledge boundaries
   - How to handle edge cases
   - How to escalate to humans
3. **Starter Message** (what the AI says when a conversation begins)
4. **5 Example Conversations** showing the persona in action across different scenarios
5. **Evaluation Rubric** — 5 criteria to test if the persona is working correctly

Make it production-ready — specific enough to behave consistently, flexible enough to handle real conversations.`,
    examples: [
      `Use Case: Customer support bot for a project management SaaS\nCompany: TaskFlow — project management for remote teams\nUsers: Non-technical team leads and project managers\nTone: Friendly, clear, efficient, never talks down\nCapabilities: Troubleshoot features, explain pricing, handle cancellations, collect feedback\nHard Limits: Never promise features that don't exist; never process refunds directly; never mention competitors by name\n\nPersona Name & Bio:\nMeet Quinn — TaskFlow's support specialist. Quinn spent 5 years as an operations manager before joining the TaskFlow team, which means they genuinely understand what it's like to juggle deadlines, team confusion, and software that won't cooperate. Quinn's superpower: explaining technical things in plain language without making anyone feel dumb. Off the clock, Quinn is an obsessive crossword solver and weekend trail runner. Quinn genuinely wants to solve your problem — not close a ticket.`,
      `Starter Message example:\n"Hey there! I'm Quinn, your TaskFlow guide. Whether you're stuck on a feature, have a question about your plan, or just want to know the fastest way to do something in TaskFlow — I'm here.\n\nWhat can I help you with today?"\n\nExample Conversation — Cancellation scenario:\nUser: I want to cancel my subscription.\nQuinn: Really sorry to hear that — can I ask what's driving the decision? Sometimes there's a feature or workflow issue I can help solve, but if you've made up your mind, I'll make the cancellation quick and painless. Which is it?\nUser: It's too expensive right now.\nQuinn: Totally fair. Before I process this — we do have a lighter plan at $9/month that keeps your data and gives you core features. Worth a quick look, or would you prefer to just cancel the current plan? Either answer is completely fine.`,
      `System Prompt (paste directly into Custom GPT):\n\nYou are Quinn, customer support specialist for TaskFlow (project management software for remote teams). You've been part of the TaskFlow team for 3 years and genuinely care about solving problems efficiently.\n\nPersonality traits:\n1. CLEAR: Use plain English. If a technical term is necessary, define it immediately.\n2. EFFICIENT: Solve in as few messages as possible. Don't pad responses.\n3. WARM: Acknowledge frustration before problem-solving. "That's annoying — let me fix it."\n4. HONEST: If you don't know something, say so. Never guess at pricing or features.\n5. EMPOWERING: End responses with what the user can do next, not what they should wait for.\n\nKnowledge boundaries:\n- You know: All TaskFlow features, pricing tiers, common troubleshooting, cancellation process\n- You do NOT know: Individual account billing details, engineering timelines, unreleased features\n- Escalate to human when: Refund requests over $50, account security issues, 3+ failed troubleshooting attempts`,
      `Evaluation Rubric — 5 Tests for Quinn:\n\n1. CLARITY TEST: Give Quinn a technical question using jargon. Did Quinn respond without jargon? Score: Pass/Fail\n\n2. BOUNDARY TEST: Ask Quinn to promise a feature coming "next month." Did Quinn refuse and redirect accurately? Score: Pass/Fail\n\n3. EMPATHY TEST: Open with "I've been having this problem for 3 days and I'm frustrated." Did Quinn acknowledge the frustration before troubleshooting? Score: Pass/Fail\n\n4. ESCALATION TEST: Request a $200 refund. Did Quinn escalate to a human instead of processing it? Score: Pass/Fail\n\n5. EFFICIENCY TEST: Ask a simple "how do I do X" question. Did Quinn answer in under 100 words with a direct answer? Score: Pass/Fail\n\nTarget: 5/5 Pass before deploying to real users.`,
    ],
    instructions: `1. Fill in all 6 inputs — "Hard Limits" is the most important for production safety.
2. Copy the System Prompt section directly into: Custom GPT (Instructions field), Claude Project (Custom Instructions), or any LLM system prompt.
3. Run all 5 Evaluation Rubric tests before deploying to real users.
4. Iterate: if the persona behaves inconsistently, add a specific example of correct vs. incorrect behavior to the System Prompt.
5. Update the persona quarterly — as your product evolves, so should its support persona.`,
  },
  {
    title: 'Deep Competitor Analysis — Complete Battlecard in 10 Minutes',
    price: '5.99',
    description: 'Full competitive battlecard: feature comparison table, where they beat you, where you win, sales counter-scripts, and 90-day strategic recommendations.',
    tags: 'competitive analysis, battlecard, strategy, market research, sales',
    gptType: 'chat',
    gptVersion: 'gpt-5.5',
    template: `You are a competitive intelligence analyst with 15 years of experience advising Fortune 500 companies. Produce a complete competitor analysis for the following scenario.

My Company: [YOUR COMPANY NAME + WHAT YOU DO]
Competitor: [COMPETITOR NAME + URL if known]
My Strengths: [YOUR TOP 3 ADVANTAGES]
Context: [WHY YOU'RE DOING THIS ANALYSIS — e.g. "losing deals to them" / "entering their market"]

Deliver a full competitive battlecard with:

**1. Competitor Profile**
- Business model, revenue model, funding/size
- Core product/service and positioning
- Target customer profile
- Key messages they use in marketing

**2. Feature-by-Feature Comparison**
Build a table: Feature | Us | Them | Winner | Notes

**3. Where They Beat Us** (be honest — 3-5 areas)

**4. Where We Beat Them** (3-5 areas with proof points)

**5. Their Customers' Top Complaints** (common objections/weaknesses to exploit)

**6. Sales Battlecard**
- When a prospect mentions [COMPETITOR]: say this...
- Their 3 key objections to us + how to counter each
- Trap questions to expose their weaknesses

**7. Strategic Recommendations** (5 actions to take in next 90 days)

Format as a scannable doc a sales rep can use in 5 minutes before a competitive deal.`,
    examples: [
      `My Company: Zapier — workflow automation\nCompetitor: Make (formerly Integromat)\nMy Strengths: Brand awareness, ease of use, app library size\nContext: Losing deals to Make on price in the SMB market\n\nCompetitor Profile:\nMake (make.com) — Visual workflow automation platform. Privately held, HQ Prague. Freemium model: free tier + $9–$299/month. Known for visual scenario builder and lower cost-per-operation vs. Zapier. Targets technical users and agencies who want more customization at lower price.\n\nKey marketing messages: "More powerful than Zapier. Half the price." "See your automation, don't just describe it." "Built for teams who've outgrown simple automation."\n\nWhere Make Beats Us:\n1. Price: Make's $29/mo plan includes 10K operations. Zapier's equivalent is $73/mo.\n2. Visual builder: Make's flow diagram shows data paths; Zapier's list view is less intuitive for complex logic.\n3. Data transformation: Make handles JSON parsing natively; Zapier requires workarounds.\n4. Error handling: Make has built-in retry logic and error routing; Zapier errors often just stop the zap.`,
      `Sales Battlecard — When a prospect mentions Make:\n\nOpener: "Make is a solid tool — a lot of technical users love it. Can I ask what's driving the comparison? Are you looking primarily at price, or is there a specific feature you need?"\n\n[If price]: "Make charges per operation — which looks cheaper until you have a high-volume workflow. At 50K+ operations/month, the costs converge. Can I show you a cost comparison for your actual use case?"\n\n[If features]: "Which feature specifically? Most of our users who switched from Make told us setup time was the killer — Make's visual builder is powerful but has a steep learning curve. What's your team's technical level?"\n\nTrap questions to expose Make's weaknesses:\n- "How important is it that your non-technical teammates can build and maintain these workflows themselves?"\n- "What happens to your automations when someone on your team leaves?"\n- "Do you need phone support, or is community forums okay when something breaks at 2am?"`,
      `Feature Comparison Table:\n\n| Feature | Zapier | Make | Winner | Notes |\n|---|---|---|---|---|\n| App integrations | 6,000+ | 1,500+ | Zapier | Zapier wins on breadth |\n| Price/10K ops | $73/mo | $29/mo | Make | Make wins on price |\n| Setup time | 15 min avg | 45 min avg | Zapier | Zapier wins on ease |\n| Visual builder | List view | Flow diagram | Make | Make more intuitive for complex |\n| Error handling | Basic | Advanced | Make | Make has retry logic |\n| AI features | AI steps | Limited | Zapier | Zapier AI actions available |\n| Support | Email + chat | Email only | Zapier | Phone support on Enterprise |\n| Free tier | 100 tasks/mo | 1,000 ops/mo | Make | Make's free tier more generous |`,
      `Strategic Recommendations — 90 Days:\n\n1. Build a public "Zapier vs. Make" comparison page. Rank for the search term. Own the narrative.\n\n2. Create a "Switch from Make" migration tool — import Make scenarios into Zapier in one click. Lower the switching cost.\n\n3. Launch a "Simple Automation" campaign targeting Make's non-technical user segment who feel overwhelmed.\n\n4. Drop entry price for the Starter plan from $29.99 to $19.99 to neutralize Make's price objection in SMB deals.\n\n5. Arm the sales team with 3 ROI calculator tools: time saved, error reduction, and "what happens when it breaks" cost — reframe the conversation from price to total cost of ownership.`,
    ],
    instructions: `1. Fill in all 4 inputs — the more specific your "Context," the more targeted the battlecard.
2. The battlecard is designed to be printed or saved as a 1-page PDF for sales reps to review before competitive calls.
3. Update this analysis quarterly — competitor positioning changes fast.
4. For Section 5 (Customer Complaints): cross-reference with G2, Capterra, and Reddit reviews of the competitor for real data.
5. Run this for your top 3 competitors and compare — patterns in their weaknesses reveal your best positioning.`,
  },
  {
    title: 'Full Marketing Campaign Planner — Strategy to Execution in One Prompt',
    price: '7.99',
    description: 'Complete campaign plan with audience segmentation, channel strategy, week-by-week content calendar, email sequence, KPIs, and contingency plan.',
    tags: 'marketing, campaign, content calendar, launch, growth',
    gptType: 'chat',
    gptVersion: 'gpt-5.5',
    template: `You are a CMO-level marketing strategist. Build a complete marketing campaign plan for the following launch or goal.

Product/Offer: [WHAT YOU'RE PROMOTING]
Goal: [SPECIFIC GOAL — e.g. "100 signups" / "$10K revenue" / "5,000 email subscribers"]
Timeline: [CAMPAIGN DURATION, e.g. "30 days" / "Q3"]
Budget: [TOTAL BUDGET OR "organic only"]
Target Audience: [DESCRIBE YOUR IDEAL CUSTOMER]
Channels Available: [LIST CHANNELS YOU CAN USE, e.g. Email, Instagram, LinkedIn, SEO, Paid]

Deliver a complete campaign plan:

**1. Campaign Concept** (theme, hook, core message — 1 paragraph)

**2. Audience Segmentation** (3 audience segments with messaging per segment)

**3. Channel Strategy** (for each channel you listed):
- Content types
- Posting frequency
- Key messages
- Success metrics

**4. Content Calendar** (week-by-week for the full timeline):
Week 1: [Theme + content list]
Week 2: [Theme + content list]
... continue through campaign

**5. Email Sequence** (if applicable):
- 5 emails with subject lines and key message per email

**6. Launch Day Checklist** (20-item checklist)

**7. KPIs & Tracking Dashboard**
- Primary metric + target
- 5 supporting metrics
- Weekly check-in questions

**8. Budget Allocation** (% breakdown by channel)

**9. Contingency Plan** (if halfway through you're behind — 3 pivots to make)`,
    examples: [
      `Product: Online course "LinkedIn for Consultants" ($297)\nGoal: $15K revenue (50 sales)\nTimeline: 30 days\nBudget: $500\nAudience: Independent B2B consultants, 5+ years experience, want more inbound leads\nChannels: Email list (2K), LinkedIn, Instagram\n\nCampaign Concept:\n"The Inbound Shift" — Position the course as the system that makes clients chase you instead of the other way around. Core hook: "Stop pitching. Start attracting." Every piece of content shows consultants what life looks like when LinkedIn works FOR you: clients in the DMs, speaking invites, referrals from people you've never met. The emotional driver is exhaustion with outbound + desire to be seen as the obvious expert in their niche.\n\nAudience Segments:\nSegment A — Solo consultants, 0-3 years in, inconsistent revenue. Messaging: "Build the pipeline that fills itself."\nSegment B — Established consultants, stuck at a revenue ceiling. Messaging: "Stop trading time for money — let your content do the selling."\nSegment C — Corporate-to-consultant transitioners. Messaging: "Your expertise is worth more than you're charging. Here's how LinkedIn proves it."`,
      `Content Calendar — 30-Day Launch:\n\nWeek 1 — Awareness (plant seeds):\n• Mon: LinkedIn post — "Why most consultants' LinkedIn bios repel clients" (problem awareness)\n• Wed: Email #1 — "The 3 LinkedIn mistakes killing your inbound" (list of problems, soft tease)\n• Thu: Instagram story — Poll: "How many inbound leads did you get from LinkedIn last month?"\n• Fri: LinkedIn post — Mini case study: consultant who went from 0 to 5 inbound leads/month\n\nWeek 2 — Education (build authority):\n• Mon: LinkedIn article — "The LinkedIn algorithm in 2024: what actually drives reach"\n• Tue: Email #2 — "Here's what my LinkedIn profile looked like before vs. after" (before/after reveal)\n• Thu: LinkedIn post — "The 7 types of LinkedIn posts and which converts best for consultants"\n• Fri: Instagram reel — "Post this type of content on LinkedIn for instant engagement"\n\nWeek 3 — Launch:\n• Mon: Cart open email + LinkedIn announcement post\n• Wed: FAQ email + testimonial post\n• Fri: "Closing soon" urgency email + countdown post`,
      `Email Sequence — 5-Email Launch:\n\nEmail 1 (Day 1, 9am) — "The 3 LinkedIn Mistakes"\nSubject: 3 reasons LinkedIn isn't sending you clients\nKey message: Identify the problem — most consultants post content but have a broken profile, wrong content types, and no CTA strategy. Soft tease: "I'll show you exactly what to fix next week."\n\nEmail 2 (Day 5) — "Before vs. After"\nSubject: What my profile looked like before I got 8 inbound leads in a month\nKey message: Vulnerability + proof. Show the exact changes made to profile and content. No pitch yet.\n\nEmail 3 (Day 10, Launch Day) — "It's open"\nSubject: LinkedIn for Consultants is open (closes Friday)\nKey message: Launch email. Course overview, bonuses, price, deadline. Testimonials.\n\nEmail 4 (Day 12) — "Most common question I got"\nSubject: "Will this work if I only have 500 connections?"\nKey message: FAQ format. Answer the real objections. Case study of a student who started small.\n\nEmail 5 (Day 14, Final Day) — "Last chance"\nSubject: Closes tonight at midnight\nKey message: Urgency, final testimonial, reminder of what they'll miss.`,
      `KPIs & Tracking Dashboard:\n\nPrimary metric: Revenue ($15K target = 50 sales at $297)\n\nSupporting metrics:\n1. Email open rate — target 35%+ (industry avg 22%)\n2. LinkedIn post reach — target 5,000 impressions/week\n3. Sales page conversion rate — target 3%+ (visits to purchase)\n4. Email click-to-open rate — target 15%+\n5. Cart abandonment rate — target under 70%\n\nWeekly check-in questions:\n- Are we on track for sales target? (divide sales goal by weeks remaining)\n- Which channel is driving the most clicks to the sales page?\n- What's the #1 objection in replies and DMs this week?\n\nContingency Plan (if behind at Week 2):\n1. Add a limited-time bonus: 1:1 LinkedIn profile review (adds $100 perceived value, costs 30 min of time)\n2. Activate affiliate partners: offer 30% commission to 5 peers with aligned audiences\n3. Run a 3-day LinkedIn live series: free mini-training that sells the course at the end of each session`,
    ],
    instructions: `1. Fill in all 6 inputs — "Goal" must be a specific number, not vague ("more sales" won't work well).
2. The content calendar gives you the full schedule — block the time on your calendar before starting.
3. Use the KPIs section to build a simple weekly scorecard in a Google Sheet.
4. If your budget is "organic only," skip Section 8 (Budget Allocation) and tell the AI to redistribute that energy to content creation.
5. Run a campaign retrospective after it ends: what hit the KPIs, what didn't, and why.`,
  },
  {
    title: 'Sales Objection Handler — Overcome Any Objection With Confidence',
    price: '5.99',
    description: 'Word-for-word scripts for any sales objection using the LAER method. 3 different response approaches, follow-up questions, and the path to close.',
    tags: 'sales, objections, closing, B2B sales, sales scripts',
    gptType: 'chat',
    gptVersion: 'gpt-5.5',
    template: `You are a master sales trainer who has coached 10,000+ sales reps. Handle the following sales objection with proven techniques.

What You Sell: [PRODUCT/SERVICE + PRICE POINT]
The Objection: [EXACT WORDS THE PROSPECT SAID]
Context: [STAGE OF THE DEAL — e.g. "first call" / "proposal stage" / "closing call"]
Their Role: [PROSPECT'S JOB TITLE]
What You Know About Them: [ANY CONTEXT — company size, pains, prior conversations]

For this objection, provide:

**1. Objection Analysis**
- Real concern behind the words (root cause)
- Is this a real objection or a stall? (and how to tell)
- Urgency level: Buy signal / Neutral / Red flag

**2. Response Framework** (use the LAER method: Listen, Acknowledge, Explore, Respond)

**3. Word-for-Word Scripts** — 3 different response approaches:
- Approach A: Empathy-first
- Approach B: Reframe the value
- Approach C: Use social proof / case study

**4. Follow-up Questions** to ask AFTER your response (to keep control)

**5. If They Still Object** — the bridge to next step

**6. What NOT to Say** (3 common mistakes reps make with this objection)

End with: "Best case path to close from here" — the next 3 steps in the deal.`,
    examples: [
      `Product: CRM software at $500/month\nObjection: "It's too expensive."\nContext: Proposal stage, 2nd call\nRole: VP of Sales\nContext: 25-person sales team, currently using spreadsheets, losing deals to disorganization\n\nObjection Analysis:\nReal concern: They can't justify the cost to their CFO, OR they don't yet believe the ROI exceeds the price. Price objections at proposal stage are almost always ROI objections in disguise.\nReal vs. stall: If they stayed on the call after seeing the price — it's real interest with budget friction, not a brushoff.\nUrgency level: Buy signal — they're engaged enough to object rather than ghost.\n\nApproach A (Empathy-first):\n"Totally fair — $500 a month is real money. Can I ask: when you said expensive, are you comparing it to your current spend, or is it more about getting buy-in from finance? I want to make sure I'm solving the right problem."`,
      `Product: Executive coaching at $3,000/month\nObjection: "I need to think about it."\nContext: Closing call\nRole: CEO of 50-person company\nContext: Mentioned burnout, team issues, wants to scale to $5M\n\nLAER Framework:\nListen: Don't interrupt. Let silence work. Nod.\nAcknowledge: "Of course — this is a significant investment and the right call deserves real thought."\nExplore: "Can I ask what part you want to think through? Is it the fit, the timing, or something else I haven't addressed?"\nRespond: [Based on their answer, address the specific concern]\n\nApproach C (Social proof):\n"I completely understand. One of my clients — a CEO in a similar spot, $4M revenue, team friction, same burnout signs you described — had the same pause. She said the thing that made her move forward was realizing the cost of NOT fixing this was higher than $3K a month. Six months later, she'd promoted two people she was about to fire and hit her first $500K quarter. I'm not saying that's your story — but what would it mean for you if Q4 looked like that?"`,
      `Product: HR software at $200/month\nObjection: "We're happy with what we have."\nContext: First call — cold outreach\nRole: HR Manager\nContext: Company of 80 employees, using paper-based HR processes\n\nWhat NOT to Say:\n1. ❌ "But our product is so much better!" — self-promotional, sounds desperate, creates defensiveness.\n2. ❌ "What would it take to change your mind?" — puts them in control of your sales process, invites stall tactics.\n3. ❌ "I understand, but..." — the word "but" erases everything before it. They stop listening after you say it.\n\nFollow-up Questions (to stay in control):\n- "What does 'happy' look like? I'm curious what's working well — that helps me understand where gaps might actually matter."\n- "When was the last time you evaluated your HR process against where the company is now?"\n- "If there was one thing about your current setup you could fix overnight, what would it be?"\n\nBest Case Path to Close:\nStep 1: Get them to name the one thing that isn't perfect (there always is one)\nStep 2: Book a 20-minute "efficiency audit" call — low commitment, high value\nStep 3: On audit call, show them 1 specific workflow that saves 3 hours/week → price becomes irrelevant`,
      `Product: Marketing agency retainer at $5,000/month\nObjection: "We don't have the budget right now."\nContext: Proposal stage\nRole: Marketing Director\nContext: Series A startup, just raised $2M, scrambling to hit growth targets\n\nIf They Still Object — Bridge to Next Step:\n"I hear you on timing — and I don't want to push you into something that creates stress. Here's what I'd suggest: let's put a 30-day hold on the full retainer and do a single project first — our 'Quick Win' audit at $1,500. It's a full marketing teardown with a prioritized action list. If it's useful, you have a roadmap whether or not you work with us. If it's exceptional, you'll have data to make the budget case internally. Fair?"\n\nWhy this works: Reduces risk, creates a trial experience, gives them something concrete to show their CFO, and keeps the relationship alive without a hard close.`,
    ],
    instructions: `1. Paste the exact words the prospect used — not a paraphrase. Word choice matters for diagnosis.
2. Run this before high-stakes calls, not during them. Prep the 3 scripts in advance.
3. Use Approach A by default. Switch to B or C based on their energy level and what's blocking them.
4. The "What NOT to Say" section is often more valuable than the scripts — memorize it.
5. After the call, note which approach worked and why. Over time, you'll know your objection patterns cold.`,
  },
];

// ─── Step 1 form data (from launch_guide.md) ──────────────────────────────
const STEP1_DATA = [
  { title: 'Meta-Prompt Engineer — Turn Any Task Into a Perfect AI Prompt', price: '7.99', description: 'Stop getting mediocre AI outputs. This prompt transforms any task description into a maximally effective, production-ready prompt in seconds. Used by prompt engineers to 10x their AI results. Works with ChatGPT, Claude, Gemini.', tags: 'prompt engineering, AI prompts, ChatGPT, productivity, meta-prompt' },
  { title: 'Complete Business Plan Generator — Investor-Ready in Minutes', price: '9.99', description: 'Get a full investor-ready business plan with TAM/SAM/SOM, financial projections, competitive analysis, and go-to-market strategy. Used by founders and consultants to save 20+ hours per plan.', tags: 'business plan, startup, investor, entrepreneurship, fundraising' },
  { title: 'Cold Email Sequence Generator — 5-Email Sequence That Books Meetings', price: '6.99', description: 'Generate a complete 5-email cold email sequence with subject lines, personalization hooks, and send timing. Based on sequences that have generated $2M+ in pipeline.', tags: 'cold email, sales, outreach, B2B, email marketing' },
  { title: 'LinkedIn Viral Post Formula — Hook, Story, CTA That Gets 10K+ Views', price: '5.99', description: 'Generate 3 different LinkedIn post formats (Story Arc, Listicle, Contrarian Take) rated by virality potential. Stop posting into the void.', tags: 'LinkedIn, viral, content, social media, personal brand' },
  { title: 'SEO Blog Article Writer — Rank-Ready 2,000-Word Articles From One Keyword', price: '7.99', description: 'Full 2,000-word SEO-optimized article with title tag, meta description, FAQ section, and internal link placeholders. Just give it your keyword.', tags: 'SEO, blog, content marketing, writing, Google' },
  { title: 'Pitch Deck Script Generator — Slide-by-Slide Script for Fundraising', price: '9.99', description: 'Get a word-for-word spoken script for a 10-slide pitch deck (12 minutes) with what to say, what shows on screen, and how to handle investor Q&A. For pre-seed through Series A.', tags: 'pitch deck, fundraising, VC, startup, investor' },
  { title: 'AI Persona Creator — Build Custom GPT Personalities & System Prompts', price: '6.99', description: 'Get a complete AI persona with backstory, system prompt, example conversations, and evaluation rubric. Production-ready for Custom GPTs, Claude Projects, or any LLM.', tags: 'custom GPT, AI persona, system prompt, chatbot, automation' },
  { title: 'Deep Competitor Analysis — Complete Battlecard in 10 Minutes', price: '5.99', description: 'Full competitive battlecard: feature comparison table, where they beat you, where you win, sales counter-scripts, and 90-day strategic recommendations.', tags: 'competitive analysis, battlecard, strategy, market research, sales' },
  { title: 'Full Marketing Campaign Planner — Strategy to Execution in One Prompt', price: '7.99', description: 'Complete campaign plan with audience segmentation, channel strategy, week-by-week content calendar, email sequence, KPIs, and contingency plan.', tags: 'marketing, campaign, content calendar, launch, growth' },
  { title: 'Sales Objection Handler — Overcome Any Objection With Confidence', price: '5.99', description: 'Word-for-word scripts for any sales objection using the LAER method. 3 different response approaches, follow-up questions, and the path to close.', tags: 'sales, objections, closing, B2B sales, sales scripts' },
];

// ─── Helper: fill Angular textarea ────────────────────────────────────────
async function fillAngularTextarea(page, selector, value) {
  await page.click(selector);
  await page.evaluate(({ sel, val }) => {
    const el = document.querySelector(sel);
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
    nativeInputValueSetter.call(el, val);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }, { sel: selector, val: value });
  await page.click(selector); // trigger Angular change detection
}

// ─── Helper: fill Angular text input ──────────────────────────────────────
async function fillAngularInput(page, selector, value) {
  await page.click(selector);
  await page.evaluate(({ sel, val }) => {
    const el = document.querySelector(sel);
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeInputValueSetter.call(el, val);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }, { sel: selector, val: value });
}

// ─── Helper: robust click with freeze tolerance ────────────────────────────
async function robustClick(page, selector, timeout = 20000) {
  try {
    await page.click(selector, { timeout: 5000 });
  } catch {
    // CDP may freeze — wait and check if page advanced anyway
    console.log(`Click may have frozen on ${selector} — waiting for navigation...`);
    await page.waitForTimeout(3000);
  }
  // Wait for network to settle (short timeout — SPAs rarely fully idle)
  try {
    await page.waitForLoadState('networkidle', { timeout });
  } catch {
    console.log('Network idle timeout — continuing anyway');
  }
}

// ─── Main listing function ─────────────────────────────────────────────────
async function listPrompt(page, index) {
  const prompt = PROMPTS[index];
  const step1 = STEP1_DATA[index];
  console.log(`\n=== Listing Prompt ${index + 1}/10: ${prompt.title} ===`);

  // Navigate to sell page to start a new listing
  await page.goto('https://promptbase.com/sell', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // PromptBase may resume an existing draft at Step 2 — detect and go back to Step 1
  const draftAtStep2 = await page.$('textarea[placeholder*="Impressionist"]');
  if (draftAtStep2) {
    console.log('Detected existing draft resumed at Step 2 — clicking Back to reset to Step 1');
    const backBtn = await page.$('button:has-text("Back")');
    if (backBtn) {
      await backBtn.click();
      await page.waitForTimeout(2000);
    }
  }
  const pageStep = await page.evaluate(() => document.body.innerText.slice(0, 100));
  console.log('Step indicator:', pageStep.replace(/\n/g, ' ').slice(0, 80));

  // ── STEP 1: Basic info ──────────────────────────────────────────────────
  console.log('Filling Step 1...');

  // Title
  const titleSel = 'input[placeholder*="title"], input[formcontrolname="title"]';
  await page.waitForSelector(titleSel, { timeout: 15000 });
  await fillAngularInput(page, titleSel, step1.title);

  // Price
  const priceSel = 'input[placeholder*="price"], input[formcontrolname="price"], input[type="number"]';
  await fillAngularInput(page, priceSel, step1.price);

  // Description
  const descSel = 'textarea[placeholder*="description"], textarea[formcontrolname="description"]';
  const descEls = await page.$$(descSel);
  if (descEls.length > 0) {
    await fillAngularTextarea(page, descSel, step1.description);
  }

  // Tags
  const tagSel = 'input[placeholder*="tag"], input[formcontrolname="tags"]';
  const tagEls = await page.$$(tagSel);
  if (tagEls.length > 0) {
    // Try comma-separated tags
    const tagsArr = step1.tags.split(',').map(t => t.trim());
    for (const tag of tagsArr) {
      await fillAngularInput(page, tagSel, tag);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(300);
    }
  }

  // Click Next (Step 1 → Step 2)
  const nextBtn1 = 'button:has-text("Next"), button:has-text("Continue")';
  await robustClick(page, nextBtn1);
  await page.waitForTimeout(2000);

  // ── STEP 2: Prompt file ─────────────────────────────────────────────────
  console.log('Filling Step 2...');

  // GPT Type — select 'chat'
  const gptTypeEl = await page.$('select[formcontrolname="gptType"], select');
  if (gptTypeEl) {
    await gptTypeEl.selectOption(prompt.gptType);
    await page.waitForTimeout(500);
  }

  // GPT Version
  const versionEls = await page.$$('select');
  if (versionEls.length > 1) {
    await versionEls[1].selectOption({ label: prompt.gptVersion });
    await page.waitForTimeout(500);
  }

  // Prompt template
  const templateSel = 'textarea[placeholder*="Impressionist"], textarea[placeholder*="template"]';
  await page.waitForSelector(templateSel, { timeout: 15000 });
  await fillAngularTextarea(page, templateSel, prompt.template);
  await page.waitForTimeout(1000);

  // Add 4 example outputs — use index-based selection to avoid always filling textarea[0]
  for (let i = 0; i < prompt.examples.length; i++) {
    console.log(`  Adding example ${i + 1}/${prompt.examples.length}...`);

    // Wait for the i-th example textarea slot to exist
    try {
      await page.waitForFunction(
        (count) => document.querySelectorAll('textarea[placeholder*="Paste your output"]').length >= count,
        { timeout: 10000 },
        i + 1
      );
    } catch (e) {
      console.log(`  WARNING: expected ${i + 1} example textarea(s), got fewer — filling whatever is available`);
    }

    // Fill the i-th textarea by index (querySelector always returns first — must use evaluate)
    const filled = await page.evaluate(({ idx, val }) => {
      const textareas = Array.from(document.querySelectorAll('textarea[placeholder*="Paste your output"]'));
      const el = textareas[idx];
      if (!el) return false;
      const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
      nativeSetter.call(el, val);
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
      el.click();
      return true;
    }, { idx: i, val: prompt.examples[i] });
    console.log(`  Example ${i + 1} fill: ${filled ? 'OK' : 'FAILED (textarea not found)'}`);
    await page.waitForTimeout(800);

    // Click "Add example +" to reveal next textarea slot
    const addBtnEl = await page.$('button:has-text("Add example")');
    if (addBtnEl) {
      await addBtnEl.click();
      await page.waitForTimeout(800);
    } else {
      console.log(`  NOTE: "Add example +" button not found after example ${i + 1}`);
    }
  }

  // Instructions
  const instructSel = 'textarea[placeholder*="tips"], textarea[placeholder*="instructions"], textarea[placeholder*="most out"]';
  const instructEls = await page.$$(instructSel);
  if (instructEls.length > 0) {
    await fillAngularTextarea(page, instructSel, prompt.instructions);
  }

  // Click Next: Finish — tolerate freeze
  console.log('Clicking Next: Finish (may freeze 30-60s)...');
  const nextBtn2 = 'button:has-text("Finish"), button:has-text("Next: Finish")';
  await robustClick(page, nextBtn2, 120000);
  await page.waitForTimeout(3000);

  // ── STEP 3: Review & submit ─────────────────────────────────────────────
  console.log('Step 3 — submitting...');
  const submitBtn = 'button:has-text("Submit"), button:has-text("Publish"), button:has-text("List")';
  const submitEl = await page.$(submitBtn);
  if (submitEl) {
    await robustClick(page, submitBtn, 60000);
    console.log(`✅ Prompt ${index + 1} submitted!`);
  } else {
    console.log(`⚠️  Submit button not found on Prompt ${index + 1} — check manually`);
    await page.screenshot({ path: `prompt_${index + 1}_step3.png` });
  }

  await page.waitForTimeout(3000);
}

// ─── Login ─────────────────────────────────────────────────────────────────
async function login(page) {
  console.log('Logging in to PromptBase...');
  await page.goto('https://promptbase.com/login', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  const bodyText = await page.evaluate(() => document.body.innerText.slice(0, 500));
  console.log('Page text (first 500 chars):', bodyText);

  // Page defaults to Create Account — switch to login mode
  try {
    await page.click('text=I already have an account', { timeout: 5000 });
    console.log('Clicked "I already have an account"');
    await page.waitForTimeout(2000);
    const afterClick = await page.evaluate(() => document.body.innerText.slice(0, 300));
    console.log('After switch to login:', afterClick);
  } catch (e) {
    console.log('No account-switch button found, proceeding as-is');
  }

  // Step 1: Email
  await page.waitForSelector('input[type="email"]', { timeout: 15000 });
  await page.fill('input[type="email"]', EMAIL);
  await page.waitForTimeout(500);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(3000);

  const afterEmail = await page.evaluate(() => document.body.innerText.slice(0, 300));
  console.log('After email Enter:', afterEmail);

  // Step 2: Password — wait for Angular to bind the form control before filling
  await page.waitForSelector('input[type="password"]', { timeout: 15000 });
  await page.waitForTimeout(1500); // Angular needs time to initialize reactive form after password field appears
  await fillAngularInput(page, 'input[type="password"]', PASSWORD);
  await page.waitForTimeout(1000);

  // Try clicking the Login button explicitly (more reliable than Enter on Angular forms)
  const loginSubmitBtn = await page.$('button:has-text("Login"), button[type="submit"]');
  if (loginSubmitBtn) {
    await loginSubmitBtn.click();
    console.log('Clicked Login submit button');
  } else {
    await page.keyboard.press('Enter');
    console.log('Pressed Enter to submit (no Login button found)');
  }

  // Wait until we navigate away from /login (flexible — handles any redirect)
  await page.waitForFunction(() => !window.location.href.includes('/login'), { timeout: 30000 });
  console.log('✅ Logged in - URL:', page.url());
}

// ─── Entry point ───────────────────────────────────────────────────────────
(async () => {
  // Validate password is set
  if (!PASSWORD) {
    console.error('ERROR: Set PROMPTBASE_PASSWORD env var before running.');
    console.error('Example: PROMPTBASE_PASSWORD=yourpass node promptbase_lister.js');
    process.exit(1);
  }

  const browser = await chromium.launch({
    headless: true,  // required for CI/server runs (no XServer)
    // No slowMo — Angular fills use evaluate() so slowMo doesn't help and wastes time
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });

  const page = await context.newPage();

  // Start from which prompt? (0-indexed, so 0 = Prompt 1)
  // Change this if you need to resume from a specific prompt
  const START_FROM = parseInt(process.env.START_FROM || '0', 10);

  try {
    await login(page);

    for (let i = START_FROM; i < PROMPTS.length; i++) {
      await listPrompt(page, i);
    }

    console.log('\n🎉 All prompts listed successfully!');
  } catch (err) {
    console.error('Error:', err.message);
    await page.screenshot({ path: 'error_state.png' });
    console.log('Screenshot saved to error_state.png');
  } finally {
    await browser.close();
  }
})();
