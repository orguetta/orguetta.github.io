---
author: Or Guetta
pubDatetime: 2025-11-27
modDatetime: 2025-11-27
title: How to Protect Your NetScaler Gateway from Password Spraying Attacks
ogImage: How to Protect Your NetScaler Gateway from Password Spraying Attacks
featured: false
draft: true
tags:
  - NetScaler
  - Security
  - Password Spraying
  - Authentication
  - WAF
description: A practical guide to detecting and stopping password spraying
  attacks on NetScaler Gateway with real-world configurations
---
image: "/images/netscaler-security.png"

\# How to Protect Your NetScaler Gateway from Password Spraying Attacks

\## The Problem: What's Actually Happening

You're probably familiar with traditional brute force attacksâ€”someone tries password after password on a single account until they crack it. Password spraying is different. Think of it like this:

Instead of hammering one door, attackers knock on many doors with the same key. They take common passwords (from leaked database dumps on the dark web), generate realistic usernames based on your company naming patterns, and spread their attempts across thousands of different IP addresses. This way, each account sees only a few failed attempts, slipping under the radar of traditional defenses.

The really sneaky part? When attacks come from diverse IP sources and span hours or days, your standard rate limiting and IP blocking don't catch it.

**The real danger:** A successful attack doesn't just mean stolen credentials. Even unsuccessful spray campaigns can overwhelm your NetScaler Gateway with sheer volume, clogging your authentication system and potentially locking out legitimate users.

\---

\## Layer 1: Detection â€“ Know When You're Under Attack

\### What Does an Attack Look Like in Your Logs?

Before defending, you need to recognize what's happening. Here are the telltale signs in your NetScaler logs:

**Spike in authentication failures** â€“ Normal traffic might show 10-20 failed logins per hour from different sources. An attack shows 500+ attempts in rapid succession.

**Username rotation pattern** â€“ Attackers try different usernames from the same IP or IP block. Look for logs showing the same source IP attempting "john.smith", then "jane.smith", then "bob.jones"â€”switching usernames rapidly.

**Time spread over hours/days** â€“ Unlike a noisy brute force that gets blocked quickly, password spray attacks are patient. They might attack for 4-8 hours, then pause, then resume.

