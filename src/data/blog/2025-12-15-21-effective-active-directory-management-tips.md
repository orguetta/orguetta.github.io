---
author: Robert Allen
pubDatetime: 2024-03-26
modDatetime: 2024-03-26
title: 21 Effective Active Directory Management Tips
ogImage: 21 Effective Active Directory Management Tips
featured: false
draft: false
---
This is the most comprehensive list of Active Directory Management Tips online.

In this article, I will share my tips on, AD design, naming conventions, automation, AD cleanup, monitoring, Active Directory user management, and much more.

Check it out:

## **1\. Active Directory OU Structure Best Practices**

If you don’t have a good Active Directory organization unit (OU) design you’re going to have problems.

First, I’ll quickly explain the three main reasons why good OU design is so important.

*   **Reason #1 Group Policies** – Having a good OU design will make implementing and managing group policies much easier. I’ve seen a drastic decrease in issues with proper OU design.
    
*   **Reason #2 Delegate permissions** – Being able to delegate rights at a granular level and auditing those rights is a must. A proper OU structure will allow you to easily [delegate permissions](https://activedirectorypro.com/delegate-control-in-active-directory/) at a granular level.
    
*   **Reason #3 Administrative tasks** – Modifying user accounts, using LDAP queries, reporting, and bulk changes are all common administrative tasks.  If Active Directory is a mess, these simple day-to-day tasks can become difficult for the whole team.
    

Now that I’ve explained why OU design is so important, let me show you my tips for good OU design.

### **OU Best Practice #1: Separate Users and Computers**

Do not put users and computers into the same OU, this is a Microsoft best practice.

Instead, create a new OU for Users and an OU for computers.

<img src="https://activedirectorypro.com/wp-content/uploads/2022/12/ou-best-practice-1.webp" alt="" class="wp-image-34652" style="box-sizing: border-box; height: auto; max-width: 100%; padding-bottom: 1.5rem; vertical-align: bottom;" width="804" height="204">

Next, create sub-OUs for each department or grouping.

Do this for both computers and users.

Next, create OUs for specific functions or grouping of similar objects. Here are some examples that I use:

*   Conference room computers
    
*   VDI (Virtual desktops)
    
*   Test computers
    
*   Generic accounts
    
*   Service Accounts
    

I’ll create an OU for each one of these functions.

You can structure the sub-OUs in any way you like, it basically comes down to how you plan to manage the users and computers. In organizations I’ve worked at, it made the most sense to manage them by department and specific functions. The most important tip is to group user and computer objects into separate organizational units.

**Active Directory Design Best Practices Example** 

Here is a real-world example of how a good OU structure makes managing Active Directory easier.

A customer had a domain policy that locks the computers after 15 minutes of inactivity. This policy was applying to every computer in the domain.

This became a problem for conference room computers, users would be teaching or giving a presentation and the screen would keep locking.

To fix this I just created a sub-OU called conference room computers and moved the affected computers into this OU. I created a new Group Policy object that changed the lockout time to 60 minutes and applied it to this new OU.

Now, these computers still inherit the policies from their parent while applying the new timeout policy.

Problem solved!

### **OU Best Practice #2: Create an OU for Security Groups**

At first, I put security groups into department folders.

It made sense at the time.

BUT….I was wrong.

What happened was, I would have groups that were not department specific.  Where do those go?

They would end up in various places and then no one could find them.

To fix this mess I created a group just for security groups.

Just like users and computers, I can create sub-OUs to group them by department or function.

<img src="https://activedirectorypro.com/wp-content/uploads/2022/12/ou-best-practice-4.webp" alt="" class="wp-image-34661 perfmatters-lazy entered pmloaded" style="box-sizing: border-box; height: auto; max-width: 100%; padding-bottom: 1.5rem; vertical-align: bottom; animation: 500ms pmFadeIn;" width="804" height="404">

This works great, I know exactly where all the groups are and can organize them any way I want with sub-OUs. For example, if I or someone on my team needed to give a user access to a shared folder, I would know these groups are in the Shared Folders OU.

