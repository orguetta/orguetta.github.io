---
author: Or Guetta
pubDatetime: 2026-08-06
modDatetime: 2026-08-06
title: Should You Block ICMP? The Wrong Question to Ask
slug: 2026-08-06-should-you-block-icmp
featured: false
draft: false
description: A pragmatic look at ICMP filtering. Why blocking all ICMP causes silent network failures, breaks PMTUD, and what you should do instead.
---

מנהלי רשת רבים חושבים ש-ICMP הוא סיכון אבטחי שצריך לחסום באופן גורף בפיירוול. זו טעות נפוצה שמובילה לתקלות מוזרות שקשה מאוד לאבחן. 

הבעיה היא לא עצם קיומו של ICMP, אלא חסימה עיוורת בלי להבין מה הפרוטוקול עושה מאחורי הקלעים.

---

## 1. הבעיה המרכזית: Path MTU Discovery (PMTUD)
הסיבה הקריטית ביותר לא לחסום ICMP קשורה ל-TCP ולגודל החבילות. 

כאשר שני מארחים מתקשרים ומעבירים נתונים, הם צריכים להתאים את ה-**Maximum Segment Size (MSS)** ל-**MTU** הקטן ביותר במסלול הרשת ביניהם. 
* ב-IPv4 (כאשר דגל DF מופעל) וב-IPv6 (שבו נתבים לא עושים Fragmentation), נתב שנתקל בחבילה גדולה מדי יזרוק אותה וישלח חזרה הודעת ICMP מסוג **Fragmentation Needed / Packet Too Big**.
* אם תחסמו את הודעות ה-ICMP הללו בפיירוול, השולח לא ידע שהחבילה הייתה גדולה מדי. התוצאה: **TCP Black Hole**. לחיצת היד (Handshake) תעבור בהצלחה כי החבילות קטנות, אבל ברגע שיעברו נתונים אמיתיים – הסשן יתקע לחלוטין.

## 2. מה לגבי Ping (Echo Request / Reply)?
כולנו מכירים את הכלי הזה. כן, הוא הופך את המארח שלכם למזוהה ברשת, אבל שרת הווב שלכם כבר האזין בפורט 80 או 443 בכל מקרה. 

אפשר לחסום פינגים בגבול ה-DMZ החיצוני אם ממש חייבים, אבל חסימה גורפת *בתוך* הרשת הפנימית רק מתסכלת את צוות ה-IT בזמן אבחון תקלות ("Can you ping your default gateway?").

## 3. Time Exceeded ו-Traceroute
רוצים לאבחן נתיבי רשת עם `traceroute`? המנגנון הזה שולח חבילות עם TTL עולה ומסתמך על הודעות ICMP Time Exceeded כדי למצוא כל הوب בדרך. חסימת ICMP הופכת את ה-Traceroute לשחור מוחלט ומקשה על פתרון בעיות ניתוב.

## 4. IPv6 תלוי ב-ICMP
בניגוד ל-IPv4 שהשתמש ב-ARP, ב-IPv6 פרוטוקול ה-**Neighbour Discovery Protocol (NDP)** וכן **SLAAC** (הקצאת כתובות אוטומטית) יושבים ישירות על גבי ICMPv6. אם תחסמו ICMP ברשת ה-IPv6 הפנימית שלכם – הרשת פשוט תפסיק לתפקד.

---

## השורה התחתונה
אל תחסמו ICMP בצורה עיוורת. 

1. **תנו לזה לעבור:** אפשרו הודעות קריטיות כמו Fragmentation Needed ו-Time Exceeded, לצד תעבורת NDP ב-IPv6.
2. **הפעילו Rate Limiting:** אל תאפשרו הצפת פינגים בלתי מבוקרת (Ping Floods) שתטוחן את ה-CPU של הנתבים, אבל שמרו על הפונקציונליות. 
3. **אל תהיו קיצוניים:** אבטחה לא שווה חסימת כל מה שאתם לא מבינים.
