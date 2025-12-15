---
author: Robert Allen
pubDatetime: 2025-12-15
modDatetime: 2025-12-15
title: Create Managed Service Accounts in Active Directory
ogImage: Create Managed Service Accounts in Active Directory
featured: false
draft: true
description: "Learn how to create and use Managed Service Accounts (MSAs) in Active Directory for enhanced security and simplified password management. This step-by-step guide covers the creation, association, and installation of MSAs."
---

In this article, I’ll show you how to install and use Managed Service Accounts in Active Directory.

## **Managed Service Accounts (MSAs) vs Regular Service Accounts**

- **Managed Service Accounts (MSAs)**
  - These are a special type of Active Directory accounts designed specifically to run services, applications, or tasks on Windows server.
  - Passwords are automatically generated and rotated by default every 30 days.
  - Can only be used on one computer unless group managed service accounts (gMSAs) is configured.
  - Much more secure by default compared to regular service accounts.

- **Regular Service Accounts**
  - These are regular Active Directory user accounts that are used to run a service or scheduled task
  - You set and manage the password manually
  - Can be used on multiple computers by default
  - Passwords are often set to never expire and often never changed (increase security risk)
  - Often poorly managed and difficult to track where they’re in use

- **Group Managed Service Accounts (gMSAs)**
  - gMSAs extend the functionality of MSAs by allowing multiple computers to use the same managed service account.

## **Comparison Table**

| **Feature**                       | **Managed Service Account** | **Regular Service Account** |
| --------------------------------- | --------------------------- | --------------------------- |
| Password Management               | Automatic                   | Manual                      |
| Can be used on multiple computers | No, requires gMSA           | Yes                         |
| Created via ADUC                  | No, Powershell only         | Yes                         |
| Interactive Logon Allowed         | No                          | Yes                         |
| Track where used                  | Yes                         | No                          |
| Security                          | High                        | Low                         |

## **Requirements**

- Domain Controller running Windows Server 2008 R2 or later
- Active Directory module for Windows PowerShell
- The computer using the MSA must be a domain joined computer

## **How to create and Use Managed Service Accounts (MSAs)**

### **Step 1. Create KDS Root Key**

Domain controllers require a root key that is used to generate unique passwords for the service accounts. It’s used by the Key Distribution Service (KDS) on domain controllers to create and keep the same passwords for gMSAs and MSAs across the network.

On your domain controller, open powershell and run the following command.

**Note:** It can take up to 10 hours for the key to replicate to all domain controllers

```
Add-KdsRootKey –EffectiveImmediately
```

<img src="https://activedirectorypro.com/wp-content/uploads/2025/10/managed-service-accounts-active-directory-1.webp" alt="Add-KdsRootKey" class="wp-image-59661" style="box-sizing: border-box; height: auto; max-width: 100%; padding-bottom: 1.5rem; vertical-align: bottom;" width="510" height="163">

Run the below command to check that the KDS root key has been successfully created.

```
Get-KdsRootKey
```

<img src="https://activedirectorypro.com/wp-content/uploads/2025/10/managed-service-accounts-active-directory-2.webp" alt="Get-KdsRootKey" class="wp-image-59662 perfmatters-lazy entered pmloaded" style="box-sizing: border-box; height: auto; max-width: 100%; padding-bottom: 1.5rem; vertical-align: bottom; animation: 500ms pmFadeIn;" width="1013" height="294">

### **Step 2. Create a Managed Service Account**

To create a managed service account run the following command. Replace **test** with a unique name for the account. Replace **dc1** with the hostname of your domain controller.

```
New-ADServiceAccount -Name test -DNSHostName dc1
```

If you get the error “New-ADServiceAccount: Key does not exist” it means that the Key Distribution Service (KDS) in your domain does not yet have a root key created or available for use. You will need to wait up to 10 hours for the key to replicate to all your DCs.

<img src="https://activedirectorypro.com/wp-content/uploads/2025/10/managed-service-accounts-active-directory-3.webp" alt="New-ADServiceAccount" class="wp-image-59667 perfmatters-lazy entered pmloaded" style="box-sizing: border-box; height: auto; max-width: 100%; padding-bottom: 1.5rem; vertical-align: bottom; animation: 500ms pmFadeIn;" width="664" height="146">

