---
title: Team Records History
---

{% assign events = site.data.high-school.event-order.records %}
{% assign team-records = site.data.high-school.boys.records.all-time %}

## Team Records

{% include records-history.html
  events = events
  records = team-records %}