### **OU Best Practice #3: Create an OU for Servers**

You want to keep your servers in their own OU. You will have group policies that need to apply only to servers and not workstations and vice versa. I can also create sub-OUs to group specific servers for whatever need.

Now I can apply policies to all the servers or specific ones.

Active Directory structure and design are very important. If you implement the design tips above it will make managing Active Directory much easier. You will have the flexibility to apply group policies, delegate control, and administer AD objects.

## **2\. Use a Standardize Naming Convention**

No matter if your organization is big or small you need to standardize the naming of Active Directory objects.

Here are my tips for good naming conventions.

### **Users**

The most popular option is users first initial + last name.

I’ll use “Joe Smith” as an example.

The user name would be: jsmith

The next popular option is complete first name + last name (use a special character to separate the name).

The user name would be: joe.smith

Both methods work well and are user friendly. The one problem you may run into is duplicate user names.

To fix this just add in the middle initial.

For example, I have Joe Smith, then I get a new employee with the name of Jane Smith. The user name for Jane will be the same as Joe so I need to use Jane’s middle initial.

Jane’s middle initial is A, so the username would be jasmith. or jane.a.smith

I would avoid naming conventions that truncate names or include numbers. It’s just too confusing for everyone.

### **Groups**

Here is my template for creating groups.

Department or group + resource + Permissions

Let me break this down

*   Department or group – You can use the full department name or an abbreviation. It some cases it may not be a specific department it may be users from various departments so just come up with a name for this group.
    
*   Resource –  This should define what the group is being used for, it could be one word or a few words (separate words with a hyphen)
    
*   Group Prefix: When you create a group you must select a group type, I use a prefix to define what group I’m using.
    
    *   Domain local = L
        
    *   Global = G
        
    *   Universal = U
        
*   Permissions – The permissions will you apply to the resource
    
    *   R = Read only
        
    *   RW = Read, write
        

Here are some examples

Example 1 – Helpdesk staff needs rights to reset passwords.

Security group name would be: Helpdesk-PasswordReset-G

Example 2 – HR department needs training folder locked down

Security Group name: HR-Training-Folder-G-RW

Example 3 – Sales department want shared calendar locked down

Security group name: Sales-Shared-Calendar-G-RW

Once I got all my groups renamed following this naming convention it made it much easier to find and use them.

### **Computers, Servers, and other AD Objects**

For most other objects I follow this naming convention:

Type + department or location code + asset#

*   Type
    
    *   W = Workstation
        
    *   L = Laptop
        
    *   P = Printer
        
    *   S = Server
        
    *   V= VDI or virtual machine
        
*   Department: Use two letter appreciations for departments or use a location code
    
    *   HR = Human Resources
        
    *   MR = Marketing
        
    *   SA = Sales
        

Here are some examples

Workstation in the IT department asset# 1234

W-IT-1234

Laptop in the HR department asset# 1235

L-HR-1235

Printer in the sale department asset # 1233

P-SA-1233

Create a clear naming convention that the whole team can follow, and I’m not just talking about users and computers. Create a naming convention for all objects

## **3\. Monitor Active Directory with Premium Tools**

Active Directory is the heart of the network, if it stops beating then everything else dies.

I know FREE tools are great (I use plenty of them) but when it comes to monitoring I rely on professional tools.

Why?

It saves me serious time and it provides other IT staff with easy to read metrics on servers and applications.

Here are a few favorites:

