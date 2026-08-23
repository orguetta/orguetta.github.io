---
author: Or Guetta
pubDatetime: 2025-11-26
modDatetime: 2025-11-26
title: Open Source Library Scanning Tools You Can Use Today for Free
ogImage: Open Source Library Scanning Tools You Can Use Today for Free
featured: false
draft: false
description: This note introduces useful tools that scan the libraries your
  developers use and alert you if a vulnerability is found in a library or one
  of its dependent libraries.
---

This note introduces useful tools that scan the libraries your developers use and alert you if a vulnerability is found in a library or one of its dependent libraries.

1.  **OWASP Dependency Check**

    An open source tool that scans libraries for several languages like Java, JS, and Python. It can run offline and integrate with CI/CD.

    [https://owasp.org/www-project-dependency-check/](https://owasp.org/www-project-dependency-check/)

2.  **GitHub Dependabot**

    A GitHub tool that scans your repositories on every commit. You can also set it to open automatic pull requests that fix vulnerabilities.

    [https://github.blog/2020-06-01-keep-all-your-packages-up-to-date-with-dependabot/](https://github.blog/2020-06-01-keep-all-your-packages-up-to-date-with-dependabot/)

3.  **npm audit and npm audit fix**

    If you write JS code, run npm audit before committing. It gives you a full list of vulnerabilities in your libraries. You can apply automatic fixes for minor updates with npm audit fix.

    [https://docs.npmjs.com/cli/v8/commands/npm-audit](https://docs.npmjs.com/cli/v8/commands/npm-audit)

4.  **Snyk and Whitesource Bolt**

    These tools provide quick value with some limits on free usage.

    Snyk lets you create a free account, connect your Git provider, and scan selected projects. It supports many languages and has a clear web interface.

    [https://app.snyk.io/login](https://app.snyk.io/login)

Whitesource Bolt connects to GitHub or Azure. It runs checks after each commit. The free tier allows up to 5 scans per day.

[https://www.whitesourcesoftware.com/free-developer-tools/bolt/](https://www.whitesourcesoftware.com/free-developer-tools/bolt/)

For more tools, check the OWASP SCA list:

[https://owasp.org/www-community/Component_Analysis](https://owasp.org/www-community/Component_Analysis)
