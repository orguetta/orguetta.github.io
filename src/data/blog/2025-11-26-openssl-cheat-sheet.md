---
author: Or Guetta
pubDatetime: 2025-11-26
modDatetime: 2025-11-26
title: OpenSSL Cheat Sheet
ogImage: OpenSSL Cheat Sheet
slug: openssl-cheat-sheet
featured: false
draft: false
description: OpenSSL Cheat Sheet
---
# **OpenSSL Cheat Sheet**

**Verify if a private key matches a certificate**

```
openssl x509 -noout -modulus -in cert.crt | openssl md5
openssl rsa -noout -modulus -in privkey.txt | openssl md5
```

**Extract .crt and .key from .pfx**

```
openssl pkcs12 -in yourfile.pfx -nocerts -out drlive.key
openssl pkcs12 -in yourfile.pfx -clcerts -nokeys -out drlive.crt
openssl rsa -in drlive.key -out drlive-decrypted.key
```

**Convert PEM and key to PFX**

```
openssl pkcs12 -inkey private.key -in public.pem -export -out yourfile.pfx
```

**Convert .pfx to .pem**

```
openssl rsa -in keyfile-encrypted.key -outform PEM -out keyfile-encrypted-pem.key
```

**Generate a 2048-bit private key**

```
openssl genrsa -out server.key 2048
```

**Generate CSR**

```
openssl req -new -key server.key -out server.csr
```

**Sign certificate with CSR (self-signed)**

```
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
```

**Show CSR details**

```
openssl req -text -noout -in server.csr
```

**Show certificate details**

```
openssl x509 -text -noout -in server.crt
```

**Get SHA256 fingerprint**

```
openssl x509 -in server.crt -noout -sha256 -fingerprint
```

**Check certificate expiration**

```
echo | openssl s_client -connect <host>:443 2>/dev/null | \
awk '/-----BEGIN/,/END CERTIFICATE-----/' | \
openssl x509 -noout -enddate
```

**Generate Diffie-Hellman parameters**

```
openssl dhparam -outform PEM -out dhparams.pem 2048
```

**Test an HTTPS server**

```
openssl s_client -connect 10.240.2.130:433
```

**High-quality AES-256 encryption**

```
openssl enc -e -aes-256-cbc -salt -pbkdf2 -iter 1000000 -md sha512 -base64 \
  -in somefile -out somefile.enc

openssl enc -d -aes-256-cbc -salt -pbkdf2 -iter 1000000 -md sha512 -base64 \
  -in somefile.enc -out somefile
```

**Create root CA**

```
openssl req -x509 -newkey rsa:4096 -subj "/C=XX/ST=XX/L=XX/O=XX/OU=REDDIT/CN=CA" \
  -keyout ca.key -out ca.crt -days 3650 -nodes -sha256
```

**Create certificate signed by CA**

```
openssl req -x509 -newkey rsa:4096 -subj "/C=XX/ST=XX/L=XX/O=XX/OU=REDDIT/CN=OSCARHULT" \
  -CA ca.crt -CAkey ca.key -keyout oscarhult.key -out oscarhult.crt \
  -days 3650 -nodes -sha256
```

* * *

**Certificate management**

```
openssl req -new -key <key> -out <csr>
openssl req -x509 -key <key> -in <csr> -out <cert>
openssl x509 -in <cert> -text -noout
openssl x509 -in <cert> -pubkey -noout
openssl x509 -in <cert> -fingerprint -noout
```

**Key management**

```
openssl genrsa -out <key> 2048
openssl rsa -in <key> -pubout -out <pub_key>
openssl rsa -in <key> -out <new_key>
openssl rand -hex 16
```

**Certificate signing**

```
openssl ca -in <csr> -out <cert>
openssl ca -config <config> -in <csr> -out <cert>
openssl verify -CAfile <ca> <cert>
```

**Certificate conversion**

```
openssl pkcs12 -export -in <cert> -inkey <key> -out <file>
openssl pkcs12 -in <file> -out <cert> -nodes
openssl x509 -in <cert> -outform DER -out <file>
openssl x509 -in <cert> -outform PEM -out <file>
```

**Encryption and decryption**

```
openssl enc -aes-256-cbc -salt -in <file> -out <encrypted_file>
openssl enc -d -aes-256-cbc -in <file> -out <decrypted_file>
openssl dgst -sha256 FILE
openssl dgst -md5 FILE
```

**Miscellaneous**

```
openssl version
openssl s_client -connect <host>:<port>
openssl s_server -accept <port> -cert <cert> -key <key>
openssl speed
openssl ciphers -v
openssl rand -base64 32
openssl rand -base64 -out <file> 32
openssl rand -out <file> 32
openssl rand -hex 32
```