[SolarWinds Server & Application Monitor](https://solarwinds.sjv.io/c/4134360/1649988/17790) – I like this tool as it allows me to monitor any application on any server. Monitors all the components and services that make Active Directory run. If Active Directory is having issues or is slow this program will quickly identify the issue.

[SolarWinds Network Performance Monitor](https://solarwinds.sjv.io/c/4134360/1649979/17790) – Excellent tool for monitoring the network, bandwidth, CPU, Memory, and many more metrics on any device that supports SNMP.

[Netfort Languardian](https://www.netfort.com/languardian/?utm_source=activedirectorypro&utm_medium=referral) – This is a deep packet inspection program that monitors the network and user activity. Although it may be considered a networking tool it has tons of use cases. I can find out who deleted a file, monitor DNS, find rogue DNS servers, monitor bandwidth to servers and active directory, and much more.

[ManageEngine Audit Plus](https://www.manageengine.com/products/active-directory-audit/) – Provides real time auditing to Active Directory. Track changes to AD objects, user activity, DNS, GPO, and more.

There are plenty of professional tools on the market, I recommend you search around and find what best fits your needs.

## **4\. Use Core Servers (When possible)**

Server Core has a smaller footprint, is more secure, and doesn’t require as many updates.

Bonus benefit fewer reboots!

I was skeptical at first when Microsoft said this is the preferred install option. But after running core servers for a few years they ROCK. They are stable, and they really do have fewer updates.

Unfortunately, they don’t work in every situation.

Not all 3rd party applications support core servers.

They work great for Windows servers such as domain controllers, DHCP, DNS.

So, install core servers when you can and reap the benefits.

Here is a nice table that summarized the benefits of server core

[https://msdn.microsoft.com/en-us/library/hh846314(v=vs.85).aspx](https://msdn.microsoft.com/en-us/library/hh846314\(v=vs.85\).aspx)

## **5\. Know How to Check AD Health**

Issues with domain controllers, DNS, and replication are going to cause all kinds of problems.

Here are some quick tips for checking the health of Active Directory.

### **Use dcdiag to check domain controllers**

Dcdiag is a command line tool that analyzes the state of domain controllers in a forest or enterprise and reports any problems. It is built into most Windows server operating systems, it is also included if you have the ADDS or ADLDS role installed.

Use the following command to analyze the health of your domain controllers.

dcdiag /s:servername /a

This will run several tests on various components and services that run on a domain controller.

You will get a fail on any tested that does not pass.

### **Use dcdiag to test DNS**

Use the command below to test dns

dcdiag /test:dns /s:servername

You can in the screenshot the test has detected some issues with my dns

Looking through the tests I’m missing some A and SRV DNS records

### **Use repadmin to test replication**

Use the following [repadmin command](https://activedirectorypro.com/repadmin-how-to-check-active-directory-replication/) to test replication between your domain controllers.

**repadmin /showrepl**

## **6\. Use Security Groups to Apply Permissions to Resources**

DO NOT use individual accounts to apply permissions on resources (printers, shared folders, applications, calendars, etc).

Instead, use security groups.

This makes adding and removing users to resources much easier. It also helps with reporting and audits.

Once the groups are set up on the resources you don’t have to go to each resource every time to modify access.  You just update the group.

Using the group naming convention from tip# 3 this works like a charm.

Here is an example.

I have a folder called training in the sales department.

I will create a group called HR-Training-SG-RW (This following my naming convention tips#)

Then I’ll add this group to the permissions on this folder.

[<img src="https://activedirectorypro.com/wp-content/uploads/2018/01/mgt-tip9.jpg" alt="" class="wp-image-1130 perfmatters-lazy entered pmloaded" style="box-sizing: border-box; height: auto; max-width: 100%; padding-bottom: 1.5rem; vertical-align: bottom; animation: 500ms pmFadeIn;" width="361" height="427">](https://activedirectorypro.com/wp-content/uploads/2018/01/mgt-tip9.jpg)

Now anytime I want to give permissions or revoke a user’s rights to this folder I just modify the members of this group.

I can use the method for all resources.

## **7\. Cleanup Active Directory (at least once a month)**

Over time, Active Directory will have stale users, computers, and group accounts.

To keep Active Directory secure and tidy you need to find these stale accounts and remove them.

It is recommended check AD at least once a month for [inactive computers](https://activedirectorypro.com/find-remove-old-computer-accounts-active-directory/) and [inactive user accounts](https://activedirectorypro.com/find-inactive-user-accounts-in-active-directory/). There are plenty of scripts and GUI tools available that help with finding and removing old accounts.

The [AD Pro Toolkit](https://activedirectorypro.com/ad-pro-toolkit/) includes several AD Tools for cleaning up Active Directory.

I run this cleanup process once a month.

## **8\. Add Descriptions to Active Directory Objects**

It’s frustrating to see objects in Active Directory and have no idea what they are for.

Even if you are using a good naming convention I still like to add descriptions to objects. Obviously not all objects, but servers, groups, service accounts, and generic accounts I put descriptions on them.

Not only does this help me quickly identify the use of the object it helps the whole team understand.

You can see in the screenshots below I’ve added descriptions to some groups and service accounts.

Here are some non standard accounts, again using the description field I can easily see in Active Directory what these are for.

Again, I don’t do this for all objects, mainly groups, servers, and non standard accounts.

It’s another big time saver.

## **9\. Use Delegation Control Wizard to Set Permissions for non admins (helpdesk)**

Active Directory delegation is important to understand so that permissions can be granted without adding users to privileged groups like Domain admins.

Using delegated permissions, you can use the least privileged access method. (Give only rights that are needed)

This helps with security and compliance.

Here are a few examples of why you would need to delegate rights.

*   Helpdesk needs to reset passwords
    
*   Update user account info such as phone number or address
    
*   Give rights to add and remove computers from domains.
    
*   Create, delete and manage user accounts
    
*   Modify group membership
    

In this video, I will give our helpdesk group the rights to reset passwords.

## **10\. Audit Changes to Active Directory**

Active Directory auditing is the process of logging changes and events in Active Directory.

Auditing is important for security and compliance reasons.

You should at least be auditing active directory for the following events:

*   Failed logon attempts
    
*   Any changes to objects
    
*   Successful logons
    
*   Modifications to Privilege Accounts
    
*   Group Policy Changes
    
*   File/Folder deletes
    

Before you can audit Active Directory, you must first set up an [audit policy](https://activedirectorypro.com/audit-policy-best-practices/).

### **Steps to audit Active Directory**

Step 1: Enable auditing on the domain controller

Step 2: Enable events to audit

Step 3: Review and maintain the audit logs

The above steps are a high level overview.

For detailed steps check out these resources:

[https://www.lepide.com/how-to/enable-active-directory-security-auditing.html](https://www.lepide.com/how-to/enable-active-directory-security-auditing.html)

[https://technet.microsoft.com/en-us/library/dd277403.aspx](https://technet.microsoft.com/en-us/library/dd277403.aspx)

## **11\. Track Down the Source of Account Lockouts**

Random account lockouts are not only frustrating to the end users but for helpdesk and the admin who is troubleshooting it.

Knowing how to [track down the source of account lockouts](https://activedirectorypro.com/account-lockout-event-id/) is something all systems admins need to know.

Mobile devices and user accounts set to run a service are the most common reasons for account lockouts.

## **12\. Automate Common Active Directory Tasks**

I would encourage you to automate anything that you can.

Active directory administration involves many routine tasks such as user account creations, modifications, account removals, computer management, security, and so on. Some of these day to day tasks are very time consuming.

Most routine tasks can be automated to make you more efficient at your job.

Here are some common tasks that you should automate:

*   User account creation
    
*   Account removal
    
*   Account modifications
    
*   Group Membership Management
    
*   AD cleanup
    
*   File copies, directory cleanups
    
*   Software deployment
    
*   Windows and 3rd party patches
    
*   Inventory
    
*   Decommission of assets
    

It may be difficult to automate the entire process of some tasks but automate what you can. Automating any part of a repetitive task will save time.

PowerShell is a tool for automating a lot of these tasks.

My team recently automated the whole user account creation process using PowerShell. This involved many steps such as creating the account, adding to groups, creating an office 365 mailbox and creating a personal shared folder.

Creating user accounts has never been easier.

## **13\. Understand LDAP Distinguished Name Paths**

Active Directory is an LDAP (Lightweight directory access protocol) directory service, this means all access to objects occurs through LDAP.

LDAP uses paths to locate objects, a full path of an object is defined by its distinguished name.

When integrating other systems with Active Directory it often requires some LDAP information.

Unfortunately, every program does this differently. Having a little knowledge of distinguished paths will help with integrating other systems with Active Directory.

In most cases you need the distinguished name for the following:

*   Domain name
    
*   User account (That has read access to AD)
    
*   OU where users are located
    

### **Here is how you find the distinguished name**

Step 1: Open ADUC and browse to the account

Step 2: Right click on the account and select properties

Step 3: Select Attribute editor

[<img src="https://activedirectorypro.com/wp-content/uploads/2018/01/mgt-tip12.jpg" alt="" class="wp-image-1245 perfmatters-lazy entered pmloaded" style="box-sizing: border-box; height: auto; max-width: 100%; padding-bottom: 1.5rem; vertical-align: bottom; animation: 500ms pmFadeIn;" width="401" height="283">](https://activedirectorypro.com/wp-content/uploads/2018/01/mgt-tip12.jpg)

Step 4: Find the attribute distinguished Name, then click the view button

[<img src="https://activedirectorypro.com/wp-content/uploads/2018/01/mgt-tip13.jpg" alt="" class="wp-image-1246 perfmatters-lazy entered pmloaded" style="box-sizing: border-box; height: auto; max-width: 100%; padding-bottom: 1.5rem; vertical-align: bottom; animation: 500ms pmFadeIn;" width="404" height="496">](https://activedirectorypro.com/wp-content/uploads/2018/01/mgt-tip13.jpg)

The distinguished name for the user Pam Smith is:

CN=Pam Smith,OU=Accounting,OU=ADPRO Users,DC=ad,DC=activedirectorypro,DC=com

Repeat these steps for any other object that is needed.

## **14\. Use Service Accounts (with least privileges)**

There will be a time when you need to run a task, script or program with a user account (domain or local).

These are referred to as service accounts.

First of all, don’t use a domain admin account or any other user account for these.

Instead, create a new account to use for each specific service.  Your user accounts should have a policy to change their password every x days. If an account is being used and its password changes that service is going to stop working.

Here are some additional tips:

*   Use a descriptive name
    
*   Document the account and add a description in Active Directory
    
*   Create long complex passwords
    
*   Set account to never expire
    
*   Restrict what the account can log into
    
*   Audit and monitor service accounts usage
    
*   When possible create local service accounts instead of domain accounts
    
*   Give the service account the least privileges
    
*   Don’t use one account for multiple services.
    

## **15\. Delegate Tasks When You Can**

No, I’m not talking about delegating rights to helpdesk.

Over the years the responsibilities of System and network administrators have skyrocketed. Some system administrators are responsible for almost everything from the server down to a printer.

To save your sanity be willing to delegate some tasks to others outside of your team.

Look:

I was hesitant about this for years. I worked hard to get everything in order, procedures down, and keep systems running 24/7.

BUT as responsibilities grew it reached a point where productivity was down. New projects were slow to roll out.

To resolve this, I learned that it was OK to delegate tasks outside of my team.

Here are a few tasks that I delegated:

*   Account setups and removal
    
*   Managing Print Servers
    
*   Modifying Account attributes
    
*   Adding and removing domain computers
    
*   Software distribution
    
*   Modifying group members
    
*   Patching workstations
    

Talk to supervisors, talk to other staff members that are willing to take on these roles.

If it doesn’t work out simply revoke their rights and take the task back over (I’ve had to do this a few times).

## **16\. Use Restrictive Groups to Control Local Groups**

Restricted groups allow you to centrally manage who is a member of local groups on workstations and servers.

One common use of this is to add an Active Directory group into the local administrator’s group on all computers. This is an easy way to give your helpdesk or other IT staff admin rights on all the workstations.

It’s also a great way to prevent users or other staff from adding users to the local admin group.

Regular users should not have admin rights, I’ve seen this get way out of control. You can use restricted groups to put a stop to this.

Here is a video tutorial demonstrating adding a domain group into the local administration’s group on domain joined computers.

Here are some good resources and tutorials on using restrictive groups

[https://social.technet.microsoft.com/wiki/contents/articles/20402.active-directory-group-policy-restricted-groups.aspx](https://social.technet.microsoft.com/wiki/contents/articles/20402.active-directory-group-policy-restricted-groups.aspx)

## **17\. Get Your Domain Time Right**

Why should you care about the time?

If the time is not synchronized on all domain controllers, member servers, and machines you will encounter problems.

So how do you set the time correctly?

Here are a few Time sync tips

1 Set your PDC emulator to a time source

w32tm /config /manualpeerlist:timeserver /syncfromflags:manual /reliable:yes /update

All domain join machines will get its time from the PDC.

2 Disable time synchronization between the host system and guest operating systems.

VMs tend to synchronize time with the hosts (VMware or Hyper-v). It’s best practice to disable this so domain joined systems will continue to use the domain hierarchy for time synchronization.

I remember fighting time issues until we figured out the VMware hosts were changing time and getting out of sync or the PDC.

You may read about setting time with Group Policy. Unless you have jacked around with the time settings on computers you don’t need this.

Domain joined computers will by default sync with the PDC.

Additional resources

[https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/dd363553(v=ws.10)  
https://blogs.technet.microsoft.com/nepapfe/2013/03/01/its-simple-time-configuration-in-active-directory/](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/dd363553\(v=ws.10\)￼https://blogs.technet.microsoft.com/nepapfe/2013/03/01/its-simple-time-configuration-in-active-directory/)

## **18\. Document Active Directory & Group Policy**

Active directory is critical to authenticating users, authorized access to many resources such as email, printers, files, remote access, and much more.

So, it would make sense to document Active Directory.

Here are a few things that I’d recommend you document

*   Forest name
    
*   Domain name
    
*   NetBIOS name
    
*   Forest Functional Level
    
*   All domains in the forest
    
*   Global Catalog servers
    
*   FSMO role holders
    
*   Diagram of topology
    
*   Sites and subnets
    
*   Naming convention for all objects
    
*   Group policy objects and description of what they do
    

The Microsoft Active Directory Topology Diagrammer is a handy little tool that helps with documentation.

[https://www.microsoft.com/en-us/download/details.aspx?id=13380](https://www.microsoft.com/en-us/download/details.aspx?id=13380)

## **19\. Properly Implement Group Policies**

I love group policy.

It’s an easy way to control and apply settings on all domain joined computers.

It can even be used to deploy software.

To be successful with group policy you need to follow a few rules.

Here are my group policy tips.

Tip#1 First of all, don’t modify the default domain policy

Tip#2 Do not modify the default domain controller policy

Tip#3 use good OU structure

Tip#4 Do not set Group Policy objects at the domain level

Tip#5 Apply Group Policy at an OU root level

See my complete list of [Group Policy Best Practices](https://activedirectorypro.com/group-policy-best-practices/) 

## **20\. Implement Change Control**

Changes to Active Directory and group policy can disrupt services and affect business operations.

It’s important to put these changes through a change control process to avoid any downtime.

It’s also helpful to document your changes in case something goes wrong, and you need to roll back the changes.

When making critical changes I recommend the following.

*   Who is responsible for the change
    
*   Description of the change
    
*   Time of implementation
    
*   Duration of change
    
*   Expected impact
    
*   Has changed been tested
    
*   Backup procedures
    

I would advise making the change process as simple as possible. Nothing slows progress down more than a bunch of red tape and paperwork.

## **21\. Use Active Directory as Your Centralized Authentication Source for Everything.**

If you’re on-premise or cloud-based applications that support Active Directory Authentication, then use it.

It makes authorizations and access to resources so much easier when it’s controlled centrally by Active Directory.

It’s also a huge plus for the end users, they can authenticate with just one username and password.