---
author: Or Guetta
pubDatetime: 2025-12-28
modDatetime: 2025-12-28
title: My Infrastructure Stack – 2025
featured: false
draft: false
---
### This post is the second part of my personal stack series. Here I focus only on the infrastructure side: where things run, how they are exposed, and how I keep the setup simple enough to manage alone.

This is not a production-grade platform and not meant to impress. It’s a personal lab that I actually use every day.

## Base Setup

I run two virtual machines on Oracle Cloud Always Free, ARM-based, with Ubuntu 22.04 and 24.04. This choice keeps costs at zero while still giving me a stable environment to experiment and host real services.

All projects run with Docker and Docker Compose. Each stack is defined in GitHub (private repositories), so the infrastructure is reproducible and easy to rebuild if needed.

### Networking and Exposure

Traffic is handled by Traefik as a reverse proxy. Domains, DNS, proxying, and basic attack protection are managed through Cloudflare.

On the Oracle side, security lists are locked down at the network level. Only Cloudflare IP ranges and my home IP are allowed. Everything else is blocked by default.

I recently started using [Tailscale](https://github.com/tailscale/tailscale) for private access between services and machines. It’s still early, but it already simplifies things that used to require SSH tunnels or manual rules.

### Identity and Access

For authentication and access control, I use [Authentik](https://github.com/goauthentik/authentik). It sits in front of internal services and gives me a single place to manage users and access rules.

This is one of those tools that quietly becomes critical once it’s in place.

Observability and Monitoring

I prefer to know when things break instead of discovering it by accident.

For [metrics and monitoring](https://github.com/stefanprodan/dockprom), I run:

*   Prometheus for metrics collection
    
*   Pushgateway for short-lived and batch jobs
    
*   Alertmanager for alerts
    
*   Node Exporter for host metrics
    
*   cAdvisor for container metrics
    
*   Grafana for visualization
    

For basic uptime checks and external visibility, I use Uptime Kuma.

This setup is more than enough for a personal environment and helps me spot issues early.

### Backups

At the moment, I only back up configuration files and Compose definitions. Application data backups are intentionally postponed and planned as a 2026 improvement.

This is a known trade-off, not an oversight.

### What Runs on It

I don’t expose every container publicly, but the main services include:

*   [Linkwarden](https://github.com/linkwarden/linkwarden) and [a Telegram bot](https://github.com/orguetta/linkwarden-telegram-bot)
    
*   [Miniflux](https://github.com/miniflux/v2) for RSS
    
*   [n8n](https://github.com/n8n-io/n8n) for automation
    
*   [Grafana and the monitoring stack](https://github.com/stefanprodan/dockprom)
    
*   [Umami](https://github.com/umami-software/umami) for analytics
    
*   [Uptime Kuma](https://github.com/louislam/uptime-kuma)
    
*   Small internal tools and bots
    

Most of these services are used daily. If something isn’t useful anymore, it gets removed.

### Why This Works for Me

This setup stays intentionally boring. No Kubernetes, no complex service mesh, no unnecessary layers.

Docker Compose, a small number of VMs, and clear boundaries are enough for what I need right now. The goal is learning and control, not scale.

## What’s Next

In the next parts, I’ll go deeper into:

*   Productivity and automation flows
    
*   Security and privacy decisions
    
*   Things I plan to change or improve in 2026
    

As with the first post, this is not a template. It’s just one way to run a personal infrastructure that stays manageable over time.