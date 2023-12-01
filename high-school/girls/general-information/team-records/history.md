---
title: Team Records History
---

{% assign events = site.data.high-school.event-order.records %}
{% assign records = site.data.high-school.girls.records.all-time %}

## Team Records

{% include records-history.html
  events = events
  records = records %}
