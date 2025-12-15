---
author: Robert Allen
pubDatetime: 2024-04-27
modDatetime: 2024-04-27
title: Top 25 Active Directory Security Best Practices
ogImage: Top 25 Active Directory Security Best Practices
featured: false
draft: true
description: "This is the most comprehensive list of Active Directory Security Best Practices online. Learn how to secure your AD environment with these 25 essential tips and strategies."
---

This is the most comprehensive list of Active Directory Security Best Practices online.

In this guide, I’ll share my recommendations for Active Directory Security and how you can improve the security of your Windows domain environment.

You don’t have to spend a fortune to improve security there are many no cost and low cost solutions that I’ll show you in this guide.

AD Security topics covered in this guide:

1.  [Limit the use of Domain Admins and other Privileged Groups](https://activedirectorypro.com/active-directory-security-best-practices/#limit-domain-admins)
2.  [Use at least two accounts](https://activedirectorypro.com/active-directory-security-best-practices/#use-two-accounts)
3.  [Secure the domain administrator account](https://activedirectorypro.com/active-directory-security-best-practices/#secure-domain-admins)
4.  [Disable the local administrator account (on all computers)](https://activedirectorypro.com/active-directory-security-best-practices/#disable-local-administrator)
5.  [Use Laps](https://activedirectorypro.com/active-directory-security-best-practices/#use-laps)
6.  [Use a secure admin workstation (SAW)](https://activedirectorypro.com/active-directory-security-best-practices/#use-secure-saw)
7.  [Enable audit policy settings with group policy](https://activedirectorypro.com/active-directory-security-best-practices/#enable-audit-policy)
8.  [Monitor for signs of compromise](https://activedirectorypro.com/active-directory-security-best-practices/#monitor-for-compromise)
9.  [Password complexity sucks (use passphrases)](https://activedirectorypro.com/active-directory-security-best-practices/#password-complexity)
10. [Use descriptive security group names](https://activedirectorypro.com/active-directory-security-best-practices/#descriptive-security-groups)

11. [Find and remove unused user and computer accounts](https://activedirectorypro.com/active-directory-security-best-practices/#stale-accounts)

12. [Remove Users from the Local Administrator Group](https://activedirectorypro.com/active-directory-security-best-practices/#remove-local-admin-group)

13. [Do not install additional software or server roles on DCs](https://activedirectorypro.com/active-directory-security-best-practices/#additional-software)

14. [Patch management and vulnerability scanning](https://activedirectorypro.com/active-directory-security-best-practices/#patch-management)

15. [Use secure DNS services to block malicious domains](https://activedirectorypro.com/active-directory-security-best-practices/#secure-dns)

16. [Run supported operating systems](https://activedirectorypro.com/active-directory-security-best-practices/#supported-systems)

17. [Use two factor for office 365 and remote access](https://activedirectorypro.com/active-directory-security-best-practices/#two-factor)

18. [Monitor DHCP logs for connected devices](https://activedirectorypro.com/active-directory-security-best-practices/#monitor-dhcp-logs)

19. [Monitor DNS logs for malicious network activity](https://activedirectorypro.com/active-directory-security-best-practices/#monitor-dns-logs)

20. [Use latest ADFS and azure security features](https://activedirectorypro.com/active-directory-security-best-practices/#adfs)

21. [Use office 365 secure score](https://activedirectorypro.com/active-directory-security-best-practices/#office-secure-score)

22. [Have a recovery plan](https://activedirectorypro.com/active-directory-security-best-practices/#recovery-plan)

23. [Document delegation to Active Directory](https://activedirectorypro.com/active-directory-security-best-practices/#delegation)

24. [Lock down service accounts](https://activedirectorypro.com/active-directory-security-best-practices/#lock-service-accounts)

25. [Use security baselines and benchmarks](https://activedirectorypro.com/active-directory-security-best-practices/#security-baselines)

26. [Active Directory Security Checklist](https://activedirectorypro.com/active-directory-security-best-practices/#ad-security-checklist)

## **Why Securing Active Directory is Essential**

In many organizations, Active Directory is the centralized system that authenticates and authorizes access to the network. Even in the cloud or hybrid environments, it can still be the centralized system that grants access to resources. When accessing a document on the network, OneDrive, printing to the network printer, accessing the internet, checking your email, and so on, all of these resources often go through Active Directory to grant you access.

Active Directory has been around for a long time and over the years malicious actors have discovered vulnerabilities in the system and ways to exploit them. In addition to vulnerabilities, it becomes very easy for hackers to just steal or obtain user credentials which then gives them access to your data. If they can get access to your computer or your login then they could potentially gain Full access to Active Directory and own your network.

Now let’s dive into the list of Active Directory Security Best Practices.

## **1\. Limit the use of Domain Admins and other Privileged Groups**

Members of Domain Admins and other privileged groups are very powerful. They can have access to the entire domain, all systems, all data, computers, laptops, and so on.

It is recommended to have no day to day user accounts in the Domain Admins group, the only exception is the default Domain Administrator account.

Domain Admins are what the bad guys try to seek out.

Microsoft recommends that when DA access is needed, you temporarily place the account in the DA group. When the work is done you should remove the account from the DA group.

This process is also recommended for the Enterprise Admins, Backup Admins, and Schema Admin groups.

<img src="https://activedirectorypro.com/wp-content/uploads/2021/10/ad-security-1.png" alt="domain admins group" class="wp-image-21240" style="box-sizing: border-box; height: auto; max-width: 100%; padding-bottom: 1.5rem; vertical-align: bottom;" width="445" height="535">

### **What’s the big deal?**

It’s become way too easy for attackers to obtain or crack user credentials.

Once attackers gain access to one system they can move laterally within a network to seek out higher permissions (domain admins).

One method of doing this is called pass the hash.

Pass the hash allows an attacker to use the password hash to authenticate to remote systems instead of the regular password. These hashes can be obtained from end user computers.

Scary right?

All it takes is for one compromised computer or a user account for an attacker to compromise a network.

Cleaning up the Domain Admins group is a great first step to increasing your network security.  This can defiantly slow down an attacker.

The process to remove accounts from the DA group is not easy. I know first hand as I’ve recently gone through this process. It’s very common to have way too many accounts in the DA group.

Things will break so be prepared.

## **2\. Use Two Accounts or more (Regular and Administrator Account)**

You should not be logging in every day with an account that is a local admin or has privileged access (Domain Admin).

Instead create two accounts, a regular account with no admin rights and a privileged account that is used only for administrative tasks.

BUT

Do not put your secondary account in the Domain Admins group, at least permanently.

Instead, follow the **least privileged administrative model**. Basically, this means all users should log on with an account that has the minimum permissions to complete their work.

You may read other articles and forums to put your secondary account in the Domain Admins group.

This is not a Microsoft best practice and I would advise against it. Again temporary is OK but it needs to be removed as soon as the work is done.

With that said Microsoft does not make it easy to get away from Domain admin rights. There is no easy process to delegate rights to all systems like DNS, DHCP, group policy, and so on. This is often the reason so many people have Domain Admin rights.

You should use a regular non admin account for day to day tasks such as checking email, browsing the internet, ticket system, and so on. You would only use the privileged account when you need to perform admin tasks such as creating a user in Active Directory, logging into a server, adding a DNS record, etc.

Look at these two scenarios.

### **Scenario 1 – IT Staff with Domain Rights**

Steve logs into his computer with a privileged account, checks his email, and inadvertently downloads a virus. Since Steve is a member of the DA group the virus has full rights to his computer, all servers, all files, and the entire domain. This could cause serious damage and result in critical systems going down.

Now, take the same scenario but this time Steve is logged in with his regular non admin account.

### **Scenario 2 – IT Staff with Regular Rights**

Steve checks his email and inadvertently downloads a virus. The virus has limited access to the computer and no access to the domain or other servers. This would cause minimal damage and prevent the virus from spreading through the network.

By simply using a regular account you can increase security and avoid causing serious damage.

Here are some common tasks that can be delegated to a secondary admin account.

- Rights to Active Directory Users and Computers
- DNS
- DHCP
- Local admin rights on servers
- Group Policy
- Exchange
- Local admin rights on workstations
- Vsphere or Hyper-v Administration

Some organizations use more than two accounts and use a tiered approach. This is defiantly more secure but may be an inconvenience to some.

- Regular account
- Account for Server Administration
- Account for Network Administration
- Account for Workstation Administration

## **3\. Secure the Domain Administrator Account**

Every domain includes an Administrator account, this account by default is a member of the Domain Admins group.

The built-in Administrator account should only be used for the domain setup and disaster recovery (restoring Active Directory).

Anyone requiring administrative-level access to servers or Active Directory should use their own individual account.

No one should know the Domain Administrator account password. Set a really long 20+ characters password and lock it in a vault. Again the only time this is needed is for recovery purposes.

In addition, Microsoft has several recommendations for securing the built-in Administrator Account.  These settings can be applied to group policy and applied to all computers.

- Enable the Account is sensitive and cannot be delegated.
- Enable the smart card is required for interactive logon
- Deny access to this computer from the network
- Deny logon as batch job
- Deny log on as a service
- Deny log on through RDP

For more details on securing the Domain Administrator account see this Microsoft article, [Securing Built in Administrator Accounts in Active Directory](https://docs.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/appendix-d--securing-built-in-administrator-accounts-in-active-directory)

## **4\. Disable the Local Administrator Account (on all computers)**

The local administrator account is a well-known account in Domain environments and is not needed.

Not needed, is that true?

Yes

You should be using an individual account that has the necessary rights to complete tasks.

**What is the problem with the local admin account?**

Two Problems.

1.  It is a well-known account, even if you rename it the SID is the same and is well-known by attackers.
2.  It’s often configured with the same password on every computer in the domain.

Attackers just need to compromise one system and now they have local admin rights on every domain-joined computer. They could then use this account to pivot to another system with the goal of finding domain admin access.

If you need to perform admin tasks on the computer (install software, delete files, etc)  you should be doing so with your individual account, not the local admin account.

Even if the account is disabled you can boot into safe mode and use the local administrator account.

As an administrator, I know these best practices are not always practical or introduce a huge inconvenience.

What if the network is down or the NIC card died, what if you need to drop it from the domain and re-add it? There are ways around this but it can really slow you down.

If you cannot disable the account here are recommendations for securing the account. **A better alternative is to use the Microsoft LAPS tool (Covered below in tip #5)**

- Deny access to this computer from the network
- Deny log on as a batch job
- Deny log on as a service
- Deny log on through RDP

For more details see the following article, [Securing local administrator accounts and groups](https://docs.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/appendix-h--securing-local-administrator-accounts-and-groups)

## **5\. Use Local Administrator Password Solution (LDAPS)**

Local Administrator Password Solution (LAPS) is becoming a popular tool to handle the local admin password on all computers.

LAPS is a Microsoft tool that provides management of local account passwords of domain-joined computers. It will set a unique password for every local administrator account and store it in Active Directory for easy access.

This is one of the best free options for mitigation against pass the hash attacks and lateral movement from computer to computer.

It’s very common that organizations deploy Windows using an image based system. This makes it quick to deploy a standard configuration to all devices.

But..

This often means the local administrator account will be the same on every computer. Since the local Administrator account has full rights to everything on the computer, all it takes is for one of them to get compromised, then the hacker can access all the systems.

LAPS is built upon the Active Directory infrastructure so there is no need to install additional servers.

The solution uses the group policy client side extension to perform all the management tasks on the workstations. It is supported on Active Directory 2003 SP1 and above and client Vista Service Pack 2 and above.

If you need to use the local admin account on a computer you would retrieve the password from Active Directory and it would be unique to that single computer.

For step-by-step instructions on installing LAPS see this article, [How to Install Local Administrator Password Solution (LAPS)](https://activedirectorypro.com/microsoft-laps-setup-install-guide/)

## **6\. Use a Secure Admin Workstation (SAW)**

A secure admin workstation is a dedicated system that should only be used to perform administrative tasks with your privileged account.

It should not be used for checking email or browsing the internet. In fact… it should not even have internet access.

**What tasks would you do on a SAW?** 

- Active Directory administration
- Group Policy
- Managing DNS & DHCP Servers
- Any task that requires admin rights on servers
- Admin rights to Management Systems such as VMware, Hyper-v, Citrix
- Office 365 Administration

You get the idea.

Basically, when you need to use your privileged account to perform admin tasks you should be doing it from a SAW. Daily use workstations are more vulnerable to compromise from pass the hash, phishing attacks, fake websites, keyloggers, and more.

Using a secure workstation for your elevated account provides much greater protection from those attack vectors. Since attacks can come from internal and external it’s best to adopt an assumed breach of security posture.

Due to the continuous threats and changes to technology the methodology on how to deploy a SAW keeps changing. There are also PAW and jump servers to make it even more confusing.

Here are some tips to help get you started:

- Use a clean OS install (use the latest Windows OS)
- Apply hardening security baseline (See tip#25)
- Enable full disk encryption
- Restrict USB ports
- Enable the [Windows Firewall](https://activedirectorypro.com/windows-firewall-best-practices/)
- Block internet
- Use a VM – Terminal Server works well
- Minimal software installed
- Use two factor or smart card for access
- Restrict systems to only accept connections from the SAW

Here is my typical workflow using a SAW:

1.  Log into my computer with my regular account to check email and view new support requests.
2.  If I have some administrative task I will log into my SAW with my privileged account that has rights to modify AD group membership and add the user to the necessary AD security group.

Pretty straightforward right?

It may seem like a hassle but I actually find it more convenient this way. I can remote in when off network and have a server that has all the tools I need. I also don’t have to worry about re-install all of my support software if I need to re-image my computer.

For more information on this topic check out Microsoft’s [Privileged access devices](https://docs.microsoft.com/en-us/security/compass/privileged-access-devices) documentation.

## **7\. Enable Audit Policy Settings with Group Policy**

Ensure the following Audit Policy settings are configured in group policy and applied to all computers and servers.

Computer Configuration -> Policies -Windows Settings -> Security Settings -> Advanced Audit Policy Configuration

### **Account Logon**

Ensure ‘Audit Credential Validation’ is set to ‘Success and Failure’

### **Account Management**

Audit ‘Application Group Management’ is set to ‘Success and Failure’  
Audit ‘Computer Account Management’ is set to ‘Success and Failure’  
Audit ‘Other Account Management Events’ is set to ‘Success and Failure’  
Audit ‘Security Group Management’ is set to ‘Success and Failure’  
Audit ‘User Account Management’ is set to ‘Success and Failure’

### **Detailed Tracking**

Audit ‘PNP Activity’ is set to ‘Success’  
Audit ‘Process Creation’ is set to ‘Success’

### **Logon/Logoff**

Audit ‘Account Lockout’ is set to ‘Success and Failure’  
Audit ‘Group Membership’ is set to ‘Success’  
Audit ‘Logoff’ is set to ‘Success’  
Audit ‘Logon’ is set to ‘Success and Failure’  
Audit ‘Other Logon/Logoff Events’ is set to ‘Success and Failure’  
Audit ‘Special Logon’ is set to ‘Success’

### **Object Access**

Audit ‘Removable Storage’ is set to ‘Success and Failure’

### **Policy Change**

Audit ‘Audit Policy Change’ is set to ‘Success and Failure’  
Audit ‘Authentication Policy Change’ is set to ‘Success’  
Audit ‘Authorization Policy Change’ is set to ‘Success’

### **Privilege Use**

Audit ‘Sensitive Privilege Use’ is set to ‘Success and Failure’

### **System**

Audit ‘IPsec Driver’ is set to ‘Success and Failure’  
Audit’ Other System Events’ is set to ‘Success and Failure’  
Audit ‘Security State Change’ is set to ‘Success’  
Audit ‘Security System Extension’ is set to ‘Success and Failure’  
Audit ‘System Integrity is set to ‘Success and Failure’

Malicious activity often starts on workstations, if you’re not monitoring all systems you could be missing early signs of an attack.

In the next section, I’ll cover what events you should be monitoring.

## **8\. Monitor Active Directory for Signs of Compromise**

You should be monitoring the following Active Directory events to help detect compromise and abnormal behavior on the network.

Here are some events you should be monitoring and reviewing on a weekly basis.

- Changes to privileged groups such as Domain Admins, Enterprise Admins, and Schema Admins
- A spike in bad password attempts
- A spike in locked out accounts
- Account lockouts
- Disabled or removal of antivirus software
- All actives performed by privileged accounts
- Logon/Logoff events
- Use of local administrator accounts

### **How do you monitor events in Active Directory?**

The best way is to collect all the logs on a centralized server and then use log analyzing software to generate reports.

Some log analyzers come pre-built with Active Directory security reports and others you will need to build yourself.

Here are some of the most popular log analyzers.

- [Elk Stack](https://www.elastic.co/solutions/logging)
- [Lepid](https://www.lepide.com/lepideauditor/active-directory-auditing.html)
- [Splunk](https://www.splunk.com/)
- [ManageEngine ADAudit Plus](https://www.manageengine.com/products/active-directory-audit/)
- [Windows Event Forwarding](https://docs.microsoft.com/en-us/windows/security/threat-protection/use-windows-event-forwarding-to-assist-in-intrusion-detection)

With a good log analyzer, you will be able to quickly spot suspicious activity in your Active Directory environment.

Here are some screenshots from an analyzer that I use. The first screenshot shows a spike in account lockouts.

That is definitely not normal.

In this screenshot, you can see a huge spike in logon failures. Without a log analyzer, these events would be hard to spot.

## **9\. Password Complexity Sucks (use passphrases)**

8 characters with complexity is no longer a secure password. Instead, use a minimum of 12 characters and train users on passphrases.

The longer the password the better.

Passphrases are simply two or more random words put together. You can add numbers and characters if you want but I wouldn’t make it a requirement.

Studies have shown when you require complexity it is used in a similar pattern and then repeated.  Hackers have caught onto this and there are now huge password lists (freely available) that contain millions of easy to guess passwords.

Know anyone that uses passwords like this?

S@mmer2018, or Winter2018! June2018$

These are awful passwords and are easily guessed.

Long passwords and using the passphrase technique make it more difficult for password cracking software and for hackers to guess.

### **Better Password Policy**

- Set 12 character passwords
- Remember 10 password history
- use passphrases
- Lockout policy 5 attempts

The key to using passphrases is to be totally random with each word, you don’t want to type out a sentence where the next word can be guessed.

### **Good passwords using passphrases**

Bucketguitartire22  
Screenjugglered  
RoadbluesaltCloud

The above examples are totally random. These would take a very long time to crack and most likely no one would guess them.

### **Bad passphrase examples**

Ireallylikepizza22  
Theskyisblue44

[NIST](https://www.nist.gov/) recently updated its password policy guidelines in [Special Publication 800-63](https://pages.nist.gov/800-63-3/) to address new requirements for password policies.

If your organization must meet certain standards then make sure those standards support these password recommendations.

Also, be sure to update your company’s written policy.

## **10\. Use Descriptive Security Group Names**

First of all, make sure you apply permissions to resources with security groups, not individual accounts, this makes managing resources much easier.

Next, don’t name your security groups with a generic name like helpdesk or HR Training.

When you have generic names like this they will get used on all kinds of resources and you will have lost all control of security.

And there is no easy way to see where security groups are being used. Yes, there are tools that you can run but if you have a medium or large size environment this will be a huge task.

Here is an example

IT_Local is very generic. Just by looking at the name, I don’t know what this is used for. Yes, it’s probably used by the IT department but where?

This is how permissions can get out of control and you could end up giving people access to things they shouldn’t have access to. Some sysadmin might get a request for access to the IT department network share and add users to this group. But what he doesn’t know is that the group might be used on other systems. Now he just gave some users full permissions to some other systems.

When you use a descriptive name like the “N Drive HR_Training” group you can look at the name and have a good idea of what it is for. In this example, it’s for the N drive, it’s for HR, and has something to do with Training. Your IT staff should have a good idea of what this is just by the name.

**Here is a real-world example of how bad group names can lead to issues.**

I was working with a client on cleaning up permissions to Active Directory. There were multiple security groups that had delegated permissions to Active Directory.

There was a group called helpdesk, another group IS Support, and one more called AD Modify.

I was under the impression only Helpdesk staff had rights to Active Directory to reset passwords and unlock accounts.

Come to find out these groups were used for other resources such as the helpdesk software, network share, and printers. So it included various IT staff.

Once I removed these groups I got phone calls from programmers and business analysts asking why they couldn’t reset user’s passwords anymore. Why on earth are programmers resetting user passwords?

I clear precise Security group name would have prevented this from happening.

If you don’t name the security group specific then it can be a catch all for permissions to many other things.

Here are some good examples of how to name groups.

### **Example 1: Allow helpdesk to reset passwords**

Security group name: IT-Helpdesk-PW-Reset

Since the group name is precise, this would help prevent it from being used on other resources like a printer or network share.

### **Example 2: Allow HR rights to a shared folder**

Security group name: N Drive HR-Training-Folder-RW

Again, this has a very specific name and helps identify what it should be used for.

You can come up with your own naming convention just get specific with the name and avoid generic one word group names.

## **11\. Find and Remove Inactive User and Computer Accounts**

You need to have a procedure in place to detect inactive users and computer accounts in Active Directory.

You don’t want a bunch of unused accounts sitting in Active Directory just waiting for an attacker to discover and use. This can also cause issues with reporting, patching, and slowing down group policy.

[CIS Critical Security Controls](https://www.cisecurity.org/controls/) says “There are many ways to covertly obtain access to user accounts, including weak passwords, accounts still valid after a user leaves the enterprise, dormant or lingering test accounts”

CIS recommends deleting or disabling dormant accounts after 45 days of inactivity

I created a tool called [AD Cleanup Tool](https://activedirectorypro.com/ad-pro-toolkit/ad-cleanup-tool/) that lets you quickly find inactive users and computer accounts.

If you want more details on finding inactive users or how to do this with PowerShell check out this article titled [Finding inactive Users in Active Directory](https://activedirectorypro.com/find-inactive-user-accounts-in-active-directory/)

## **12\. Remove Users from the Local Administrator Group**

A regular user should not be in the local administrator group on computers.

A user with local admin rights has full access to the entire Windows Operating system. This can lead to all kinds of security issues, such as installing software, disabling antivirus, downloading and installing malware, stealing data, hacking credentials, pivoting to other computers, and so on.

A Microsoft vulnerabilities report says:

“Of all the Windows vulnerabilities discovered in 2018, 169 of these were considered ‘critical’. Removing admin rights could have mitigated 85% of these critical vulnerabilities”

By removing users from the local administrator group you greatly reduce the opportunities for attackers to gain access to your computer and network.

I recommend you control the local administrator group by using group policy. If you remove them from the computer with no centralized control then someone will just add the rights back. I have fought this battle many times with helpdesk. I remove the rights then they just add it back when troubleshooting an issue.

Using group policy and restricted groups will prevent your staff from leaving accounts in the group.

I wrote a complete guide on this check it out here -> [Remove Users from Local Administrator Group using Group Policy](https://activedirectorypro.com/remove-local-admin-rights-using-group-policy/).

## **13\. Do Not Install Additional Software or Server Roles on DCs**

Domain controllers should have limited software and roles installed on them.

DC’s are critical to the enterprise, you don’t want to increase security risks by having additional software running on them.

Windows Server Core is a great option for running the DC role and other roles such as DHCP, DNS, print servers, and file servers. Server Core runs without a GUI and requires fewer security patches due to its smaller footprint.

Server core can have its challenges though with some 3rd party software not being compatible.

## **14\. Patch Management and Vulnerability Scanning**

Attackers are quick to exploit known vulnerabilities.

If you do not regularly scan and remediate discovered vulnerabilities you are at a much greater risk for comprise.

There are a large number of vulnerability and scanning tools available, see my list of the [best patch management software](https://activedirectorypro.com/patch-management-software/).

### **Tips for Continues Vulnerability Management**

- Scan all systems at least once a month to identify all potential vulnerabilities. If you can scan more frequently that’s even better.
- Prioritize the finding of the vulnerability scans and first fix the ones that have known vulnerabilities in the wild.
- Deploy automated software updates to operating systems
- Deploy automated updates to 3rd party software
- Identify out-of-date software that is no longer supported and get it updated.

## **15\. Use Secure DNS Services to Block Malicious Domains**

You can prevent a lot of malicious traffic from entering your network by blocking malicious DNS lookups.

Anytime a system needs to access the internet it will in most cases use a domain name. Computers talk to each other by IP address so the computers use DNS to map a domain name to an IP address.

There are several services available that check DNS queries for malicious domains and blocks them.

How does this work?

These DNS services gather intelligence about malicious domains from various public and private sources. When it gets a query for a domain that it has flagged as malicious it will block access when your system attempts to contact them.

Here is an example:

[<img src="https://activedirectorypro.com/wp-content/uploads/2018/05/top-25-quad9.jpg" alt="dns filter service" class="wp-image-2027 perfmatters-lazy entered pmloaded" style="box-sizing: border-box; height: auto; max-width: 100%; padding-bottom: 1.5rem; vertical-align: bottom; animation: 500ms pmFadeIn;" width="697" height="226">](https://activedirectorypro.com/wp-content/uploads/2018/05/top-25-quad9.jpg)

**Step1:** The client clicks a link that goes to [example.net](http://example.net)

**Step2:** Local cache is checked

**Step 3:** DNS Service checks if the domain is on its threat list, it is so it returns a block reply.

In the above example since the DNS query returned a block, no malicious traffic ever entered the network.

Here are some of the most popular secure DNS services.

- [Quad9](https://www.quad9.net/)
- [OpenDNS](https://www.opendns.com/)
- [Comodo Secure DNS](https://www.comodo.com/secure-dns/)

I’m currently using Quad9, it’s free and easy to setup.

Also, most IPS (Intrusion Prevention Systems) systems support the ability to check DNS lookups against a list of malicious domains.

## **16\. Run Supported Operating Systems**

With each new version of Windows OS, Microsoft includes built in security features and enhancements. More importantly, you get security updates.

Just staying on the latest OS will increase overall security.

New Security Features in Server 2022:

- Secured-core Server
- Hardware root of trust
- Firmware protection
- UEFI secure boot
- Virtualization based security

Here is a video from Robert McMillen on Security features in server 2002.

## **17\. Use two-factor authentication for office 365 and remote access**

Compromised accounts are very common and this can provide attackers remote access to your systems through VPN, Citrix, or other remote access systems.

Check your Office 365 or ADFS logs, you will be surprised at how many login attempts are coming from China and Russia.

One of the best ways to protect against compromised accounts is two factor authentication. This will also help against password spraying attacks.

Let’s say a user fell for a phishing attempt that asked the user to verify their username and password.

Now the attacker has that user’s Active Directory credentials. The attacker could now gain access to a number of systems from anywhere.

If the user had two-factor enabled this could prevent access even though the account has been compromised. The attacker would need the second set of credentials to get logged in.

There really is no stopping accounts from getting compromised there are too many ways for attackers to gain the credentials.

If you are using Office 365 and depending on what package you have MFA may be included. Take advantage of this feature.

Popular two-factor authentication solutions

- [DUO](https://duo.com/)
- [RSA](https://www.rsa.com/en-us/products/rsa-securid-suite/rsa-securid-access)
- [Office 365 MFA Setup](https://activedirectorypro.com/365-mfa-setup/)

## **18\. Monitor DHCP logs for connected devices**

You should know what is connected to your network if you have multiple locations with lots of users and computers this can be challenging.

There are ways to prevent only authorized devices from connecting but this can be costly and a lot of work to set up. If you have the resources then that is the way to go.

Another method that is already available to you is to monitor the DHCP logs for connected devices.

You should have all end user devices setup to use DHCP. You can then look at the logs to see what is connecting. You should have a naming convention for your equipment, this will make it easy to spot possible unauthorized devices.

In the screenshot below I can easily spot a device that does not follow my computer naming convention.

minint-1bdvd67 is not something I recognize. I will need to look into this and see if it is an authorized device.

<img src="https://activedirectorypro.com/wp-content/uploads/2018/05/top-25-security1.jpg" alt="dhcp logs" class="wp-image-2011 perfmatters-lazy entered pmloaded" style="box-sizing: border-box; height: auto; max-width: 100%; padding-bottom: 1.5rem; vertical-align: bottom; animation: 500ms pmFadeIn;" width="325" height="98">

## **19\. Monitor DNS Logs for Malicious Network Activity**

Most connections start with a DNS query. All domain joined systems should be set up to use your local Windows DNS server.

With this setup, you can log every internal and external DNS lookup. When a client device makes a connection to a malicious site it will log that site name in the DNS logs.

These malicious domains are usually odd, random character domains that don’t look normal.

Here are some screenshots of suspicious DNS lookups from my logs. These repeatedly show up in my logs for a handful of devices.

I seriously doubt a user is trying to go to this site intentionally. These kinds of lookup need to be looked into to determine if it’s malicious or not.

To view the DNS lookups you first need to enable the DNS debug logs on the Windows Servers.

### **Steps to enable DNS debug logs on Windows Server**

**Step 1:** Open the DNS Management Console

**Step 2:** Right click and select properties

**Step 3:** Click Debug Logging Tab

**Step 4:** Check the box “Log packets for debugging

<img src="https://activedirectorypro.com/wp-content/uploads/2018/05/top-25-enable-dns-debug.jpg" alt="dns debug logs" class="wp-image-2014 perfmatters-lazy entered pmloaded" style="box-sizing: border-box; height: auto; max-width: 100%; padding-bottom: 1.5rem; vertical-align: bottom; animation: 500ms pmFadeIn;" width="391" height="441">

Once you have the debug logs setup you can import those logs into an analyzer to quickly spot malicious activity.

You can also convert the log file to a CSV to make it easier to read and filter.

## **20\. Use Latest ADFS and Azure Security Features**

ADFS and Azure have some great security features. These features will help with password spraying, account compromise, phishing, and so on.

No matter what level of office 365 you are on there are some features you should look into.

Of course, premium subscriptions have the best security features.

But

Microsoft does improve and add new features at every level (At least this is what I’ve noticed since being on Office 365).

Here are some features that are worth looking into:

- Smart Lockout – Uses algorithms to spot unusual sign on activity.
- IP Lockout – Uses Microsoft’s database of known malicious IP addresses to block sign on ins.
- Attack Simulations – You should be doing regular phishing tests to help train end users. Microsoft will be releasing phish simulator software very soon.
- MFA Authentication – Microsoft’s 2 factor solution
- Banned passwords – Checks passwords against a known list
- Azure AD Connect Health – Provides several good reports
- Custom bad passwords – Ability to add custom banned passwords to check against.

I’m currently running a hybrid office 365 setup. In azure, I can see several risky sign on reports.

<img src="https://activedirectorypro.com/wp-content/uploads/2018/05/top-25-security-risky-sign-ins.jpg" alt="office 365 risky sign on report" class="wp-image-2016 perfmatters-lazy entered pmloaded" style="box-sizing: border-box; height: auto; max-width: 100%; padding-bottom: 1.5rem; vertical-align: bottom; animation: 500ms pmFadeIn;" width="541" height="212">

Azure alerted me to a sign on that came from China from one of our accounts.

<img src="https://activedirectorypro.com/wp-content/uploads/2018/05/top-25-security-leaked-credentials.jpg" alt="email alert" class="wp-image-2017 perfmatters-lazy entered pmloaded" style="box-sizing: border-box; height: auto; max-width: 100%; padding-bottom: 1.5rem; vertical-align: bottom; animation: 500ms pmFadeIn;" width="550" height="414">

Some of these features are available with the latest ADFS version and some are included with an office 365 subscription.

Definitely check out all the available security features in ADFS, Office 365, and Azure.

Resources:

[Defending against password spray attacks](https://www.microsoft.com/en-us/microsoft-365/blog/2018/03/05/azure-ad-and-adfs-best-practices-defending-against-password-spray-attacks/)

## **21\. Use Office 365 Secure Score**

Secure score analyzes your office 365 organization security based on activity and security settings.

Secure Score checks your Office 365 services then checks your settings and activities and provides you a security score.

Once it analyzes your score it will provide a detailed list of what was scored and recommended actions to fix the issues.

You will need a Premium or Enterprise subscription to access this feature, in addition, you will need to be assigned the global admin or custom role.

Microsoft continues to expand and add additional features to Secure Score.

If you have access to this feature then take advantage of it.

<img src="https://activedirectorypro.com/wp-content/uploads/2018/05/top-25-security-secure-score.jpg" alt="office secure score" class="wp-image-2018 perfmatters-lazy entered pmloaded" style="box-sizing: border-box; height: auto; max-width: 100%; padding-bottom: 1.5rem; vertical-align: bottom; animation: 500ms pmFadeIn;" width="614" height="232">

Refer to my article [Office 365 Security best practices](https://activedirectorypro.com/office-365-security-best-practices/) for more details.

## **22\. Have a Recovery Plan**

If your network was compromised today or hit with RansomWare, what would you do?

- Do you have a response policy?
- Have you tested and trained staff on how to handle such an event?
- Do you have a [system state backup of active directory](https://activedirectorypro.com/backup-active-directory/)? This is a must have incase you need to restore your domain from a backup.

Cyber attacks can shut down systems and bring business operations to a halt.

The City of Atlanta was shut down by a cyber attack, which prevented residents from paying online utility bills. In addition, Police officers had to write reports by hand.

Last I checked it cost more than $5 million for them to recover from the attack.

A good incident response plan could have limited the impact and enabled services back online much faster.

Here are a few things to include in an incident response plan

- Create an incident response policy and plan
- Create procedures for performing incident handling and reporting
- Establish procedures for communicating with outside parties
- Establish  response teams and leaders
- Prioritize servers
- Walkthrough and training

NIST has a great [computer security incident handling guide](https://nvlpubs.nist.gov/nistpubs/specialpublications/nist.sp.800-61r2.pdf) that I recommend looking at.

## **23\. Document Delegation to AD**

The best way to control access to Active Directory and related resources is to use Security Groups.

If you are delegating rights to individuals then you are losing control of who has access.

Create custom groups with very specific names, document who has rights, and a process for adding new users. Don’t just allow users to be added to these custom groups without an approval process. This is just another way permissions can get out of control.

Know what groups are delegated to what resources, document it, and make sure your team is on the same page.

## **24\. Lock Down Service Accounts**

Service accounts are those accounts that run an executable, task, or service, AD authentication, etc.

These are wildly used and often have a password set to never expire.

These accounts will often end up with too many permissions and more often than not are a member of the domain admins group.

Bad..very bad

Sometimes this is suggested by the vendor.

Don’t allow that to happen, there are ways to make it work without DA access.

Here are some tips for locking down service accounts.

- Use [Managed Service Accounts instead](https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/service-accounts-standalone-managed)
- Use long Strong passwords
- Give access to only what is needed
- Try to avoid granting local administrator rights
- Do not put in Domain Admins
- Deny logon locally
- Deny logon as a batch
- Require vendors to make their software work without domain admin rights

## **25\. Use Security Baselines and Benchmarks**

A default install of the Windows Operating system has many features, services, default settings, and enabled ports that are not secure.

These default settings should be reviewed against known security benchmarks.

Establishing a secure configuration on all systems can reduce the attack surface while maintaining functionality. There are several resources that provide security benchmarks.

Microsoft has a [Security Compliance Toolkit](https://www.microsoft.com/en-us/download/details.aspx?id=55319) that allows you to analyze and test against Microsoft’s recommended security configuration baselines.

Another great resource is [CIS SecureSuite](https://www.cisecurity.org/cis-securesuite/)

It also provides security configuration baselines. In addition, it provides tools that can scan a system and provide a report on failures.

Most of the recommended settings can be set up using Group Policy and deployed to all computers.

Here is a screenshot of the CIS Securesuite tool. It ran a scan on my computer and generated a report on all the settings that passed and failed.

[<img src="https://activedirectorypro.com/wp-content/uploads/2018/05/top-25-security2.jpg" alt="cis security baseline" class="wp-image-2020 perfmatters-lazy entered pmloaded" style="box-sizing: border-box; height: auto; max-width: 100%; padding-bottom: 1.5rem; vertical-align: bottom; animation: 500ms pmFadeIn;" width="883" height="560">](https://activedirectorypro.com/wp-content/uploads/2018/05/top-25-security2.jpg)

CIS Securesuite can also scan against other systems like Cisco, VMware, Linux, and more.

## **Active Directory Security Checklist**

Download this guide in a simple checklist format. It includes 3 bonus security tips.

[Download PDF Checklist](https://activedirectorypro.com/downloads/Active-Directory-Security-Checklist.zip)

I hope you found my list of Active Directory security best practices useful.

If you have a question or comment, please post it below.
