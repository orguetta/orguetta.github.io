---
pubDatetime: 2025-12-30
modDatetime: 2025-12-30
title: My Security and Privacy Stack – 2025
featured: false
draft: true
---
## This is the fourth part of my personal stack series. After covering tools, infrastructure, and workflows, this post focuses on how I think about security and privacy in my setup.

This is not a complete security model. It’s a practical approach that balances protection with simplicity.

### Identity and Access

Most access to my services goes through Authentik. It acts as a central point for authentication and helps me avoid managing credentials across multiple systems.

For personal use, I rely on Apple Passwords for both passwords and 2FA. It’s tightly integrated into my devices, which keeps things simple and reduces friction.

Where possible, I avoid exposing services directly without some form of authentication in front of them.

### Network and Exposure

All public traffic goes through Cloudflare. It handles DNS, acts as a proxy, and provides a basic layer of protection against common attacks.

On the cloud side, I restrict access using Oracle security lists. Only Cloudflare IP ranges and my home IP are allowed. Everything else is blocked by default.

For private access, I recently started using Tailscale. It allows me to reach internal services without exposing them publicly. This is something I plan to expand.

### Service Isolation

Each service runs in its own container, often with its own database. I prefer this separation over sharing everything in a single database or network.

It’s not perfect isolation, but it reduces the blast radius if something breaks or is misconfigured.

### Secrets and Configuration

Most configuration is managed through environment variables and Docker Compose files stored in private repositories.

I try to avoid hardcoding secrets and keep sensitive data out of version control. This is an area I’m still improving.

### Monitoring and Awareness

Security is not just about prevention. It’s also about knowing when something is wrong.

With Prometheus, Grafana, and alerts in place, I get visibility into my systems. Uptime Kuma adds an external view to make sure services are reachable.

This doesn’t replace proper security monitoring, but it’s enough for a personal setup.

### Trade-offs

There are things I’m intentionally not doing yet.

Full data backups are still missing and planned for 2026. Some services are exposed more simply than I would in a production environment.

These are conscious trade-offs to keep the system manageable.

### How I Think About It

I don’t try to build a perfect secure system. I focus on reducing obvious risks, limiting exposure, and keeping things understandable.

If a setup becomes too complex, it usually creates new problems instead of solving them.

### What’s Next

This is the last part of the series. I may revisit parts of this stack in the future as things change or improve.

If you’re building your own setup, start simple. Add layers only when you understand why you need them.