---
author: Or Guetta
pubDatetime: 2026-04-05T09:00:00Z
modDatetime: 2026-04-05T09:00:00Z
title: NetScaler KCD Configuration Guide (Kerberos SSO Step by Step)
slug: netscaler-kcd-configuration-guide
featured: false
draft: false
tags:
  - netscaler
  - kerberos
  - sso
  - active-directory
  - api-gateway
description: A practical step-by-step guide to configure Kerberos Constrained Delegation (KCD) on NetScaler for backend SSO with Active Directory.
---

I use this flow in real customer environments when NetScaler sits in front of web apps or API gateways and we want clean Kerberos SSO to the backend.

This is the practical version, in simple language.

## Quick architecture in one minute

For KCD to work, you need to separate two identities in Active Directory:

1. **Delegator (`svc_netscaler`)**
   - The account NetScaler uses to talk to AD and request Kerberos tickets on behalf of users.
2. **Delegatee (`svc_backend` or server computer account)**
   - The identity running the backend service.
   - This is the target service that receives delegated credentials.

If this separation is wrong, SSO usually fails.

## Phase 1: Active Directory side

### Step 1: Configure backend identity (target service)

First, register the SPN for the backend service.

1. Identify backend FQDN (example: `webapp.example.com`).
1. Identify account running the service:
   - Service account user (`svc_backend`) **or**
   - Computer account (`TargetServerName$`) if service runs as Local System/Network Service.
1. Register SPN on the correct account:

```powershell
# Service account
setspn -S HTTP/webapp.example.com svc_backend

# Computer account
setspn -S HTTP/webapp.example.com TargetServerName$
```

1. Verify there is only one mapping:

```powershell
setspn -Q HTTP/webapp.example.com
```

You should get one result only.

### Step 2: Configure NetScaler identity (delegator)

Now allow `svc_netscaler` to delegate to that backend service.

1. Open **Active Directory Users and Computers**.
2. Open properties of `svc_netscaler`.
3. Go to **Delegation** tab.
4. Choose:
   - **Trust this user for delegation to specified services only**
   - **Use any authentication protocol** (important for protocol transition)
5. Click **Add** → find backend account from Step 1.
6. Select the matching **HTTP** service entry.
7. Save.

> If the Delegation tab does not appear, add a temporary SPN to `svc_netscaler` to expose the tab, then continue.

## Phase 2: NetScaler side

### Step 3: Create KCD Account

Go to:
**Security → AAA - Application Traffic → KCD Accounts**

Create:

- **Name**: `kcd_webapp_profile`
- **Realm**: `EXAMPLE.COM` (uppercase)
- **Delegated User**: `svc_netscaler`
- **Password**: password of `svc_netscaler`
- **Enterprise Realm/User**: leave blank in normal setups

### Step 4: Create Traffic Profile

Go to:
**System → Profiles → Traffic Profiles**

Create:

- **Name**: `prof_kcd_sso`
- **SSO**: ON
- **S4U2Proxy**: ON
- **KCD Account**: `kcd_webapp_profile`

### Step 5: Create Traffic Policy

Go to:
**System → Profiles → Traffic Policies**

Create:

- **Name**: `pol_kcd_sso`
- **Profile**: `prof_kcd_sso`
- **Expression**:
  - `TRUE` (apply to all traffic), or
  - `HTTP.REQ.HOSTNAME.EQ("webapp.example.com")` (host-specific)

### Step 6: Bind policy to the LB vServer

1. Open target Load Balancing vServer.
2. Under Policies, add a **Traffic** policy.
3. Bind `pol_kcd_sso`.
4. Save.

## Pre-flight checklist (don’t skip)

Before testing, validate these three items:

- **Time sync (NTP)**
  - NetScaler, DC, and backend must be synchronized.
  - Kerberos usually fails with time skew > 5 minutes.
- **DNS resolution**
  - NetScaler must resolve backend FQDN correctly.
- **SPN ownership**
  - `HTTP/webapp.example.com` must be on backend identity only.
  - Do not register it on `svc_netscaler`.

## Troubleshooting

When SSO fails, start with NetScaler Kerberos debug:

```bash
cat /tmp/nskrb.debug
```

Common errors:

- **`PRINCIPAL_UNKNOWN` (-1765328371)**
  - SPN missing, duplicated, or registered on wrong account.
- **`PREAUTH_FAILED` (-1765328360)**
  - Wrong password configured for `svc_netscaler` in KCD profile.

## Final note

KCD is very reliable when identity mapping is clean:

- right SPN on the right account,
- right delegation permissions,
- right profile/policy binding on NetScaler.

When those three line up, Kerberos SSO usually works smoothly.