**Authentication attempts to legacy endpoints** â€“ Modern attacks specifically target pre-nFactor authentication endpoints (where MFA isn't enforced yet), because they know nFactor will stop them cold.

\### Enable Enhanced Logging

\`\`\`

set aaa parameter -enableEnhancedAuditLog ON

set vpn parameter -enableEnhancedAuditLog ON

\`\`\`

This tells NetScaler to log authentication attempts in much more detail. You'll see:

\- Source IP

\- Username attempted

\- Success/failure

\- Timestamp (exact to the second)

\- Client type

\### Monitor Your Gateway Insights

If you have **Citrix Gateway Insights** enabled, set alerts for:

\- More than 100 failed authentications per minute

\- Failed authentication rate exceeding 50% of total attempts

\- Authentication attempts from more than 50 unique source IPs in 5 minutes

\---

\## Layer 2: Smart Detection â€“ Find Sprayers Before They Cause Damage

The most sophisticated defense is username rotation detection. Here's the concept:

Instead of blocking an IP after 5 wrong passwords (which sprayers avoid by using each password only once), you block based on **username changes**. If an IP tries "john", then "jane", then "bob" rapidlyâ€”that's a sprayer. Legitimate users try the same username repeatedly.

\### Implementation: nFactor Username Rotation Detection

This configuration uses NetScaler maps to track IP behavior:

\`\`\`

\# Create selectors that track IP-to-username mapping

add stream selector IP\_Username\_Tracker CLIENT.IP.SRC HTTP.REQ.BODY(1000).REGEX\_SELECT(re/(login=\[^&\]+)/)

\# Create a limit identifier for the attack pattern

add ns limitSelector Bad\_IP\_Counter CLIENT.IP.SRC

add ns limitIdentifier BadIP\_Detection -selector Bad\_IP\_Counter -mode "REQUEST\_RATE" -limitType BURSTY -threshold 5 -timeSlice 60000

\# Set up responder policy to drop suspected attacks

add responder policy Block\_Sprayers "client.ip.src.typecast\_text\_t.equals\_any(\\"Sprayer\_IP\_Dataset\\")" -action "reset"

bind responder global Block\_Sprayers -priority 10

\`\`\`

**What this does:**

\- Tracks when an IP changes usernames (tracking happens via nFactor policy assignment)

\- After 9 username changes in 24 hours, the IP gets blocked

\- Blocked IPs stay blocked for 24 hours

\- A successful login resets the counter (legitimate users eventually log in successfully)

\### Configure Using GUI (Easier Path)

1\. Go to **AppExpert â†’ nFactor â†’ Policies**

2\. Create a new policy named `Detect_Username_Rotation`

3\. Add this expression:

\`\`\`

$USERNAME\_CHANGE\_COUNT.increment() > 9

\`\`\`

4\. Action: **Reject with error** (shows user a "too many attempts" message)

\---

\## Layer 3: Authentication Hardening â€“ Make Their Job Impossible

\### Multi-Factor Authentication (nFactor)

This is the nuclear option. If you force nFactor, password spraying becomes useless. The attacker might get the password right, but without the second factor, they're locked out.

**But waitâ€”you might have legacy apps that don't support MFA.**

If that's your situation, here's how to split the difference:

\`\`\`

\# Create two authentication policies

\# Policy 1: Legacy apps (single factor only)

add authentication policy Legacy\_Auth -rule "HTTP.REQ.URL.CONTAINS(\\"/legacy-app\\")" -action single\_factor\_ldap

\# Policy 2: Modern apps (require nFactor)

add authentication policy Modern\_Auth -rule "HTTP.REQ.URL.CONTAINS(\\"/") -action nfactor\_mfa

\# Bind to vserver - legacy first, modern second

bind vpn vserver Gateway\_VServer -policy Legacy\_Auth -priority 10

bind vpn vserver Gateway\_VServer -policy Modern\_Auth -priority 20

\`\`\`

This way, your sensitive applications get MFA protection while legacy systems remain accessible.

\### Enforce Strong Passwords + Account Lockout

\`\`\`

set vpn parameter -failedLoginTimeout 5 -maxLoginAttempts 5

\# This locks out an account after 5 failed attempts for 5 minutes

\# Adjust based on your environment (more restrictive = safer but can lock out real users)

\`\`\`

**Pro tip:** Coordinate this with your Active Directory settings. If AD is set to lock after 3 attempts, but NetScaler allows 5, you're creating a gap sprayers can exploit. Keep them aligned.

\---

\## Layer 4: Rate Limiting â€“ Slow Down the Attack

Even sophisticated sprayers eventually show patterns. Rate limiting creates artificial friction:

\### IP-Based Rate Limiting

\`\`\`

\# Create a selector that tracks all requests per IP

add stream selector RateLimit\_IP CLIENT.IP.SRC

\# Create limit identifier: 100 requests per second per IP

add ns limitIdentifier RL\_IP -selector RateLimit\_IP -mode "REQUEST\_RATE" -limitType BURSTY -threshold 100 -timeSlice 1000

\# Bind to gateway vserver

bind vpn vserver Gateway\_VServer -limitIdentifier RL\_IP -priority 30

\`\`\`

\### Username-Based Rate Limiting

\`\`\`

\# Track attempts per username (separate from IP)

add stream selector RateLimit\_Username HTTP.REQ.BODY.REGEX\_SELECT(re/(login=(\[^&\]+))/)

\# Limit: 20 attempts per username per minute

add ns limitIdentifier RL\_Username -selector RateLimit\_Username -mode "REQUEST\_RATE" -limitType BURSTY -threshold 20 -timeSlice 60000

\`\`\`

**Careful with this one:** If you're too aggressive, legitimate users who type their password wrong 3 times get locked out temporarily. Find the balance.

\---

\## Layer 5: WAF Protection â€“ Catch It at the Edge

If you have NetScaler AppFirewall (part of ADC), use it:

\`\`\`

\# Enable WAF on the AAA authentication flow

set aaa parameter -wafProtection AUTH VPN

\# Create WAF profile

add appfw profile Spray\_Protection

set appfw profile Spray\_Protection -denylist ON

\# Block IPs with suspicious patterns

bind appfw profile Spray\_Protection -denylist "($Likelihood\_Bad\_IP\_Counter\[CLIENT.IP.SRC\].GE(9))" -valueType Expression

\`\`\`

WAF catches the attack **before** it reaches the authentication engine, preventing resource exhaustion.

\---

\## Layer 6: Orchestration â€“ Automate the Response

\### Enable Syslog Alerting

\`\`\`

set syslog parameter -logFacility LOCAL0

add syslog action MySyslog 192.168.1.100 info

bind syslog global -action MySyslog

\`\`\`

Send NetScaler logs to your SIEM (Splunk, ELK Stack, etc.) and create alerts:

**Splunk Query:**

\`\`\`

index=netscaler sourcetype=syslog "authentication failed"

| stats count by src\_ip

| where count > 50

\`\`\`

\### Automated IP Blocking (Using n8n + NetScaler API)

You can automate IP blocking with your workflow automation platform:

1\. **n8n webhook** receives alert from monitoring system

2\. **Parse** the attacking IP

3\. **API call** to NetScaler to add IP to deny list

4\. **Notification** sent to security team

\`\`\`bash

\# Manual CLI equivalent

add ns acl DenyBadIPs DENY 192.168.1.50 255.255.255.255

add ns acl DenyBadIPs DENY 192.168.1.51 255.255.255.255

apply ns acl

\`\`\`

\---

\## The Complete Configuration (Production-Ready)

Here's a consolidated, copy-paste ready configuration:

\`\`\`

\# Step 1: Enhanced Authentication Logging

set aaa parameter -enableEnhancedAuditLog ON -auditLevel FULL

set vpn parameter -enableEnhancedAuditLog ON

\# Step 2: Password Policy

set vpn parameter -failedLoginTimeout 5 -maxLoginAttempts 5

\# Step 3: Default Deny (most important!)

set vpn parameter -defaultAuthorizationAction DENY

\# Step 4: Rate Limiting Selectors

add stream selector RateLimit\_IP CLIENT.IP.SRC

add stream selector RateLimit\_Username HTTP.REQ.BODY.REGEX\_SELECT(re/(login=(\[^&\]+))/)

\# Step 5: Rate Limiting Identifiers

add ns limitIdentifier RL\_IP -selector RateLimit\_IP -mode REQUEST\_RATE -limitType BURSTY -threshold 100 -timeSlice 1000

add ns limitIdentifier RL\_Username -selector RateLimit\_Username -mode REQUEST\_RATE -limitType BURSTY -threshold 20 -timeSlice 60000

\# Step 6: Allowlist for Internal IPs (exempt proxy/NAT servers)

add policy dataset InternalIPs ipv4

add policy dataset InternalIPs 10.0.0.0/8

add policy dataset InternalIPs 172.16.0.0/12

\# Step 7: WAF Protection (if using AppFirewall)

set aaa parameter -wafProtection AUTH VPN

\# Step 8: Bind Policies to vServer

bind vpn vserver Gateway\_VServer -limitIdentifier RL\_IP -priority 30

bind vpn vserver Gateway\_VServer -limitIdentifier RL\_Username -priority 31

\`\`\`

\---

\## Validation: Test Your Defense

Before deploying to production, validate:

\### Test 1: Rate Limiting Works

\`\`\`bash

\# From a test machine, make 150 requests rapidly

for i in {1..150}; do curl -s [http://gateway.example.com/logon](http://gateway.example.com/logon) -F "login=testuser" -F "passwd=testpass" > /dev/null & done

\# Check NetScaler logs - should see rate limit hits after 100 requests

\`\`\`

\### Test 2: Username Rotation Detection

\`\`\`bash

\# Simulate sprayer behavior - change usernames, not passwords

curl [http://gateway.example.com/logon](http://gateway.example.com/logon) -F "login=user1" -F "passwd=common\_password"

curl [http://gateway.example.com/logon](http://gateway.example.com/logon) -F "login=user2" -F "passwd=common\_password"

curl [http://gateway.example.com/logon](http://gateway.example.com/logon) -F "login=user3" -F "passwd=common\_password"

\# (repeat 9+ times)

\# Check logs - IP should be blocked after 9 username changes

\`\`\`

\### Test 3: Legitimate User Still Works

\`\`\`bash

\# From an internal IP, verify you can still log in normally

\# Should succeed without hitting rate limits

\`\`\`

\---

\## Monitoring & Ongoing Defense

\### Weekly Health Checks

\`\`\`

\# Check failed login trends

show aaa auditlogs | grep "auth\_failed"

\# Verify rate limiting is active

show ns limitStatus

\# Check blocked IPs

show ns acl

\`\`\`

\### Monthly Review

1\. **Analyze logs** for attack patterns

2\. **Tune thresholds** if legitimate users are being blocked

3\. **Update password policies** based on industry guidance

4\. **Review authentication logs** for unauthorized access attempts

\---

\## Quick Reference: Attack vs. Normal Behavior

| Metric | Normal | Under Attack |

|--------|--------|--------------|

| Failed logins/hour | 10-30 | 500+ |

| Unique source IPs/hour | 3-8 | 50+ |

| Username repetition | Same user tries multiple times | Different users tried once each |

| Duration | Minutes to hours | Hours to days |

| Account lockouts | Occasional | Many legitimate users locked out |

\---

\## The Bottom Line

Password spraying is relentless, but it's not unbeatable. Layered defense works:

1\. **Detect** the attack early (enhanced logging)

2\. **Smart blocking** (username rotation detection)

3\. **Make attack pointless** (force MFA on sensitive resources)

4\. **Slow them down** (rate limiting)

5\. **Catch at the edge** (WAF)

6\. **Automate response** (alerting and blocking)

No single defense is perfect. But when stacked together? You become a much harder target than 99% of organizations out there.

Start with MFA on sensitive apps. Add rate limiting next. Then deploy username rotation detection. Each layer increases your security without dramatically hurting legitimate users.

Your security is only as strong as your weakest link. Make sure it's not password spraying.

\---

\## Additional Resources

\- \[Citrix Tech Paper: Password Spraying Detection & Mitigation\]([https://community.citrix.com/tech-zone/build/tech-papers/detecting-and-mitigating-password-spraying-attacks-nsg/](https://community.citrix.com/tech-zone/build/tech-papers/detecting-and-mitigating-password-spraying-attacks-nsg/))

\- \[NetScaler Gateway Security Best Practices\]([https://docs.netscaler.com/en-us/netscaler-adc-secure-deployment/other-features/netscaler-gateway-security-recommendations.html](https://docs.netscaler.com/en-us/netscaler-adc-secure-deployment/other-features/netscaler-gateway-security-recommendations.html))

\- \[Rate Limiting Documentation\]([https://docs.netscaler.com/en-us/citrix-adc/current-release/aaa-tm/citrix-adc-aaa-session-and-traffic-management/rate-limiting-w](https://docs.netscaler.com/en-us/citrix-adc/current-release/aaa-tm/citrix-adc-aaa-session-and-traffic-management/rate-limiting-w))

\- \[nFactor Authentication Design\]([https://community.citrix.com/tech-zone/build/tech-papers/citrix-adc-nfactor-advanced-authentication](https://community.citrix.com/tech-zone/build/tech-papers/citrix-adc-nfactor-advanced-authentication))