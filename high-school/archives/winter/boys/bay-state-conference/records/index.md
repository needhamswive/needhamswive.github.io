---
title: Winter Boys BSC Records
---

{% assign championship-events = site.data.high-school.event-order.championship-records %}
{% assign dual-meet-events = site.data.high-school.event-order.dual-meet-records %}
{% assign conference-records = site.data.high-school.archives.winter.boys.bay-state-conference.overall-records %}
{% assign conference-meet-records = site.data.high-school.archives.winter.boys.bay-state-conference.meet-records %}

A history of the records can be found [here](/high-school/archives/winter/boys/bay-state-conference/records/history).

## Bay State Conference Records

{% include records.html
  events = championship-events
  records = conference-records %}

## Bay State Conference Meet Records

These records are from results since YYYY.

{% include records.html
  events = dual-meet-events
  records = conference-meet-records %}
