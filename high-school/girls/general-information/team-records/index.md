---
title: Team Records
---

{% assign championship-events = site.data.high-school.event-order.championship-records | map: "name" %}
{% assign dual-meet-events = site.data.high-school.event-order.dual-meet-records | map: "name" %}
{% assign team-records = site.data.high-school.girls.records.all-time %}
{% assign conference-records = site.data.high-school.archives.fall.girls.bay-state-conference.overall-records %}
{% assign conference-meet-records = site.data.high-school.archives.fall.girls.bay-state-conference.meet-records %}

Bay State Conference records can be found [here](/high-school/archives/fall/girls/bay-state-conference/records/). \
A history of the records can be found [here](/high-school/girls/general-information/team-records/history).

## Team Records

{% include records.html
  events = championship-events
  records = team-records %}

{% assign years = "" %}
{% for year in site.data.high-school.girls.records.bay-state-conference-champions.years %}
  {% assign shortened_year = year | slice: 2, 4 %}
  {% assign years = years | append: " '" | append: shortened_year %}
{% endfor %}

Bay State Conference Champions
: {{ years }}

{% assign years = "" %}
{% for year in site.data.high-school.girls.records.south-sectional-champions.years %}
  {% assign shortened_year = year | slice: 2, 4 %}
  {% assign years = years | append: " '" | append: shortened_year %}
{% endfor %}

South Sectional Champions
: {{ years }}

{% assign years = "" %}
{% for year in site.data.high-school.girls.records.division-1-state-champions.years %}
  {% assign shortened_year = year | slice: 2, 4 %}
  {% assign years = years | append: " '" | append: shortened_year %}
{% endfor %}

Division 1 State Champions
: {{ years }}
