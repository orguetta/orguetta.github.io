---
author: Or Guetta
pubDatetime: 2025-12-09
modDatetime: 2025-12-09
title: Securing Your NetScaler Gateway against Brute Force Protection and Rate
  Limiting
ogImage: Securing Your NetScaler Gateway against Brute Force Protection and Rate
  Limiting
slug: secure-ns-gw
featured: false
draft: true
description: Brute force attacks on NetScaler Gateways can be mitigated by
  implementing rate limiting and intelligent policies. This involves configuring
  the gateway to block requests that don’t match the FQDN, target specific URLs
  with suspicious cookies, or exceed a defined request rate. By combining these
  measures, organizations can effectively protect their gateways from
  unauthorized access attempts while maintaining optimal performance.
---

In today’s landscape, external-facing systems like NetScaler Gateways are prime targets for brute force and denial-of-service (DoS) attacks.

Brute force attacks on external gateways can compromise security, leading to unauthorized access and potential data breaches. Implementing rate limiting and intelligent policies on your NetScaler Gateway is a proactive way to mitigate these threats.

This blog demonstrates how to configure your NetScaler Gateway to block brute force attempts and enforce rate limiting to protect against malicious activity while maintaining optimal performance.

#### **Understanding the Threat**

A brute force attack systematically attempts various username-password combinations to gain access to your gateway. Attackers might target your gateway using:

- **Direct Public IP Access**: Attackers bypass the DNS and directly target your public IP.
- **Mismatched Hostname Requests**: Requests that don’t use your configured Fully Qualified Domain Name (FQDN).
- **Suspicious URLs or Cookies**: Targeted exploitation of login URLs or manipulation of cookies to bypass authentication.

These vulnerabilities can lead to repeated login attempts, bypassing standard controls. However, using NetScaler’s Responder Policies, you can effectively block such attempts.

#### **Key Security Configurations**

The following configuration drops packets that meet any of the following conditions:

- The request comes with the **public IP** instead of the FQDN.
- The request does not match the configured **gateway hostname**.
- The request targets `/cgi/login` and includes a malicious `NSC_TASS` cookie value.

Here’s the CLI configuration to implement:

```
add responder policy brute_block "HTTP.REQ.HOSTNAME.CONTAINS(\"gateway public IP\")||HTTP.REQ.HOSTNAME.EQ(\"gateway host name\").NOT||((HTTP.REQ.URL.TO_LOWER.EQ(\"/cgi/login\") && HTTP.REQ.COOKIE.CONTAINS(\"NSC_TASS=/No%20Page\")))" DROP

bind vpn vserver Gateway_vserver_name -policy brute_block -priority 1 -gotoPriorityExpression END -type AAA_REQUEST
```

#### **Breaking Down the Configuration**

**Responder Policy**:

- **Condition 1**: Drops requests where the hostname contains the public IP.
- **Condition 2**: Drops requests where the hostname doesn’t match the FQDN
- **Condition 3**: Drops requests targeting `/cgi/login` and containing a suspicious `NSC_TASS` cookie value.This policy ensures that only legitimate traffic targeting your gateway FQDN can proceed.

**Binding the Policy**:

- The policy is bound to the VPN virtual server handling external requests.
- It ensures a high priority (`priority 1`) for evaluation.

### **Advanced Rate Limiting for NetScaler Gateway: Configuration Guide**

To further enhance your NetScaler Gateway’s defenses against brute force and denial-of-service (DoS) attacks, you can integrate a rate-limiting policy alongside the existing security measures. This configuration monitors traffic patterns, detects anomalies, and enforces rate limits to ensure optimal performance and security.

#### **Rate Limiting Configuration Overview**

The configuration ensures:

- Monitoring and limiting client request rates based on URL and client IP.
- Logging and auditing abnormal activity for proactive threat analysis.
- Providing meaningful feedback to users when blocked due to rate limits.

Here’s the detailed step-by-step guide to implement this configuration:

**Stream Selector**: Define the parameters to monitor (client IP and requested URL).

```
add stream selector rate_limiting_selector HTTP.REQ.URL CLIENT.IP.SRC
```

**Rate Limiting Identifier**: Define the threshold and time slice for monitoring request rates.

This example has a Maximum 20 requests per 10 seconds, and a Time Slice defining the monitoring window (10,000 ms).

```
add ns limitIdentifier rate_limiting_identifier -threshold 20 -timeSlice 10000 -selectorName rate_limiting_selector
```

**Syslog Configuration**: Set up a syslog action to log abnormal activity for analysis.

```
add audit syslogAction SYSLOGSERVER_IP -logLevel EMERGENCY ALERT CRITICAL -managementlog ALL -mgmtlogLevel ALL -logFacility LOCAL1 -timeZone LOCAL_TIME -userDefinedAuditlog YES
```

Bind the syslog policy to the global context:

```
add audit syslogPolicy ns_syslog_policy true SYSLOGSERVER_IP

bind audit syslogGlobal -policyName ns_syslog_policy -priority 2
```

**Audit Message Action**: Define a custom alert for rate-limiting violations.

```
add audit messageaction rate_limiting_audit_action ALERT "\"50 or more hits to remote.pryorcashman.com from \" + CLIENT.IP.SRC + \" to \" + HTTP.REQ.URL + \" in 10 seconds.\"" -logtoNewnslog YES
```

**Responder Action**: Create a responder action to handle rate-limit violations gracefully.

```
add responder action responder_action_denylogin respondwith "\"HTTP/1.1 200 OK\r\n\r\n\" + \"Your request has been blocked due to unusual activity. For further assistance, contact the Support Team.\""
```

**Responder Policy**: Add a policy to check the rate limit and trigger the responder action

```
add responder policy res_rateLimitBlockPolicy "SYS.CHECK_LIMIT(\"rate_limiting_identifier\")" responder_action_denylogin -logAction rate_limiting_audit_action
```

**Bind Responder Policy**: Attach the responder policy to the VPN virtual server.

```
bind vpn vserver nsg_remote_external -policy res_rateLimitBlockPolicy -priority 90 -gotoPriorityExpression END -type REQUEST
```

#### **How It Works**

- **Monitoring**: The `rate_limiting_selector` monitors requests by tracking the client’s IP and requested URL.
- **Threshold Enforcement**: If a client exceeds the defined threshold (20 requests in 10 seconds), the `res_rateLimitBlockPolicy` is triggered.
- **Action on Violation**:
  - The user receives a message: _“Your request has been blocked due to unusual activity. For further assistance, contact the Support Team.”_
  - The incident is logged for auditing and proactive threat analysis.

- **Syslog Integration**: Logs are sent to the configured syslog server for monitoring and alerting.

#### **Conclusion**

This advanced rate-limiting setup significantly enhances your NetScaler Gateway’s security posture.

Brute force attacks are a persistent threat to external-facing systems like the NetScaler Gateway. By implementing intelligent responder policies and rate limiting, you can protect your gateway and users effectively. The configuration shared here provides a strong foundation to defend against unauthorized access attempts while maintaining the performance and reliability of your environment.

By combining request rate monitoring, custom alerts, and intelligent blocking, you can effectively mitigate brute force and DoS attacks while maintaining seamless access for legitimate users.

Stay vigilant and always keep your gateway configurations up to date with the latest security practices!
