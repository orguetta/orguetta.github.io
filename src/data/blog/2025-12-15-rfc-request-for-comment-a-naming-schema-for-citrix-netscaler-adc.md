---
author: Johannes Norz
pubDatetime: 2025-12-15
modDatetime: 2025-12-15
title: "RFC (REQUEST FOR COMMENT): A NAMING SCHEMA FOR CITRIX NETSCALER ADC"
ogImage: "RFC (REQUEST FOR COMMENT): A NAMING SCHEMA FOR CITRIX NETSCALER ADC"
featured: false
draft: true
---
<img src="https://norz.at/wp-content/uploads/2022/11/49722965218_1605a1961e_c.jpg" alt="" class="aligncenter size-full wp-image-2277" style="box-sizing: inherit; vertical-align: middle; max-width: 100%; border-style: none; height: auto; clear: both; display: block; margin: 0px auto 3.6rem;" width="799" height="540">In my day-to-day work (audits, project management, project oversight, architecture, …), I usually see Citrix NetScaler ADCs administered by someone else. In my audits, one of my first steps is checking for a consistent naming scheme. NetScalers tend to be chaotic if naming is chaotic.

Of course, one can argue that the naming of objects is not essential, but for me, it is also a gauge of how clean and orderly administration is. Furthermore, administering a larger, more complex environment from the command line only makes sense if there is a consistent naming scheme.

Some of my clients ask, “What should the naming of the objects be? Do you have a suggestion? Just saying it’s bad the way it is isn’t that helpful!” That’s true, and for many years I’ve had my own naming scheme, and that’s what I want to present here.