If the command works, it will return nothing and take you back to the prompt. The managed service accounts are created in the following path:

**CN=Managed Service Accounts,DC=yourdomain,DC=com**

<img src="https://activedirectorypro.com/wp-content/uploads/2025/10/managed-service-accounts-ad-4.webp" alt="managed service accounts location" class="wp-image-59674 perfmatters-lazy entered pmloaded" style="box-sizing: border-box; height: auto; max-width: 100%; padding-bottom: 1.5rem; vertical-align: bottom; animation: 500ms pmFadeIn;" width="457" height="425">

You can also run the following command to display details about the service account. Replace <name> with the name of the service account you created.

```
get-adserviceaccount <name>
```

<img src="https://activedirectorypro.com/wp-content/uploads/2025/10/managed-service-accounts-ad-5-1024x250.webp" alt="get-adserviceaccount" class="wp-image-59676 perfmatters-lazy entered pmloaded" style="box-sizing: border-box; height: auto; max-width: 100%; padding-bottom: 1.5rem; vertical-align: bottom; animation: 500ms pmFadeIn;" width="1024" height="250">

### **Step 3. Associate the new Service Account with a computer in Active Directory**

You must specify which domain computer the service account can run on. Use the below command to associate the computer with a service account.

```
add-adcomputerserviceaccount -identity <computer name> -serviceaccount <service account name>
```

<img src="https://activedirectorypro.com/wp-content/uploads/2025/10/managed-service-accounts-ad-6.webp" alt="add-adcomputerserviceaccount" class="wp-image-59679 perfmatters-lazy entered pmloaded" style="box-sizing: border-box; height: auto; max-width: 100%; padding-bottom: 1.5rem; vertical-align: bottom; animation: 500ms pmFadeIn;" width="845" height="157">

### **Step 4. Install MSA on the Computer**

Log into the computer you associated the service account to and run the following command.

```
Install-ADServiceAccount -Identity <service account name>
```

If you get this error “Install-ADServiceAccount: Cannot install service account. Error Message: ‘{Access Denied} A process has requested access to an object, but has not been granted those access rights.’.”

This means the MSA is not linked to the computer. Run the below command to fix it.

```
Set-ADServiceAccount <service account name> -PrincipalsAllowedToRetrieveManagedPassword <computer name>
```

<img src="https://activedirectorypro.com/wp-content/uploads/2025/10/managed-service-accounts-ad-7.webp" alt="Set-ADServiceAccount " class="wp-image-59683 perfmatters-lazy entered pmloaded" style="box-sizing: border-box; height: auto; max-width: 100%; padding-bottom: 1.5rem; vertical-align: bottom; animation: 500ms pmFadeIn;" width="929" height="131">

You can verify the permissions with this command. The computer should be listed in the PrincipalsAllowedToRetrieveManagedPassword property.

```
Get-ADServiceAccount <service account name> -Property PrincipalsAllowedToRetrieveManagedPassword
```

<img src="https://activedirectorypro.com/wp-content/uploads/2025/10/managed-service-accounts-ad-8-1024x286.webp" alt="PrincipalsAllowedToRetrieveManagedPassword" class="wp-image-59684 perfmatters-lazy entered pmloaded" style="box-sizing: border-box; height: auto; max-width: 100%; padding-bottom: 1.5rem; vertical-align: bottom; animation: 500ms pmFadeIn;" width="1024" height="286">

### **Step 5. Set Windows Service to use the new Managed Service Account**

Open Windows Services, find and edit the service that you want to use the new managed service account. Click on “Log On” and then select the account. Leave the password field blank as this will be managed by the service account.

<img src="https://activedirectorypro.com/wp-content/uploads/2025/10/managed-service-accounts-ad-9.webp" alt="windows service log on" class="wp-image-59688 perfmatters-lazy entered pmloaded" style="box-sizing: border-box; height: auto; max-width: 100%; padding-bottom: 1.5rem; vertical-align: bottom; animation: 500ms pmFadeIn;" width="413" height="472">

Click Apply and OK. You may need to stop and start the service for it to take effect.

Thats it!

The Managed service accounts password will be automatically changed and rotated every 30 days. Remember if you want to use the same managed service account on multiple computers you will need to use Group Managed Service Accounts which I’ll cover in a separate article.
