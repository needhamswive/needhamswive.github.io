---
title: Team Records History
---

{% assign championship-events = site.data.high-school.event-order.championship-records %}
{% assign dual-meet-events = site.data.high-school.event-order.dual-meet-records %}
{% assign team-records = site.data.high-school.girls.records.all-time %}
{% assign conference-records = site.data.high-school.archives.fall.girls.bay-state-conference.overall-records %}
{% assign conference-meet-records = site.data.high-school.archives.fall.girls.bay-state-conference.meet-records %}

## Team Records

{% include records-history.html
  events = championship-events
  records = team-records %}
