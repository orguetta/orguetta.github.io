---
author: Or Guetta
pubDatetime: 2025-12-14
modDatetime: 2025-12-14
title: "Networking SSL/TLS Best Practices (2025 Edition) "
ogImage: "Networking SSL/TLS Best Practices (2025 Edition) "
featured: false
draft: true
description: "This Tech Paper outlines best practices for configuring SSL/TLS on Citrix NetScaler to achieve an A+ rating on Qualys SSL Labs."
---

# **Overview** 

This Tech Paper aims to convey what someone skilled in NetScaler would configure as a generic implementation to receive an A+ grade at [Qualys SSL Labs](https://www.ssllabs.com/ssltest/). Qualys SSL Labs performs a robust series of tests and provides a scorecard that you can use to improve your configuration. The scan is free and only takes about a minute to complete. 

While an A+ at SSL Labs is a useful benchmark, it may not be suitable for every environment. Organizations should weigh the benefits of advanced configurations against potential impacts on legacy systems and business continuity. A risk-based approach, guided by your security team, ensures configurations meet both technical and operational needs. 

For those seeking to understand the cryptographic principles behind key exchange methods and why specific configurations are recommended, see "[Key Exchange in SSL/TLS: Understanding RSA, Diffie-Hellman, and Elliptic Curves](https://community.citrix.com/tech-zone/build/tech-papers/key-exchange-in-ssl-tls)". This deep dive explains how different key exchange methods work and their security implications. 

Qualys actively develops SSL Labs. Tests will likely change as new protocols are created and vulnerabilities are found. It is good practice to test sites regularly to ensure that any new vulnerabilities are not exposed. 

This paper builds on the “Scoring an A+ at SSL Labs with Citrix NetScaler” published and maintained since 2014.

Note: 

SSL/TLS security is a cornerstone of modern cybersecurity. While achieving an A+ on SSL Labs is a valuable benchmark, organizations must align configurations with their unique risk profiles, business requirements, and compliance obligations. This guide provides actionable steps to optimize your NetScaler deployment while considering the evolving security landscape and operational trade-offs. Talk to your security team about your deployment. Security experts say SSL Labs A+ is a good general target, but it may not fit your organization's needs. 

# **NetScaler Configuration** 

### **Items that need to be validated** 

- **Certificates** - Is the full chain provided and trusted? Is the signature algorithm secure? 
- **Protocols, Keys, and Cipher Support** - Which SSL and TLS versions are supported? Which cipher suites are preferred, and in what order? Do the provided cipher suites support forward secrecy? 
- **TLS Handshake Simulation** - Determines which protocol and cipher are negotiated by several different clients and browsers 
- **Protocol Details** - Is Secure Renegotiation supported? Is strict transport security (HSTS) supported? 
- **Known Vulnerabilities** - Is the server vulnerable to attacks such as POODLE, BEAST, or TLS downgrade? 

Once SSL Labs completes testing, it presents a letter grade along with a point scale for each of 4 categories: 

1.  Certificate 
2.  Protocol Support 
3.  Key Exchange 
4.  Cipher Strength 

Each category receives a numerical score that SSL Labs then averages into a total. Some special cases and configurations that SSL Labs recommends against, such as having SSLv3 enabled, can limit your final grade. You can find complete documentation on how SSL Labs grades servers [here](https://github.com/ssllabs/research/wiki/SSL-Server-Rating-Guide). 

# **Implementation Concerns** 

When implementing this configuration, it's essential to collaborate with your security, DevOps, and compliance teams. This ensures alignment with broader organizational security policies and minimizes potential operational disruptions, such as legacy client compatibility issues. 

For example, enabling modern cipher suites or disabling older protocols might impact legacy systems. Coordinating with relevant teams helps ensure a balance between security and operational needs. 

### **SSL Profiles** 

This article uses SSL Profiles. When first enabled, SSL Profiles set all SSL virtual servers to use the default profile. 

SSL profiles take precedence over global and per virtual server SSL parameters. 

From release 14.1 build 21.x, you can run a script from the NetScaler GUI that parses your configuration and creates custom profiles based on your existing settings. Full details can be found [here](https://docs.netscaler.com/en-us/citrix-adc/current-release/ssl/ssl-profiles/ssl-profile-converter.html). 

SSL Profiles provide a modular approach to managing cryptographic settings. This modularity simplifies updating and testing configurations as new standards, such as post-quantum cryptographic algorithms, become available. 

The recommended configurations in this guide prioritize strong elliptic curve cryptography (e.g., X25519, P-256) and are designed with cryptographic agility in mind. These measures enhance current security and position your deployment for seamless adoption of hybrid or post-quantum algorithms in the future. 

### **Client support** 

Some of the configuration steps in this article can cause connectivity issues with old clients and browsers. If support for modern ciphers is missing, the client cannot connect. While Internet Explorer 8 on Windows XP was the last major example of an OS and browser lacking TLS 1.2 and ECC cipher support entirely, Internet Explorer 11 on Windows 7 and 8.1 (which went end-of-life in January 2023) required configuration changes to enable modern ciphers.  

SSL Labs has a “_Test your browser_” button on its front page to help determine your needs. 

### **Additional Note on Key Exchange in TLS 1.3** 

When configuring cipher suites, it's essential to understand the default key exchange (Kx) methods used by different TLS versions. In TLS 1.3, the default key exchange method is ECDHE, even if no Kx method is explicitly specified in the cipher suite. This ensures modern key exchange methods that provide forward secrecy by default. For a deeper understanding of how ECDHE compares to RSA and traditional DHE, refer to "[Key Exchange in SSL/TLS: Understanding RSA, Diffie-Hellman, and Elliptic Curves](https://community.citrix.com/tech-zone/build/tech-papers/key-exchange-in-ssl-tls)." 

Prioritizing ECDHE key exchanges is particularly effective for appliances equipped with the Lewisburg chip, such as 9100/16000 models, as these chips are optimized for elliptic curve operations. While RSA key exchange methods remain valid for specific use cases or legacy support, they are not utilized by default in TLS 1.3 cipher suites. 

### **Citrix Receiver/Workspace app Cipher Support for Gateway deployments** 

Review the following articles regarding client cipher support when deploying a gateway virtual server for virtual apps and desktops: 

- [CTX250104](https://support.citrix.com/article/CTX250104) for Citrix Workspace app 

- [CTX234227](https://support.citrix.com/article/CTX234227) and [CTX232266](https://support.citrix.com/article/CTX232266) for Citrix Receiver 

# **Basic Steps - GUI** 

Take the following steps to ensure a high score on the SSL Labs test. 

- Ensure that the ADC is running a recent firmware release—14.1 is recommended to take advantage of rate limiting during renegotiation.  
- Ensure that the certificate chain is complete and trusted 
  - Root CAs do not always directly sign certificates. Instead, a root CA often uses an intermediary to sign a certificate. 
  - Install the intermediate certificate on the NetScaler. Link it to the server certificate you bound to the virtual server. 
  - Intermediate certificates are provided by the vendor that provides the server certificate, often in a ‘certificate bundle.’ They can usually be found on the vendor’s public site. 
  - You may need to install and link multiple intermediate certificates. For the server certificate to function, the NetScaler must send all certificates required for the client to have a complete chain. A complete chain ends with a certificate signed by one of the client’s trusted root CAs. 
  - As the client already has the trusted root CA, you don’t need to install and link it on the NetScaler. 
  - To install an intermediate certificate, go to _**Traffic Management > SSL > Certificates > CA Certificates**_ and choose _Install_ 
  - Link an intermediate by selecting the certificate and choosing _link_ from the action menu 
  - If the correct intermediate certificate is installed, it is automatically populated in the linking menu

<img src="https://media.invisioncic.com/m329563/monthly_2025_01/image.png.0090ee12ee73b43968593fc9e6029366.png" alt="image.png" title="" class="ipsImage ipsImage_thumbnailed" style="margin: 0px; padding: 0px; box-sizing: border-box; min-width: 0px; min-height: 0px; border: 0px; display: inline-block; max-width: 100%; height: auto; vertical-align: top; cursor: zoom-in;" width="462" height="392.7">  

<img src="https://media.invisioncic.com/m329563/monthly_2025_01/image.png.45dd00b1cb8ce009d591071502ba663b.png" alt="image.png" title="" class="ipsImage ipsImage_thumbnailed" style="margin: 0px; padding: 0px; box-sizing: border-box; min-width: 0px; min-height: 0px; border: 0px; display: inline-block; max-width: 100%; height: auto; vertical-align: top; cursor: zoom-in;" width="646" height="335.92">  

<img src="https://media.invisioncic.com/m329563/monthly_2025_01/image.png.ee5252896505422764cb14d0bebc7fe0.png" alt="image.png" title="" class="ipsImage ipsImage_thumbnailed" style="margin: 0px; padding: 0px; box-sizing: border-box; min-width: 0px; min-height: 0px; border: 0px; display: inline-block; max-width: 100%; height: auto; vertical-align: top; cursor: zoom-in;" width="438" height="205.86">  

- Create a custom cipher group that provides Forward Secrecy (FS) 
  - Go to _**Traffic Management > SSL > Cipher Groups**_ and choose **Add** 
  - Name the cipher group “SSL_Labs_Cipher_Group_Q1_2025” 
  - Click **Add** , then expand the **ALL** section - select the following cipher suites: 
    - TLS1.3-AES256-GCM-SHA384 
    - TLS1.3-AES128-GCM-SHA256 
    - TLS1.3-CHACHA20-POLY1305-SHA256 
    - TLS1.2-ECDHE-ECDSA-AES256-GCM-SHA384 
    - TLS1.2-ECDHE-ECDSA-AES128-GCM-SHA256 
    - TLS1.2-ECDHE-RSA-AES256-GCM-SHA384 

  - Click the **\>** right arrow to move the ciphers from the _Available_ column to the _Configured_ column 
  - Click **Create**

<img src="https://media.invisioncic.com/m329563/monthly_2025_01/image.png.cdca14ce08ae682b4fda8f766843952e.png" alt="image.png" title="" class="ipsImage ipsImage_thumbnailed" style="margin: 0px; padding: 0px; box-sizing: border-box; min-width: 0px; min-height: 0px; border: 0px; display: inline-block; max-width: 100%; height: auto; vertical-align: top; cursor: zoom-in;" width="790" height="410.8">  

Navigate to **Traffic Management > SSL > Change advanced SSL settings**, scroll down, and select **Enable Default Profile**. 

<img src="https://media.invisioncic.com/m329563/monthly_2025_01/image.png.9637542a9765c3659e549dbd3f1b93fb.png" alt="image.png" title="" class="ipsImage ipsImage_thumbnailed" style="margin: 0px; padding: 0px; box-sizing: border-box; min-width: 0px; min-height: 0px; border: 0px; display: inline-block; max-width: 100%; height: auto; vertical-align: top; cursor: zoom-in;" width="790" height="221.2">

SSL Profiles sets _all_ SSL virtual servers to use the default profile when first enabled. As existing per-virtual-server SSL settings are removed, NetScaler will prompt you to confirm. 

<img src="https://media.invisioncic.com/m329563/monthly_2025_01/image.png.415329aeb61d2c8b9f6d273476177692.png" alt="image.png" title="" class="ipsImage ipsImage_thumbnailed" style="margin: 0px; padding: 0px; box-sizing: border-box; min-width: 0px; min-height: 0px; border: 0px; display: inline-block; max-width: 100%; height: auto; vertical-align: top; cursor: zoom-in;" width="790" height="339.7">  

- Create an SSL Profile 
  - Navigate to **System > Profiles > SSL Profile**, and select **Add**

<img src="https://media.invisioncic.com/m329563/monthly_2025_01/image.png.1d2166265b367a9a898bd2fc1a9ea693.png" alt="image.png" title="" class="ipsImage ipsImage_thumbnailed" style="margin: 0px; padding: 0px; box-sizing: border-box; min-width: 0px; min-height: 0px; border: 0px; display: inline-block; max-width: 100%; height: auto; vertical-align: top; cursor: zoom-in;" width="760" height="380">  

- Name the profile “SSL_Labs_Profile_Q1_2025” 
  - Scroll to **Deny SSL Renegotiation** and select **NONSECURE** to allow only clients that support RFC 5746 to renegotiate 
  - Scroll to **Maximum Renegotiation Rate** and set this to 100 or a value suitable for your environment 

Note:

The number of client-initiated SSL renegotiations expected within your environment will depend on the specific use case. While modern web applications rarely rely on SSL renegotiations due to their overhead and potential security risks, specific specialized or legacy systems may still utilize them for tasks such as client certificate re-authentication or renewing session keys in long-lived connections. 

- Scroll to **OCSP Stapling** and tick this option 
  - Scroll to **HSTS**, tick **HSTS**, and specify a **Max Age** of 157680000 seconds 
  - Scroll to **Protocol** and select only TLSv12 and TLSv13 

<img src="https://media.invisioncic.com/m329563/monthly_2025_01/image.png.6cc4933b61df563268f3b4339a58e586.png" alt="image.png" title="" class="ipsImage ipsImage_thumbnailed" style="margin: 0px; padding: 0px; box-sizing: border-box; min-width: 0px; min-height: 0px; border: 0px; display: inline-block; max-width: 100%; height: auto; vertical-align: top; cursor: zoom-in;" width="790" height="363.4">  

- Scroll to the end of the form and select **OK** 
  - Scroll to **SSL Ciphers**, select the pencil icon to edit, then click **Remove All** 
  - Click **Add** and add the cipher group we created earlier  
  - Click **OK** once the SSL Ciphers are added 

<img src="https://media.invisioncic.com/m329563/monthly_2025_01/image.png.b578b15f7b45c4c5d0fadce64aac7f57.png" alt="image.png" title="" class="ipsImage ipsImage_thumbnailed" style="margin: 0px; padding: 0px; box-sizing: border-box; min-width: 0px; min-height: 0px; border: 0px; display: inline-block; max-width: 100%; height: auto; vertical-align: top; cursor: zoom-in;" width="773" height="347.85">  

- Scroll to **ECC Curve** and click the current number of ECC Curves

<img src="https://media.invisioncic.com/m329563/monthly_2025_01/image.png.8ecf459ba845e78ee049f3c4a8485281.png" alt="image.png" title="" class="ipsImage ipsImage_thumbnailed" style="margin: 0px; padding: 0px; box-sizing: border-box; min-width: 0px; min-height: 0px; border: 0px; display: inline-block; max-width: 100%; height: auto; vertical-align: top; cursor: zoom-in;" width="500" height="100">  

- Tick P_224 and click **Unbind**  
  - Click **Close** 

[<img src="https://media.invisioncic.com/m329563/monthly_2025_01/image.png.4e8aa830cfa44003a3de3bef121c8fc1.png" alt="image.png" class="ipsImage ipsImage_thumbnailed" style="margin: 0px; padding: 0px; box-sizing: border-box; min-width: 0px; min-height: 0px; border: 0px; display: inline-block; max-width: 100%; height: auto; vertical-align: top;" width="1000" height="500">](https://media.invisioncic.com/m329563/monthly_2025_01/image.png.4e8aa830cfa44003a3de3bef121c8fc1.png)  

Note:

While the P-224 curve does not impact the SSL Labs score, security frameworks such as NIST and PCI DSS recommend a minimum security strength of 128 bits. The P-224 curve, with its 112-bit security level, does not meet this standard and is, therefore, unsuitable for most modern cryptographic applications. Additionally, P-224 offers no significant performance benefits over stronger curves like X25519 or P-256, making it an outdated choice for contemporary use.

- Scroll to the end of the form and select **Done** 
- Bind the SSL Profile to the SSL virtual server 
- On the selected virtual server, select the pencil icon to edit the bound **SSL Profile.** 
- Select the SSL Profile we created from the drop-down list 
- Click OK

# **Basic Steps - CLI** 

Take the following steps to ensure a high score on the SSL Labs test. 

The SSL virtual server's name in the CLI examples below is **Ex-vServer** . You can replace it with the name of the SSL virtual server in your environment. 

- Create a custom cipher group that prefers ECDHE and ECDSA cipher suites 

```
add ssl cipher SSL_Labs_Cipher_Group_Q1_2025   

bind ssl cipher SSL_Labs_Cipher_Group_Q1_2025 -cipherName TLS1.3-AES256-GCM-SHA384 

bind ssl cipher SSL_Labs_Cipher_Group_Q1_2025 -cipherName TLS1.3-AES128-GCM-SHA256 

bind ssl cipher SSL_Labs_Cipher_Group_Q1_2025 -cipherName TLS1.3-CHACHA20-POLY1305-SHA256 

bind ssl cipher SSL_Labs_Cipher_Group_Q1_2025 -cipherName TLS1.2-ECDHE-ECDSA-AES256-GCM-SHA384 

bind ssl cipher SSL_Labs_Cipher_Group_Q1_2025 -cipherName TLS1.2-ECDHE-ECDSA-AES128-GCM-SHA256 

bind ssl cipher SSL_Labs_Cipher_Group_Q1_2025 -cipherName TLS1.2-ECDHE-RSA-AES256-GCM-SHA384 
```

- Enable SSL Profiles 

```
set ssl parameter -defaultProfile ENABLED 
```

- Create an SSL Profile 

```
add ssl profile SSL_Labs_Profile_Q1_2025 -tls1 DISABLED -tls11 DISABLED -tls12 ENABLED -tls13 ENABLED -ocspStapling ENABLED -denySSLReneg NONSECURE -HSTS ENABLE -maxage 157680000
```

- Unbind the default cipher group from the SSL Profile and bind the custom group 

```
unbind ssl profile SSL_Labs_Profile_Q1_2025 -cipherName DEFAULT 

bind ssl profile SSL_Labs_Profile_Q1_2025 -cipherName SSL_Labs_Cipher_Group_Q1_2025 
```

- Throttle SSL Renegotiations  

```
set ssl profile SSL_Labs_Profile_Q1_2025 -maxrenegRate 100 
```

Note:

The number of client-initiated SSL renegotiations expected within your environment will depend on the specific use case. While modern web applications rarely rely on SSL renegotiations due to their overhead and potential security risks, certain specialized or legacy systems may still utilize them for tasks such as client certificate re-authentication or renewing session keys in long-lived connections. 

- Unbind the default cipher group from the SSL Profile and bind the custom group 

```
unbind ssl profile SSL_Labs_Profile_Q1_2025 -cipherName DEFAULT 

bind ssl profile SSL_Labs_Profile_Q1_2025 -cipherName SSL_Labs_Cipher_Group_Q1_2025 
```

- Bind Trusted Curves 

```
unbind ssl profile SSL_Labs_Profile_Q1_2025 -eccCurveName ALL 

bind ssl profile SSL_Labs_Profile_Q1_2025 -eccCurveName X25519 

bind ssl profile SSL_Labs_Profile_Q1_2025 -eccCurveName P256 

bind ssl profile SSL_Labs_Profile_Q1_2025 -eccCurveName P384  

bind ssl profile SSL_Labs_Profile_Q1_2025 -eccCurveName P521 
```

Note:

While the P-224 curve does not impact the SSL Labs score, security frameworks such as NIST and PCI DSS recommend a minimum security strength of 128 bits. The P-224 curve, with its 112-bit security level, does not meet this standard and is, therefore, unsuitable for most modern cryptographic applications. Additionally, P-224 offers no significant performance benefits over stronger curves like X25519 or P-256, making it an outdated choice for contemporary use.

- Bind the SSL Profile to the SSL virtual server 

```
set ssl vserver "Ex-vServer" -sslProfile SSL_Labs_Profile_Q1_2025 
```

# **Ongoing Maintenance and Governance** 

This configuration strengthens your SSL/TLS posture and supports broader organizational goals such as compliance, customer trust, and operational resilience. By embedding these best practices into your security strategy, you ensure your systems are robust against current and emerging threats. 

Maintaining secure SSL/TLS configurations requires ongoing governance. Test configurations regularly with tools like SSL Labs and automate reviews where possible. Establish clear documentation and processes to ensure compliance with evolving standards and organizational policies. 

Regular updates and reviews are essential for adapting to new vulnerabilities, protocols, and organizational needs and ensuring that your environment remains secure and compliant over time. 

# **Legacy client support** 

The ECDHE ciphers in this guide replace the older, slower DHE ciphers. If you have legacy clients you cannot upgrade, you may have to enable DHE. 

We propose including a secure DHE cipher with modern features (GCM mode, SHA384). However, if your client is modern enough to support DHE with GCM mode, it should also be able to support the ECHDE ciphers. For this reason, if you must use a DHE cipher, you may need to work with your security team to consider the trade-off between supporting legacy clients and using older, less secure ciphers.  

**Enable DHE cipher suites in the GUI** 

- Go **to _Traffic Management > SSL_** and **select Create Diffie-Hellman (DH) key** 

<img src="https://media.invisioncic.com/m329563/monthly_2025_01/image.png.fc7773bc22293e84a43fd372319030ca.png" alt="image.png" title="" class="ipsImage ipsImage_thumbnailed" style="margin: 0px; padding: 0px; box-sizing: border-box; min-width: 0px; min-height: 0px; border: 0px; display: inline-block; max-width: 100%; height: auto; vertical-align: top; cursor: zoom-in;" width="383" height="268.1">  

Note:

Despite the name, this is not a Diffie-Hellman (DH) key in the traditional sense. Instead, it represents long-term DH group parameters, which the NetScaler will use alongside a newly generated ephemeral exponent each time it negotiates a key exchange. While the interface labels it as a "key," this is shorthand for the DH parameter file. When creating the “key,” the next screen will confirm that you are generating these group parameters, not a static DH key. 

- Name the Diffie-Hellman key “DH_Key_Name_Here.key” 
- Enter the parameter size (Bits). It must be between 512 and 2048 
- Choose the Diffie-Hellman generator (2 or 5) 
- Select **Create** . Depending on the key size selected, this could take quite some time to complete 

<img src="https://media.invisioncic.com/m329563/monthly_2025_01/image.png.89d6d7cdf4dfcd3f4eb71346792a4882.png" alt="image.png" title="" class="ipsImage ipsImage_thumbnailed" style="margin: 0px; padding: 0px; box-sizing: border-box; min-width: 0px; min-height: 0px; border: 0px; display: inline-block; max-width: 100%; height: auto; vertical-align: top; cursor: zoom-in;" width="534" height="347.1">  

Note:

Do not navigate past this screen until it is complete.  

- Navigate to **System > Profiles > SSL Profile** 

- Select the **SSL_Labs_Profile_Q1_2025** profile and choose **Edit** 

- Select the pencil icon 

- Scroll down to the **Enable DH Param** check box and select it 

- Choose the DH key you just created

<img src="https://media.invisioncic.com/m329563/monthly_2025_01/image.png.cb9f0ca37cf4ea25d0519eb6af32c0eb.png" alt="image.png" title="" class="ipsImage ipsImage_thumbnailed" style="margin: 0px; padding: 0px; box-sizing: border-box; min-width: 0px; min-height: 0px; border: 0px; display: inline-block; max-width: 100%; height: auto; vertical-align: top; cursor: zoom-in;" width="407" height="288.97">  

- Scroll down and select **OK**
- Bind a DHE cipher suite to the cipher group that we created earlier 
- Navigate to **Traffic Management > SSL > Cipher Groups** 
- Select the TLS1.2-DHE-RSA-AES256-GCM-SHA384 cipher 
- Click the arrow to add it to the Cipher Group 

<img src="https://media.invisioncic.com/m329563/monthly_2025_01/image.png.c62a2174840e6562de52d25a396bdf99.png" alt="image.png" title="" class="ipsImage ipsImage_thumbnailed" style="margin: 0px; padding: 0px; box-sizing: border-box; min-width: 0px; min-height: 0px; border: 0px; display: inline-block; max-width: 100%; height: auto; vertical-align: top; cursor: zoom-in;" width="783" height="665.55">  

**Enable DHE cipher suites in the CLI** 

- Create and bind a DH key to the SSL Profile (CLI) 

```
create ssl dhparam DH_Key_Name_Here.key 2048 -gen 2 

set ssl profile SSL_Labs_Profile_Q1_2025 -dh ENABLED -dhFile DH_Key_Name_Here.key 
```

- Bind a DHE cipher suite to the cipher group that we created earlier 

```
bind ssl cipher SSL_Labs_Cipher_Group_Q1_2025 -cipherName TLS1.2-DHE-RSA-AES256-GCM-SHA384 
```

### **Firmware Notes** 

- **TLS 1.2 as Default**   
  Enabled by default starting with firmware version **10.5 build 57**. Earlier builds supported TLS 1.2 only on appliances with dedicated SSL hardware. 
- **TLS 1.3 Support**   
  Introduced in **12.1 build 49.23**. To enable, configure in SSL parameters or enhanced SSL profiles. Requires binding TLS 1.3 ciphers, including AES-GCM and ChaCha20-Poly1305. Note: Legacy SSL profiles do not support TLS 1.3. 
- **HSTS (HTTP Strict Transport Security)**   
  Added in **12.0 build 35**. Earlier builds required a rewrite policy to insert the HSTS header. Using both methods simultaneously is not permitted. 
- **ECC Certificate Support**   
  Expanded to VPX appliances in **12.0 build 57**. Previously, only appliances with dedicated SSL hardware supported ECC certificates. 
- **TLS 1.3 Hardware Acceleration**   
  Introduced **in 13.0 build 71**, significantly improving cryptographic performance for TLS 1.3. 
- **Mitigating CBC Vulnerabilities**   
  Cipher updates removed known weak CBC ciphers (e.g., **0xc028 and 0x39**) to address modern cryptographic risks. Disabling CBC-based cipher suites is recommended for compliance. 
- The Zombie POODLE vulnerability was addressed in builds **12.1 build 50.31, 12.0 build 60.9, 11.1 build 60.14, 11.0 build 72.17, and 10.5 build 69.5**. This vulnerability only affects MPX\\SDX appliances with Nitrox SSL hardware. MPX\\SDX appliances with Coleto Creek are not vulnerable. Disabling CBC-based cipher suites also mitigates this vulnerability. [See CTX article for more information](https://support.citrix.com/article/CTX240139) 
- The ROBOT vulnerability was addressed in builds **12.0 build 53, 11.1 build 56, 11.0 build 71, and 10.5 build 67** - [more details are available here](https://support.citrix.com/article/CTX230238) 
- Support for Heal-the-BREACH (HTB) was added in **14.0 build 38.53** but is not included within this article as compression is disabled by default - [more details are available here](https://docs.netscaler.com/en-us/citrix-adc/current-release/optimization/http-compression.html) 
- **Forward Secrecy with Modern Curves**   
  **X25519 curve** added in **14.1 build 12.x** for front-end TLS 1.3 support. **Backend support** for **TLS 1.2 and TLS 1.3** introduced in **14.1 build 25.x**. **P-256**, **P-384**, and **P-521** remain supported for compatibility. 
- **OCSP Stapling**   
  Introduced in **12.1 build 55.18**. Updated in **14.1 build 38.53** to include the OCSP status regardless of whether the status is cached.
