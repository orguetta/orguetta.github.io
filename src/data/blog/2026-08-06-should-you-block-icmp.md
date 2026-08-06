---
author: Or Guetta
pubDatetime: 2026-08-06
modDatetime: 2026-08-06
title: Should You Block ICMP? The Wrong Question to Ask
slug: 2026-08-06-should-you-block-icmp
featured: false
draft: false
description: A pragmatic look at ICMP filtering. Why blocking all ICMP causes silent network failures, breaks PMTUD, and what you should do instead.
---

Many network administrators assume ICMP is an inherent security risk and enforce a blanket block at the firewall. This is a common reflex that leads to bizarre, hard-to-diagnose network failures.

The problem isn't ICMP itself. It's blind filtering without understanding what the protocol actually does under the hood.

---

## 1. The Core Issue: Path MTU Discovery (PMTUD)

The most critical reason not to block ICMP is TCP packet fragmentation.

When two hosts communicate, they must adapt their **Maximum Segment Size (MSS)** to the smallest **MTU** along the path between them.

- In IPv4 (when the DF bit is set) and IPv6 (where routers do not perform fragmentation), a router that encounters an oversized packet will drop it and return an ICMP **Fragmentation Needed / Packet Too Big** message.
- If your firewall drops these ICMP messages, the sender remains blind to the issue. The result: a **TCP Black Hole**. The initial handshake succeeds because packets are small, but as soon as bulk data transmission starts, the session stalls completely.

## 2. What About Ping (Echo Request / Reply)?

We all know it. Yes, responding to echo requests makes your host discoverable, but your web server is already listening on ports 80 and 443 anyway.

Feel free to block pings at your external DMZ border if you want, but blocking ping traffic internally only frustrates your IT team during troubleshooting ("Can you ping your default gateway?").

## 3. Time Exceeded and Traceroute

Trying to diagnose a network path using `traceroute`? The tool sends packets with incrementing TTLs and relies on ICMP **Time Exceeded** messages from intermediate hops to map the route. Blocking these ICMP messages turns traceroutes into black boxes and breaks network debugging.

## 4. IPv6 Relies on ICMP

Unlike IPv4 which used ARP, IPv6 handles layer 2 to 3 mappings via the **Neighbour Discovery Protocol (NDP)** and **SLAAC** (Stateless Address Autoconfiguration), both of which run directly on top of ICMPv6. Block ICMP inside an IPv6 network, and the network simply stops working.

---

## The Bottom Line

Don't block ICMP blindly.

1. **Allow critical messages:** Permit Path MTU discovery (Fragmentation Needed / Packet Too Big), Time Exceeded, and IPv6 NDP traffic.
2. **Implement Rate Limiting:** Prevent ping floods and excessive CPU load on your routers without breaking functionality.
3. **Avoid dogmatic security:** Security isn't about blocking everything you don't understand. Know what you're filtering.