The title of this blog post says it all: an RFC is an attempt to normalize things. At the same time, it is not comparable to standards like ANSI (American National Standards Institute) or DIN (Deutsche Industrie Norm), or even more important, ÖNorm (Austria’s answer to ANSI), but actually something completely non-binding, a Request For Comment. It does not go beyond a proposal. [Some of the RFCs](https://www.rfc-editor.org/rfc/rfc1149)have become so widely accepted in the industry, that you can speak of a de facto standard, others again have remained more or less ineffective.

By the way, in many cases, you can simply rename objects to make naming more consistent. You have to mark the object, then you can find rename in the Actions dropdown list.  
<img src="https://norz.at/wp-content/uploads/2022/11/rename.jpg" alt="Renaming vServers on Citrix NetScaler ADC" class="aligncenter size-full wp-image-2272" style="box-sizing: inherit; vertical-align: middle; max-width: 100%; border-style: none; height: auto; clear: both; display: block; margin: 0px auto 3.6rem;" width="660" height="468">

# **THE STRUCTURE OF NAMING**

To make things as simple as possible, I use the command line syntax. A typical command on a Citrix NetScaler looks something like this:  
`add lb vserver lb_vs_colors HTTP 192.168.229.100 80   add responder action rs_act_ssl redirect "\"https://\"+HTTP.REQ.HOSTNAME+HTTP.REQ.URL.HTTP_URL_SAFE" -responseStatusCode 301   add responder policy rs_pol_ssl true res_act_ssl`

*   First comes the command. add, show, bind, set, … The commands do not matter for the naming, because the same object can be processed with many commands.
    
*   Second we have the object type. lb for load-balancing. cs for content-switching, and many more.
    
*   The third is the subtype. vserver, service, policy, action etc.
    

This syntax is well-kept throughout the product and I find it very good.

## **MY NAMING SCHEMA**

… is therefore based on this syntax. The first part of the name denotes the object, the second the subtype. I divide the two with an underscore, following Citrix’s naming schema. For the names of the objects and subobjects, I stick roughly speaking to the command-line syntax.

**<img src="https://norz.at/wp-content/uploads/2022/11/attention_red.png" alt="" class="alignnone" style="box-sizing: inherit; vertical-align: middle; max-width: 100%; border-style: none; height: auto; clear: both; display: block; margin: 0px auto 3.6rem;" width="32" height="32">I never use spaces in naming, even though it would be possible, as this would lead to a complete mess from the command line!**

* * *

# **THE MOST IMPORTANT OBJECTS**

## **OBJEKTS**

(there is a mostly complete list at the [end of this document](https://norz.at/?p=2254#rest))

|     |     |
| --- | --- |
| Object | shortcut to use |
| appfw (application firewall) | appfw |
| appqoe (Application level Quality of Experience) | appq |
| authorization | autho |
| authentication | authe |
| bot (Bot protection) | bot |
| cache | ca  |
| cmp (Compression feature) | cmp |
| cs (Content Switching) | cs  |
| dataset | ds  |
| expression | exp |
| feo (Front End Optimization) | feo |
| httpCallout | hc  |
| httpProfile | httpprof |
| ica | ica |
| lb (Load Balancing) | lb  |
| ldap Action | ldap\_act |
| ldap Policy | ldap\_pol |
| OAuth Action | oaut\_act |
| OAuth IdP Policy | oautidp\_pol |
| OAuth IDP Profile | oautidp\_act |
| patset (Pattern Set) | pats |
| radius Action | rad\_act |
| radius Policy | rad\_pol |
| responder | rs  |
| rewrite | rw  |
| saml Action | saml\_act |
| saml IdP Policy | samlidp\_pol |
| saml IdP Profile | samlidp\_prof |
| saml Policy | saml\_pol |
| server | sv  |
| service | sc  |
| serviceGroup | sg  |
| ssl | ssl |
| stringmap | strmap |
| syslog Action | syslog\_act |
| syslog Policy | syslog\_pol |
| tacacs Action | tacacs\_act |
| tacacs Policy | tacacs\_pol |
| tcpProfile | tcpp |
| transform | transf |
| vpn (Citrix Gateway) | vpn |

* * *

# **SUBOBJECTS**

While it’s easy to find all possible objects (just type add and then press the tab key twice), it is hard to find out all possible subobjects. So the list of subobjects will very likely be incomplete.

|     |     |
| --- | --- |
| Name of the object | shortcut to use |
| action | act |
| group | gp  |
| ldapAction | ldap\_act |
| ldapPolicy | ldap\_pol |
| loginSchema | loginsch |
| loginSchemaPolicy | loginschp |
| monitor | mon |
| OAuthAction | oauth\_act |
| OAuthIDPProfile | oauth\_idp\_prof |
| OAuthIdPPolicy | oauth\_idp\_pol |
| policy | pol |
| policylabel | pollbl |
| profile | act (prof) |
| radiusAction | rad\_act |
| radiusPolicy | rad\_pol |
| samlAction | saml\_act |
| samlIdPPolicy | samlidp\_pol |
| samlIdPProfile | samlidp\_prof |
| samlPolicy | saml\_pol |
| server | sr  |
| service | sc  |
| service group | sg  |
| vserver | vs  |

* * *

# **EXAMPLES**

## **VSERVERS:**

*   lb\_vs\_norzweb (the load-balancing virtual server my company website)
    
*   cs\_vs\_web (a content-switching virtual server, switching between several websites like [norz.at](https://norz.at/), [abenteuer.norz.at](https://abenteuer.norz.at/))
    
*   aaa\_vs\_owa (an authentication virtual server, used with Outlook Web Access)
    
*   vpn\_vs\_icaproxy (a gateway virtual server, used as an ICA proxy)
    

I am unsure about the virtual SSL servers. Some tend to replace the server type with **ssl** (ssl\_vs\_…). Personally, I put an \_ssl at the end, because this keeps the type of server recognizable. `lb_vs_web_ssl` would be the ssl server for the website with this naming convention, compared to `ssl_vs_web`. In many cases, I don’t use ssl at all, as we generally use ssl all over our deployment and non-encrypted access is hardly used. `cs_vs_ssl_redirect` would be the server I use to redirect to SSL.

## **SERVICES:**

*   sc\_red (a service, pointing to my [red server](https://red.wonderkitchen.network/))
    
*   sg\_norz.at (a service group, containing both of the [norz.at](https://192.168.200.109/) webservers)
    

## **SERVERS**

In many cases, servers get created on the fly, and their name, therefore, is equivalent to the IP address. Unfortunately, if you change the IP address, the name and the IP will differ. That’s why I prefer to name servers correctly.

*   sr\_norz.at\_001 (the first webserver, hosting the [norz.at](https://192.168.200.109/) website)
    
*   sr\_norz.at\_002 (the second webserver, hosting the [norz.at](https://192.168.200.109/) website)
    

## **POLICIES**

Normally, a policy consists of a name, an expression, and an action. The expression is the “if”, and the action is the “then”. If the URL is /red (`HTTP.REQ.URL.EQ("/red")`), then we perform the action. In many cases, the action is used for one policy only. In this case, I try to keep the names of policies and actions similar. An example would be `rs_pol_sselredirect` using the action `rs_act_sselredirect`. This helps an administrator to keep track of policy/action pairs.

### **ACTIONS/PROFILES**

Citrix distinguishes between actions and profiles but does not always distinguish according to comprehensible criteria, and the documentation is not always consistent, especially with authentication. The difference is marginal, an action is rather simple, a profile of complex nature. To avoid confusion, I, therefore, do not consider this difference, I call both actions.

*   rs\_act\_sslredirect (a responder action, redirecting to SSL (`"https://"+HTTP.REQ.HOSTNAME+HTTP.REQ.URL)`)
    
*   rw\_act\_2lower (a rewrite action, changing the URL to lowercase)
    
*   ldap\_act\_proddomain (an LDAP authentication profile pointing to the productive domain)
    
*   appfw\_act\_norz.at (the profile of a web application firewall, protecting the norz.at website)
    
*   cs\_act\_elisabethnorzz (a content-switching action, directing to my [wife’s homepage](https://elisabeth.norz.at/))
    

### **POLICIES**

*   rs\_pol\_sslredirect (a responder policy, used to redirect to the SSL version of the homepage)
    
*   rw\_pol\_2lower (a rewrite policy, changing the URL to lowercase)
    
*   ldap\_pol\_proddomain (an LDAP authentication policy, using an action pointing to the productive domain)
    
*   appfw\_pol\_wonderkitchen (a web application firewall policy, protecting [wonderkitchen’s web server](https://wonderkitchen.network/))
    
*   cs\_pol\_elisabethnorz (a content-switching policy, directing to my [wife’s homepage](https://elisabeth.norz.at/))
    

## **OTHER OBJECTS**

*   strmap\_old2new (a stringmap, containing old URLs and their corresponding new ones)
    
*   hc\_blacklist (an http callout to a blacklist server)
    

* * *

# **MORE COMPLETE LISTS OF OBJECTS**

## **OBJECTS AND SUB-OBJECTS**

|     |     |
| --- | --- |
| Object | shortcut to use |
| accessprofile | accp |
| acl | acl |
| acl6 | acl6 |
| action64 | act64 |
| adfsProxyProfile | adfsp |
| allowedngsticketprofile | alng |
| alwaysONProfile | aon |
| analytics | anal |
| appflow | af  |
| appfw | appfw |
| appsattributes | appatr |
| appqoe | appq |
| appsprofile | approf |
| assignment | assi |
| audit | audit |
| authorization | autho |
| authentication | authe |
| authnProfile | authp |
| autoscale | as  |
| azure | az  |
| bot | bot |
| caCertGroup | cacetrg |
| cache | ca  |
| callout | cao |
| captchaAction | capt |
| certAction | cert\_act |
| certKey | certk |
| certPolicy | cert\_pol |
| cipher | cipg |
| citrixAuthAction | ctx\_auta |
| client | clnt |
| clientlessAccessPolicyn | clnta\_pol |
| clientlessAccessProfile | clnta\_act |
| clientprofile | cp  |
| cloud | cl  |
| cluster | clu |
| cmdPolicy | cmd\_pol |
| cmp | cmp |
| collector | col |
| contentGroup | contg |
| contentinspection | conti |
| crl | crl |
| crlt6 | cr6 |
| cs  | cs  |
| dataset | ds  |
| db  | db  |
| detection | det |
| dfa | dfa |
| dns | dns |
| dtlsProfile | dtlsp |
| dynamicRoutingn | dr  |
| emailActionp | mail\_act |
| encryptionKey | enckey |
| epaAction | apa\_act |
| eula | eula |
| expression | exp |
| extension | ext |
| feo | feo |
| fieldType | ftyp |
| filter | filt |
| fis | fis |
| forwardingSession | fwsess |
| gslb | gslb |
| hmacKey | hmack |
| hsmKeymap | hsmk |
| httpCallout | hc  |
| httphdrlogprofile | httpph |
| httpProfilen | httpprof |
| ica | ica |
| identifier | idf |
| inat | inat |
| intranetApplication | intrnapp |
| ip6 | ip6 |
| ipsec | ips |
| ipsecalg | ipscalg |
| ipset | ipset |
| ipTunnel | ipt |
| kcdAccount | kdcac |
| key | key |
| keyVault | keyv |
| latencyprofile | latp |
| lb  | lb  |
| ldapAction | ldap\_act |
| ldapPolicy | ldap\_pol |
| limitIdentifier | limid |
| localPolicy | loc\_pol |
| locationFile | locfil |
| locationFile6 | locfil6 |
| loginSchema | logsch |
| loginSchemaPolicy | logschp |
| MapBmr | mapb |
| MapDmr | mapd |
| MapDomain | mapdom |
| messageaction | msg\_act |
| metricTable | mettab |
| nat64 | nat64 |
| negotiate | ng  |
| netbridge | netbri |
| netProfile | netpr |
| nextHopServer | nhs |
| noAuthAction | noauth\_act |
| nodegroup | nodg |
| nslog | nslog |
| OAuthAction | oauth\_act |
| OAuthIdPPolicy | outhaidp\_pol |
| OAuthIDPProfile | oauthidp\_act |
| ocspResponder | ocspres |
| pacing | pac |
| partition | part |
| patset | pats |
| pbr | pbr |
| pbr6 | pbr6 |
| pcoipProfile | pcoip\_prof |
| pcp | pcp |
| portaltheme | portt |
| preauthenticationaction | preaut\_act |
| preauthenticationpolicy | preaut\_pol |
| protocol | prot |
| pushService | pshsvc |
| quic | quic |
| quicBridge | quicbr |
| radiusAction | rad\_act |
| radiusNode | rad\_node |
| radiusPolicy | rad\_pol |
| rdp | rdp |
| responder | rs  |
| rewrite | rw  |
| rnat | rnat |
| rnat6 | rnat6 |
| rtspalgprofile | rtsp |
| samlAction | saml\_act |
| samlIdPPolicy | samlidp\_pol |
| samlIdPProfile | samlidp\_prof |
| samlPolicy | saml\_pol |
| server | sv  |
| serverprofile | svp |
| service | sc  |
| serviceFunction | scf |
| serviceGroup | sg  |
| servicePath | scp |
| simpleacl | sacl |
| simpleacl6 | sacl6 |
| sipalgprofile | sipal |
| smpp | smpp |
| snmp | snmp |
| spillover | spi |
| ssl | ssl |
| ssoprofile | sso\_prof |
| static | stat |
| storefrontAuthAction | storfaa |
| stream | stream |
| stringmap | strmap |
| subscriber | bubs |
| suffix | suf |
| syslogAction | syslog\_act |
| syslogPolicy | syslog\_pol |
| tacacsAction | tacacs\_act |
| tacacsPolicy | tacacs\_pol |
| tcpProfile | tcp\_prof |
| timer | tim |
| tm  | tm  |
| trafficDomain | td  |
| transform | trns |
| transportprofile | transp |
| tunnel | tun |
| url | url |
| vpn | vpn |
| webAuthAction | webaut\_act |
| webAuthPolicy | webaut\_pol |

* * *

## **SUB-OBJECTS**

a more complete [list of Subobjects can be found here](https://norz.at/?p=2254#subobjects)

While it’s easy to find all possible objects (just type add and then press the tab key twice), it is hard to find out all possible subobjects. So the list of subobjects will very likely be incomplete.

|     |     |     |
| --- | --- | --- |
| Name of the object | shortcut to use |     |
| action | act |     |
| adfsProxyProfile | adfsp |     |
| authnProfile | authp |     |
| azureKeyVault | az\_kv |     |
| captchaAction | capt |     |
| certAction | cert\_act |     |
| certPolicy | cert\_pol |     |
| citrixAuthAction | ctx\_auta |     |
| confidField | conf |     |
| dfaAction | dfa\_act |     |
| dfaPolicy | dfa\_pol |     |
| emailAction | email\_act |     |
| epaAction | epa\_act |     |
| fieldType | fieldt |     |
| group | grp |     |
| JSONContentType | jsont |     |
| ldapAction | ldap\_act |     |
| ldapPolicy | ldap\_pol |     |
| localPolicy | loc\_pol |     |
| loginSchema | loginsch |     |
| loginSchemaPolicy | loginschp |     |
| metrictable | mettab |     |
| monitor | mon |     |
| multipartFormContentType | mpfct |     |
| negotiateAction | nego\_act |     |
| negotiatePolicy | nego\_pol |     |
| noAuthAction | noauth |     |
| OAuthAction | oauth\_act |     |
| OAuthIDPProfile | oauth\_idp\_prof |     |
| OAuthIdPPolicy | oauth\_idp\_pol |     |
| policy | pol |     |
| policylabel | poll |     |
| profile | act (prof) |     |
| pushService | pushs |     |
| radiusAction | rad\_act |     |
| radiusPolicy | rad\_pol |     |
| route | rt  |     |
| route6 | rt6 |     |
| samlAction | saml\_act |     |
| samlIdPPolicy | samlidp\_pol |     |
| samlIdPProfile | samlidp\_prof |     |
| samlPolicy | saml\_pol |     |
| server | sr  |     |
| service | sc  |     |
| service group | sg  |     |
| storefrontAuthAction | sfaa |     |
| tacacsAction | tacacs\_act |     |
| tacacsPolicy | tacacs\_pol |     |
| urlEncodedFormContentType | urlenc |     |
| vserver | vs  |     |
| webAuthAction | weba\_act |     |
| XMLContentType | xmlct |     |