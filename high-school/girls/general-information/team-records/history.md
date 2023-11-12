---
title: Records History
---

{% assign championship-events = site.data.high-school.event-order.championship-records | map: "name" %}
{% assign dual-meet-events = site.data.high-school.event-order.dual-meet-records | map: "name" %}
{% assign team-records = site.data.high-school.girls.records.all-time %}
{% assign conference-records = site.data.high-school.archives.fall.girls.records.bay-state-conference.all-time %}
{% assign conference-meet-records = site.data.high-school.archives.fall.girls.records.bay-state-conference.meet %}

## Team Records

{% include records-history.html
  events = championship-events
  records = team-records %}

## Bay State Conference Records

{% include records-history.html
  events = championship-events
  records = conference-records %}

## Bay State Conference Meet Records

This record history is from results since 1990.

{% include records-history.html
  events = dual-meet-events
  records = conference-meet-records %}
