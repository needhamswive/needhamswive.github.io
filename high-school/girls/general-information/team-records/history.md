---
title: Records History
---

{% assign championship-events = site.data.high-school.records-championship-event-order | map: "name" %}
{% assign dual-meet-events = site.data.high-school.records-dual-meet-event-order | map: "name" %}
{% assign team-records = site.data.high-school.fall.girls.records.needham.all-time %}
{% assign conference-records = site.data.high-school.fall.girls.records.bay-state-conference.all-time %}
{% assign conference-meet-records = site.data.high-school.fall.girls.records.bay-state-conference.meet %}

## Team Records

{% include records-history.md
  events = championship-events
  records = team-records %}

## Bay State Conference Records

{% include records-history.md
  events = championship-events
  records = conference-records %}

## Bay State Conference Meet Records

This record history is from results since 1990.

{% include records-history.md
  events = dual-meet-events
  records = conference-meet-records %}
