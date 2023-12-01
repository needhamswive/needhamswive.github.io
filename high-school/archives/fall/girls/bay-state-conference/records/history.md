---
title: Fall Girls BSC Records History
---

{% assign records-events = site.data.high-school.event-order.records %}
{% assign dual-meet-events = site.data.high-school.event-order.dual-meet %}
{% assign conference-records = site.data.high-school.archives.fall.girls.bay-state-conference.overall-records %}
{% assign conference-meet-records = site.data.high-school.archives.fall.girls.bay-state-conference.meet-records %}

## Bay State Conference Records

{% include records-history.html
  events = records-events
  records = conference-records %}

## Bay State Conference Meet Records

This record history is from results since 1990.

{% include records-history.html
  events = dual-meet-events
  records = conference-meet-records %}
