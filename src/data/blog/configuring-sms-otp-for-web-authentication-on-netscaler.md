---
title: "Configuring SMS OTP for Web Authentication on NetScaler"
author: Or Guetta
pubDatetime: 2025-01-30T09:00:00Z
slug: configuring-sms-otp-for-web-authentication-on-netscaler
featured: false
draft: false
tags:
  - netscaler
  - Authentication
  - OTP
  - Cybersecurity
  - AAA
description: "Learn how to configure SMS OTP for web authentication on NetScaler to enhance security and user verification."
---

# Configure SMS OTP for Web Authentication on NetScaler

NetScaler can now be integrated with a third-party SMS provider to provide an extra layer of authentication. The appliance can send a one-time password (OTP) to the user’s mobile phone as a second factor of authentication. The user is required to enter this OTP after a successful Active Directory (AD) login before gaining access to the requested resource.

## Prerequisites

Enable the necessary features and add a SNIP (Subnet IP) with the following commands:

```bash
enable ns feature LB SSL SSLVPN AAA

add ns ip 192.168.1.1 255.255.255.0 -type SNIP
```

## Configure OTP Store

To store OTPs used for SMS authentication, set up a database or store. Recommended OTP expiration is between 30 to 180 seconds.

```bash
add ns variable otp_store -type "map(text(65),text(6),100000)" -ifValueTooBig undef -ifNoValue undef -expires 60
```

## Generate OTP per User Session

Generate a 6-digit random OTP per user session and save it in the OTP store:

```bash
add ns assignment generate_otp -variable "$otp_store[AAA.USER.SESSIONID]" -set ("000000" + SYS.RANDOM.MUL(1000000).TYPECAST_UNSIGNED_LONG_AT.TYPECAST_TEXT_T).SUFFIX(6)
```

## Configure LDAP Authentication (First Factor)

Ensure LDAP authentication is configured to extract the user's mobile number:

```bash
add authentication ldapAction ldap_extraction_action -serverIP 192.168.1.2 -ldapBase OU=Users,DC=example,DC=com -ldapBindDn admin@example.com -ldapBindDnPassword SuperSecurePassword -ldapLoginName samaccountname -groupAttrName memberof -subAttributeName CN -authentication disabled -att

add authentication Policy ldap_extraction_policy -rule true -action ldap_extraction_action
```

## Configure SMS OTP Authentication (Second Factor)

```bash
add authentication Policy set_otp -rule true -action generate_otp

add authentication policylabel set_otp_label -loginSchema LSCHEMA_INT

bind authentication policylabel set_otp_label -policyName set_otp -priority 1
```

## Web Authentication and Sending OTP via SMS

Configure a web authentication action to send OTPs to a third-party SMS provider:

```bash
add policy expression otp_exp_post "\"Message: OTP is \" + $otp_store[AAA.USER.SESSIONID] + \" for login into secure access gateway. Valid till EXPIRE_TIME. Do not share the OTP with anyone for security reasons&Mobile:\" + AAA.USER.ATTRIBUTE(1)"

add authentication webAuthAction sms_post -serverIP <sms_gateway_ip> -serverPort 80 -fullReqExpr q{"POST /send_sms HTTP/1.1\r\nHost: <sms_gateway>\r\nContent-Length: 100\r\n\r\n" + otp_exp_post} -scheme http -successRule true

add authentication Policy post_wpp -rule true -action sms_post
```

## OTP Verification

Ensure the provided OTP matches the stored OTP:

```bash
add authentication loginSchema onlypassword -authenticationSchema "/nsconfig/loginschema/LoginSchema/OnlyPassword.xml"

add authentication policylabel otp_verify_label -loginSchema onlypassword

add authentication Policy otp_verify -rule "AAA.LOGIN.PASSWORD.EQ($otp_store[AAA.USER.SESSIONID])" -action NO_AUTHN
```

## Create and Bind Authentication Virtual Server

```bash
add authentication vserver avs SSL <192.168.1.3> 443

add ssl certKey aaa_local -cert example_cert.cer -key example_key.key

bind ssl vserver avs -certkeyName aaa_local

bind authentication vserver avs -policy ldap_extraction_policy -priority 1 -nextFactor set_otp_label -gotoPriorityExpression NEXT
```

By following these steps, you can implement SMS-based two-factor authentication (2FA) on NetScaler, enhancing security for your applications. 🚀
