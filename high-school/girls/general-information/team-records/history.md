---
title: Team Records History
---

{% assign championship-events = site.data.high-school.event-order.championship-records %}
{% assign team-records = site.data.high-school.girls.records.all-time %}

## Team Records

{% include records-history.html
  events = championship-events
  records = team-records %}
