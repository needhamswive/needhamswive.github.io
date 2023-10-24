---
title: Records
---

{% assign championship-events = site.data.high-school.records-championship-event-order | map: "name" %}
{% assign dual-meet-events = site.data.high-school.records-dual-meet-event-order | map: "name" %}
{% assign team-records = site.data.high-school.fall.girls.records.needham.all-time %}
{% assign conference-records = site.data.high-school.fall.girls.records.bay-state-conference.all-time %}
{% assign conference-meet-records = site.data.high-school.fall.girls.records.bay-state-conference.meet %}

A history of the records can be found [here](/high-school/girls/general-information/team-records/history).

## Team Records

{% include records.md
  events = championship-events
  records = team-records %}

{% assign years = "" %}
{% for year in site.data.high-school.fall.girls.records.needham.bay-state-conference-champions.years %}
  {% assign shortened_year = year | slice: 2, 4 %}
  {% assign years = years | append: " '" | append: shortened_year %}
{% endfor %}

Bay State Conference Champions

: {{ years }}

{% assign years = "" %}
{% for year in site.data.high-school.fall.girls.records.needham.south-sectional-champions.years %}
  {% assign shortened_year = year | slice: 2, 4 %}
  {% assign years = years | append: " '" | append: shortened_year %}
{% endfor %}

South Sectional Champions
: {{ years }}

## Bay State Conference Records

{% include records.md
  events = championship-events
  records = conference-records %}

## Bay State Conference Meet Records

These records are from results since 1990.

{% include records.md
  events = dual-meet-events
  records = conference-meet-records %}
