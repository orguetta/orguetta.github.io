---
author: Or Guetta
pubDatetime: 2026-04-04
modDatetime: 2026-04-04
title: JWT Explained Simply
slug: jwt-complete-guide
featured: false
draft: false
---
I got into JWT while working with customers on NetScaler and API Gateway flows through NetScaler to end users.

In almost every project, the same questions came up:

- What exactly is inside the token
- Is it encrypted or just encoded
- Why does everyone trust it
- And how can this go wrong

So this guide is my practical version, in simple language.

## Part 1 What JWT is in plain words

JWT is basically a signed pass.

A user logs in once, gets a token, and sends it on every request.
The backend checks the signature and decides whether to allow access.

No server session table is required for every user request.

### The 3 parts

A JWT looks like this:

```plain
xxxxx.yyyyy.zzzzz
```

1. Header
2. Payload
3. Signature

### Header

The header says which signing algorithm was used.

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### Payload

The payload contains claims.

```json
{
  "sub": "user_123",
  "role": "user",
  "exp": 1704067200
}
```

Important: payload is readable by anyone who has the token.

### Signature

The signature is what gives trust.

If someone edits header or payload, signature verification fails.

## Part 2 JWT is not encryption

This is the biggest confusion I see.

JWT is usually Base64URL encoded, not encrypted.

Encoding changes format.
Encryption hides data.

So think of JWT as a transparent envelope with a tamper-proof seal:

- You can read what is inside
- But you cannot change it without breaking the seal

### Golden rule

Never put secrets in payload.

Do not put:

- Passwords
- Private keys
- API secrets
- Sensitive personal data

## Part 3 Why teams love JWT

In API Gateway designs (including NetScaler fronting apps), JWT is useful because each service can verify trust locally.

That gives:

- Stateless auth flow
- Easier horizontal scaling
- Less dependency on shared session storage

This is very practical when traffic is spread across multiple services.

## Part 4 Common JWT failure pattern

The classic issue is trusting token input too much.

The famous example is accepting `alg: none` by mistake in weak verification logic.

If verification config is wrong, attacker-controlled claims may be accepted.

### What this looks like in real life

In customer environments, the problem is rarely "JWT is broken".
The problem is usually configuration:

- Loose verification settings
- No strict algorithm allowlist
- Weak key handling
- Overly long token lifetime

## Part 5 Hardening checklist I actually recommend

If you do only these steps, you remove most JWT risk fast.

### 1) Allowlist algorithms explicitly

```javascript
verify(token, secret, { algorithms: ['HS256'] })
```

Do not let library defaults decide for you.

### 2) Keep signing keys strong and protected

- Use long random keys
- Keep keys in env vars or secret manager
- Never hardcode keys in source code

### 3) Keep access token lifetime short

Use short access tokens and rotate with refresh flow when needed.

### 4) Validate standard claims

Always check:

- `exp`
- `iss`
- `aud`
- `nbf` when relevant

### 5) Keep payload minimal

Only store what the service needs for authorization decisions.

## NetScaler and API Gateway note

When NetScaler is used as the gateway layer, treat JWT validation as a strict security control, not a convenience feature.

Simple rule:

- Fail closed
- Validate everything
- Log verification failures clearly

## Final takeaway

JWT is a trust format, not a secrecy format.

If you sign correctly, verify strictly, and keep payload clean, JWT works great.

If you trust defaults and overpack payload, it becomes risky fast.

That difference is where most real-world outcomes are decided.
