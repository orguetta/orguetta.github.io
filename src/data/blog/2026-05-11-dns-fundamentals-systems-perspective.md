---
author: Or Guetta
pubDatetime: 2026-05-11
modDatetime: 2026-05-11
title: DNS Fundamentals – A Systems Perspective
slug: 2026-05-11-dns-fundamentals-systems-perspective
featured: false
draft: false
description: DNS isn't just a phonebook. It's the most critical part of your infra stack. Here's how it works and how to debug it when it breaks.
---

## The DNS Rabbit Hole

I recently hit the classic infrastructure wall: I pointed a domain to a new server, updated the A record, and then sat through three hours of "Why isn't this working?" before remembering how TTL propagation actually functions.

Most people see DNS as "it translates domains to IPs." If you want to run your own infrastructure, that's not enough. You need to understand it as a referral chain.

## The Hierarchy: A Chain of Referrals

DNS is organized as a top-down referral system. No server knows everything.

1. **Root (.)**: The starting point. It doesn't know where `example.com` lives, but it knows which server manages `.com`.
2. **TLD (.com, .io, .dev)**: Knows the authoritative nameservers for specific domains registered under that TLD.
3. **Domain**: The level you control (e.g., `example.com`). This is where you set the actual records.
4. **Subdomain**: Your playground (`api.example.com`). You can create these for free without additional domain purchases.

## The Records You Actually Use

Stop overcomplicating it. In 90% of your infra setup, these are the only ones that matter:

- **A**: Maps `domain` to IPv4. The bread and butter.
- **AAAA**: The IPv6 equivalent. Four times longer than IPv4, hence the four A's. Standardizing on dual-stack (A + AAAA) is the modern best practice.
- **CNAME**: Maps `domain` to `another-domain`. Essential for pointing subdomains to SaaS providers (Ghost, GitBook, etc.).
- **TXT**: Stores arbitrary text. Mandatory for domain verification (Stripe/Google), SPF, DKIM, and DMARC.
- **MX**: Mail delivery. Priority matters—lower is tried first.

## Authoritative vs. Recursive

Don't confuse them:

- **Recursive Resolver**: The messenger (e.g., 1.1.1.1). It does the hard work of traversing the hierarchy for you.
- **Authoritative Nameserver**: The source of truth. It holds the final record for a domain.

## The TTL Lesson

**Time To Live** is the cache duration. If you're planning a server migration, **lower your TTL to 300 (5 minutes) at least 24 hours before you switch.** This ensures that when things break, you aren't waiting for hours for resolvers to dump their stale cache.

## Debugging Workflow

When it doesn't work, stop guessing. Use these tools to see what the system actually sees:

### Querying

```bash
# Detailed lookup
dig example.com

# Query specific records
dig example.com TXT
dig @1.1.1.1 example.com
```

### Clearing the Stale Cache

If you need to force a refresh:

```bash
# Windows
ipconfig /flushdns

# Linux (systemd-resolved)
sudo systemd-resolve --flush-caches
```

## Why it Matters

DNS is a tool for systems design, not just a static lookup. Use **Round-Robin** for basic load distribution, **GeoDNS** for latency optimization, and health-check-based record updates for automated failover.

Understand the resolution process—Browser → OS → Router → Resolver → Root → TLD → Authoritative—and you'll know exactly which hop is causing your migration headache.
