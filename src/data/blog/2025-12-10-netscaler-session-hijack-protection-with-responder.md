---
author: Or Guetta
pubDatetime: 2025-12-10
modDatetime: 2025-12-10
title: NetScaler – Session Hijack Protection with Responder
ogImage: NetScaler – Session Hijack Protection with Responder
slug: NetScaler-Session-Hijack-Protection-with-Responder
featured: false
draft: true
description: NetScaler 13.1 Build 53.17 and 14.1 Build 25.53 protect against
  session hijacking by mapping authenticated sessions to source IP addresses. A
  new Responder expression, AAA.USER.SOURCEIP, can be used to create a policy
  that blocks session hijacking attempts. This feature is limited to
  environments where NetScaler can access the public source IP address of the
  user session.
---

**Overview**

Quick Post about what is the hijacking of an authenticated NetScaler user session and how to protect yourself from it. This feature starts with 13.1 Build 53.17 and 14.1 Build 25.53

There are two cookies responsible for a User Session, depends on your usage of NSGW / AAA. They get issued after a successful authentication.

**NSC_TMAS = AAA protected Webserver**

**NSC_AAAC = NetScaler Gateway**  
![](https://www.julianjakob.com/wp-content/uploads/2024/06/NetScaler-Session-Hijack-Protection-with-Responder.png)

How’s the process of the cookie hijack looking? An example for NetScaler Gateway:

On **Client1**, browse to your NetScaler Gateway URL and authenticate. Go to Devtools and copy the Name of the cookie NSC_AAAC and the corresponding Value.

On **Client2**, browse to your NetScaler Gateway URL and **do not** authenticate. Go to Devtools, create a new cookie with the Name NSC_AAAC and paste the corresponding Value. Refresh the Page and you’re authenticated. That’s it.

## **Configuration**

What’s new in these Firmware to protect from that? NetScaler now maps every authenticated Session to Source-IP, so there’s a new expression called **AAA.USER.SOURCEIP** which can be used in Responder (which works on every license edition)

The config is quite simple, here’s an example for creating a short blocked page when someone is trying to hijack a User’s session.

add responder action RespAct_SessionHijack respondwith "\\"This IP address (\\"+ CLIENT.IP.SRC +\\") is blocked to connect to this service.\\""

`add responder policy RespPol_SessionHijack "AAA.USER.NAME.LENGTH.NE(0)&&AAA.USER.SOURCEIP.NE(CLIENT.IP.SRC)"RespAct_SessionHijack`

`bind vpn vserver YourNSGW -policy RespPol_SessionHijack -priority 10 -gotoPriorityExpression END -type REQUEST`

`bind authentication vserver YourAAA -policy RespPol_SessionHijack -priority 10 -gotoPriorityExpression END -type AAA_REQUEST`

Bind the policy to your NSGW / AAA vServer:  
<img src="https://www.julianjakob.com/wp-content/uploads/2024/06/image-2.png" alt="" class="extendsBeyondTextColumn" style="caret-color: rgb(0, 0, 0); color: rgb(0, 0, 0); font-style: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration: none; width: 1050px; margin-inline-start: -8.210938px;" width="2756" height="627">

Now when I try to copy the NSC_AAAC cookie of an authenticated User session on Client2, I’m getting the following page:

<img src="https://www.julianjakob.com/wp-content/uploads/2024/06/image-1.png" alt="" class="extendsBeyondTextColumn" style="max-width: none; margin: 0.5em auto; display: block; height: auto; width: 1050px; margin-inline-start: -8.210938px;" width="1193" height="359">

### **Limitations**

As this feature works on Source-IP, there are the following limitations based on the architecture:

- NetScaler needs access to the public Source-IP of the User Session
- Protection will fail if the Attacker and the Victim are both on the same network or rather accessing from the same Source-IP

## **Summary**

With that short Responder policy, you’re able to gain a lot more safety for your NSGW / AAA environment. A must have!
