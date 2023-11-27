---
title: Winter Boys BSC Records History
---

{% assign championship-events = site.data.high-school.event-order.championship-records %}
{% assign dual-meet-events = site.data.high-school.event-order.dual-meet-records %}
{% assign conference-records = site.data.high-school.archives.winter.boys.bay-state-conference.overall-records %}
{% assign conference-meet-records = site.data.high-school.archives.winter.boys.bay-state-conference.meet-records %}

## Bay State Conference Records

{% include records-history.html
  events = championship-events
  records = conference-records %}

## Bay State Conference Meet Records

This record history is from results since YYYY.

{% include records-history.html
  events = dual-meet-events
  records = conference-meet-records %}
